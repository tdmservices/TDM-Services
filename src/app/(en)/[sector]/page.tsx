import { SectorView } from "@/views/SectorView";
import { localizedMetadata } from "@/lib/meta";
import { getContent } from "@/content";
import { SitePageView, sitePageMetadata } from "@/views/SitePageView";

const locale = "en" as const;

/**
 * Rebuilt at most once a minute, so content saved in the admin appears without
 * a deploy. Without this the page is built once and then frozen: an FAQ edited
 * or a case study added would never show up on the live site.
 */
export const revalidate = 60;


// Not limited to the sectors: any other single-segment path is looked up among
// the pages published from the admin, and 404s if there is none.
export const dynamicParams = true;

export function generateStaticParams() {
  return getContent(locale).sectors.map((s) => ({ sector: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ sector: string }> }) {
  const { sector } = await params;
  const s = getContent(locale).sectors.find((x) => x.slug === sector);
  if (!s) return sitePageMetadata(locale, sector);
  return localizedMetadata(locale, `/${s.slug}/`, s.metaTitle, s.metaDescription);
}

export default async function Page({ params }: { params: Promise<{ sector: string }> }) {
  const { sector } = await params;
  if (!getContent(locale).sectors.some((x) => x.slug === sector)) {
    return <SitePageView locale={locale} slug={sector} />;
  }
  return <SectorView locale={locale} sectorSlug={sector} />;
}
