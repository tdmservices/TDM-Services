import type { Metadata } from "next";
import { NotFoundView } from "@/views/NotFoundView";

// Served by src/proxy.ts with a 410 status for the spam addresses the hacked
// WordPress site left behind. Never linked to, and kept out of the index.
export const metadata: Metadata = {
  title: "Page removed | TDM",
  robots: { index: false },
};

export default function GonePage() {
  return <NotFoundView variant="gone" />;
}
