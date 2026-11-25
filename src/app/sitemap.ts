import { PLAY_SLUGS } from "@/content/play";
import { AUTHOR_SLUGS } from "@/content/authors";
import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { href, locales } from "@/lib/i18n";
import { sectors } from "@/content/en/sectors";
import { allServices } from "@/content/en/services";
import { getBlogPosts, getCaseStudies, getSitePages } from "@/content/db";
import { offices } from "@/content/en/locations";
import { ALL_TOOL_SLUGS as TOOL_SLUGS } from "@/content/all-tools";

// Posts and case studies are published from the admin without a deploy, so the
// sitemap has to be rebuilt on a timer rather than frozen at build time.
export const revalidate = 3600;

type Entry = MetadataRoute.Sitemap[number];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Pages that exist in every language at the same path.
  const shared: { path: string; priority: number; changeFrequency: Entry["changeFrequency"] }[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    ...["/about/", "/contact/", "/clients/", "/portfolio/", "/case-studies/", "/locations/", "/blog/", "/tools/", "/play/", ...PLAY_SLUGS.map((x) => `/play/${x}/`)].map(
      (path) => ({ path, priority: 0.8, changeFrequency: "monthly" as const }),
    ),
    ...sectors.map((s) => ({ path: `/${s.slug}/`, priority: 0.9, changeFrequency: "monthly" as const })),
    ...allServices.map((sv) => ({
      path: `/${sv.sector}/${sv.slug}/`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
    ...TOOL_SLUGS.map((slug) => ({ path: `/tools/${slug}/`, priority: 0.8, changeFrequency: "monthly" as const })),
    ...offices.map((o) => ({ path: `/locations/${o.slug}/`, priority: 0.7, changeFrequency: "yearly" as const })),
  ];

  const urls: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    // English is the primary site; translations rank a notch below it.
    const weight = locale === "en" ? 1 : 0.9;

    for (const p of shared) {
      urls.push({
        url: `${site.url}${href(locale, p.path)}`,
        changeFrequency: p.changeFrequency,
        priority: p.priority * weight,
      });
    }

    // Written per language: list only what exists in this one, so the sitemap
    // never advertises a translation that would 404.
    for (const cs of await getCaseStudies(locale)) {
      urls.push({
        url: `${site.url}${href(locale, `/case-studies/${cs.slug}/`)}`,
        changeFrequency: "yearly",
        priority: 0.7 * weight,
      });
    }
    for (const post of await getBlogPosts(locale)) {
      urls.push({
        url: `${site.url}${href(locale, `/blog/${post.slug}/`)}`,
        lastModified: post.date,
        changeFrequency: "yearly",
        priority: 0.6 * weight,
      });
    }
    // Authors with at least one post in this language; an empty author page is not worth indexing.
    const credited = new Set((await getBlogPosts(locale)).map((post) => post.author));
    for (const slug of AUTHOR_SLUGS.filter((x) => credited.has(x))) {
      urls.push({ url: `${site.url}${href(locale, `/blog/author/${slug}/`)}`, changeFrequency: "monthly", priority: 0.4 * weight });
    }
    // Pages published from the admin as HTML.
    for (const page of await getSitePages(locale)) {
      urls.push({
        url: `${site.url}${href(locale, `/${page.slug}/`)}`,
        lastModified: page.updatedAt,
        changeFrequency: "monthly",
        priority: 0.6 * weight,
      });
    }
  }

  // The legal pages are English only.
  for (const path of ["/terms-and-conditions/", "/privacy-policy/", "/legal-notice/"]) {
    urls.push({ url: `${site.url}${path}`, changeFrequency: "yearly", priority: 0.3 });
  }

  return urls;
}
