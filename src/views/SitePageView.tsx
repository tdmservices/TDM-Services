import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/types";
import { href } from "@/lib/i18n";
import { cleanHtml } from "@/lib/html";
import { localizedMetadata } from "@/lib/meta";
import { getSitePage, getSitePageLocales } from "@/content/db";
import { ui } from "@/content/ui";
import { Breadcrumbs, CtaBand, PageHero } from "@/components/Sections";
import { HtmlContent } from "@/components/HtmlContent";

/**
 * A page published from the admin as HTML.
 *
 * The site supplies the header, footer, breadcrumbs and closing call to action;
 * the pasted HTML is everything in between. If it brings its own <h1> it is
 * shown as written, otherwise the page title is set as the heading above it.
 */

/** Decoded path segments joined back into the slug the admin stored. */
const normalize = (slug: string) =>
  slug
    .split("/")
    .map((part) => {
      try {
        return decodeURIComponent(part);
      } catch {
        return part;
      }
    })
    .join("/");

export async function sitePageMetadata(locale: Locale, rawSlug: string): Promise<Metadata> {
  const slug = normalize(rawSlug);
  const page = await getSitePage(locale, slug);
  if (!page) return {};
  return localizedMetadata(locale, `/${page.slug}/`, page.metaTitle, page.metaDescription, {
    available: await getSitePageLocales(page.slug),
  });
}

export async function SitePageView({ locale, slug: rawSlug }: { locale: Locale; slug: string }) {
  const slug = normalize(rawSlug);
  const page = await getSitePage(locale, slug);
  if (!page) notFound();

  const t = ui[locale];
  const content = cleanHtml(page.html);

  // Breadcrumbs follow the path, linking each level that is itself a page.
  const parts = page.slug.split("/");
  const crumbs = [{ label: t.home, href: href(locale, "/") }];
  for (let i = 0; i < parts.length - 1; i++) {
    const parent = parts.slice(0, i + 1).join("/");
    const parentPage = await getSitePage(locale, parent);
    if (parentPage) crumbs.push({ label: parentPage.title, href: href(locale, `/${parent}/`) });
  }
  crumbs.push({ label: page.title, href: href(locale, `/${page.slug}/`) });

  return content.hasH1 ? (
    <>
      {/* The header is transparent with white text, made to sit on a dark hero.
          This strip gives it that ground when the page opens on light content. */}
      <div aria-hidden className="h-20 bg-forest md:h-24" />
      <Breadcrumbs items={crumbs} />
      <section className="mx-auto max-w-7xl px-4 pb-14 pt-6 sm:px-6">
        <HtmlContent content={content} />
      </section>
      <CtaBand locale={locale} />
    </>
  ) : (
    <>
      <PageHero kicker={t.services} headline={page.title} dark />
      <Breadcrumbs items={crumbs} />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <HtmlContent content={content} />
      </section>
      <CtaBand locale={locale} />
    </>
  );
}
