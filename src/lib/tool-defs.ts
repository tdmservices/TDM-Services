/**
 * The tools that are described as data rather than hand-built: calculators,
 * decision quizzes and document builders.
 *
 * A definition holds the logic only — inputs, arithmetic, scoring, the shape
 * of a generated document. Every word a visitor reads lives in
 * src/content/more-tools.ts, keyed by the ids used here, so adding a language
 * never touches this file and adding a tool never touches the components.
 */

export type Values = Record<string, number | string | string[]>;

export type InputDef =
  | { id: string; type: "number" | "money" | "percent"; default: number; step?: number }
  | { id: string; type: "select"; options: string[]; default: string }
  | { id: string; type: "wordcount" };

export type Output =
  | { id: string; kind: "money" | "number" | "percent" | "ratio"; value: number; strong?: boolean; decimals?: number }
  | { id: string; kind: "text"; text: string; strong?: boolean }
  /** A sentence chosen from the tool's copy by key, e.g. a verdict. */
  | { id: string; kind: "message"; key: string; tone: "good" | "warn" | "bad" };

export interface CalcDef {
  kind: "calc";
  slug: string;
  /** Service or sector page this tool belongs with. */
  service: string;
  inputs: InputDef[];
  compute: (v: Record<string, number | string>) => Output[];
}

export interface QuizDef {
  kind: "quiz";
  slug: string;
  service: string;
  results: string[];
  /** The service page each result leads to. */
  links: Record<string, string>;
  questions: { id: string; options: { id: string; scores: Record<string, number> }[] }[];
}

export type FieldDef =
  | { id: string; type: "text" | "textarea"; required?: boolean }
  | { id: string; type: "select"; options: string[] }
  | { id: string; type: "multi"; options: string[] };

export interface BuilderDef {
  kind: "builder";
  slug: string;
  service: string;
  /** Other service pages that should also show this tool. */
  alsoFor?: string[];
  fields: FieldDef[];
  /**
   * The document, as lines. `t` looks up the tool's copy by key; `v` reads a
   * field. Lines starting "# " are headings and "- " are list items.
   */
  build: (v: (id: string) => string, picked: (id: string) => string[], t: (key: string) => string) => string[];
}

export type ToolDef = CalcDef | QuizDef | BuilderDef;

const n = (v: number | string | undefined) => (typeof v === "number" && Number.isFinite(v) ? v : 0);
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

/** Standard normal cumulative distribution, for the A/B test's confidence. */
function normalCdf(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - p : p;
}

const RATIOS: Record<string, [number, number]> = {
  "9:16": [9, 16],
  "16:9": [16, 9],
  "1:1": [1, 1],
  "4:5": [4, 5],
  "4:3": [4, 3],
  "21:9": [21, 9],
};

const PACE: Record<string, number> = { slow: 130, normal: 150, fast: 170 };

const clock = (seconds: number) => {
  const s = Math.max(0, Math.round(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

export const TOOL_DEFS: ToolDef[] = [
  {
    kind: "calc",
    slug: "engagement-rate-calculator",
    service: "/marketing/social-media/",
    inputs: [
      { id: "likes", type: "number", default: 420 },
      { id: "comments", type: "number", default: 35 },
      { id: "shares", type: "number", default: 18 },
      { id: "saves", type: "number", default: 27 },
      { id: "followers", type: "number", default: 12000 },
      { id: "reach", type: "number", default: 6500 },
    ],
    compute(v) {
      const total = n(v.likes) + n(v.comments) + n(v.shares) + n(v.saves);
      const out: Output[] = [{ id: "interactions", kind: "number", value: total }];
      if (n(v.followers) > 0) out.unshift({ id: "byFollowers", kind: "percent", value: (total / n(v.followers)) * 100, strong: true, decimals: 2 });
      if (n(v.reach) > 0) out.push({ id: "byReach", kind: "percent", value: (total / n(v.reach)) * 100, decimals: 2 });
      return out;
    },
  },
  {
    kind: "calc",
    slug: "shopify-profit-calculator",
    service: "/development/shopify/",
    inputs: [
      { id: "price", type: "money", default: 60 },
      { id: "cost", type: "money", default: 22 },
      { id: "shipping", type: "money", default: 6 },
      { id: "feePct", type: "percent", default: 2.9, step: 0.1 },
      { id: "feeFixed", type: "money", default: 0.3, step: 0.01 },
      { id: "adCost", type: "money", default: 12 },
      { id: "plan", type: "money", default: 39 },
      { id: "orders", type: "number", default: 300 },
    ],
    compute(v) {
      const price = n(v.price);
      const fees = price * (n(v.feePct) / 100) + n(v.feeFixed);
      const perOrder = price - n(v.cost) - n(v.shipping) - fees - n(v.adCost);
      const monthly = perOrder * n(v.orders) - n(v.plan);
      const out: Output[] = [
        { id: "perOrder", kind: "money", value: perOrder, strong: true, decimals: 2 },
        { id: "margin", kind: "percent", value: price > 0 ? (perOrder / price) * 100 : 0, decimals: 1 },
        { id: "fees", kind: "money", value: fees, decimals: 2 },
        { id: "monthly", kind: "money", value: monthly },
      ];
      if (perOrder > 0) out.push({ id: "breakEvenOrders", kind: "number", value: Math.ceil(n(v.plan) / perOrder) });
      else out.push({ id: "verdict", kind: "message", key: "msg.loss", tone: "bad" });
      return out;
    },
  },
  {
    kind: "calc",
    slug: "manual-work-cost-calculator",
    service: "/development/crm-erp/",
    inputs: [
      { id: "people", type: "number", default: 6 },
      { id: "hours", type: "number", default: 5, step: 0.5 },
      { id: "rate", type: "money", default: 30 },
      { id: "weeks", type: "number", default: 48 },
      { id: "automatable", type: "percent", default: 60 },
    ],
    compute(v) {
      const hoursYear = n(v.people) * n(v.hours) * n(v.weeks);
      const cost = hoursYear * n(v.rate);
      const share = Math.min(n(v.automatable), 100) / 100;
      return [
        { id: "cost", kind: "money", value: cost, strong: true },
        { id: "hoursYear", kind: "number", value: hoursYear },
        { id: "recoverable", kind: "money", value: cost * share },
        { id: "hoursBack", kind: "number", value: hoursYear * share },
      ];
    },
  },
  {
    kind: "calc",
    slug: "aspect-ratio-calculator",
    service: "/media/video-editing/",
    inputs: [
      { id: "width", type: "number", default: 1920 },
      { id: "height", type: "number", default: 1080 },
      { id: "target", type: "select", options: Object.keys(RATIOS), default: "9:16" },
    ],
    compute(v) {
      const w = Math.round(n(v.width));
      const h = Math.round(n(v.height));
      if (w <= 0 || h <= 0) return [];
      const g = gcd(w, h);
      const [rw, rh] = RATIOS[String(v.target)] ?? [9, 16];
      // The largest frame of the target ratio that fits inside the source, i.e. a crop with no bars.
      const cropW = Math.min(w, Math.floor((h * rw) / rh));
      const cropH = Math.min(h, Math.floor((w * rh) / rw));
      const even = (x: number) => x - (x % 2);
      return [
        { id: "ratio", kind: "text", text: `${w / g}:${h / g}`, strong: true },
        { id: "decimal", kind: "number", value: w / h, decimals: 3 },
        { id: "crop", kind: "text", text: `${even(cropW)} × ${even(cropH)}` },
        { id: "sameWidth", kind: "text", text: `${w} × ${even(Math.round((w * rh) / rw))}` },
        { id: "sameHeight", kind: "text", text: `${even(Math.round((h * rw) / rh))} × ${h}` },
      ];
    },
  },
  {
    kind: "calc",
    slug: "video-script-timer",
    service: "/media/video-shoots/",
    inputs: [
      { id: "script", type: "wordcount" },
      { id: "pace", type: "select", options: ["slow", "normal", "fast"], default: "normal" },
    ],
    compute(v) {
      const words = n(v.script);
      const wpm = PACE[String(v.pace)] ?? 150;
      return [
        { id: "duration", kind: "text", text: clock((words / wpm) * 60), strong: true },
        { id: "words", kind: "number", value: words },
        { id: "for15", kind: "number", value: Math.round(wpm / 4) },
        { id: "for30", kind: "number", value: Math.round(wpm / 2) },
        { id: "for60", kind: "number", value: wpm },
      ];
    },
  },
  {
    kind: "calc",
    slug: "ab-test-calculator",
    service: "/media/ad-creatives/",
    inputs: [
      { id: "visitorsA", type: "number", default: 5000 },
      { id: "conversionsA", type: "number", default: 150 },
      { id: "visitorsB", type: "number", default: 5000 },
      { id: "conversionsB", type: "number", default: 190 },
    ],
    compute(v) {
      const nA = n(v.visitorsA);
      const nB = n(v.visitorsB);
      const cA = Math.min(n(v.conversionsA), nA);
      const cB = Math.min(n(v.conversionsB), nB);
      if (nA <= 0 || nB <= 0) return [];
      const pA = cA / nA;
      const pB = cB / nB;
      const pooled = (cA + cB) / (nA + nB);
      const se = Math.sqrt(pooled * (1 - pooled) * (1 / nA + 1 / nB));
      const z = se > 0 ? (pB - pA) / se : 0;
      // Two-sided test: how sure we can be that the two versions really differ.
      const confidence = (1 - 2 * (1 - normalCdf(Math.abs(z)))) * 100;
      const out: Output[] = [
        { id: "confidence", kind: "percent", value: Math.max(0, confidence), strong: true, decimals: 1 },
        { id: "rateA", kind: "percent", value: pA * 100, decimals: 2 },
        { id: "rateB", kind: "percent", value: pB * 100, decimals: 2 },
      ];
      if (pA > 0) out.push({ id: "uplift", kind: "percent", value: ((pB - pA) / pA) * 100, decimals: 1 });
      const enough = cA + cB >= 100;
      out.push({
        id: "verdict",
        kind: "message",
        key: !enough ? "msg.small" : confidence >= 95 ? (pB > pA ? "msg.bWins" : "msg.aWins") : confidence >= 90 ? "msg.leaning" : "msg.noWinner",
        tone: !enough ? "warn" : confidence >= 95 ? "good" : "warn",
      });
      return out;
    },
  },
  {
    kind: "quiz",
    slug: "ecommerce-platform-quiz",
    service: "/development/magento/",
    results: ["shopify", "woocommerce", "magento", "custom"],
    links: {
      shopify: "/development/shopify/",
      woocommerce: "/development/wordpress/",
      magento: "/development/magento/",
      custom: "/development/custom-development/",
    },
    questions: [
      { id: "catalogue", options: [
        { id: "small", scores: { shopify: 3, woocommerce: 2 } },
        { id: "medium", scores: { shopify: 2, woocommerce: 2, magento: 1 } },
        { id: "large", scores: { magento: 3, custom: 2, shopify: 1 } },
      ] },
      { id: "selling", options: [
        { id: "b2c", scores: { shopify: 3, woocommerce: 2 } },
        { id: "b2b", scores: { magento: 3, custom: 2 } },
        { id: "both", scores: { magento: 2, shopify: 1, custom: 2 } },
      ] },
      { id: "team", options: [
        { id: "none", scores: { shopify: 3 } },
        { id: "some", scores: { woocommerce: 3, shopify: 1 } },
        { id: "developers", scores: { magento: 2, custom: 3, woocommerce: 1 } },
      ] },
      { id: "custom", options: [
        { id: "standard", scores: { shopify: 3, woocommerce: 1 } },
        { id: "some", scores: { woocommerce: 2, shopify: 2, magento: 1 } },
        { id: "unique", scores: { custom: 3, magento: 2 } },
      ] },
      { id: "content", options: [
        { id: "low", scores: { shopify: 2, magento: 1 } },
        { id: "high", scores: { woocommerce: 3, custom: 1 } },
      ] },
      { id: "markets", options: [
        { id: "one", scores: { shopify: 2, woocommerce: 2 } },
        { id: "several", scores: { shopify: 2, magento: 2, custom: 1 } },
        { id: "complex", scores: { magento: 3, custom: 2 } },
      ] },
      { id: "speed", options: [
        { id: "weeks", scores: { shopify: 3, woocommerce: 1 } },
        { id: "months", scores: { woocommerce: 2, magento: 2, custom: 1 } },
        { id: "flexible", scores: { custom: 2, magento: 2 } },
      ] },
    ],
  },
  {
    kind: "quiz",
    slug: "app-platform-quiz",
    service: "/development/mobile-apps/",
    results: ["cross", "native", "web"],
    links: { cross: "/development/mobile-apps/", native: "/development/mobile-apps/", web: "/development/custom-development/" },
    questions: [
      { id: "platforms", options: [
        { id: "both", scores: { cross: 3, web: 1 } },
        { id: "one", scores: { native: 3 } },
        { id: "anywhere", scores: { web: 3, cross: 1 } },
      ] },
      { id: "hardware", options: [
        { id: "basic", scores: { cross: 2, web: 2 } },
        { id: "some", scores: { cross: 3, native: 1 } },
        { id: "heavy", scores: { native: 3 } },
      ] },
      { id: "performance", options: [
        { id: "standard", scores: { cross: 2, web: 2 } },
        { id: "smooth", scores: { cross: 2, native: 2 } },
        { id: "demanding", scores: { native: 3 } },
      ] },
      { id: "budget", options: [
        { id: "tight", scores: { web: 3, cross: 2 } },
        { id: "moderate", scores: { cross: 3 } },
        { id: "open", scores: { native: 2, cross: 1 } },
      ] },
      { id: "stores", options: [
        { id: "must", scores: { cross: 2, native: 2 } },
        { id: "nice", scores: { cross: 2, web: 1 } },
        { id: "no", scores: { web: 3 } },
      ] },
      { id: "offline", options: [
        { id: "no", scores: { web: 2, cross: 1 } },
        { id: "some", scores: { cross: 2, native: 1 } },
        { id: "core", scores: { native: 2, cross: 2 } },
      ] },
    ],
  },
  {
    kind: "builder",
    slug: "project-brief-generator",
    service: "/development/custom-development/",
    fields: [
      { id: "name", type: "text", required: true },
      { id: "company", type: "text" },
      { id: "problem", type: "textarea", required: true },
      { id: "users", type: "textarea" },
      { id: "type", type: "select", options: ["website", "store", "webapp", "portal", "internal", "mobile"] },
      { id: "features", type: "multi", options: ["accounts", "payments", "search", "dashboard", "cms", "multilingual", "notifications", "reports", "api", "roles"] },
      { id: "integrations", type: "textarea" },
      { id: "content", type: "select", options: ["ready", "partly", "none"] },
      { id: "timeline", type: "select", options: ["asap", "quarter", "half", "flexible"] },
      { id: "budget", type: "text" },
      { id: "success", type: "textarea" },
    ],
    build(v, picked, t) {
      const lines = [`# ${t("doc.title")}: ${v("name")}`];
      if (v("company")) lines.push(`${t("f.company")}: ${v("company")}`);
      lines.push("", `# ${t("doc.problem")}`, v("problem") || t("doc.tbd"));
      lines.push("", `# ${t("doc.users")}`, v("users") || t("doc.tbd"));
      lines.push("", `# ${t("doc.scope")}`, `${t("f.type")}: ${t(`o.type.${v("type")}`)}`);
      const features = picked("features");
      if (features.length) lines.push(...features.map((f) => `- ${t(`o.features.${f}`)}`));
      lines.push("", `# ${t("doc.integrations")}`, v("integrations") || t("doc.none"));
      lines.push("", `# ${t("doc.practical")}`);
      lines.push(`- ${t("f.content")}: ${t(`o.content.${v("content")}`)}`);
      lines.push(`- ${t("f.timeline")}: ${t(`o.timeline.${v("timeline")}`)}`);
      lines.push(`- ${t("f.budget")}: ${v("budget") || t("doc.tbd")}`);
      lines.push("", `# ${t("doc.success")}`, v("success") || t("doc.tbd"));
      lines.push("", `# ${t("doc.questions")}`, ...["q1", "q2", "q3", "q4"].map((q) => `- ${t(`doc.${q}`)}`));
      return lines;
    },
  },
  {
    kind: "builder",
    slug: "ugc-brief-generator",
    service: "/media/ugc-ads/",
    fields: [
      { id: "brand", type: "text", required: true },
      { id: "product", type: "text", required: true },
      { id: "audience", type: "textarea" },
      { id: "problem", type: "textarea" },
      { id: "benefit", type: "textarea", required: true },
      { id: "format", type: "select", options: ["testimonial", "unboxing", "problem", "howto", "comparison"] },
      { id: "platform", type: "multi", options: ["tiktok", "reels", "shorts", "meta"] },
      { id: "length", type: "select", options: ["15", "30", "45"] },
      { id: "tone", type: "select", options: ["casual", "energetic", "calm", "expert"] },
      { id: "must", type: "textarea" },
      { id: "avoid", type: "textarea" },
      { id: "cta", type: "text" },
    ],
    build(v, picked, t) {
      const lines = [`# ${t("doc.title")}: ${v("brand")} · ${v("product")}`, ""];
      lines.push(`# ${t("doc.overview")}`);
      lines.push(`- ${t("f.format")}: ${t(`o.format.${v("format")}`)}`);
      lines.push(`- ${t("f.length")}: ${v("length")}s`);
      lines.push(`- ${t("f.tone")}: ${t(`o.tone.${v("tone")}`)}`);
      const platforms = picked("platform");
      if (platforms.length) lines.push(`- ${t("f.platform")}: ${platforms.map((p) => t(`o.platform.${p}`)).join(", ")}`);
      lines.push(`- ${t("doc.ratio")}`);
      lines.push("", `# ${t("doc.audience")}`, v("audience") || t("doc.tbd"));
      lines.push("", `# ${t("doc.problem")}`, v("problem") || t("doc.tbd"));
      lines.push("", `# ${t("doc.message")}`, v("benefit"));
      lines.push("", `# ${t("doc.structure")}`);
      lines.push(`- ${t("doc.s1")}`, `- ${t(`doc.s2.${v("format")}`)}`, `- ${t("doc.s3")}`, `- ${t("doc.s4")}: ${v("cta") || t("doc.ctaDefault")}`);
      lines.push("", `# ${t("doc.hooks")}`, ...["h1", "h2", "h3"].map((h) => `- ${t(`doc.${h}`).replaceAll("{product}", v("product"))}`));
      lines.push("", `# ${t("doc.must")}`, v("must") || t("doc.none"));
      lines.push("", `# ${t("doc.avoid")}`, v("avoid") || t("doc.avoidDefault"));
      lines.push("", `# ${t("doc.deliver")}`, ...["d1", "d2", "d3"].map((d) => `- ${t(`doc.${d}`)}`));
      return lines;
    },
  },
  {
    kind: "builder",
    slug: "product-shot-list-generator",
    service: "/media/product-shoots/",
    fields: [
      { id: "product", type: "text", required: true },
      { id: "category", type: "select", options: ["fashion", "beauty", "food", "electronics", "home", "jewellery"] },
      { id: "channels", type: "multi", options: ["store", "marketplace", "social", "ads", "print"] },
      { id: "variants", type: "text" },
      { id: "props", type: "textarea" },
    ],
    build(v, picked, t) {
      const lines = [`# ${t("doc.title")}: ${v("product")}`];
      if (v("variants")) lines.push(`${t("f.variants")}: ${v("variants")}`);
      lines.push("", `# ${t("doc.core")}`, ...["c1", "c2", "c3", "c4", "c5"].map((k) => `- ${t(`doc.${k}`)}`));
      lines.push("", `# ${t("doc.category")}: ${t(`o.category.${v("category")}`)}`);
      lines.push(...["1", "2", "3"].map((k) => `- ${t(`doc.cat.${v("category")}.${k}`)}`));
      for (const ch of picked("channels")) {
        lines.push("", `# ${t(`o.channels.${ch}`)}`, ...["1", "2"].map((k) => `- ${t(`doc.ch.${ch}.${k}`)}`));
      }
      lines.push("", `# ${t("doc.props")}`, v("props") || t("doc.none"));
      lines.push("", `# ${t("doc.prep")}`, ...["p1", "p2", "p3", "p4"].map((k) => `- ${t(`doc.${k}`)}`));
      return lines;
    },
  },
  {
    kind: "builder",
    slug: "irresistible-offer-generator",
    service: "/marketing/performance-marketing/",
    alsoFor: ["/marketing/social-media/"],
    fields: [
      { id: "business", type: "text", required: true },
      { id: "product", type: "text", required: true },
      { id: "audience", type: "text", required: true },
      { id: "pain", type: "textarea", required: true },
      { id: "outcome", type: "text", required: true },
      { id: "time", type: "text" },
      { id: "effort", type: "text" },
      { id: "proof", type: "textarea" },
      { id: "price", type: "text" },
      { id: "guarantee", type: "select", options: ["results", "moneyback", "conditional", "payafter", "none"] },
      { id: "bonuses", type: "textarea" },
      { id: "limit", type: "text" },
      { id: "deadline", type: "text" },
      { id: "cta", type: "select", options: ["call", "message", "claim", "buy", "visit"] },
    ],
    build(v, picked, t) {
      const vals: Record<string, string> = {};
      for (const k of ["business", "product", "audience", "pain", "outcome", "time", "effort", "proof", "price", "limit", "deadline"]) vals[k] = v(k);
      const cap = (x: string) => x.charAt(0).toUpperCase() + x.slice(1);
      const fill = (key: string) => cap(t(key).replace(/\{(\w+)\}/g, (_, k: string) => vals[k] ?? ""));
      // A sentence is built from the parts that were answered, so a blank never leaves a hole.
      const part = (key: string, when: string) => (v(when) ? t(key).replace(/\{(\w+)\}/g, (_, k: string) => vals[k] ?? "") : "");
      const g = v("guarantee");
      const cta = t(`doc.cta.${v("cta")}`);
      const bonuses = v("bonuses").split("\n").map((b) => b.trim()).filter(Boolean);

      const sentence = [fill("doc.s.base"), part("doc.s.time", "time"), part("doc.s.effort", "effort")].join("") + t("doc.s.end");
      const lines = [`# ${t("doc.title")}${t("doc.colon")}${v("business")}`, "", `# ${t("doc.sentence")}`, sentence];
      if (g !== "none") lines.push(fill(`doc.g.${g}.short`));

      lines.push("", `# ${t("doc.names")}`);
      lines.push(`- ${fill(v("time") ? "doc.n1" : "doc.n1.notime")}`, `- ${fill("doc.n2")}`);
      if (v("effort")) lines.push(`- ${fill("doc.n3")}`);

      // The four things that decide how valuable an offer feels.
      lines.push("", `# ${t("doc.value")}`);
      lines.push(`- ${t("doc.v.outcome")}${t("doc.colon")}${t("doc.v.ok")} ${v("outcome")}`);
      lines.push(`- ${t("doc.v.belief")}${t("doc.colon")}${v("proof") || g !== "none" ? t("doc.v.ok") : t("doc.v.weak")} ${v("proof") || g !== "none" ? t("doc.v.belief.ok") : t("doc.v.belief.fix")}`);
      lines.push(`- ${t("doc.v.time")}${t("doc.colon")}${v("time") ? `${t("doc.v.ok")} ${v("time")}` : `${t("doc.v.weak")} ${t("doc.v.time.fix")}`}`);
      lines.push(`- ${t("doc.v.effort")}${t("doc.colon")}${v("effort") ? `${t("doc.v.ok")} ${t("doc.v.effort.ok").replace("{effort}", v("effort"))}` : `${t("doc.v.weak")} ${t("doc.v.effort.fix")}`}`);

      lines.push("", `# ${t("doc.stack")}`, `- ${v("product")}${v("price") ? ` (${v("price")})` : ""}`);
      if (bonuses.length) lines.push(...bonuses.map((b) => `- ${t("doc.bonus")}${t("doc.colon")}${b}`));
      else lines.push(t("doc.bonus.fix"));

      lines.push("", `# ${t("doc.guarantee")}`, fill(`doc.g.${g}`));

      lines.push("", `# ${t("doc.now")}`);
      if (v("limit")) lines.push(`- ${fill("doc.now.limit")}`);
      if (v("deadline")) lines.push(`- ${fill("doc.now.deadline")}`);
      if (!v("limit") && !v("deadline")) lines.push(t("doc.now.fix"));

      lines.push("", `# ${t("doc.hooks")}`, `- ${fill("doc.h1")}`, `- ${fill("doc.h2")}`, `- ${fill(v("time") ? "doc.h3" : "doc.h3.notime")}`);

      lines.push("", `# ${t("doc.ad")}`, fill("doc.ad.1"), sentence);
      if (v("proof")) lines.push(fill("doc.ad.proof"));
      if (bonuses.length) lines.push(`${t("doc.ad.bonus")} ${bonuses.join(t("doc.listSep"))}.`);
      if (g !== "none") lines.push(fill(`doc.g.${g}.short`));
      if (v("limit")) lines.push(fill("doc.now.limit"));
      if (v("deadline")) lines.push(fill("doc.now.deadline"));
      lines.push(cta);

      lines.push("", `# ${t("doc.post")}`, fill("doc.post.1"), fill("doc.post.2"), sentence, cta);
      lines.push("", `# ${t("doc.check")}`, ...["k1", "k2", "k3", "k4"].map((k) => `- ${t(`doc.${k}`)}`));
      return lines;
    },
  },
  {
    kind: "builder",
    slug: "social-media-calendar-generator",
    service: "/marketing/social-media/",
    fields: [
      { id: "business", type: "text", required: true },
      { id: "topic", type: "text", required: true },
      { id: "audience", type: "text" },
      { id: "goal", type: "select", options: ["sales", "leads", "awareness", "community"] },
      { id: "platforms", type: "multi", options: ["instagram", "tiktok", "facebook", "linkedin", "youtube", "x"] },
      { id: "perWeek", type: "select", options: ["3", "4", "5", "7"] },
      { id: "weeks", type: "select", options: ["4", "2", "1"] },
      { id: "offer", type: "text" },
    ],
    build(v, picked, t) {
      const vals: Record<string, string> = { business: v("business"), topic: v("topic"), audience: v("audience") || t("doc.audienceDefault"), offer: v("offer") || t("doc.offerDefault") };
      const fill = (key: string) => t(key).replace(/\{(\w+)\}/g, (_, k: string) => vals[k] ?? "");
      // The goal sets how the five kinds of post are mixed across a week.
      const MIX: Record<string, string[]> = {
        sales: ["teach", "proof", "offer", "teach", "behind", "offer", "engage"],
        leads: ["teach", "proof", "teach", "offer", "engage", "teach", "behind"],
        awareness: ["teach", "engage", "behind", "teach", "proof", "engage", "teach"],
        community: ["engage", "behind", "teach", "engage", "proof", "behind", "offer"],
      };
      const DAYS: Record<string, number[]> = { "3": [1, 3, 5], "4": [1, 2, 4, 6], "5": [1, 2, 3, 4, 5], "7": [1, 2, 3, 4, 5, 6, 7] };
      const mix = MIX[v("goal")] ?? MIX.sales;
      const days = DAYS[v("perWeek")] ?? DAYS["3"];
      const weeks = Number(v("weeks")) || 4;
      const used: Record<string, number> = {};

      const lines = [`# ${t("doc.title")}${t("doc.colon")}${v("business")}`, `${t("f.goal")}${t("doc.colon")}${t(`o.goal.${v("goal")}`)} · ${days.length} ${t("doc.perWeek")} · ${weeks} ${t("doc.weeks")}`];
      const platforms = picked("platforms");
      if (platforms.length) lines.push(`${t("f.platforms")}${t("doc.colon")}${platforms.map((p) => t(`o.platforms.${p}`)).join(t("doc.listSep"))}`);

      for (let w = 1; w <= weeks; w++) {
        lines.push("", `# ${t("doc.week")} ${w}${t("doc.colon")}${t(`doc.theme.${((w - 1) % 4) + 1}`)}`);
        days.forEach((d, i) => {
          const pillar = mix[i % mix.length];
          const idea = (used[pillar] = (used[pillar] ?? 0) + 1);
          lines.push(`- ${t(`doc.day.${d}`)} · ${t(`doc.p.${pillar}`)} · ${fill(`doc.i.${pillar}.${((idea - 1) % 6) + 1}`)}`);
        });
      }

      lines.push("", `# ${t("doc.mix")}`, ...["teach", "proof", "behind", "offer", "engage"].map((p) => `- ${t(`doc.p.${p}`)}${t("doc.colon")}${t(`doc.why.${p}`)}`));
      if (platforms.length) lines.push("", `# ${t("doc.adapt")}`, ...platforms.map((p) => `- ${t(`o.platforms.${p}`)}${t("doc.colon")}${t(`doc.a.${p}`)}`));
      lines.push("", `# ${t("doc.rules")}`, ...["r1", "r2", "r3", "r4"].map((k) => `- ${t(`doc.${k}`)}`));
      return lines;
    },
  },
];

export const getToolDef = (slug: string) => TOOL_DEFS.find((d) => d.slug === slug);

/** Which tools belong with each service or sector page, the main one first. */
const SERVICE_MAIN: Record<string, string> = {
  "/marketing/performance-marketing/": "roas-calculator",
  "/marketing/seo/": "seo-audit",
  "/marketing/social-media/": "engagement-rate-calculator",
  "/staff-augmentation/": "staff-augmentation-calculator",
  "/development/wordpress/": "wordpress-security-checker",
};

export const SERVICE_TOOLS: Record<string, string[]> = (() => {
  const map: Record<string, string[]> = {};
  const add = (path: string, slug: string) => {
    if (!(map[path] ??= []).includes(slug)) map[path].push(slug);
  };
  for (const [path, slug] of Object.entries(SERVICE_MAIN)) add(path, slug);
  for (const d of TOOL_DEFS) {
    add(d.service, d.slug);
    for (const extra of d.kind === "builder" ? (d.alsoFor ?? []) : []) add(extra, d.slug);
  }
  return map;
})();
