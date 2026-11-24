import type { Locale } from "@/lib/types";
import type { MoreToolCopy, MoreToolsCopy } from "./types";
import { en } from "./en";
import { fr } from "./fr";
import { ar } from "./ar";
import { WP_SLUG, wpAr, wpEn, wpFr } from "./wp";
import { marketingEn } from "./marketing-en";
import { marketingFr } from "./marketing-fr";
import { marketingAr } from "./marketing-ar";

/**
 * Copy for the data-driven tools (src/lib/tool-defs.ts) and the WordPress
 * security check, which has its own component but the same page copy.
 *
 * A language that has not translated a tool yet falls back to the English
 * copy for it, so a new tool can ship before its translations do.
 */
const withWp = (copy: MoreToolsCopy, wp: MoreToolCopy, more: Record<string, MoreToolCopy> = {}): MoreToolsCopy => ({
  ...copy,
  tools: { ...copy.tools, [WP_SLUG]: wp, ...more },
});

const base = withWp(en, wpEn, marketingEn);
/** Every language's copy, English fallbacks not applied. */
export const MORE_TOOLS: Partial<Record<Locale, MoreToolsCopy>> = { en: base, fr: withWp(fr, wpFr, marketingFr), ar: withWp(ar, wpAr, marketingAr) };
const registry = MORE_TOOLS;

export const getToolUi = (locale: Locale) => (registry[locale] ?? base).ui;

export const getMoreTool = (locale: Locale, slug: string): MoreToolCopy | undefined =>
  registry[locale]?.tools[slug] ?? base.tools[slug];

export const MORE_TOOL_SLUGS = Object.keys(base.tools);
