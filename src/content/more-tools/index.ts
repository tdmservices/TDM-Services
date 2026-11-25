import type { Locale } from "@/lib/types";
import type { MoreToolCopy, MoreToolsCopy } from "./types";
import { en } from "./en";
import { fr } from "./fr";
import { ar } from "./ar";
import { WP_SLUG, wpAr, wpEn, wpFr } from "./wp";
import { marketingEn } from "./marketing-en";
import { marketingFr } from "./marketing-fr";
import { marketingAr } from "./marketing-ar";
import { tools as set1En } from "./new/set1.en";
import { tools as set1Fr } from "./new/set1.fr";
import { tools as set1Ar } from "./new/set1.ar";
import { tools as set2En } from "./new/set2.en";
import { tools as set2Fr } from "./new/set2.fr";
import { tools as set2Ar } from "./new/set2.ar";

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

const base = withWp(en, wpEn, { ...marketingEn, ...set1En, ...set2En });
/** Every language's copy, English fallbacks not applied. */
export const MORE_TOOLS: Partial<Record<Locale, MoreToolsCopy>> = { en: base, fr: withWp(fr, wpFr, { ...marketingFr, ...set1Fr, ...set2Fr }), ar: withWp(ar, wpAr, { ...marketingAr, ...set1Ar, ...set2Ar }) };
const registry = MORE_TOOLS;

export const getToolUi = (locale: Locale) => (registry[locale] ?? base).ui;

export const getMoreTool = (locale: Locale, slug: string): MoreToolCopy | undefined =>
  registry[locale]?.tools[slug] ?? base.tools[slug];

export const MORE_TOOL_SLUGS = Object.keys(base.tools);
