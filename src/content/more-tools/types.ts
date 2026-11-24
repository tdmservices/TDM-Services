import type { Faq } from "@/lib/types";

/** One tool's copy. `labels` is keyed by the ids in src/lib/tool-defs.ts. */
export interface MoreToolCopy {
  name: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  sub: string;
  intro: string[];
  faqs: Faq[];
  labels: Record<string, string>;
}

export interface MoreToolsCopy {
  /** Words shared by every calculator, quiz and builder. */
  ui: {
    currency: string;
    results: string;
    enterValues: string;
    question: string;
    back: string;
    restart: string;
    yourResult: string;
    howScored: string;
    closeCall: string;
    learnMore: string;
    copy: string;
    copied: string;
    download: string;
    fillRequired: string;
    leadTitle: string;
    leadSub: string;
    /** Label above the tool card on a service page. */
    forService: string;
    tryTool: string;
  };
  tools: Record<string, MoreToolCopy>;
}
