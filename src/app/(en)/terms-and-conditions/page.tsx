import type { Metadata } from "next";
import { LegalView } from "@/views/LegalView";
import { getLegalDoc } from "@/content/en/legal";

const doc = getLegalDoc("terms-and-conditions");

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: "/terms-and-conditions/" },
};

export default function Page() {
  return <LegalView slug="terms-and-conditions" />;
}
