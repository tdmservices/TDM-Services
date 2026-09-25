import { SectorView } from "@/views/SectorView";
import { localizedMetadata } from "@/lib/meta";
import { getContent } from "@/content";

const locale = "fr" as const;

/**
 * Rebuilt at most once a minute, so content saved in the admin appears without
 * a deploy. Without this the page is built once and then frozen: an FAQ edited
 * or a case study added would never show up on the live site.
 */
export const revalidate = 60;


export const dynamicParams = false;

export function generateStaticParams() {
  return getContent(locale).sectors.map((s) => ({ sector: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ sector: string }> }) {
  const { sector } = await params;
  const s = getContent(locale).sectors.find((x) => x.slug === sector);
  if (!s) return {};
  return localizedMetadata(locale, `/${s.slug}/`, s.metaTitle, s.metaDescription);
}

export default async function Page({ params }: { params: Promise<{ sector: string }> }) {
  const { sector } = await params;
  return <SectorView locale={locale} sectorSlug={sector} />;
}
