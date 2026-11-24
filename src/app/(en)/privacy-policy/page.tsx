import type { Metadata } from "next";
import { LegalView } from "@/views/LegalView";
import { getLegalDoc } from "@/content/en/legal";

const doc = getLegalDoc("privacy-policy");

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "/privacy-policy/" },
};

export default function Page() {
  return <LegalView slug="privacy-policy" />;
}
