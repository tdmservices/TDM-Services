import type { Faq } from "@/lib/types";

/**
 * The longer "before you buy" part of a service page: who the service suits,
 * what drives its cost, what to expect and how to judge the work, plus extra
 * buyer questions. Keyed by "sector/slug" in each language file.
 *
 * Keep it general and true: no prices, client names or results that the
 * business has not published.
 */
export interface GuideSection {
  heading: string;
  body: string[];
  bullets?: string[];
}

export interface ServiceGuide {
  title: string;
  sections: GuideSection[];
  faqs: Faq[];
}

export type ServiceGuides = Record<string, ServiceGuide>;
