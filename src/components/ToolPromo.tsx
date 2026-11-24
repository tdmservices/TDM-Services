import Link from "next/link";
import type { Locale } from "@/lib/types";
import { href, isRtl } from "@/lib/i18n";
import { toolForService } from "@/content/all-tools";
import { getToolUi } from "@/content/more-tools";

/**
 * The free tool that goes with a service, shown on that service's page.
 * `path` is the page's canonical English path, e.g. "/marketing/seo/".
 * Renders nothing for a service that has no tool.
 */
export function ToolPromo({ locale, path }: { locale: Locale; path: string }) {
  const tool = toolForService(locale, path);
  if (!tool) return null;
  const ui = getToolUi(locale);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-forest p-7 text-white sm:p-10 md:flex md:items-center md:justify-between md:gap-10">
        <div aria-hidden className="blob pointer-events-none absolute -end-20 -top-20 h-64 w-64 rounded-full bg-fern/45 blur-3xl" />
        <div aria-hidden className="blob-slow pointer-events-none absolute -bottom-24 start-1/4 h-56 w-56 rounded-full bg-amber/20 blur-3xl" />
        <div className="relative">
          <p className="kicker inline-flex items-center gap-2.5 text-sage">
            <span className="h-2 w-2 rounded-full bg-amber" aria-hidden />
            {ui.forService}
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold md:text-3xl">{tool.name}</h2>
          <p className="mt-2 max-w-2xl leading-relaxed text-white/80">{tool.tagline}</p>
        </div>
        <Link
          href={href(locale, `/tools/${tool.slug}/`)}
          className="btn-fluid btn-shine relative mt-6 inline-block shrink-0 rounded-full bg-amber px-7 py-3.5 font-semibold text-white shadow-lg shadow-amber/25 hover:brightness-110 md:mt-0"
        >
          {ui.tryTool} <span className="arrow-nudge">{isRtl(locale) ? "←" : "→"}</span>
        </Link>
      </div>
    </section>
  );
}
