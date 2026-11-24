import type { Metadata } from "next";
import type { Locale } from "./types";
import { href, languageAlternates, locales } from "./i18n";
import { site } from "./site";
import { getPageMeta } from "@/content/db";

const OG_LOCALE: Record<Locale, string> = { en: "en_US", fr: "fr_FR", ar: "ar_AE" };

/** The share card used wherever a page has no artwork of its own. */
export const SHARE_IMAGE = { url: "/og.png", width: 1200, height: 630, alt: site.name };

/**
 * Metadata for a localized page: title, description, canonical, hreflang, and
 * the Open Graph / Twitter tags that decide how a shared link looks.
 *
 * A title or description saved in the admin's SEO tab for this path and
 * language replaces the built-in one.
 *
 * `available` lists the languages the page actually exists in. Most pages exist
 * in all three; blog posts and case studies are written per language, and
 * pointing hreflang at a translation that was never written sends Google to a
 * 404.
 */
export async function localizedMetadata(
  locale: Locale,
  path: string,
  builtInTitle: string,
  builtInDescription: string,
  opts: { available?: Locale[]; article?: { publishedTime: string } } = {},
): Promise<Metadata> {
  const override = await getPageMeta(locale, path);
  const title = override.title ?? builtInTitle;
  const description = override.description ?? builtInDescription;
  const url = href(locale, path);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path, opts.available ?? locales),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: OG_LOCALE[locale],
      images: [SHARE_IMAGE],
      ...(opts.article
        ? { type: "article" as const, publishedTime: opts.article.publishedTime }
        : { type: "website" as const }),
    },
    twitter: { card: "summary_large_image", title, description, images: [SHARE_IMAGE.url] },
  };
}
