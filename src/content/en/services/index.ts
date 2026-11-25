import type { Service, SectorSlug } from "@/lib/types";
import { mediaServices } from "./media";
import { marketingServices } from "./marketing";
import { developmentServices } from "./development";
import { gameServices } from "./game";
import { aiServices } from "./ai";
import { design3dServices } from "./design3d";
import { amazonServices } from "./marketplaces-amazon";
import { ebayServices } from "./marketplaces-ebay";
import { walmartServices } from "./marketplaces-walmart";
import { consultingServices } from "./consulting";

export const allServices: Service[] = [
  ...mediaServices,
  ...marketingServices,
  ...developmentServices,
  ...gameServices,
  ...aiServices,
  ...design3dServices,
  ...amazonServices,
  ...ebayServices,
  ...walmartServices,
  ...consultingServices,
];

export function servicesBySector(sector: SectorSlug): Service[] {
  return allServices.filter((s) => s.sector === sector);
}

export function getService(sector: string, slug: string): Service | undefined {
  return allServices.find((s) => s.sector === sector && s.slug === slug);
}
