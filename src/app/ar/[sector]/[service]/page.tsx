import { ServiceView } from "@/views/ServiceView";
import { localizedMetadata } from "@/lib/meta";
import { getContent } from "@/content";
import { SitePageView, sitePageMetadata } from "@/views/SitePageView";

const locale = "ar" as const;

/**
 * Rebuilt at most once a minute, so content saved in the admin appears without
 * a deploy. Without this the page is built once and then frozen: an FAQ edited
 * or a case study added would never show up on the live site.
 */
export const revalidate = 60;


// Not limited to the services: any other two-segment path is looked up among
// the pages published from the admin, and 404s if there is none.
export const dynamicParams = true;

export function generateStaticParams() {
  return getContent(locale).services.map((s) => ({ sector: s.sector, service: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ sector: string; service: string }> }) {
  const { sector, service } = await params;
  const sv = getContent(locale).services.find((x) => x.sector === sector && x.slug === service);
  if (!sv) return sitePageMetadata(locale, `${sector}/${service}`);
  return localizedMetadata(locale, `/${sv.sector}/${sv.slug}/`, sv.metaTitle, sv.metaDescription);
}

export default async function Page({ params }: { params: Promise<{ sector: string; service: string }> }) {
  const { sector, service } = await params;
  if (!getContent(locale).services.some((x) => x.sector === sector && x.slug === service)) {
    return <SitePageView locale={locale} slug={`${sector}/${service}`} />;
  }
  return <ServiceView locale={locale} sectorSlug={sector} serviceSlug={service} />;
}
