import { asset } from "./asset-manifest";

/** Every service photo is pre-cropped to this size, so all the cards match. */
export const SERVICE_IMAGE = { width: 800, height: 500 } as const;

/**
 * Artwork for individual service cards, keyed by "<sector>/<slug>".
 *
 * Every service is covered. Any service without an entry falls back to
 * the icon-only card, so this stays safe if a service is added later.
 *
 * Run `node scripts/hash-assets.mjs` after adding a file.
 */
export const serviceImage: Record<string, string> = {
  "media/video-editing": asset("services/video-editing.webp"),
  "media/video-shoots": asset("services/video-shoots.webp"),
  "media/ugc-ads": asset("services/ugc-ads.webp"),
  "media/product-shoots": asset("services/product-shoots.webp"),
  "media/ad-creatives": asset("services/ad-creatives.webp"),

  "marketing/performance-marketing": asset("services/performance-marketing.webp"),
  "marketing/seo": asset("services/seo.webp"),
  "marketing/social-media": asset("services/social-media.webp"),

  "development/shopify": asset("services/shopify.webp"),
  "development/wordpress": asset("services/wordpress.webp"),
  "development/magento": asset("services/magento.webp"),
  "development/custom-development": asset("services/custom-development.webp"),
  "development/crm-erp": asset("services/crm-erp.webp"),
  "development/mobile-apps": asset("services/mobile-apps.webp"),
  "development/game-development": asset("services/game-development.webp"),

  // Rendered illustrations for the newer groups (scripts/mascot/build_art.py).
  "ai/ai-development": asset("services/ai-development.webp"),
  "ai/mcp-development": asset("services/mcp-development.webp"),
  "ai/ai-automation": asset("services/ai-automation.webp"),
  "ai/workflow-automation": asset("services/workflow-automation.webp"),
  "ai/ai-data-systems": asset("services/ai-data-systems.webp"),
  "ai/founder-ai-systems": asset("services/founder-ai-systems.webp"),

  "3d-design/3d-software-development": asset("services/3d-software-development.webp"),
  "3d-design/3d-modeling": asset("services/3d-modeling.webp"),
  "3d-design/3d-rendering": asset("services/3d-rendering.webp"),
  "3d-design/interior-exterior-design": asset("services/interior-exterior-design.webp"),
  "3d-design/architecture-planning": asset("services/architecture-planning.webp"),
  "3d-design/product-modeling-design": asset("services/product-modeling-design.webp"),

  "marketplaces/amazon-account-management": asset("services/amazon-account-management.webp"),
  "marketplaces/amazon-virtual-assistant": asset("services/amazon-virtual-assistant.webp"),
  "marketplaces/amazon-account-health": asset("services/amazon-account-health.webp"),
  "marketplaces/amazon-advertising": asset("services/amazon-advertising.webp"),
  "marketplaces/ebay-account-management": asset("services/ebay-account-management.webp"),
  "marketplaces/ebay-virtual-assistant": asset("services/ebay-virtual-assistant.webp"),
  "marketplaces/ebay-account-health": asset("services/ebay-account-health.webp"),
  "marketplaces/ebay-advertising": asset("services/ebay-advertising.webp"),
  "marketplaces/walmart-account-management": asset("services/walmart-account-management.webp"),
  "marketplaces/walmart-virtual-assistant": asset("services/walmart-virtual-assistant.webp"),
  "marketplaces/walmart-account-health": asset("services/walmart-account-health.webp"),
  "marketplaces/walmart-advertising": asset("services/walmart-advertising.webp"),

  "consulting/digital-strategy-consulting": asset("services/digital-strategy-consulting.webp"),
  "consulting/product-studio-for-startups": asset("services/product-studio-for-startups.webp"),
};
