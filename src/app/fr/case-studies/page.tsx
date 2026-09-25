import { CaseStudiesIndexView } from "@/views/CaseStudyViews";
import { localizedMetadata } from "@/lib/meta";
import { getContent } from "@/content";

const locale = "fr" as const;

/**
 * Rebuilt at most once a minute, so content saved in the admin appears without
 * a deploy. Without this the page is built once and then frozen: an FAQ edited
 * or a case study added would never show up on the live site.
 */
export const revalidate = 60;


export function generateMetadata() {
  const p = getContent(locale).pages.caseStudiesPage;
  return localizedMetadata(locale, "/case-studies/", p.metaTitle, p.metaDescription);
}

export default function Page() {
  return <CaseStudiesIndexView locale={locale} />;
}
