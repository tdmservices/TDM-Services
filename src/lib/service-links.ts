/**
 * Case studies describe the work in free text ("SEO Optimization", "Shopify
 * eCommerce Development"), not in service slugs. This maps those labels onto
 * the service pages so a case study can link to the service it is proof of.
 *
 * First match wins, so the specific platforms sit above the general terms. A
 * label that matches nothing stays plain text.
 */
const RULES: [RegExp, string][] = [
  [/shopify/i, "/development/shopify/"],
  [/wordpress/i, "/development/wordpress/"],
  [/magento/i, "/development/magento/"],
  [/\b(crm|erp)\b/i, "/development/crm-erp/"],
  [/\b(ios|android)\b|mobile app|app (development|deployment)/i, "/development/mobile-apps/"],
  [/\bseo\b/i, "/marketing/seo/"],
  [/social media/i, "/marketing/social-media/"],
  [/performance[- ]marketing|paid advertising|\bppc\b|google ads|meta ads/i, "/marketing/performance-marketing/"],
  [/custom (software|web)|web platform|admin panel|process automation/i, "/development/custom-development/"],
  [/\bugc\b/i, "/media/ugc-ads/"],
  [/product (photography|shoot)/i, "/media/product-shoots/"],
  [/staff augmentation/i, "/staff-augmentation/"],
  [/e-?commerce (website )?development|website development|web development/i, "/development/"],
];

/** The canonical (English) path of the page a service label belongs to, if any. */
export function servicePathFor(label: string): string | undefined {
  return RULES.find(([re]) => re.test(label))?.[1];
}

/** Blog categories are stored in English in every language. */
const CATEGORY_SECTOR: Record<string, string> = {
  marketing: "marketing",
  media: "media",
  development: "development",
  "staff augmentation": "staff-augmentation",
};

/** The sector a blog category belongs to, so posts and services can link to each other. */
export function sectorForCategory(category: string): string | undefined {
  return CATEGORY_SECTOR[category.trim().toLowerCase()];
}
