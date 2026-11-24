import { cache } from "react";
import type { BlogPost, CaseStudy, Faq, Locale, SectorSlug, SitePage } from "@/lib/types";
import { publicDb } from "@/lib/supabase";

/**
 * Blog posts and case studies, read from Postgres.
 *
 * These used to be arrays on the content bundle, which is why every caller
 * still gets the same BlogPost and CaseStudy shapes — the mapping from
 * snake_case columns happens here so nothing downstream had to change beyond
 * awaiting the call.
 *
 * Pages that use these set a `revalidate`, so a reader is served a cached
 * render rather than a database round trip, and a newly published post appears
 * within that window without a deploy.
 */

type BlogRow = {
  slug: string;
  sort_order: number;
  title: string;
  published_on: string;
  category: string;
  excerpt: string;
  body: string;
  meta_title: string;
  meta_description: string;
  faqs: { q: string; a: string }[] | null;
  locale: string;
  html: string | null;
};

type CaseRow = {
  slug: string;
  locale: string;
  sort_order: number;
  sector: string;
  anonymous: boolean;
  client: string | null;
  public_name: string;
  industry: string;
  country: string | null;
  timeline: string | null;
  services: string[] | null;
  summary: string;
  challenge: string;
  approach: string[] | null;
  results: { value: string; label: string }[] | null;
  testimonial: { quote: string; author: string } | null;
  meta_title: string;
  meta_description: string;
  html: string | null;
};

/** The renderer wants blocks; the column holds one markdown string. Blank lines
 *  separate them, which round-trips because a list keeps single newlines
 *  between its items. */
const toBlocks = (body: string) =>
  body
    .split(/\r?\n\s*\r?\n/)
    .map((b) => b.trim())
    .filter(Boolean);

const toPost = (r: BlogRow): BlogPost => ({
  slug: r.slug,
  title: r.title,
  metaTitle: r.meta_title,
  metaDescription: r.meta_description,
  date: r.published_on,
  category: r.category,
  excerpt: r.excerpt,
  body: toBlocks(r.body),
  ...(r.html?.trim() ? { html: r.html } : {}),
  ...(r.faqs?.length ? { faqs: r.faqs } : {}),
});

const toCase = (r: CaseRow): CaseStudy => ({
  slug: r.slug,
  client: r.client ?? "",
  anonymous: r.anonymous,
  publicName: r.public_name,
  industry: r.industry,
  ...(r.country ? { country: r.country } : {}),
  sector: r.sector as SectorSlug,
  services: r.services ?? [],
  ...(r.timeline ? { timeline: r.timeline } : {}),
  summary: r.summary,
  challenge: r.challenge,
  approach: r.approach ?? [],
  results: r.results ?? [],
  ...(r.testimonial ? { testimonial: r.testimonial } : {}),
  metaTitle: r.meta_title,
  metaDescription: r.meta_description,
  ...(r.html?.trim() ? { html: r.html } : {}),
});

/**
 * A read failure returns an empty list rather than throwing.
 *
 * The alternative is a 500 on the home page because the database blinked. An
 * empty section is a bad day; a dead site is a worse one. The error is logged
 * so it shows up in the Vercel logs rather than passing silently.
 */
async function safely<T>(
  what: string,
  run: () => PromiseLike<{ data: T[] | null; error: { message: string } | null }>,
) {
  try {
    const { data, error } = await run();
    if (error) {
      console.error(`[content] ${what} failed: ${error.message}`);
      return [];
    }
    return data ?? [];
  } catch (err) {
    console.error(`[content] ${what} threw: ${(err as Error).message}`);
    return [];
  }
}

/**
 * Postgres is the only source of content.
 *
 * There used to be a fallback here: if a table came back empty, the JSON under
 * /content was served instead. It existed to cover the gap between migrating
 * the content and loading the rows, and it did that job.
 *
 * It is gone because a fallback that cannot be distinguished from success is
 * worse than none. The first deploy after the migration had no database
 * credentials, so every read failed, the fallback fired, and the site rendered
 * perfectly from files that were months from going stale — nothing on the page
 * or in the logs said the admin had stopped reaching anybody. An empty section
 * is a symptom you can see and act on.
 *
 * The JSON under /content is kept as the record of what was migrated, and as
 * the input to scripts/seed-content.mjs. Nothing reads it at request time.
 */

/**
 * Each language is its own site.
 *
 * A post exists in a language or it does not: there is no borrowing across
 * languages. Writing an article in English publishes it on the English site
 * alone, and deleting it there removes it from the English site alone, leaving
 * any French or Arabic versions untouched on theirs.
 *
 * The alternative — falling back to whichever translation exists — meant a
 * French reader could be shown English prose, and deleting the English copy
 * appeared to do nothing because another language stepped into its place.
 */
export async function getBlogPosts(locale: Locale = "en"): Promise<BlogPost[]> {
  const rows = await safely<BlogRow>(`blog_posts(${locale})`, () =>
    publicDb().from("blog_posts").select("*").eq("locale", locale).order("sort_order", { ascending: true }),
  );
  return rows.map(toPost);
}

export async function getBlogPost(locale: Locale, slug: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts(locale);
  return posts.find((p) => p.slug === slug);
}

/** Which languages a post exists in — for hreflang and the sitemap. */
export async function getBlogLocales(slug: string): Promise<Locale[]> {
  const rows = await safely(`blog_posts locales(${slug})`, () =>
    publicDb().from("blog_posts").select("locale").eq("slug", slug),
  );
  return (rows as { locale: string }[]).map((r) => r.locale as Locale);
}

/** Which languages a case study exists in — for hreflang and the sitemap. */
export async function getCaseStudyLocales(slug: string): Promise<Locale[]> {
  const rows = await safely(`case_studies locales(${slug})`, () =>
    publicDb().from("case_studies").select("locale").eq("slug", slug),
  );
  return (rows as { locale: string }[]).map((r) => r.locale as Locale);
}

export async function getCaseStudies(locale: Locale): Promise<CaseStudy[]> {
  const rows = await safely<CaseRow>(`case_studies(${locale})`, () =>
    publicDb().from("case_studies").select("*").eq("locale", locale).order("sort_order", { ascending: true }),
  );
  return rows.map(toCase);
}

export async function getCaseStudy(locale: Locale, slug: string): Promise<CaseStudy | undefined> {
  const all = await getCaseStudies(locale);
  return all.find((c) => c.slug === slug);
}

/**
 * The FAQ list a page should show, or null to keep the one in the codebase.
 *
 * Null and an empty array mean different things here: null is "nothing has been
 * saved for this page, use the built-in copy", while [] is someone deliberately
 * clearing the block. Collapsing the two would make removing every question
 * impossible.
 */
export async function getPageFaqs(page: string, locale: Locale): Promise<Faq[] | null> {
  const rows = await safely<{ faqs: Faq[] | null }>(`page_faqs(${page}/${locale})`, () =>
    publicDb().from("page_faqs").select("faqs").eq("page", page).eq("locale", locale).limit(1),
  );
  return rows.length ? (rows[0].faqs ?? []) : null;
}

/**
 * The case studies a page should feature, in order, or null to fall back to
 * "the first few tagged with this sector".
 */
export async function getPageCases(page: string): Promise<string[] | null> {
  const rows = await safely<{ slugs: string[] | null }>(`page_cases(${page})`, () =>
    publicDb().from("page_cases").select("slugs").eq("page", page).limit(1),
  );
  if (!rows.length) return null;
  const slugs = rows[0].slugs ?? [];
  // An empty pick is indistinguishable from never having chosen, so treat it as
  // the default rather than as "show nothing" — a sector page with a silently
  // missing proof section is a worse outcome than one showing the automatic set.
  return slugs.length ? slugs : null;
}

// --- pages published from the admin -----------------------------------------

type SitePageRow = {
  slug: string;
  title: string;
  html: string;
  meta_title: string;
  meta_description: string;
  updated_at: string;
};

const toSitePage = (r: SitePageRow): SitePage => ({
  slug: r.slug,
  title: r.title,
  html: r.html,
  metaTitle: r.meta_title || r.title,
  metaDescription: r.meta_description,
  updatedAt: r.updated_at,
});

/** A published HTML page, by its path ("usa/florida"). Drafts are not readable. */
export const getSitePage = cache(async (locale: Locale, slug: string): Promise<SitePage | undefined> => {
  const rows = await safely(`site_pages(${locale}/${slug})`, () =>
    publicDb().from("site_pages").select("*").eq("locale", locale).eq("slug", slug).eq("published", true).limit(1),
  );
  return (rows as SitePageRow[]).map(toSitePage)[0];
});

/** Every published HTML page in a language — for the sitemap. */
export async function getSitePages(locale: Locale): Promise<Pick<SitePage, "slug" | "updatedAt">[]> {
  const rows = await safely(`site_pages(${locale})`, () =>
    publicDb().from("site_pages").select("slug, updated_at").eq("locale", locale).eq("published", true),
  );
  return (rows as { slug: string; updated_at: string }[]).map((r) => ({ slug: r.slug, updatedAt: r.updated_at }));
}

/** Published pages one level below a page ("usa/texas" under "usa") — for automatic links to them. */
export const getSitePageChildren = cache(async (locale: Locale, slug: string): Promise<{ slug: string; title: string }[]> => {
  const rows = await safely(`site_pages children(${locale}/${slug})`, () =>
    publicDb().from("site_pages").select("slug, title").eq("locale", locale).eq("published", true).like("slug", `${slug.replace(/[%_]/g, "")}/%`).order("title"),
  );
  const depth = slug.split("/").length + 1;
  return (rows as { slug: string; title: string }[]).filter((r) => r.slug.split("/").length === depth);
});

/** Which languages a published HTML page exists in — for hreflang. */
export async function getSitePageLocales(slug: string): Promise<Locale[]> {
  const rows = await safely(`site_pages locales(${slug})`, () =>
    publicDb().from("site_pages").select("locale").eq("slug", slug).eq("published", true),
  );
  return (rows as { locale: string }[]).map((r) => r.locale as Locale);
}

// --- SEO overrides -----------------------------------------------------------

type MetaRow = { path: string; locale: string; meta_title: string | null; meta_description: string | null };

/** All overrides at once: there are few of them, and every page needs to check. */
const allPageMeta = cache(async (): Promise<MetaRow[]> => {
  const rows = await safely("page_meta", () => publicDb().from("page_meta").select("path, locale, meta_title, meta_description"));
  return rows as MetaRow[];
});

/** The title and description an editor has set for a built-in page, if any. */
export async function getPageMeta(locale: Locale, path: string) {
  const row = (await allPageMeta()).find((r) => r.locale === locale && r.path === path);
  return {
    title: row?.meta_title?.trim() || undefined,
    description: row?.meta_description?.trim() || undefined,
  };
}
