import { PlayItemView, playMeta } from "@/views/PlayViews";
import { localizedMetadata } from "@/lib/meta";
import { PLAY_SLUGS } from "@/content/play";

const locale = "fr" as const;

export const revalidate = 60;

export function generateStaticParams() {
  return PLAY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = playMeta(locale, slug);
  if (!meta) return {};
  return localizedMetadata(locale, `/play/${slug}/`, meta.title, meta.description);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PlayItemView locale={locale} slug={slug} />;
}
