import { ToolsIndexView } from "@/views/ToolViews";
import { localizedMetadata } from "@/lib/meta";
import { getTools } from "@/content/tools";

const locale = "ar" as const;

// Refreshed regularly so a title or description saved in the admin shows up without a deploy.
export const revalidate = 60;

export function generateMetadata() {
  const hub = getTools(locale).hub;
  return localizedMetadata(locale, "/tools/", hub.metaTitle, hub.metaDescription);
}

export default function Page() {
  return <ToolsIndexView locale={locale} />;
}
