import { LocationsIndexView } from "@/views/LocationViews";
import { localizedMetadata } from "@/lib/meta";
import { getContent } from "@/content";

// Refreshed regularly so a title or description saved in the admin shows up without a deploy.
export const revalidate = 60;

const locale = "ar" as const;

export function generateMetadata() {
  const p = getContent(locale).pages.locationsPage;
  return localizedMetadata(locale, "/locations/", p.metaTitle, p.metaDescription);
}

export default function Page() {
  return <LocationsIndexView locale={locale} />;
}
