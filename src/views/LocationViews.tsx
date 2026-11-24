import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/types";
import { href, localePrefix } from "@/lib/i18n";
import { site } from "@/lib/site";
import { officeFlag } from "@/lib/flags";
import { getContent } from "@/content";
import { ui } from "@/content/ui";
import { JsonLd } from "@/components/JsonLd";
import {
  Kicker,
  Breadcrumbs,
  CtaBand,
  FaqSection,
  PageHero,
  Prose,
  ShatterDefs,
  ShatterSurface,
} from "@/components/Sections";
import { Reveal } from "@/components/motion/Reveal";

export function LocationsIndexView({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const t = ui[locale];
  const p = c.pages.locationsPage;

  return (
    <>
      <PageHero
        kicker={p.hero.kicker}
        headline={p.hero.headline}
        sub={p.hero.sub}
        dark
      />
      <Breadcrumbs
        items={[
          { label: t.home, href: href(locale, "/") },
          { label: t.locations, href: href(locale, "/locations/") },
        ]}
      />

      <ShatterDefs />

      <section className="ribbon-bg mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {c.offices.map((o, i) => (
            <Reveal key={o.slug} delay={(i % 3) * 0.08}>
              <Link
                href={href(locale, `/locations/${o.slug}/`)}
                className="group sheen card-lift relative block h-full rounded-3xl border border-transparent p-6 transition-colors duration-300 hover:border-fern hover:shadow-2xl"
              >
                <ShatterSurface index={i} />
                <p className="relative text-xs font-semibold uppercase tracking-wide text-amber">{o.roleLabel}</p>
                {/* Decorative — the country is spelled out right beside it. */}
                <div className="mt-2 flex items-start gap-3">
                  {officeFlag[o.slug] && (
                    <Image
                      src={officeFlag[o.slug].src}
                      alt=""
                      aria-hidden
                      width={officeFlag[o.slug].width}
                      height={officeFlag[o.slug].height}
                      className="mt-1.5 h-4 w-auto shrink-0 rounded-[2px] shadow-sm ring-1 ring-ink/15 transition-transform duration-300 group-hover:scale-110"
                    />
                  )}
                  <h2 className="font-display text-xl font-semibold text-forest">
                    {o.city ? `${o.city}, ` : ""}
                    {o.country}
                  </h2>
                </div>
                {o.address && <p className="mt-2 text-sm text-ink/70">{o.address}</p>}
                <p className="mt-4 text-sm font-semibold text-forest group-hover:underline">{t.learnMore}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand locale={locale} />
    </>
  );
}

export function LocationView({ locale, slug }: { locale: Locale; slug: string }) {
  const c = getContent(locale);
  const t = ui[locale];
  const o = c.offices.find((x) => x.slug === slug);
  if (!o) notFound();

  return (
    <>
      {/* Only for offices TDM runs itself. Partner locations share the group's
          contact details, and marking them up as a local business with someone
          else's phone number would misdescribe them. */}
      {o.address && o.role !== "partner" && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: `TDM: The Digital Marketing Services (${o.city ?? o.country})`,
            url: `${site.url}${localePrefix(locale)}/locations/${o.slug}/`,
            email: site.email,
            telephone: site.phone,
            address: { "@type": "PostalAddress", streetAddress: o.address, addressCountry: o.country },
            parentOrganization: { "@type": "Organization", name: site.name, url: site.url },
          }}
        />
      )}
      <PageHero kicker={o.roleLabel} headline={o.hero.headline} sub={o.hero.sub} dark />
      <Breadcrumbs
        items={[
          { label: t.home, href: href(locale, "/") },
          { label: t.locations, href: href(locale, "/locations/") },
          { label: o.country, href: href(locale, `/locations/${o.slug}/`) },
        ]}
      />

      <ShatterDefs />

      <section className="ribbon-bg mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <Prose paragraphs={o.intro} />
        {o.address && (
          <div className="group sheen card-lift relative mt-8 max-w-md rounded-3xl border border-transparent p-6 transition-colors duration-300 hover:border-fern hover:shadow-xl">
            <ShatterSurface index={1} />
            <p className="kicker relative text-fern">{t.visitUs}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink/85">{o.address}</p>
            <p className="mt-2 text-sm text-ink/70">
              <a className="hover:text-forest" href={`mailto:${site.email}`}>{site.email}</a>
              <br />
              <a
                className="hover:text-forest"
                href={`tel:${o.slug === "uk" ? site.phoneUk.replace(/\s/g, "") : site.phoneHref}`}
                dir="ltr"
              >
                {o.slug === "uk" ? site.phoneUk : site.phone}
              </a>
            </p>
          </div>
        )}
      </section>

      {/* What the office can be hired for: every sector and its services. */}
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6">
        <Kicker>{t.servicesKicker}</Kicker>
        <h2 className="mt-3 text-3xl font-bold text-forest">{t.servicesTitle}</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.sectors.map((s) => (
            <div key={s.slug} className="rounded-3xl border border-mint bg-white p-6">
              <h3 className="font-display text-lg font-semibold text-forest">
                <Link href={href(locale, `/${s.slug}/`)} className="hover:text-fern">
                  {s.name}
                </Link>
              </h3>
              <ul className="mt-3 space-y-1.5 text-sm">
                {c.services
                  .filter((sv) => sv.sector === s.slug)
                  .map((sv) => (
                    <li key={sv.slug}>
                      <Link
                        href={href(locale, `/${sv.sector}/${sv.slug}/`)}
                        className="text-ink/75 transition-colors hover:text-fern"
                      >
                        {sv.navLabel ?? sv.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <FaqSection faqs={o.faqs} locale={locale} />
      <CtaBand locale={locale} />
    </>
  );
}
