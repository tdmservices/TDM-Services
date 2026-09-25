import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { asset } from "@/lib/asset-manifest";
import "@/app/globals.css";

/**
 * The admin gets its own route group and a bare shell — no site header, footer
 * or locale switcher. It is a tool, not a page of the site.
 *
 * It does share the site's atmosphere, though: the same cream ground, the same
 * drifting aurora, the brand mark behind the work. All of it is fixed behind
 * the content and inert to the pointer, so it reads as the company's tool
 * without ever competing with the form on top of it.
 */

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Content admin: TDM",
  robots: { index: false, follow: false },
};

function Backdrop() {
  return (
    <div aria-hidden className="admin-backdrop">
      <div className="admin-lattice text-forest" />
      <div
        className="admin-wash aurora aurora-a"
        style={{
          insetInlineStart: "-15%",
          top: "-20%",
          width: "70vw",
          height: "70vw",
          background: "radial-gradient(circle, rgba(74,124,89,0.30) 0%, transparent 68%)",
        }}
      />
      <div
        className="admin-wash aurora aurora-b"
        style={{
          insetInlineEnd: "-20%",
          top: "8%",
          width: "60vw",
          height: "60vw",
          background: "radial-gradient(circle, rgba(198,224,205,0.55) 0%, transparent 70%)",
        }}
      />
      <div
        className="admin-wash aurora aurora-c"
        style={{
          insetInlineStart: "25%",
          bottom: "-30%",
          width: "55vw",
          height: "55vw",
          background: "radial-gradient(circle, rgba(232,150,58,0.16) 0%, transparent 72%)",
        }}
      />
      <div
        className="admin-watermark"
        style={{ backgroundImage: `url(${asset("branding/logo.png")})` }}
      />
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="relative min-h-screen bg-cream text-ink">
        <Backdrop />
        {children}
      </body>
    </html>
  );
}
