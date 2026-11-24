/**
 * The old WordPress site was hacked and filled with spam pages — fake shop
 * listings and thousands of gambling posts — that Google indexed. None of them
 * exist here, so they would 404 anyway; answering 410 Gone instead tells Google
 * the removal is deliberate, and it drops them sooner.
 *
 * The spam posts have no common prefix, only a shape: one long, many-hyphened
 * slug at the root. No real page looks like that — ours are short, and the old
 * WordPress URLs worth keeping are redirected before this is consulted.
 */

/** Paths the hack created under a fixed prefix. */
const SPAM_PREFIXES = ["/shopdetail/", "/cate-", "/shop/customer/", "/category/"];

/** Indexed spam slugs too short for the shape rule below to catch. */
const SPAM_SLUGS = new Set([
  "paypal-casinos",
  "irish-online-casinos",
  "nyc-web-based-casinos",
  "querverweis-wikipedia-2",
  "ultimata-alternativen-2025",
]);

/** Under one of the prefixes the hack used. Nothing real lives there. */
export function hasSpamPrefix(pathname: string): boolean {
  return SPAM_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

/**
 * Shaped like one of the spam posts. Unlike the prefixes this is a guess, so
 * the caller must first rule out pages that really exist at that address.
 */
export function hasSpamShape(pathname: string): boolean {
  let slug = pathname.replace(/^\/+|\/+$/g, "");
  if (!slug || slug.includes("/")) return false;
  try {
    slug = decodeURIComponent(slug);
  } catch {
    /* malformed escape — judge the raw slug */
  }

  if (SPAM_SLUGS.has(slug)) return true;
  // Non-Latin slugs (Cyrillic, Greek, …): nothing on this site is named that way.
  if (/[^\x00-\x7F]/.test(slug)) return true;
  const separators = (slug.match(/[-_]/g) ?? []).length;
  return slug.length >= 25 && separators >= 3;
}

export function isHackedUrl(pathname: string): boolean {
  return hasSpamPrefix(pathname) || hasSpamShape(pathname);
}
