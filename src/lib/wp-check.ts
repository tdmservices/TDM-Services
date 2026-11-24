import { AuditError, normalizeUrl, safeFetch, type CheckStatus } from "./seo-audit";

/**
 * The free WordPress security check.
 *
 * It looks at a site from the outside, the way any visitor's browser could:
 * a handful of plain GET requests for public addresses. It never logs in,
 * never guesses passwords and never sends anything to the site. That also
 * sets its limits: it cannot see plugin vulnerabilities, weak passwords or
 * malware inside the site, and the wording says so.
 *
 * Every request goes through the SEO audit's guarded fetch, so private and
 * internal addresses are refused on every hop.
 */

export interface WpCheck {
  /** Stable id; the wording lives in src/content/more-tools/wp.ts. */
  id: string;
  status: CheckStatus;
  data: Record<string, string | number>;
}

export interface WpCheckResult {
  url: string;
  finalUrl: string;
  isWordPress: boolean;
  score: number;
  grade: "A" | "B" | "C" | "D" | "F";
  checks: WpCheck[];
}

const SNIFF_BYTES = 60_000;

/** The first part of a response body. Enough to recognise a page without downloading a large file. */
async function head(res: Response, limit = SNIFF_BYTES): Promise<string> {
  const reader = res.body?.getReader();
  if (!reader) return "";
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  try {
    while (bytes < limit) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      chunks.push(value);
    }
  } finally {
    await reader.cancel().catch(() => {});
  }
  return new TextDecoder("utf-8", { fatal: false }).decode(Buffer.concat(chunks)).slice(0, limit);
}

interface Probe {
  status: number;
  type: string;
  text: string;
  /** Whether the request ended on the site that was asked for, not a redirect elsewhere. */
  sameSite: boolean;
}

async function probe(url: URL, limit?: number): Promise<Probe | null> {
  try {
    const { res, url: final } = await safeFetch(url, "*/*");
    return {
      status: res.status,
      type: (res.headers.get("content-type") ?? "").toLowerCase(),
      text: await head(res, limit),
      sameSite: final.hostname.replace(/^www\./, "") === url.hostname.replace(/^www\./, ""),
    };
  } catch {
    return null;
  }
}

const WEIGHT: Record<CheckStatus, number> = { pass: 1, warn: 0.5, fail: 0 };
const IMPORTANCE: Record<string, number> = {
  https: 3, users: 3, listing: 3, debuglog: 3, xmlrpc: 1.5, version: 1, readme: 1, hsts: 1, nosniff: 1, frame: 1, referrer: 0.5, login: 0.5,
};

export async function checkWordPress(input: string): Promise<WpCheckResult> {
  const requested = normalizeUrl(input);
  const { res, url } = await safeFetch(requested, "text/html,application/xhtml+xml");
  if (res.status >= 500) throw new AuditError("http_error", String(res.status));
  const html = await head(res, 400_000);
  const h = res.headers;
  const origin = new URL(url.origin);

  const generator = html.match(/<meta[^>]+name=["']generator["'][^>]+content=["']WordPress\s*([\d.]*)["']/i);
  const isWordPress =
    Boolean(generator) || /\/wp-(content|includes)\//i.test(html) || /rel="https:\/\/api\.w\.org\/"/i.test(h.get("link") ?? "");

  if (!isWordPress) {
    return { url: requested.href, finalUrl: url.href, isWordPress: false, score: 0, grade: "F", checks: [] };
  }

  const [readme, xmlrpc, users, uploads, debuglog, login] = await Promise.all([
    probe(new URL("/readme.html", origin), 4000),
    probe(new URL("/xmlrpc.php", origin), 2000),
    probe(new URL("/wp-json/wp/v2/users?per_page=10&_fields=id", origin), 20_000),
    probe(new URL("/wp-content/uploads/", origin), 4000),
    probe(new URL("/wp-content/debug.log", origin), 600),
    probe(new URL("/wp-login.php", origin), 30_000),
  ]);

  const checks: WpCheck[] = [];
  const add = (id: string, status: CheckStatus, data: WpCheck["data"] = {}) => checks.push({ id, status, data });

  add("https", url.protocol === "https:" ? "pass" : "fail");

  // Accounts listed to anyone who asks. Only the count is kept, never the names.
  let userCount = 0;
  if (users?.status === 200 && users.sameSite && users.type.includes("json")) {
    try {
      const parsed: unknown = JSON.parse(users.text);
      if (Array.isArray(parsed)) userCount = parsed.length;
    } catch {
      // A long list cut off by the read limit still shows accounts are listed.
      userCount = (users.text.match(/"id"\s*:/g) ?? []).length;
    }
  }
  add("users", userCount > 0 ? "fail" : "pass", { count: userCount });

  const listed = uploads?.status === 200 && uploads.sameSite && /<title>\s*Index of/i.test(uploads.text);
  add("listing", listed ? "fail" : "pass");

  const logOpen =
    debuglog?.status === 200 && debuglog.sameSite && !debuglog.type.includes("html") && /\[\d{2}-[A-Za-z]{3}-\d{4}|PHP (Notice|Warning|Fatal|Deprecated)/.test(debuglog.text);
  add("debuglog", logOpen ? "fail" : "pass");

  const xmlrpcOn = xmlrpc !== null && xmlrpc.sameSite && (xmlrpc.status === 405 || xmlrpc.status === 200) && /XML-RPC server accepts POST requests only/i.test(xmlrpc.text);
  add("xmlrpc", xmlrpcOn ? "warn" : "pass");

  const version = generator?.[1] ?? "";
  add("version", generator ? "warn" : "pass", { version });

  const readmeOpen = readme?.status === 200 && readme.sameSite && /WordPress/i.test(readme.text) && /<html/i.test(readme.text);
  add("readme", readmeOpen ? "warn" : "pass");

  if (url.protocol === "https:") add("hsts", h.get("strict-transport-security") ? "pass" : "warn");
  add("nosniff", /nosniff/i.test(h.get("x-content-type-options") ?? "") ? "pass" : "warn");
  add("frame", h.get("x-frame-options") || /frame-ancestors/i.test(h.get("content-security-policy") ?? "") ? "pass" : "warn");
  add("referrer", h.get("referrer-policy") ? "pass" : "warn");

  const loginOpen = login?.status === 200 && login.sameSite && /name=["']log["']|id=["']user_login["']/i.test(login.text);
  add("login", loginOpen ? "warn" : "pass");

  let total = 0;
  let earned = 0;
  for (const c of checks) {
    const w = IMPORTANCE[c.id] ?? 1;
    total += w;
    earned += w * WEIGHT[c.status];
  }
  let score = Math.round((earned / total) * 100);
  // One open door outweighs any number of tidy headers.
  const critical = checks.filter((c) => c.status === "fail").length;
  if (critical > 0) score = Math.min(score, 69 - (critical - 1) * 10);
  score = Math.max(score, 0);
  const grade = score >= 90 ? "A" : score >= 75 ? "B" : score >= 60 ? "C" : score >= 40 ? "D" : "F";

  return { url: requested.href, finalUrl: url.href, isWordPress: true, score, grade, checks };
}
