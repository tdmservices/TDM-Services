import type { Locale } from "@/lib/types";
import type { ServiceGuide, ServiceGuides } from "./types";
import { en } from "./en";
import { fr } from "./fr";
import { ar } from "./ar";
import { guides as aiEn } from "./new/ai.en";
import { guides as aiFr } from "./new/ai.fr";
import { guides as aiAr } from "./new/ai.ar";
import { guides as design3dEn } from "./new/design3d.en";
import { guides as design3dFr } from "./new/design3d.fr";
import { guides as design3dAr } from "./new/design3d.ar";
import { guides as marketAEn } from "./new/marketplaces-a.en";
import { guides as marketBEn } from "./new/marketplaces-b.en";
import { guides as marketAFr } from "./new/marketplaces-a.fr";
import { guides as marketBFr } from "./new/marketplaces-b.fr";
import { guides as marketAAr } from "./new/marketplaces-a.ar";
import { guides as marketBAr } from "./new/marketplaces-b.ar";

/**
 * The buyer's guide for a service page. A language without a translation
 * shows no guide rather than English text on a French or Arabic page.
 */
const registry: Partial<Record<Locale, ServiceGuides>> = {
  en: { ...en, ...aiEn, ...design3dEn, ...marketAEn, ...marketBEn },
  fr: { ...fr, ...aiFr, ...design3dFr, ...marketAFr, ...marketBFr },
  ar: { ...ar, ...aiAr, ...design3dAr, ...marketAAr, ...marketBAr },
};

export const getServiceGuide = (locale: Locale, sector: string, slug: string): ServiceGuide | undefined =>
  registry[locale]?.[`${sector}/${slug}`];
