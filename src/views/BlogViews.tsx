import Link from "next/link";
import { notFound } from "next/navigation";
import { asset } from "@/lib/asset-manifest";
import type { BlogPost, Locale } from "@/lib/types";
import { href, isRtl } from "@/lib/i18n";
import { site } from "@/lib/site";
import { getBlogPost, getBlogPosts } from "@/content/db";
import { ui } from "@/content/ui";
import { JsonLd } from "@/components/JsonLd";
import {
  Breadcrumbs,
  CtaBand,
  FaqSection,
  Kicker,
  PageHero,
  ShatterDefs,
  ShatterSurface,
} from "@/components/Sections";
import { Reveal } from "@/components/motion/Reveal";
import { ConsultationLink } from "@/components/ConsultationLink";
import { ReadingProgress } from "@/components/motion/ReadingProgress";

/**
 * The blog, in all three languages.
 *
 * These used to be two page files under (en) with their copy written inline,
 * which is why the blog existed in English only. Everything language-specific
 * now comes from ui[locale].blogPage, and each language lists only the posts
 * written in it: a language with nothing written shows the empty state rather
 * than borrowing another language's articles.
 */

const DATE_LOCALE: Record<Locale, string> = { en: "en-US", fr: "fr-FR", ar: "ar-AE" };

const readMinutes = (p: BlogPost) => Math.max(2, Math.round(p.body.join(" ").split(/\s+/).length / 200));

const categoryColor: Record<string, string> = {
  Marketing: "bg-fern/10 text-fern",
  Media: "bg-amber/10 text-amber",
  Development: "bg-plum/10 text-plum",
  "Staff Augmentation": "bg-forest/10 text-forest",
};

// --- index ------------------------------------------------------------------

export async function BlogIndexView({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const b = t.blogPage;
  const posts = [...(await getBlogPosts(locale))].sort((a, b2) => b2.date.localeCompare(a.date));
  const [featured, ...rest] = posts;
  const date = (iso: string, month: "long" | "short") =>
    new Date(iso).toLocaleDateString(DATE_LOCALE[locale], { month, day: "numeric", year: "numeric" });

  return (
    <>
      <PageHero
        kicker={b.kicker}
        headline={b.headline}
        sub={b.sub}
        dark
      />
      <Breadcrumbs
        items={[
          { label: t.home, href: href(locale, "/") },
          { label: t.blog, href: href(locale, "/blog/") },
        ]}
      />

      <ShatterDefs />

      <section className="ribbon-bg mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {/* Featured (latest) post. Guarded because the posts come from the
            database now — if it is briefly unreachable this renders an empty
            page rather than a 500. */}
        {featured && (
          <Reveal>
            <Link
              href={href(locale, `/blog/${featured.slug}/`)}
              className="group card-lift relative block overflow-hidden rounded-3xl bg-forest p-8 text-white hover:shadow-2xl hover:shadow-forest/20 md:p-12"
            >
              <div
                aria-hidden
                className="blob pointer-events-none absolute -top-20 -end-20 h-72 w-72 rounded-full bg-fern/40 blur-3xl"
              />
              <div className="relative">
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                  <span className="rounded-full bg-amber px-3 py-1 text-white">{b.latest}</span>
                  <span className="rounded-full bg-white/10 px-3 py-1">{featured.category}</span>
                  <span className="text-white/60">
                    {date(featured.date, "long")}
                    {" · "}
                    {readMinutes(featured)} {b.minRead}
                  </span>
                </div>
                <h2 className="mt-5 max-w-3xl font-display text-2xl font-bold leading-snug md:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 max-w-2xl text-white/75">{featured.excerpt}</p>
                <p className="mt-6 font-semibold text-amber">
                  {b.readArticle} <span className="arrow-nudge">{isRtl(locale) ? "←" : "→"}</span>
                </p>
              </div>
            </Link>
          </Reveal>
        )}

        {/* Each language lists only its own posts, so a language nobody has
            written for yet is a real state rather than an error. Saying so
            beats a section heading with nothing under it. */}
        {posts.length === 0 && (
          <p className="py-20 text-center text-base text-ink/55">{b.empty}</p>
        )}

        {rest.length > 0 && (
          <Reveal>
            <div className="mt-16 text-center">
              <Kicker>{b.moreKicker}</Kicker>
              <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold text-forest md:text-4xl">{b.moreTitle}</h2>
              <div className="mx-auto mt-5 h-1 w-14 rounded-full bg-amber" />
            </div>
          </Reveal>
        )}

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={(i % 3) * 0.08}
              from={i % 3 === 0 ? "left" : i % 3 === 2 ? "right" : "snap"}
              className="h-full"
            >
              <Link
                href={href(locale, `/blog/${p.slug}/`)}
                className="group sheen card-lift relative flex h-full flex-col rounded-3xl border border-transparent p-7 transition-colors duration-300 hover:border-fern hover:shadow-2xl"
              >
                <ShatterSurface index={i} />
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <span className={`rounded-full px-3 py-1 ${categoryColor[p.category] ?? "bg-mint text-forest"}`}>
                    {p.category}
                  </span>
                  <span className="font-normal text-ink/50">
                    {readMinutes(p)} {b.minRead}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-lg font-bold leading-snug text-forest transition-colors group-hover:text-fern">
                  {p.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">{p.excerpt}</p>
                <div className="mt-5 flex items-center justify-between text-xs text-ink/50">
                  <span>{date(p.date, "short")}</span>
                  <span
                    aria-hidden
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-mint text-forest transition-all duration-300 group-hover:border-amber group-hover:bg-amber group-hover:text-white"
                  >
                    <span className="arrow-nudge leading-none">{isRtl(locale) ? "←" : "→"}</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand locale={locale} />
    </>
  );
}

// --- one post ---------------------------------------------------------------

/** Blocks keep their list items on single newlines; splitting on one recovers them. */
const NEWLINE = "\n";

/** Stable, readable anchors for the contents list to point at. */
const headingId = (text: string) =>
  text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);

/** The h2s, so the sidebar can list what the piece covers. */
function outline(body: string[]) {
  return body
    .filter((x) => x.startsWith("## "))
    .map((x) => ({ text: x.slice(3), id: headingId(x.slice(3)) }));
}

function Body({ body }: { body: string[] }) {
  // The opening paragraph is set larger — it does the work a standfirst does,
  // giving the eye somewhere to land before the body proper.
  const firstProse = body.findIndex((x) => !x.startsWith("#") && !x.startsWith("- "));

  return (
    <div className="max-w-3xl">
      {body.map((block, i) => {
        if (block.startsWith("### ")) {
          return (
            <h3
              key={i}
              id={headingId(block.slice(4))}
              className="mt-8 scroll-mt-28 font-display text-xl font-semibold text-forest"
            >
              {block.slice(4)}
            </h3>
          );
        }
        if (block.startsWith("## ")) {
          return (
            <h2
              key={i}
              id={headingId(block.slice(3))}
              className="mt-12 scroll-mt-28 border-s-4 border-amber ps-4 font-display text-2xl font-bold text-forest md:text-3xl"
            >
              {block.slice(3)}
            </h2>
          );
        }
        if (block.startsWith("- ")) {
          return (
            <ul key={i} className="mt-4 space-y-2.5 text-base leading-relaxed text-ink/85">
              {block.split(NEWLINE).map((li, j) => (
                <li key={j} className="flex items-start gap-3">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                  {li.replace(/^- /, "")}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p
            key={i}
            className={
              i === firstProse
                ? "mt-6 border-s-2 border-mint ps-5 font-display text-lg leading-relaxed text-forest md:text-xl"
                : "mt-5 text-base leading-relaxed text-ink/85"
            }
          >
            {block}
          </p>
        );
      })}
    </div>
  );
}

export async function BlogPostView({ locale, slug }: { locale: Locale; slug: string }) {
  const t = ui[locale];
  const b = t.blogPage;
  const p = await getBlogPost(locale, slug);
  if (!p) notFound();

  const minutes = readMinutes(p);
  const others = (await getBlogPosts(locale)).filter((x) => x.slug !== p.slug).slice(0, 3);
  const sections = outline(p.body);

  return (
    <>
      <ShatterDefs />
      <ReadingProgress />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: p.title,
          description: p.metaDescription,
          datePublished: p.date,
          inLanguage: locale,
          author: { "@type": "Organization", name: site.name, url: site.url },
          publisher: {
            "@type": "Organization",
            name: site.name,
            logo: { "@type": "ImageObject", url: `${site.url}${asset("branding/logo.png")}` },
          },
          mainEntityOfPage: `${site.url}${href(locale, `/blog/${p.slug}/`)}`,
        }}
      />
      {/* The facts about the article sit beside the standfirst rather than in a
          thin grey line under it. */}
      <PageHero
        kicker={p.category}
        headline={p.title}
        sub={p.excerpt}
        dark
        aside={
          <div className="glass rounded-3xl p-6 sm:p-7">
            {/* Plain rows rather than label/value pairs: "min read" is its own
                label, and the site has no localised string for "published on". */}
            <span className="inline-flex rounded-full bg-white/12 px-3 py-1 text-xs font-bold uppercase tracking-wide text-sage">
              {p.category}
            </span>
            <ul className="mt-5 space-y-3 text-sm text-white/85">
              <li className="flex items-center gap-3">
                <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                {minutes} {b.minRead}
              </li>
              <li className="flex items-center gap-3">
                <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                {new Date(p.date).toLocaleDateString(DATE_LOCALE[locale], {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </li>
              <li className="flex items-center gap-3">
                <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                {t.publishedBy}
              </li>
            </ul>
          </div>
        }
      />
      <Breadcrumbs
        items={[
          { label: t.home, href: href(locale, "/") },
          { label: t.blog, href: href(locale, "/blog/") },
          { label: p.title, href: href(locale, `/blog/${p.slug}/`) },
        ]}
      />

      {/* Two columns from lg. The article used to sit alone in a max-w-7xl
          container while its own body was capped at max-w-3xl, which left about
          500px of empty page beside every post. That space now carries the
          contents and a way to get in touch. */}
      <div className="ribbon-bg mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-14">
        <article>
          <Body body={p.body} />

          <Reveal>
            <div className="mt-14 border-t border-mint pt-10">
              <h2 className="font-display text-xl font-bold text-forest">{b.keepReading}</h2>
              <div className="mt-6 grid gap-6 md:grid-cols-3">
                {others.map((o, i) => (
                  <Reveal key={o.slug} delay={i * 0.08}>
                    <Link
                      href={href(locale, `/blog/${o.slug}/`)}
                      className="group sheen card-lift relative flex h-full flex-col rounded-3xl border border-transparent p-6 transition-colors duration-300 hover:border-fern hover:shadow-2xl"
                    >
                      <ShatterSurface index={i} />
                      <p className="text-xs font-semibold uppercase tracking-wide text-amber">{o.category}</p>
                      <h3 className="mt-2 flex-1 font-display text-base font-semibold leading-snug text-forest">
                        {o.title}
                      </h3>
                      <p className="mt-3 text-xs font-semibold text-fern">
                        {t.learnMore} <span className="arrow-nudge">{isRtl(locale) ? "←" : "→"}</span>
                      </p>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </article>

        {/* Capped to the space below the header. A sticky column taller than
            the viewport strands whatever hangs off the bottom: the contents
            list plus the card came to 660px in a 702px window, so the call to
            action sat permanently out of reach. The list scrolls inside itself
            instead, and the card stays put. */}
        <aside className="lg:sticky lg:top-28 lg:flex lg:max-h-[calc(100vh-8rem)] lg:flex-col lg:self-start">
          {sections.length > 0 && (
            <nav
              aria-label={b.onThisPage}
              className="rounded-3xl border border-mint bg-white p-6 lg:min-h-0 lg:overflow-y-auto [scrollbar-width:thin]"
            >
              <p className="kicker text-fern">{b.onThisPage}</p>
              <ol className="mt-4 space-y-2.5">
                {sections.map((sec, i) => (
                  <li key={sec.id} className="flex gap-3 text-sm leading-snug">
                    <span aria-hidden className="font-display text-xs font-bold text-mint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <a href={`#${sec.id}`} className="text-ink/70 transition-colors hover:text-fern">
                      {sec.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="relative mt-6 shrink-0 overflow-hidden rounded-3xl bg-forest p-6 text-white">
            <div
              aria-hidden
              className="blob pointer-events-none absolute -end-12 -top-12 h-40 w-40 rounded-full bg-fern/40 blur-3xl"
            />
            <p className="relative kicker text-sage">{b.ctaKicker}</p>
            <p className="relative mt-3 font-display text-lg font-bold leading-snug">{b.ctaTitle}</p>
            <p className="relative mt-2 text-sm leading-relaxed text-white/70">{b.ctaSub}</p>
            <ConsultationLink
              locale={locale}
              className="btn-fluid btn-shine relative mt-5 inline-block rounded-full bg-amber px-5 py-2.5 text-sm font-bold text-white"
            >
              {t.cta}
            </ConsultationLink>
          </div>
        </aside>
      </div>
      {p.faqs && <FaqSection faqs={p.faqs} locale={locale} />}
      <CtaBand locale={locale} />
    </>
  );
}
