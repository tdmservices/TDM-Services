import { BlogIndexView } from "@/views/BlogViews";
import { localizedMetadata } from "@/lib/meta";
import { ui } from "@/content/ui";

const locale = "en" as const;

/** Cached, then refreshed within the minute, so a new post appears without a deploy. */
export const revalidate = 60;

export function generateMetadata() {
  const b = ui[locale].blogPage;
  return localizedMetadata(locale, "/blog/", b.metaTitle, b.metaDescription);
}

export default function Page() {
  return <BlogIndexView locale={locale} />;
}
