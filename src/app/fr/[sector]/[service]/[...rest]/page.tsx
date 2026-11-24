import { SitePageView, sitePageMetadata } from "@/views/SitePageView";

const locale = "fr" as const;

/**
 * Paths three or more segments deep ("usa/florida/miami") only ever belong to
 * pages published from the admin.
 */
export const revalidate = 60;

type Params = Promise<{ sector: string; service: string; rest: string[] }>;

const slugOf = (p: { sector: string; service: string; rest: string[] }) => [p.sector, p.service, ...p.rest].join("/");

export async function generateMetadata({ params }: { params: Params }) {
  return sitePageMetadata(locale, slugOf(await params));
}

export default async function Page({ params }: { params: Params }) {
  return <SitePageView locale={locale} slug={slugOf(await params)} />;
}
