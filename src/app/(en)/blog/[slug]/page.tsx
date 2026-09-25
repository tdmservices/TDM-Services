import { BlogPostView } from "@/views/BlogViews";
import { localizedMetadata } from "@/lib/meta";
import { getBlogPost, getBlogPosts } from "@/content/db";

const locale = "en" as const;

/**
 * Pre-rendered at build time, but not limited to that set: a post written in
 * the admin afterwards renders on first request and is then cached.
 */
export const revalidate = 60;

export async function generateStaticParams() {
  return (await getBlogPosts(locale)).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getBlogPost(locale, slug);
  if (!p) return {};
  return localizedMetadata(locale, `/blog/${p.slug}/`, p.metaTitle, p.metaDescription);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BlogPostView locale={locale} slug={slug} />;
}
