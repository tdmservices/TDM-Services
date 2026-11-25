import type { LocaleContent } from "@/content";
import { clientLogos, featuredClients } from "@/content/en/clients";
import { frMediaServices, frMarketingServices } from "./services-media-marketing";
import { frDevelopmentServices, frSectors } from "./services-development-sectors";
import { frAiServices, frAiSector } from "./services-new/ai";
import { frDesign3dServices, frDesign3dSector } from "./services-new/design3d";
import { frAmazonServices, frMarketplacesSector } from "./services-new/marketplaces-amazon";
import { frEbayServices, frWalmartServices } from "./services-new/marketplaces-ebay-walmart";
import { frConsultingServices, frConsultingSector, frGameServices } from "./services-new/consulting-game";

// New groups sit before staff augmentation, in the same order as the English site.
const last = frSectors.findIndex((s) => s.slug === "staff-augmentation");
const at = last < 0 ? frSectors.length : last;
const sectors = [frSectors.slice(0, at), [frAiSector, frDesign3dSector, frMarketplacesSector, frConsultingSector], frSectors.slice(at)].flat();

import {
  frOffices,
  frPages,
  frTestimonials,
  frLeadership,
  frTeamIntro,
} from "./site";

export const frContent: LocaleContent = {
  sectors,
  services: [...frMediaServices, ...frMarketingServices, ...frDevelopmentServices,
    ...frGameServices,
    ...frAiServices,
    ...frDesign3dServices,
    ...frAmazonServices,
    ...frEbayServices,
    ...frWalmartServices,
    ...frConsultingServices,
  ],
  offices: frOffices,
  testimonials: frTestimonials,
  leadership: frLeadership,
  teamIntro: frTeamIntro,
  clientLogos,
  featuredClients,
  pages: frPages,
};
