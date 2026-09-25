/**
 * Loads the JSON under /content into Supabase.
 *
 *   node scripts/seed-content.mjs
 *
 * Run it once after creating the tables. It upserts on the primary key, so
 * running it again is harmless — but note that it will overwrite anything
 * edited in the admin since, because the files are the source here, not the
 * database. After the first successful seed, the database is the source of
 * truth and /content is only a record of what was migrated.
 *
 * Needs the service role key, not the anon key: seeding writes without a signed
 * in user, which the row level security policies otherwise forbid. That key
 * bypasses RLS entirely, so it belongs in .env.local and never in the browser.
 */
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const ROOT = process.cwd();

/** Minimal .env.local reader — enough for KEY=value, quoted or not. */
async function loadEnv() {
  try {
    const text = await readFile(path.join(ROOT, ".env.local"), "utf8");
    for (const line of text.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/i);
      if (!m) continue;
      const value = m[2].trim().replace(/^["']|["']$/g, "");
      if (!process.env[m[1]]) process.env[m[1]] = value;
    }
  } catch {
    /* no .env.local — rely on the real environment */
  }
}

await loadEnv();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.\n" +
      "Put both in .env.local — see supabase/README.md.",
  );
  process.exit(1);
}

const db = createClient(url, serviceKey, { auth: { persistSession: false } });

const readJsonDir = async (dir) => {
  const files = (await readdir(dir)).filter((f) => f.endsWith(".json"));
  return Promise.all(files.map(async (f) => JSON.parse(await readFile(path.join(dir, f), "utf8"))));
};

// --- blog posts -------------------------------------------------------------

// One row per language, like case studies. A language with no file for a slug
// simply has no row, and the site falls back to whichever language exists.
const blogRows = [];
for (const locale of ["en", "fr", "ar"]) {
  const dir = path.join(ROOT, "content", "blog", locale);
  for (const p of await readJsonDir(dir)) {
    blogRows.push({
      slug: p.slug,
      locale,
      sort_order: p.order ?? 99,
      title: p.title,
      published_on: p.date,
      category: p.category,
      excerpt: p.excerpt,
      body: p.body,
      meta_title: p.metaTitle,
      meta_description: p.metaDescription,
      faqs: p.faqs ?? [],
    });
  }
}

{
  const { error } = await db.from("blog_posts").upsert(blogRows, { onConflict: "slug,locale" });
  if (error) {
    console.error("blog_posts failed:", error.message);
    process.exit(1);
  }
  const byLocale = blogRows.reduce((acc, r) => ({ ...acc, [r.locale]: (acc[r.locale] ?? 0) + 1 }), {});
  console.log(`blog_posts: ${blogRows.length} rows (${JSON.stringify(byLocale)})`);
}

// --- case studies -----------------------------------------------------------

const caseRows = [];
for (const locale of ["en", "fr", "ar"]) {
  const dir = path.join(ROOT, "content", "case-studies", locale);
  for (const c of await readJsonDir(dir)) {
    caseRows.push({
      slug: c.slug,
      locale,
      sort_order: c.order ?? 99,
      sector: c.sector,
      anonymous: c.anonymous ?? true,
      client: c.client ?? null,
      public_name: c.publicName,
      industry: c.industry,
      country: c.country ?? null,
      timeline: c.timeline ?? null,
      services: c.services ?? [],
      summary: c.summary,
      challenge: c.challenge,
      approach: c.approach ?? [],
      results: c.results ?? [],
      testimonial: c.testimonial ?? null,
      meta_title: c.metaTitle,
      meta_description: c.metaDescription,
    });
  }
}

{
  const { error } = await db.from("case_studies").upsert(caseRows, { onConflict: "slug,locale" });
  if (error) {
    console.error("case_studies failed:", error.message);
    process.exit(1);
  }
  const byLocale = caseRows.reduce((acc, r) => ({ ...acc, [r.locale]: (acc[r.locale] ?? 0) + 1 }), {});
  console.log(`case_studies: ${caseRows.length} rows (${JSON.stringify(byLocale)})`);
}

// --- verify what actually landed --------------------------------------------
//
// Checks that every row sent is now present, rather than comparing table
// totals: the tables legitimately hold rows this script never sent, such as
// anything written in the admin since, and a total that merely differs is not
// a failure.

async function present(table, key, sent) {
  const { data, error } = await db.from(table).select(key.join(","));
  if (error) {
    console.error(`${table} read-back failed:`, error.message);
    process.exit(1);
  }
  const have = new Set(data.map((r) => key.map((k) => r[k]).join("|")));
  return sent.filter((r) => !have.has(key.map((k) => r[k]).join("|")));
}

const missingBlog = await present("blog_posts", ["slug", "locale"], blogRows);
const missingCases = await present("case_studies", ["slug", "locale"], caseRows);

if (missingBlog.length || missingCases.length) {
  for (const r of missingBlog) console.error(`  missing blog_posts: ${r.slug} (${r.locale})`);
  for (const r of missingCases) console.error(`  missing case_studies: ${r.slug} (${r.locale})`);
  console.error("\nSome rows did not land.");
  process.exit(1);
}

console.log(`\nAll ${blogRows.length} blog rows and ${caseRows.length} case-study rows are in the database.`);
console.log("Seed complete.");
