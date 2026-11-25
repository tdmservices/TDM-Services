import { asset } from "./asset-manifest";

/**
 * Partner and certification badges.
 *
 * Each is trimmed to its ink, so the ratios are what the artwork actually is —
 * and they vary enormously: Shopify's lockup is 5.97:1, LinkedIn's is 0.67:1.
 * Normalising by height would leave the tall ones a couple of dozen pixels wide
 * and illegible.
 *
 * So they are not normalised at all here. Every badge renders inside a chip of
 * one fixed size with object-contain, which lets a wide lockup fill the width
 * and a tall one fill the height, and leaves the row of chips even whatever
 * they hold. `width`/`height` are the intrinsic dimensions, needed only so the
 * layout does not shift while they load.
 *
 * Run `node scripts/hash-assets.mjs` after replacing a file.
 */
export type Partner = {
  name: string;
  src: string;
  /** White-on-transparent version for dark backgrounds (public/partners-mono). */
  mono: string;
  width: number;
  height: number;
};

export const partners: Partner[] = [
  { name: "Meta Business Partner", src: asset("partners/meta.webp"), mono: "/partners-mono/meta.webp", width: 353, height: 120 },
  { name: "Shopify Partner", src: asset("partners/shopify.webp"), mono: "/partners-mono/shopify.webp", width: 716, height: 120 },
  { name: "Google Partner", src: asset("partners/google.webp"), mono: "/partners-mono/google.webp", width: 282, height: 120 },
  // Cropped to the mark: the full badge stacks two lines of type under the
  // logo, which at chip height rendered 19px wide and unreadable.
  { name: "LinkedIn Ads Certified", src: asset("partners/linkedin.webp"), mono: "/partners-mono/linkedin.webp", width: 420, height: 420 },
  { name: "HighLevel Certified Partner", src: asset("partners/highlevel.webp"), mono: "/partners-mono/highlevel.webp", width: 420, height: 111 },
  { name: "Verified WooExpert", src: asset("partners/woocommerce.webp"), mono: "/partners-mono/woocommerce.webp", width: 420, height: 420 },
  { name: "Odoo Gold Partner", src: asset("partners/odoo.webp"), mono: "/partners-mono/odoo.webp", width: 420, height: 205 },
  { name: "Magento Professional Solution Partner", src: asset("partners/magento.webp"), mono: "/partners-mono/magento.webp", width: 420, height: 105 },
  { name: "ISO 9001 Certified", src: asset("partners/iso.webp"), mono: "/partners-mono/iso.webp", width: 420, height: 370 },
  { name: "PSEB Registered", src: asset("partners/pseb.webp"), mono: "/partners-mono/pseb.webp", width: 236, height: 227 },
];
