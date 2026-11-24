import type { Faq, Locale } from "@/lib/types";
import { TOOL_SLUGS, getTools } from "./tools";
import { MORE_TOOL_SLUGS, getMoreTool } from "./more-tools";
import { SERVICE_TOOL } from "@/lib/tool-defs";

/**
 * Every free tool, whichever way it is built: the three hand-built ones
 * (src/content/tools.ts) and the data-driven ones (src/content/more-tools).
 * Pages, the sitemap and the service-page links all read the list from here.
 */
export interface ToolSummary {
  slug: string;
  name: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  sub: string;
  intro: string[];
  faqs: Faq[];
}

export const ALL_TOOL_SLUGS: string[] = [...TOOL_SLUGS, ...MORE_TOOL_SLUGS];

export const isTool = (slug: string) => ALL_TOOL_SLUGS.includes(slug);

export function getToolSummary(locale: Locale, slug: string): ToolSummary | undefined {
  const built = getTools(locale).tools as Record<string, Omit<ToolSummary, "slug">>;
  const copy = built[slug] ?? getMoreTool(locale, slug);
  return copy ? { slug, ...copy } : undefined;
}

/** The tool that belongs with a service or sector page, given its canonical path. */
export function toolForService(locale: Locale, path: string): ToolSummary | undefined {
  const slug = SERVICE_TOOL[path];
  return slug && isTool(slug) ? getToolSummary(locale, slug) : undefined;
}
