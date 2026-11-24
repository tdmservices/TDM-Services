import type { Metadata } from "next";
import "@/app/globals.css";
import { LocaleShell } from "@/components/LocaleShell";
import { NotFoundView } from "@/views/NotFoundView";

// Addresses that match no route at all never reach a layout — the three locales
// each have their own root layout, so there is no single one to render inside —
// which is why this builds the whole document itself.
export const metadata: Metadata = {
  title: "Page not found | TDM",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <LocaleShell locale="en">
      <NotFoundView />
    </LocaleShell>
  );
}
