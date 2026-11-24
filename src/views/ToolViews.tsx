import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/types";
import { href, isRtl } from "@/lib/i18n";
import { absoluteUrl, site } from "@/lib/site";
import { getTools } from "@/content/tools";
import { ALL_TOOL_SLUGS, getToolSummary, isTool } from "@/content/all-tools";
import { getToolDef } from "@/lib/tool-defs";
import { ui } from "@/content/ui";
import { getContent } from "@/content";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs, CtaBand, FaqSection, PageHero, Prose } from "@/components/Sections";
import { RoasCalculator, SeoAuditTool, StaffCalculator } from "@/components/tools/Tools";
import { GenericTool } from "@/components/tools/GenericTools";
import { WpCheckTool } from "@/components/tools/WpCheck";

/** Free tools: the hub that lists them, and the page each one lives on. */

export const isToolSlug = isTool;

const toolPath = (slug: string) => `/tools/${slug}/`;

/** The name of the service or sector at a path, for the link back from its tool. */
function serviceName(locale: Locale, path: string): string {
  const c = getContent(locale);
  const [, sector, service] = path.split("/");
  if (!service) return c.sectors.find((x) => x.slug === sector)?.name ?? "";
  return c.services.find((x) => x.sector === sector && x.slug === service)?.name ?? "";
}

export function ToolsIndexView({ locale }: { locale: Locale }) {
  const copy = getTools(locale);
  const t = ui[locale];
  const arrow = isRtl(locale) ? "←" : "→";

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: copy.hub.headline,
          itemListElement: ALL_TOOL_SLUGS.map((slug, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: getToolSummary(locale, slug)!.name,
            url: absoluteUrl(href(locale, toolPath(slug))),
          })),
        }}
      />
      <PageHero kicker={copy.hub.kicker} headline={copy.hub.headline} sub={copy.hub.sub} dark />
      <Breadcrumbs
        items={[
          { label: t.home, href: href(locale, "/") },
          { label: copy.hub.navLabel, href: href(locale, "/tools/") },
        ]}
      />
      <section className="ribbon-bg mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <ul className="grid gap-6 lg:grid-cols-3">
          {ALL_TOOL_SLUGS.map((slug) => {
            const tool = getToolSummary(locale, slug)!;
            return (
              <li key={slug}>
                <Link
                  href={href(locale, toolPath(slug))}
                  className="group card-lift flex h-full flex-col rounded-3xl border border-mint bg-white p-7 transition-colors duration-300 hover:border-fern hover:shadow-xl"
                >
                  <span className="w-fit rounded-full bg-amber/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber">
                    {copy.hub.free}
                  </span>
                  <h2 className="mt-4 font-display text-xl font-bold text-forest transition-colors group-hover:text-fern">{tool.name}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/75">{tool.tagline}</p>
                  <p className="mt-5 text-sm font-semibold text-fern">
                    {copy.hub.open} <span className="arrow-nudge">{arrow}</span>
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
      <CtaBand locale={locale} />
    </>
  );
}

export function ToolView({ locale, slug }: { locale: Locale; slug: string }) {
  const tool = getToolSummary(locale, slug);
  if (!tool) notFound();
  const copy = getTools(locale);
  // The service this tool belongs with, so the tool leads on to the work.
  const servicePath = getToolDef(slug)?.service;
  const t = ui[locale];
  const url = absoluteUrl(href(locale, toolPath(slug)));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: tool.name,
          description: tool.metaDescription,
          url,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any",
          inLanguage: locale,
          isAccessibleForFree: true,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", "@id": `${site.url}/#organization`, name: site.name, url: site.url },
        }}
      />
      <PageHero kicker={copy.hub.kicker} headline={tool.headline} sub={tool.sub} dark />
      <Breadcrumbs
        items={[
          { label: t.home, href: href(locale, "/") },
          { label: copy.hub.navLabel, href: href(locale, "/tools/") },
          { label: tool.name, href: href(locale, toolPath(slug)) },
        ]}
      />

      <section className="ribbon-bg mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {slug === "seo-audit" && <SeoAuditTool locale={locale} />}
        {slug === "roas-calculator" && <RoasCalculator locale={locale} />}
        {slug === "staff-augmentation-calculator" && <StaffCalculator locale={locale} />}
        {slug === "wordpress-security-checker" && <WpCheckTool locale={locale} />}
        {getToolDef(slug) && <GenericTool locale={locale} slug={slug} />}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
        <Prose paragraphs={tool.intro} />
        {/* The other tools, so one tool is a way into the rest. */}
        <ul className="mt-8 flex flex-wrap gap-2">
          {servicePath && (
            <li>
              <Link
                href={href(locale, servicePath)}
                className="inline-block rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-fern"
              >
                {serviceName(locale, servicePath)} {isRtl(locale) ? "←" : "→"}
              </Link>
            </li>
          )}
          {ALL_TOOL_SLUGS.filter((s) => s !== slug).map((s) => (
            <li key={s}>
              <Link
                href={href(locale, toolPath(s))}
                className="inline-block rounded-full border border-mint bg-white px-4 py-2 text-sm font-semibold text-forest transition-colors hover:border-fern hover:bg-fern hover:text-white"
              >
                {getToolSummary(locale, s)!.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <FaqSection faqs={tool.faqs} locale={locale} />
      <CtaBand locale={locale} audit={slug !== "seo-audit"} />
    </>
  );
}
