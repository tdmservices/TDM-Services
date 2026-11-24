/**
 * Turns the location pages under /content/locations into HTML and saves them
 * in Supabase as DRAFT pages (Admin → Pages), to be published a few at a time.
 *
 *   node scripts/build-location-pages.mjs --check          validate the files only
 *   node scripts/build-location-pages.mjs --preview <dir>  write the HTML to a folder
 *   node scripts/build-location-pages.mjs                  add pages that do not exist yet, as drafts
 *   node scripts/build-location-pages.mjs --update         also rewrite the text of pages that exist
 *
 * A page that already exists is left alone unless --update is given, so edits
 * made in the admin are not overwritten by accident. Whether a page is
 * published is never changed by this script.
 *
 * Needs NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (in .env.local
 * or the environment). The service key bypasses row level security: keep it
 * out of the repository and off the host.
 *
 * Each JSON file is one page:
 *   slug, locale, kind (country | state | city | service), title, metaTitle,
 *   metaDescription, lead, sections[{heading, paragraphs[], bullets[]?}],
 *   cards{heading, items[{title, text}]}?, presence, service? (e.g.
 *   "marketing/seo", for a service page), faqs[{q, a}]
 */
import { readFile, readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const DIR = path.join(ROOT, "content", "locations");
const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const previewDir = flag("--preview") ? args[args.indexOf("--preview") + 1] : null;

const UI = {
  en: {
    areas: "Sectors and topics",
    process: "How we work with you",
    steps: [
      ["Listen", "A free consultation about your business, your customers and what is already in place."],
      ["Plan", "A written plan: the channels, the work, the targets and what it costs."],
      ["Launch", "We build and run it, and you see the work as it goes live."],
      ["Report", "Regular reports in plain numbers, with what we change next and why."],
    ],
    groups: [
      ["Marketing", [["/marketing/seo/", "SEO"], ["/marketing/performance-marketing/", "Performance marketing"], ["/marketing/social-media/", "Social media"]]],
      ["Development", [["/development/wordpress/", "WordPress"], ["/development/shopify/", "Shopify"], ["/development/magento/", "Magento"], ["/development/custom-development/", "Custom development"], ["/development/crm-erp/", "CRM / ERP"], ["/development/mobile-apps/", "Mobile apps"]]],
      ["Media", [["/media/video-editing/", "Video editing"], ["/media/video-shoots/", "Video shoots"], ["/media/ugc-ads/", "UGC ads"], ["/media/product-shoots/", "Product shoots"], ["/media/ad-creatives/", "Ad creatives"]]],
      ["Teams", [["/staff-augmentation/", "Staff augmentation"]]],
    ],
    tools: "Free tools",
    talk: "Talk to us",
    prefix: "",
    services: "What we do for businesses here",
    faq: "Questions we are asked",
    cta: "Book a free consultation",
    audit: "Get your free SEO audit",
    more: "See the full service",
    tool: "Try the free tool",
    list: [
      ["/marketing/seo/", "SEO", "Be found in Google and in AI answers by the people already searching for what you sell."],
      ["/marketing/performance-marketing/", "Performance marketing", "Google, Meta and TikTok ads managed against the return they bring."],
      ["/marketing/social-media/", "Social media", "Content planned, produced and published, with the community looked after."],
      ["/development/wordpress/", "Web development", "WordPress, Shopify, Magento and custom builds that load fast and convert."],
      ["/media/ugc-ads/", "Video and creative", "UGC ads, shoots, editing and ad creatives made to be tested."],
      ["/staff-augmentation/", "Staff augmentation", "Marketers, designers and developers who work as part of your team."],
    ],
  },
  fr: {
    areas: "Secteurs et sujets",
    process: "Comment nous travaillons avec vous",
    steps: [
      ["Écouter", "Une consultation gratuite sur votre activité, vos clients et ce qui est déjà en place."],
      ["Planifier", "Un plan écrit : les canaux, le travail, les objectifs et le coût."],
      ["Lancer", "Nous réalisons et pilotons, et vous voyez le travail à mesure qu'il est mis en ligne."],
      ["Rendre compte", "Des rapports réguliers en chiffres clairs, avec ce que nous changeons ensuite et pourquoi."],
    ],
    groups: [
      ["Marketing", [["/marketing/seo/", "SEO"], ["/marketing/performance-marketing/", "Marketing de performance"], ["/marketing/social-media/", "Réseaux sociaux"]]],
      ["Développement", [["/development/wordpress/", "WordPress"], ["/development/shopify/", "Shopify"], ["/development/magento/", "Magento"], ["/development/custom-development/", "Développement sur mesure"], ["/development/crm-erp/", "CRM / ERP"], ["/development/mobile-apps/", "Applications mobiles"]]],
      ["Média", [["/media/video-editing/", "Montage vidéo"], ["/media/video-shoots/", "Tournages vidéo"], ["/media/ugc-ads/", "Publicités UGC"], ["/media/product-shoots/", "Shootings produit"], ["/media/ad-creatives/", "Créations publicitaires"]]],
      ["Équipes", [["/staff-augmentation/", "Renfort d'équipes"]]],
    ],
    tools: "Outils gratuits",
    talk: "Parlons-en",
    prefix: "/fr",
    services: "Ce que nous faisons pour les entreprises d'ici",
    faq: "Les questions que l'on nous pose",
    cta: "Réserver une consultation gratuite",
    audit: "Obtenir votre audit SEO gratuit",
    more: "Voir le service complet",
    tool: "Essayer l'outil gratuit",
    list: [
      ["/marketing/seo/", "SEO", "Être trouvé dans Google et dans les réponses des IA par ceux qui cherchent déjà ce que vous vendez."],
      ["/marketing/performance-marketing/", "Publicité à la performance", "Des campagnes Google, Meta et TikTok pilotées selon ce qu'elles rapportent."],
      ["/marketing/social-media/", "Réseaux sociaux", "Un contenu planifié, produit et publié, et une communauté animée."],
      ["/development/wordpress/", "Développement web", "Des sites WordPress, Shopify, Magento et sur mesure, rapides et efficaces."],
      ["/media/ugc-ads/", "Vidéo et création", "Publicités UGC, tournages, montage et visuels publicitaires conçus pour être testés."],
      ["/staff-augmentation/", "Renfort d'équipe", "Des marketeurs, designers et développeurs intégrés à votre équipe."],
    ],
  },
  ar: {
    areas: "القطاعات والموضوعات",
    process: "كيف نعمل معك",
    steps: [
      ["نستمع", "استشارة مجانية عن نشاطك وعملائك وما هو قائم لديك."],
      ["نخطط", "خطة مكتوبة: القنوات والعمل والأهداف والتكلفة."],
      ["ننفذ", "نبني وندير، وترى العمل فور نشره."],
      ["نقدّم التقارير", "تقارير منتظمة بأرقام واضحة، مع ما سنغيّره بعد ذلك ولماذا."],
    ],
    groups: [
      ["التسويق", [["/marketing/seo/", "تحسين محركات البحث"], ["/marketing/performance-marketing/", "التسويق الأدائي"], ["/marketing/social-media/", "وسائل التواصل الاجتماعي"]]],
      ["التطوير", [["/development/wordpress/", "WordPress"], ["/development/shopify/", "Shopify"], ["/development/magento/", "Magento"], ["/development/custom-development/", "التطوير المخصص"], ["/development/crm-erp/", "CRM / ERP"], ["/development/mobile-apps/", "تطبيقات الجوال"]]],
      ["الإعلام", [["/media/video-editing/", "مونتاج الفيديو"], ["/media/video-shoots/", "التصوير المرئي"], ["/media/ugc-ads/", "إعلانات UGC"], ["/media/product-shoots/", "تصوير المنتجات"], ["/media/ad-creatives/", "التصاميم الإعلانية"]]],
      ["الفرق", [["/staff-augmentation/", "تعزيز فرق العمل"]]],
    ],
    tools: "أدوات مجانية",
    talk: "تحدث إلينا",
    prefix: "/ar",
    services: "ما نقدمه للشركات هنا",
    faq: "أسئلة تُطرح علينا",
    cta: "احجز استشارة مجانية",
    audit: "احصل على تدقيق السيو المجاني",
    more: "اطّلع على الخدمة كاملة",
    tool: "جرّب الأداة المجانية",
    list: [
      ["/marketing/seo/", "تحسين محركات البحث", "أن يجدك في جوجل وفي إجابات الذكاء الاصطناعي من يبحثون فعلاً عما تبيعه."],
      ["/marketing/performance-marketing/", "التسويق بالأداء", "حملات جوجل وميتا وتيك توك تُدار وفق العائد الذي تحققه."],
      ["/marketing/social-media/", "وسائل التواصل الاجتماعي", "محتوى يُخطط ويُنتج ويُنشر، مع إدارة التفاعل مع الجمهور."],
      ["/development/wordpress/", "تطوير المواقع", "مواقع ووردبريس وشوبيفاي وماجنتو ومواقع مخصصة، سريعة وتحقق المبيعات."],
      ["/media/ugc-ads/", "الفيديو والتصاميم", "إعلانات UGC وتصوير ومونتاج وتصاميم إعلانية معدّة للاختبار."],
      ["/staff-augmentation/", "تعزيز فرق العمل", "مسوقون ومصممون ومطورون يعملون كجزء من فريقك."],
    ],
  },
};

/** The free tool that goes with each service, for service pages. */
const TOOL = {
  "marketing/seo": "seo-audit",
  "marketing/performance-marketing": "roas-calculator",
  "marketing/social-media": "social-media-calendar-generator",
  "development/wordpress": "wordpress-security-checker",
  "development/shopify": "shopify-profit-calculator",
  "development/magento": "ecommerce-platform-quiz",
  "development/custom-development": "project-brief-generator",
  "development/crm-erp": "manual-work-cost-calculator",
  "development/mobile-apps": "app-platform-quiz",
  "media/video-editing": "aspect-ratio-calculator",
  "media/video-shoots": "video-script-timer",
  "media/ugc-ads": "ugc-brief-generator",
  "media/product-shoots": "product-shot-list-generator",
  "media/ad-creatives": "ab-test-calculator",
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

async function loadEnv() {
  try {
    const text = await readFile(path.join(ROOT, ".env.local"), "utf8");
    for (const line of text.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/i);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
    }
  } catch {
    /* no .env.local */
  }
}

async function files(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await files(full)));
    else if (entry.name.endsWith(".json")) out.push(full);
  }
  return out.sort();
}

function problems(p, file) {
  const bad = [];
  const need = (ok, msg) => ok || bad.push(msg);
  need(/^[a-z0-9-]+(\/[a-z0-9-]+)*$/.test(p.slug ?? ""), "slug must be lower-case words separated by / and -");
  need(["en", "fr", "ar"].includes(p.locale), "locale must be en, fr or ar");
  need(["country", "state", "city", "service"].includes(p.kind), "kind must be country, state, city or service");
  need(p.title && p.title.length <= 70, "title missing or over 70 characters");
  need(p.metaTitle && p.metaTitle.length <= 62, `metaTitle missing or over 62 characters (${p.metaTitle?.length})`);
  need(p.metaDescription && p.metaDescription.length <= 165, `metaDescription missing or over 165 characters (${p.metaDescription?.length})`);
  need(p.lead && p.lead.length > 120, "lead missing or too short");
  need(Array.isArray(p.sections) && p.sections.length >= 3, "at least 3 sections");
  for (const s of p.sections ?? []) need(s.heading && s.paragraphs?.length, `section "${s.heading}" needs a heading and paragraphs`);
  need(Array.isArray(p.faqs) && p.faqs.length >= 4, "at least 4 faqs");
  need(p.presence, "presence sentence missing");
  if (p.kind === "service") need(TOOL[p.service], `service must be one of ${Object.keys(TOOL).join(", ")}`);
  const words = JSON.stringify([p.lead, p.sections, p.cards, p.faqs]).split(/\s+/).length;
  need(words >= 450, `only ${words} words; aim for 600 or more`);
  return bad.map((b) => `${path.relative(ROOT, file)}: ${b}`);
}

function render(p) {
  const t = UI[p.locale];
  const link = (href) => `${t.prefix}${href}`;
  const h = [];
  const reveal = (i = 0) => `data-reveal="up"${i ? ` data-reveal-delay="${Math.min(i, 5) * 80}"` : ""}`;

  // Opening: the answer first, then the sectors or topics the page covers as chips.
  h.push(`<p class="lead" data-reveal="up">${esc(p.lead)}</p>`);
  if (p.cards?.items?.length) h.push(`<div class="badges" data-reveal="fade">${p.cards.items.map((c) => `<span class="badge">${esc(c.title)}</span>`).join("")}</div>`);

  // Sections: a section with a checklist sits beside it on wide screens; all animate in.
  p.sections.forEach((s, i) => {
    const text = `<h2>${esc(s.heading)}</h2>${s.paragraphs.map((x) => `<p>${esc(x)}</p>`).join("")}`;
    if (s.bullets?.length) {
      const list = `<div class="card"><ul class="checklist">${s.bullets.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>`;
      h.push(`<div class="split" data-reveal="${i % 2 ? "left" : "right"}"><div>${text}</div>${list}</div>`);
    } else {
      h.push(`<div data-reveal="up">${text}</div>`);
    }
  });

  if (p.cards?.items?.length) {
    h.push(`<h2 data-reveal="up">${esc(p.cards.heading)}</h2>`);
    h.push(`<div class="grid-3">${p.cards.items.map((c, i) => `<div class="card" ${reveal(i)}><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p></div>`).join("")}</div>`);
  }

  h.push(`<h2 data-reveal="up">${t.process}</h2>`);
  h.push(`<ol class="steps">${t.steps.map(([name, text], i) => `<li ${reveal(i)}><h3>${name}</h3><p>${text}</p></li>`).join("")}</ol>`);

  // Presence and the next step, in a band.
  const actions =
    p.kind === "service"
      ? `<a class="btn" href="${link("/contact/")}">${t.cta}</a><a class="btn-outline" href="${link(`/${p.service}/`)}">${t.more}</a><a class="btn-outline" href="${link(`/tools/${TOOL[p.service]}/`)}">${t.tool}</a>`
      : `<a class="btn" href="${link("/contact/")}">${t.cta}</a><a class="btn-outline" href="${link("/tools/seo-audit/")}">${t.audit}</a>`;
  h.push(`<section class="band light" data-reveal="zoom"><p class="kicker">${t.talk}</p><p class="lead">${esc(p.presence)}</p><div class="actions">${actions}</div></section>`);

  // Every service, in tabs by group.
  h.push(`<h2 data-reveal="up">${t.services}</h2>`);
  const tabs = t.groups.map(([name], i) => `<button data-tab="g${i}">${name}</button>`).join("");
  const panels = t.groups
    .map(([, items], i) => `<div data-panel="g${i}"><div class="grid-3">${items.map(([href, name]) => `<a class="card" href="${link(href)}"><h3>${name}</h3></a>`).join("")}</div></div>`)
    .join("");
  h.push(`<div data-tabs data-reveal="up"><div class="tab-list">${tabs}<a class="btn-outline" href="${link("/tools/")}">${t.tools}</a></div>${panels}</div>`);

  h.push(`<h2 data-reveal="up">${t.faq}</h2>`);
  for (const f of p.faqs) h.push(`<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`);
  return h.join("\n");
}

const pages = [];
const bad = [];
const seen = new Set();
for (const file of await files(DIR)) {
  const p = JSON.parse(await readFile(file, "utf8"));
  bad.push(...problems(p, file));
  const key = `${p.locale}/${p.slug}`;
  if (seen.has(key)) bad.push(`${path.relative(ROOT, file)}: duplicate page ${key}`);
  seen.add(key);
  pages.push(p);
}
if (bad.length) {
  console.error(bad.join("\n"));
  process.exit(1);
}
console.log(`${pages.length} pages valid.`);
if (flag("--check")) process.exit(0);

const rows = pages.map((p) => ({ slug: p.slug, locale: p.locale, title: p.title, html: render(p), meta_title: p.metaTitle, meta_description: p.metaDescription }));

if (previewDir) {
  await mkdir(previewDir, { recursive: true });
  for (const r of rows) await writeFile(path.join(previewDir, `${r.locale}-${r.slug.replaceAll("/", "_")}.html`), r.html);
  console.log(`HTML written to ${previewDir}`);
  process.exit(0);
}

await loadEnv();
const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!base || !key) {
  console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY first.");
  process.exit(1);
}
const headers = { apikey: key, authorization: `Bearer ${key}`, "content-type": "application/json" };
const api = `${base}/rest/v1/site_pages`;

const existing = await (await fetch(`${api}?select=slug,locale`, { headers })).json();
if (!Array.isArray(existing)) {
  console.error("Could not read site_pages:", existing);
  process.exit(1);
}
const have = new Set(existing.map((r) => `${r.locale}/${r.slug}`));
const fresh = rows.filter((r) => !have.has(`${r.locale}/${r.slug}`));
const known = rows.filter((r) => have.has(`${r.locale}/${r.slug}`));

if (fresh.length) {
  const res = await fetch(api, { method: "POST", headers: { ...headers, prefer: "return=minimal" }, body: JSON.stringify(fresh.map((r) => ({ ...r, published: false }))) });
  if (!res.ok) {
    console.error("Insert failed:", res.status, await res.text());
    process.exit(1);
  }
}
console.log(`${fresh.length} new draft pages added.`);

if (flag("--update")) {
  for (const r of known) {
    const res = await fetch(`${api}?slug=eq.${encodeURIComponent(r.slug)}&locale=eq.${r.locale}`, {
      method: "PATCH",
      headers: { ...headers, prefer: "return=minimal" },
      body: JSON.stringify({ title: r.title, html: r.html, meta_title: r.meta_title, meta_description: r.meta_description }),
    });
    if (!res.ok) console.error(`Update failed for ${r.locale}/${r.slug}:`, res.status, await res.text());
  }
  console.log(`${known.length} existing pages updated (published state untouched).`);
} else if (known.length) {
  console.log(`${known.length} pages already exist and were left alone (use --update to rewrite their text).`);
}
