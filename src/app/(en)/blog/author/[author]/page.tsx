import { AuthorView, authorMeta } from "@/views/AuthorView";
import { localizedMetadata } from "@/lib/meta";
import { AUTHOR_SLUGS } from "@/content/authors";

const locale = "en" as const;

export const revalidate = 60;

export function generateStaticParams() {
  return AUTHOR_SLUGS.map((author) => ({ author }));
}

export async function generateMetadata({ params }: { params: Promise<{ author: string }> }) {
  const { author } = await params;
  const meta = authorMeta(locale, author);
  if (!meta) return {};
  return localizedMetadata(locale, `/blog/author/${author}/`, meta.title, meta.description);
}

export default async function Page({ params }: { params: Promise<{ author: string }> }) {
  const { author } = await params;
  return <AuthorView locale={locale} slug={author} />;
}
