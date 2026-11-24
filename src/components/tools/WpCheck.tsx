"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/lib/types";
import type { CheckStatus } from "@/lib/seo-audit";
import type { WpCheckResult } from "@/lib/wp-check";
import { href } from "@/lib/i18n";
import { getMoreTool } from "@/content/more-tools";
import { WP_SLUG } from "@/content/more-tools/wp";
import { ConsultationLink } from "@/components/ConsultationLink";
import { ToolLead } from "./Tools";

const field =
  "w-full rounded-xl border border-mint bg-white px-3.5 py-3 text-base text-ink outline-none transition-colors focus:border-amber focus:ring-2 focus:ring-amber/30";
const panel = "rounded-3xl border border-mint bg-white p-6 shadow-xl shadow-forest/5 sm:p-8";
const button =
  "btn-fluid rounded-full bg-amber px-7 py-3.5 font-semibold text-white shadow-lg shadow-amber/25 transition hover:brightness-110 disabled:opacity-60";
const tone: Record<CheckStatus, string> = {
  pass: "bg-fern/12 text-fern",
  warn: "bg-amber/15 text-amber",
  fail: "bg-red-50 text-red-600",
};
const icon: Record<CheckStatus, string> = { pass: "✓", warn: "!", fail: "✕" };
const ORDER: CheckStatus[] = ["fail", "warn", "pass"];

/** The WordPress security check: one address in, a graded list of what is open. */
export function WpCheckTool({ locale }: { locale: Locale }) {
  const labels = getMoreTool(locale, WP_SLUG)?.labels ?? {};
  const t = (key: string) => labels[key] ?? "";
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<WpCheckResult | null>(null);

  async function run(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim() || busy) return;
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/wp-check/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const body = await res.json();
      if (!res.ok) setError(t(`err.${body?.error}`) || t("err.unreachable"));
      else setResult(body as WpCheckResult);
    } catch {
      setError(t("err.unreachable"));
    }
    setBusy(false);
  }

  const count = (s: CheckStatus) => result?.checks.filter((c) => c.status === s).length ?? 0;
  const gradeTone = !result ? "" : result.score >= 75 ? "text-fern" : result.score >= 60 ? "text-amber" : "text-red-600";
  const summary = result
    ? `WordPress security check of ${result.finalUrl}: grade ${result.grade} (${result.score}/100). Open: ${
        result.checks.filter((c) => c.status === "fail").map((c) => c.id).join(", ") || "none"
      }. To tighten: ${result.checks.filter((c) => c.status === "warn").map((c) => c.id).join(", ") || "none"}.`
    : "";

  return (
    <div>
      <form onSubmit={run} className={panel}>
        <label className="block text-sm font-semibold text-forest" htmlFor="wp-url">
          {t("label")}
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <input
            id="wp-url"
            className={field}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={t("placeholder")}
            inputMode="url"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            dir="ltr"
          />
          <button type="submit" disabled={busy} className={`${button} shrink-0`}>
            {busy ? t("running") : t("run")}
          </button>
        </div>
        {error && (
          <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        )}
        {busy && (
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-mint">
            <div className="h-full w-full animate-pulse rounded-full bg-gradient-to-r from-fern to-amber" />
          </div>
        )}
      </form>

      {result && !result.isWordPress && (
        <div className={`${panel} mt-8`} aria-live="polite">
          <h3 className="font-display text-xl font-bold text-forest">{t("notWp.title")}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/75">{t("notWp.body")}</p>
          <Link href={href(locale, "/tools/seo-audit/")} className={`${button} mt-5 inline-block`}>
            {t("notWp.cta")}
          </Link>
        </div>
      )}

      {result?.isWordPress && (
        <div className="mt-8" aria-live="polite">
          <div className={`${panel} grid items-center gap-6 md:grid-cols-[auto_1fr]`}>
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-fern">{t("grade")}</p>
              <p className={`font-display text-7xl font-extrabold leading-none ${gradeTone}`} dir="ltr">
                {result.grade}
              </p>
              <p className="mt-1 text-xs text-ink/50" dir="ltr">
                {result.score}/100
              </p>
            </div>
            <div>
              <p className="break-all text-sm text-ink/60">
                {t("checked")}:{" "}
                <span className="font-semibold text-forest" dir="ltr">
                  {result.finalUrl}
                </span>
              </p>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                {(
                  [
                    ["fail", t("critical")],
                    ["warn", t("toImprove")],
                    ["pass", t("passed")],
                  ] as const
                ).map(([k, name]) => (
                  <div key={k} className={`rounded-2xl px-3 py-3 ${tone[k]}`}>
                    <p className="font-display text-2xl font-extrabold" dir="ltr">
                      {count(k)}
                    </p>
                    <p className="text-xs font-semibold">{name}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs leading-relaxed text-ink/55">{t("limits")}</p>
            </div>
          </div>

          <div className="relative mt-6 overflow-hidden rounded-3xl bg-forest p-6 text-white sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8">
            <div aria-hidden className="blob pointer-events-none absolute -end-16 -top-16 h-56 w-56 rounded-full bg-fern/40 blur-3xl" />
            <div className="relative">
              <h3 className="font-display text-xl font-bold">{t("book.title")}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/75">{t("book.sub")}</p>
            </div>
            <ConsultationLink locale={locale} className={`${button} relative mt-5 inline-block shrink-0 text-center sm:mt-0`}>
              {t("book.cta")}
            </ConsultationLink>
          </div>

          <ul className="mt-8 space-y-2">
            {ORDER.flatMap((s) => result.checks.filter((c) => c.status === s)).map((c) => {
              const detail =
                c.id === "users" && Number(c.data.count) > 0
                  ? `${c.data.count} ${t("unit.accounts")}`
                  : c.id === "version" && c.data.version
                    ? `${t("unit.version")} ${c.data.version}`
                    : null;
              return (
                <li key={c.id} className="flex gap-4 rounded-2xl border border-mint bg-white px-5 py-4">
                  <span
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${tone[c.status]}`}
                    title={t(`status.${c.status}`)}
                  >
                    <span aria-hidden>{icon[c.status]}</span>
                    <span className="sr-only">{t(`status.${c.status}`)}</span>
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-forest">{t(`c.${c.id}.name`) || c.id}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink/75">{t(c.status === "pass" ? `c.${c.id}.good` : `c.${c.id}.fix`)}</p>
                    {detail && (
                      <p className="mt-1.5 text-xs text-ink/50">
                        {t("found")}: {detail}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          <ToolLead locale={locale} source={WP_SLUG} title={t("lead.title")} sub={t("lead.sub")} summary={summary}>
            <ConsultationLink locale={locale} className={`${button} mt-5 inline-block`}>
              {t("book.cta")}
            </ConsultationLink>
          </ToolLead>
        </div>
      )}
    </div>
  );
}
