import { ToolView, isToolSlug } from "@/views/ToolViews";
import { localizedMetadata } from "@/lib/meta";
import { TOOL_SLUGS, getTools } from "@/content/tools";

const locale = "en" as const;

// Refreshed regularly so a title or description saved in the admin shows up without a deploy.
export const revalidate = 60;
export const dynamicParams = false;

export function generateStaticParams() {
  return TOOL_SLUGS.map((tool) => ({ tool }));
}

export async function generateMetadata({ params }: { params: Promise<{ tool: string }> }) {
  const { tool } = await params;
  if (!isToolSlug(tool)) return {};
  const copy = getTools(locale).tools[tool];
  return localizedMetadata(locale, `/tools/${tool}/`, copy.metaTitle, copy.metaDescription);
}

export default async function Page({ params }: { params: Promise<{ tool: string }> }) {
  const { tool } = await params;
  return <ToolView locale={locale} slug={tool} />;
}
