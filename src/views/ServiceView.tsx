import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/types";
import { href, isRtl, localePrefix } from "@/lib/i18n";
import { site } from "@/lib/site";
import { getContent } from "@/content";
import { getCaseStudies } from "@/content/db";
import { ui } from "@/content/ui";
import { JsonLd } from "@/components/JsonLd";
import {
  Breadcrumbs,
  CtaBand,
  FaqSection,
  FeatureGrid,
  Kicker,
  PageHero,
  ProcessList,
  Prose,
  ShatterDefs,
  ShatterSurface,
} from "@/components/Sections";
import { Reveal } from "@/components/motion/Reveal";

const displayName = (cs: { anonymous: boolean; publicName: string; client: string }) =>
  cs.anonymous ? cs.publicName : cs.client;

export async function ServiceView({
  locale,
  sectorSlug,
  serviceSlug,
}: {
  locale: Locale;
  sectorSlug: string;
  serviceSlug: string;
}) {
  const c = getContent(locale);
  const t = ui[locale];
  const sv = c.services.find((x) => x.sector === sectorSlug && x.slug === serviceSlug);
  const sec = c.sectors.find((x) => x.slug === sectorSlug);
  if (!sv || !sec) notFound();

  const copy = c.pages.servicePage;
  const allCases = await getCaseStudies(locale);
  const related = (sv.relatedCaseStudies ?? [])
    .map((slug) => allCases.find((cs) => cs.slug === slug))
    .filter((cs): cs is NonNullable<typeof cs> => Boolean(cs));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: sv.name,
          description: sv.metaDescription,
          provider: { "@type": "Organization", name: site.name, url: site.url },
          areaServed: ["AE", "PK", "GB", "US", "CM", "JP", "FR", "BG"],
          url: `${site.url}${localePrefix(locale)}/${sv.sector}/${sv.slug}/`,
          inLanguage: locale,
        }}
      />
      {/* The second column lists what the service actually delivers rather than
          carrying a photograph. The card artwork is 8:5 and the hero frame 3:2,
          so using it here meant cropping it, and at that resolution it did not
          hold up. A visitor scanning a service page wants the deliverables
          anyway — this answers "what do I get" before they scroll. */}
      <PageHero
        kicker={sec.name}
        headline={sv.hero.headline}
        sub={sv.hero.sub}
        dark
        aside={
          sv.features.length > 0 ? (
            <div className="glass rounded-3xl p-6 sm:p-7">
              <p className="kicker text-sage">{t.whatsIncluded}</p>
              <ul className="mt-5 space-y-3.5">
                {sv.features.slice(0, 5).map((f) => (
                  <li key={f.title} className="flex items-start gap-3 text-sm leading-snug text-white/85">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                    {f.title}
                  </li>
                ))}
              </ul>
            </div>
          ) : undefined
        }
      />
      <Breadcrumbs
        items={[
          { label: t.home, href: href(locale, "/") },
          { label: sec.name, href: href(locale, `/${sec.slug}/`) },
          { label: sv.name, href: href(locale, `/${sv.sector}/${sv.slug}/`) },
        ]}
      />

      <ShatterDefs />

      {/* Prose is capped at max-w-3xl for readability, which left the right
          half of a max-w-7xl section empty. The heading rail fills it and pins
          while the copy scrolls, the same shape the sector pages use. */}
      <section className="ribbon-bg">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,19rem)_1fr] lg:gap-16">
            <Reveal from="left" className="lg:sticky lg:top-28 lg:self-start">
              <p className="kicker flex items-center gap-2.5 text-fern">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
                </span>
                {sec.name}
              </p>
              <h2 className="mt-4 font-display text-2xl font-bold leading-snug text-forest md:text-3xl">
                {sv.name}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{sv.shortDesc}</p>
              <div className="mt-5 h-1 w-14 rounded-full bg-amber" />
            </Reveal>
            <Reveal from="right">
              <Prose paragraphs={sv.intro} />
            </Reveal>
          </div>
        </div>
      </section>

      {sv.videos && sv.videos.length > 0 && (
        <section className="ribbon-bg mx-auto max-w-7xl px-4 pb-14 sm:px-6">
          <Kicker glow>{copy.showreelKicker}</Kicker>
          <h2 className="mt-3 text-3xl font-bold text-forest">{copy.showreelTitle}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {sv.videos.map((v) => (
              <div key={v} className="aspect-video overflow-hidden rounded-2xl border border-mint bg-white">
                <iframe src={v} title={`${sv.name} showreel`} className="h-full w-full" allowFullScreen loading="lazy" />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="ribbon-bg bg-mint/50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <Reveal>
            <Kicker glow>{t.whatsIncluded}</Kicker>
            <h2 className="mt-3 text-3xl font-bold text-forest">{t.insideTheService}</h2>
          </Reveal>
          <div className="mt-8">
            <FeatureGrid features={sv.features} />
          </div>
        </div>
      </section>

      {sv.process && sv.process.length > 0 && (
        <section className="ribbon-bg mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <Reveal>
            <Kicker glow>{t.ourProcess}</Kicker>
            <h2 className="mt-3 text-3xl font-bold text-forest">{t.howWeWork}</h2>
          </Reveal>
          <div className="mt-8 max-w-3xl">
            <ProcessList steps={sv.process} />
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="ribbon-bg bg-mint/50">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
            <Reveal>
              <Kicker glow>{t.proof}</Kicker>
              <h2 className="mt-3 text-3xl font-bold text-forest">{t.relatedResults}</h2>
            </Reveal>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {related.map((cs, i) => (
                <Reveal
                  key={cs.slug}
                  delay={(i % 3) * 0.08}
                  from={i % 3 === 0 ? "left" : i % 3 === 2 ? "right" : "snap"}
                  className="h-full"
                >
                  <Link
                    href={href(locale, `/case-studies/${cs.slug}/`)}
                    className="group sheen card-lift relative block h-full rounded-3xl border border-transparent p-6 transition-colors duration-300 hover:border-fern hover:shadow-2xl"
                  >
                    <ShatterSurface index={i} />
                    <p className="text-xs font-medium uppercase tracking-wide text-ink/50">{cs.industry}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <h3 className="font-display text-lg font-semibold text-forest transition-colors group-hover:text-fern">
                        {displayName(cs)}
                      </h3>
                      <span
                        aria-hidden
                        className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border border-mint text-forest transition-all duration-300 group-hover:border-amber group-hover:bg-amber group-hover:text-white md:flex"
                      >
                        <span className="arrow-nudge text-base leading-none">{isRtl(locale) ? "←" : "→"}</span>
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink/75">{cs.summary}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <FaqSection faqs={sv.faqs} locale={locale} />
      <CtaBand locale={locale} headline={copy.ctaHeadline(sv.name)} sub={copy.ctaSub} />
    </>
  );
}
