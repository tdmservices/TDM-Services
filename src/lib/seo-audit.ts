import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { Parser } from "htmlparser2";

/**
 * The free SEO audit: fetches one public page and checks the things on it that
 * search engines and AI assistants read.
 *
 * It runs on the server because a browser cannot fetch another site's HTML.
 * That makes it a request made on a stranger's behalf, so the fetch is fenced
 * in: http(s) only, standard ports, public addresses only (checked again after
 * every redirect), a short timeout and a size cap. Without those a visitor
 * could point it at the hosting provider's internal network.
 */

export type CheckStatus = "pass" | "warn" | "fail";

export interface AuditCheck {
  /** Stable id; the wording for each id lives in src/content/tools.ts. */
  id: string;
  group: "basics" | "content" | "technical" | "social" | "ai";
  status: CheckStatus;
  /** Values the wording can quote, e.g. a length or a count. */
  data: Record<string, string | number>;
}

export interface AuditResult {
  url: string;
  finalUrl: string;
  fetchedAt: string;
  score: number;
  ms: number;
  bytes: number;
  checks: AuditCheck[];
}

export class AuditError extends Error {
  constructor(public code: "invalid_url" | "blocked" | "unreachable" | "not_html" | "too_large" | "http_error", detail = "") {
    super(detail || code);
  }
}

const TIMEOUT_MS = 9000;
const MAX_BYTES = 2_000_000;
const MAX_REDIRECTS = 4;
const UA = "TDM-SEO-Audit/1.0 (+https://thedigitalmarketing.services/tools/seo-audit/)";

/** Loopback, private, link-local, carrier-grade NAT, multicast and reserved ranges. */
function isPrivateAddress(ip: string): boolean {
  if (isIP(ip) === 4) {
    const [a, b] = ip.split(".").map(Number);
    return (
      a === 0 ||
      a === 10 ||
      a === 127 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 192 && b === 0) ||
      (a === 198 && (b === 18 || b === 19)) ||
      a >= 224
    );
  }
  const v6 = ip.toLowerCase();
  if (v6 === "::" || v6 === "::1") return true;
  if (v6.startsWith("fe8") || v6.startsWith("fe9") || v6.startsWith("fea") || v6.startsWith("feb")) return true; // link-local
  if (v6.startsWith("fc") || v6.startsWith("fd")) return true; // unique local
  if (v6.startsWith("ff")) return true; // multicast
  const mapped = /^::ffff:(\d+\.\d+\.\d+\.\d+)$/.exec(v6);
  return mapped ? isPrivateAddress(mapped[1]) : false;
}

/** Throws unless the URL is one the audit is allowed to request. */
export async function assertPublic(url: URL) {
  if (url.protocol !== "http:" && url.protocol !== "https:") throw new AuditError("invalid_url");
  if (url.username || url.password) throw new AuditError("invalid_url");
  if (url.port && url.port !== "80" && url.port !== "443") throw new AuditError("blocked");

  const host = url.hostname.replace(/^\[|\]$/g, "");
  if (!host || host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local") || host.endsWith(".internal")) {
    throw new AuditError("blocked");
  }
  if (isIP(host)) {
    if (isPrivateAddress(host)) throw new AuditError("blocked");
    return;
  }
  if (!host.includes(".")) throw new AuditError("invalid_url");

  let addresses: { address: string }[];
  try {
    addresses = await lookup(host, { all: true });
  } catch {
    throw new AuditError("unreachable");
  }
  if (addresses.length === 0 || addresses.some((a) => isPrivateAddress(a.address))) throw new AuditError("blocked");
}

/** Accepts "example.com" as well as a full address. */
export function normalizeUrl(input: string): URL {
  const raw = input.trim();
  if (!raw || raw.length > 2000) throw new AuditError("invalid_url");
  try {
    return new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    throw new AuditError("invalid_url");
  }
}

/** GET with every redirect followed by hand, so each hop is checked before it is requested. */
export async function safeFetch(start: URL, accept: string): Promise<{ res: Response; url: URL }> {
  let url = start;
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    await assertPublic(url);
    let res: Response;
    try {
      res = await fetch(url, {
        redirect: "manual",
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: { "user-agent": UA, accept, "accept-language": "en,*;q=0.5" },
        cache: "no-store",
      });
    } catch {
      throw new AuditError("unreachable");
    }
    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get("location");
      if (!location) throw new AuditError("http_error", String(res.status));
      try {
        url = new URL(location, url);
      } catch {
        throw new AuditError("unreachable");
      }
      continue;
    }
    return { res, url };
  }
  throw new AuditError("unreachable", "too many redirects");
}

async function readCapped(res: Response): Promise<{ text: string; bytes: number }> {
  const reader = res.body?.getReader();
  if (!reader) return { text: "", bytes: 0 };
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > MAX_BYTES) {
      await reader.cancel();
      throw new AuditError("too_large");
    }
    chunks.push(value);
  }
  return { text: new TextDecoder("utf-8", { fatal: false }).decode(Buffer.concat(chunks)), bytes };
}

/** Whether a small supporting file (robots.txt, sitemap.xml) exists, and its text. */
async function probe(url: URL): Promise<string | null> {
  try {
    const { res } = await safeFetch(url, "text/plain,application/xml,*/*");
    if (!res.ok) return null;
    return (await readCapped(res)).text;
  } catch {
    return null;
  }
}

interface PageFacts {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  viewport: boolean;
  lang: string;
  h1: string[];
  headings: number[];
  images: number;
  imagesNoAlt: number;
  og: Set<string>;
  twitterCard: boolean;
  jsonLdTypes: string[];
  hreflang: number;
  internalLinks: number;
  externalLinks: number;
  words: number;
  favicon: boolean;
  questionHeadings: number;
}

function extract(html: string, pageUrl: URL): PageFacts {
  const f: PageFacts = {
    title: "", description: "", canonical: "", robots: "", viewport: false, lang: "", h1: [], headings: [],
    images: 0, imagesNoAlt: 0, og: new Set(), twitterCard: false, jsonLdTypes: [], hreflang: 0,
    internalLinks: 0, externalLinks: 0, words: 0, favicon: false, questionHeadings: 0,
  };

  let inTitle = false;
  let inHeading = 0;
  let headingText = "";
  let inJsonLd = false;
  let jsonLd = "";
  let skip = 0; // inside <script>/<style>/<noscript>
  let inBody = false;
  let text = "";

  const collectTypes = (node: unknown) => {
    if (Array.isArray(node)) return node.forEach(collectTypes);
    if (!node || typeof node !== "object") return;
    const o = node as Record<string, unknown>;
    const t = o["@type"];
    if (typeof t === "string") f.jsonLdTypes.push(t);
    else if (Array.isArray(t)) f.jsonLdTypes.push(...t.filter((x): x is string => typeof x === "string"));
    if (o["@graph"]) collectTypes(o["@graph"]);
  };

  const parser = new Parser(
    {
      onopentag(name, a) {
        if (name === "html" && a.lang) f.lang = a.lang;
        if (name === "body") inBody = true;
        if (name === "title" && !inBody) inTitle = true;
        if (name === "meta") {
          const key = (a.name ?? a.property ?? "").toLowerCase();
          const content = a.content ?? "";
          if (key === "description") f.description = content.trim();
          if (key === "robots" || key === "googlebot") f.robots += ` ${content.toLowerCase()}`;
          if (key === "viewport") f.viewport = true;
          if (key.startsWith("og:") && content) f.og.add(key);
          if (key === "twitter:card" && content) f.twitterCard = true;
        }
        if (name === "link") {
          const rel = (a.rel ?? "").toLowerCase();
          if (rel === "canonical" && a.href) f.canonical = a.href.trim();
          if (rel.includes("alternate") && a.hreflang) f.hreflang++;
          if (rel.includes("icon")) f.favicon = true;
        }
        if (name === "script") {
          if ((a.type ?? "").toLowerCase() === "application/ld+json") {
            inJsonLd = true;
            jsonLd = "";
          }
          skip++;
        }
        if (name === "style" || name === "noscript") skip++;
        if (/^h[1-6]$/.test(name)) {
          inHeading = Number(name[1]);
          headingText = "";
          f.headings.push(inHeading);
        }
        if (name === "img") {
          f.images++;
          if (a.alt === undefined || (a.alt.trim() === "" && a.role !== "presentation" && a["aria-hidden"] !== "true")) {
            f.imagesNoAlt++;
          }
        }
        if (name === "a" && a.href && !/^(#|mailto:|tel:|javascript:)/i.test(a.href)) {
          try {
            const target = new URL(a.href, pageUrl);
            if (target.hostname.replace(/^www\./, "") === pageUrl.hostname.replace(/^www\./, "")) f.internalLinks++;
            else f.externalLinks++;
          } catch {
            /* unparseable href — not a link worth counting */
          }
        }
      },
      ontext(chunk) {
        if (inTitle) f.title += chunk;
        if (inJsonLd) jsonLd += chunk;
        if (inHeading) headingText += chunk;
        if (inBody && skip === 0) text += ` ${chunk}`;
      },
      onclosetag(name) {
        if (name === "title") inTitle = false;
        if (name === "script") {
          if (inJsonLd) {
            try {
              collectTypes(JSON.parse(jsonLd));
            } catch {
              /* malformed JSON-LD is simply not counted */
            }
            inJsonLd = false;
          }
          skip = Math.max(0, skip - 1);
        }
        if (name === "style" || name === "noscript") skip = Math.max(0, skip - 1);
        if (/^h[1-6]$/.test(name) && inHeading) {
          const t = headingText.replace(/\s+/g, " ").trim();
          if (inHeading === 1) f.h1.push(t);
          if (/[?؟]\s*$/.test(t)) f.questionHeadings++;
          inHeading = 0;
        }
      },
    },
    { decodeEntities: true },
  );
  parser.write(html);
  parser.end();

  f.title = f.title.replace(/\s+/g, " ").trim();
  f.words = text.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
  return f;
}

const WEIGHT: Record<CheckStatus, number> = { pass: 1, warn: 0.5, fail: 0 };
/** How much each check counts towards the score. Anything not listed counts 1. */
const IMPORTANCE: Record<string, number> = {
  indexable: 3, title: 3, description: 2, h1: 2, https: 2, mobile: 2, canonical: 1.5, content: 1.5, alt: 1.5, schema: 1.5,
};

export async function auditUrl(input: string): Promise<AuditResult> {
  const requested = normalizeUrl(input);
  const started = Date.now();
  const { res, url } = await safeFetch(requested, "text/html,application/xhtml+xml");
  if (!res.ok) throw new AuditError("http_error", String(res.status));
  if (!/html/i.test(res.headers.get("content-type") ?? "")) throw new AuditError("not_html");
  const { text: html, bytes } = await readCapped(res);
  const ms = Date.now() - started;

  const origin = new URL(url.origin);
  const [robotsTxt, sitemapXml, llmsTxt] = await Promise.all([
    probe(new URL("/robots.txt", origin)),
    probe(new URL("/sitemap.xml", origin)),
    probe(new URL("/llms.txt", origin)),
  ]);

  return analyze({
    html,
    url,
    requested,
    ms,
    bytes,
    robotsHeader: (res.headers.get("x-robots-tag") ?? "").toLowerCase(),
    robotsTxt,
    sitemapXml,
    llmsTxt,
  });
}

/** The checks themselves, separated from the fetching so they can be run on any HTML. */
export function analyze(page: {
  html: string;
  url: URL;
  requested: URL;
  ms: number;
  bytes: number;
  robotsHeader: string;
  robotsTxt: string | null;
  sitemapXml: string | null;
  llmsTxt: string | null;
}): AuditResult {
  const { html, url, requested, ms, bytes, robotsHeader, robotsTxt, sitemapXml, llmsTxt } = page;
  const f = extract(html, url);

  const noindex = /noindex/.test(f.robots) || /noindex/.test(robotsHeader);
  const sitemapInRobots = robotsTxt ? /^\s*sitemap\s*:/im.test(robotsTxt) : false;
  const hasSitemap = Boolean(sitemapXml && /<(urlset|sitemapindex)/i.test(sitemapXml)) || sitemapInRobots;

  // Headings that jump a level (h2 straight to h4) make the outline hard to follow.
  let skipped = 0;
  for (let i = 1; i < f.headings.length; i++) if (f.headings[i] - f.headings[i - 1] > 1) skipped++;

  let canonicalStatus: CheckStatus = "warn";
  if (f.canonical) {
    try {
      const c = new URL(f.canonical, url);
      canonicalStatus = c.hostname.replace(/^www\./, "") === url.hostname.replace(/^www\./, "") ? "pass" : "warn";
    } catch {
      canonicalStatus = "fail";
    }
  }

  const ogCore = ["og:title", "og:description", "og:image"].filter((k) => f.og.has(k)).length;
  const types = [...new Set(f.jsonLdTypes)];
  const hasFaqSchema = types.some((t) => /FAQPage|QAPage|HowTo/i.test(t));

  const checks: AuditCheck[] = [
    // --- basics
    { id: "indexable", group: "basics", status: noindex ? "fail" : "pass", data: {} },
    {
      id: "title", group: "basics",
      status: !f.title ? "fail" : f.title.length < 25 || f.title.length > 60 ? "warn" : "pass",
      data: { length: f.title.length, text: f.title.slice(0, 140) },
    },
    {
      id: "description", group: "basics",
      status: !f.description ? "fail" : f.description.length < 70 || f.description.length > 160 ? "warn" : "pass",
      data: { length: f.description.length, text: f.description.slice(0, 220) },
    },
    { id: "h1", group: "basics", status: f.h1.length === 1 ? "pass" : f.h1.length === 0 ? "fail" : "warn", data: { count: f.h1.length, text: (f.h1[0] ?? "").slice(0, 140) } },
    // --- content
    { id: "content", group: "content", status: f.words >= 300 ? "pass" : f.words >= 120 ? "warn" : "fail", data: { words: f.words } },
    { id: "headings", group: "content", status: f.headings.length < 2 ? "warn" : skipped > 0 ? "warn" : "pass", data: { count: f.headings.length, skipped } },
    {
      id: "alt", group: "content",
      status: f.images === 0 || f.imagesNoAlt === 0 ? "pass" : f.imagesNoAlt / f.images > 0.3 ? "fail" : "warn",
      data: { images: f.images, missing: f.imagesNoAlt },
    },
    { id: "links", group: "content", status: f.internalLinks >= 3 ? "pass" : f.internalLinks > 0 ? "warn" : "fail", data: { internal: f.internalLinks, external: f.externalLinks } },
    // --- technical
    { id: "https", group: "technical", status: url.protocol === "https:" ? "pass" : "fail", data: {} },
    { id: "mobile", group: "technical", status: f.viewport ? "pass" : "fail", data: {} },
    { id: "canonical", group: "technical", status: f.canonical ? canonicalStatus : "warn", data: { href: f.canonical.slice(0, 200) } },
    { id: "lang", group: "technical", status: f.lang ? "pass" : "warn", data: { lang: f.lang } },
    { id: "speed", group: "technical", status: ms < 1200 ? "pass" : ms < 3000 ? "warn" : "fail", data: { ms, kb: Math.round(bytes / 1024) } },
    { id: "robots", group: "technical", status: robotsTxt === null ? "warn" : "pass", data: {} },
    { id: "sitemap", group: "technical", status: hasSitemap ? "pass" : "warn", data: {} },
    { id: "favicon", group: "technical", status: f.favicon ? "pass" : "warn", data: {} },
    // --- social
    { id: "opengraph", group: "social", status: ogCore === 3 ? "pass" : ogCore > 0 ? "warn" : "fail", data: { found: ogCore } },
    { id: "twitter", group: "social", status: f.twitterCard ? "pass" : "warn", data: {} },
    // --- AI search
    { id: "schema", group: "ai", status: types.length > 0 ? "pass" : "fail", data: { types: types.slice(0, 8).join(", ") } },
    { id: "faq", group: "ai", status: hasFaqSchema ? "pass" : "warn", data: { questions: f.questionHeadings } },
    { id: "llms", group: "ai", status: llmsTxt ? "pass" : "warn", data: {} },
    { id: "hreflang", group: "ai", status: f.hreflang > 0 ? "pass" : "warn", data: { count: f.hreflang } },
  ];

  let got = 0;
  let total = 0;
  for (const c of checks) {
    const w = IMPORTANCE[c.id] ?? 1;
    got += WEIGHT[c.status] * w;
    total += w;
  }

  return {
    url: requested.toString(),
    finalUrl: url.toString(),
    fetchedAt: new Date().toISOString(),
    score: Math.round((got / total) * 100),
    ms,
    bytes,
    checks,
  };
}
