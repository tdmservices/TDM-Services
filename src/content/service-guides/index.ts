import type { Locale } from "@/lib/types";
import type { ServiceGuide, ServiceGuides } from "./types";
import { en } from "./en";
import { fr } from "./fr";
import { ar } from "./ar";

/**
 * The buyer's guide for a service page. A language without a translation
 * shows no guide rather than English text on a French or Arabic page.
 */
const registry: Partial<Record<Locale, ServiceGuides>> = { en, fr, ar };

export const getServiceGuide = (locale: Locale, sector: string, slug: string): ServiceGuide | undefined =>
  registry[locale]?.[`${sector}/${slug}`];
