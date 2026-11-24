import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/types";
import { href, isRtl } from "@/lib/i18n";
import { cleanHtml } from "@/lib/html";
import { localizedMetadata } from "@/lib/meta";
import Link from "next/link";
import { getSitePage, getSitePageChildren, getSitePageLocales } from "@/content/db";
import { JsonLd } from "@/components/JsonLd";
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

  // Pages published one level below this one are linked automatically, so a
  // page never has to link to a child that is still a draft.
  const children = await getSitePageChildren(locale, page.slug);
  const below = children.length > 0 && (
    <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6">
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {children.map((c) => (
          <li key={c.slug}>
            <Link
              href={href(locale, `/${c.slug}/`)}
              className="flex items-center justify-between gap-3 rounded-2xl border border-mint bg-white px-5 py-4 font-semibold text-forest transition-colors hover:border-fern hover:text-fern"
            >
              <span>{c.title}</span>
              <span aria-hidden>{isRtl(locale) ? "←" : "→"}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );

  // Questions written as <details><summary> blocks also go out as FAQ structured data.
  const text = (x: string) => x.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
  const faqs = [...page.html.matchAll(/<details[^>]*>\s*<summary[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/gi)]
    .map((m) => ({ q: text(m[1]), a: text(m[2]) }))
    .filter((f) => f.q && f.a);
  const faqLd = faqs.length > 0 && (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }}
    />
  );

  return content.hasH1 ? (
    <>
      {faqLd}
      {/* The header is transparent with white text, made to sit on a dark hero.
          This strip gives it that ground when the page opens on light content. */}
      <div aria-hidden className="h-20 bg-forest md:h-24" />
      <Breadcrumbs items={crumbs} />
      <section className="mx-auto max-w-7xl px-4 pb-14 pt-6 sm:px-6">
        <HtmlContent content={content} />
      </section>
      {below}
      <CtaBand locale={locale} />
    </>
  ) : (
    <>
      {faqLd}
      <PageHero kicker={t.services} headline={page.title} dark />
      <Breadcrumbs items={crumbs} />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <HtmlContent content={content} />
      </section>
      {below}
      <CtaBand locale={locale} />
    </>
  );
}
