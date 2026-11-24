import type { Locale } from "./types";

export const locales: Locale[] = ["en", "fr", "ar"];

export function localePrefix(locale: Locale): string {
  return locale === "en" ? "" : `/${locale}`;
}

/** Prefix an internal path with the locale segment. Path must start with "/". */
export function href(locale: Locale, path: string): string {
  return `${localePrefix(locale)}${path}`;
}

/**
 * hreflang alternates for a canonical (EN) path, limited to the languages the
 * page exists in. x-default points at English when there is an English version.
 */
export function languageAlternates(path: string, available: Locale[] = locales) {
  const languages: Record<string, string> = {};
  for (const l of available) languages[l] = href(l, path);
  const fallback = available.includes("en") ? "en" : available[0];
  if (fallback) languages["x-default"] = href(fallback, path);
  return languages;
}

export function isRtl(locale: Locale): boolean {
  return locale === "ar";
}

/** Sections that exist in English only — see src/app/fr and src/app/ar. */
const enOnly = [/^\/terms-and-conditions(\/|$)/];

/** Drop a leading /fr or /ar, returning the canonical English path. */
export function stripLocale(pathname: string): string {
  return /^\/(fr|ar)(\/|$)/.test(pathname) ? pathname.slice(3) || "/" : pathname;
}

/**
 * Where the language switcher should point from the current page: the same
 * page in the target locale, not that locale's home page. Falls back to the
 * home page only for the English-only sections, which have no counterpart.
 */
export function localeSwitchHref(pathname: string, target: Locale): string {
  const path = stripLocale(pathname) || "/";
  if (target !== "en" && enOnly.some((re) => re.test(path))) return `/${target}/`;
  return target === "en" ? path : `/${target}${path}`;
}
