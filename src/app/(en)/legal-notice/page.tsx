import type { Metadata } from "next";
import { LegalView } from "@/views/LegalView";
import { getLegalDoc } from "@/content/en/legal";

const doc = getLegalDoc("legal-notice");

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "/legal-notice/" },
};

export default function Page() {
  return <LegalView slug="legal-notice" />;
}
