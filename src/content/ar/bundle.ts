import type { LocaleContent } from "@/content";
import { clientLogos, featuredClients } from "@/content/en/clients";
import { arMediaServices, arMarketingServices } from "./services-media-marketing";
import { arDevelopmentServices, arSectors } from "./services-development-sectors";
import { arAiServices, arAiSector } from "./services-new/ai";
import { arDesign3dServices, arDesign3dSector } from "./services-new/design3d";
import { arAmazonServices, arMarketplacesSector } from "./services-new/marketplaces-amazon";
import { arEbayServices, arWalmartServices } from "./services-new/marketplaces-ebay-walmart";
import { arConsultingServices, arConsultingSector, arGameServices } from "./services-new/consulting-game";

// New groups sit before staff augmentation, in the same order as the English site.
const last = arSectors.findIndex((s) => s.slug === "staff-augmentation");
const at = last < 0 ? arSectors.length : last;
const sectors = [arSectors.slice(0, at), [arAiSector, arDesign3dSector, arMarketplacesSector, arConsultingSector], arSectors.slice(at)].flat();

import {
  arOffices,
  arPages,
  arTestimonials,
  arLeadership,
  arTeamIntro,
} from "./site";

export const arContent: LocaleContent = {
  sectors,
  services: [...arMediaServices, ...arMarketingServices, ...arDevelopmentServices,
    ...arGameServices,
    ...arAiServices,
    ...arDesign3dServices,
    ...arAmazonServices,
    ...arEbayServices,
    ...arWalmartServices,
    ...arConsultingServices,
  ],
  offices: arOffices,
  testimonials: arTestimonials,
  leadership: arLeadership,
  teamIntro: arTeamIntro,
  clientLogos,
  featuredClients,
  pages: arPages,
};
