"use client";

import { useCallback, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Faq, Locale } from "@/lib/types";
import { getContent } from "@/content";
import { FieldInput } from "./FieldInput";
import {
  EDITABLE_PAGES,
  LOCALES,
  LOCALE_LABELS,
  PAGE_FAQ_FIELD,
  type AdminLocale,
} from "./schema";

/**
 * Editing the parts of a fixed page that change without the page changing:
 * its FAQ block, and which case studies it puts forward.
 *
 * Both used to be settled in the codebase. The copy still lives there and still
 * decides what a page shows until something is saved here — so this panel opens
 * showing exactly what the live page shows, and saving is what takes it over.
 * Editors should never have to retype the current state in order to remove one
 * line of it.
 */

type Study = { slug: string; public_name: string; sector: string };

const emptyByLocale = <T,>(make: () => T) => {
  const out = {} as Record<AdminLocale, T>;
  for (const l of LOCALES) out[l] = make();
  return out;
};

/** What the page shows today with nothing saved: the copy in src/content. */
function builtInFaqs(page: string, locale: AdminLocale): Faq[] {
  const c = getContent(locale as Locale);
  if (page === "home") return c.pages.home.faqs;
  return c.sectors.find((s) => s.slug === page)?.faqs ?? [];
}

type Status = { tone: "ok" | "bad" | "busy"; text: string } | null;

export function PagesPanel({
  db,
  status,
  setStatus,
}: {
  db: SupabaseClient;
  status: Status;
  setStatus: (s: Status) => void;
}) {
  const [page, setPage] = useState<string | null>(null);
  const [locale, setLocale] = useState<AdminLocale>("en");
  const [faqs, setFaqs] = useState<Record<AdminLocale, Faq[]>>(() => emptyByLocale<Faq[]>(() => []));
  const [picks, setPicks] = useState<string[]>([]);
  const [studies, setStudies] = useState<Study[]>([]);
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);
  // window.confirm is suppressed in embedded browsers, and a suppressed confirm
  // returns false, so the guarded actions silently did nothing. Asked in-page.
  const [ask, setAsk] = useState<{ text: string; confirmLabel: string; onYes: () => void } | null>(null);

  const meta = EDITABLE_PAGES.find((p) => p.key === page);

  /** The case studies available to choose from, and the automatic set. */
  const loadStudies = useCallback(async () => {
    const { data } = await db
      .from("case_studies")
      .select("slug,public_name,sector")
      .eq("locale", "en")
      .order("sort_order", { ascending: true });
    setStudies((data as Study[]) ?? []);
    return (data as Study[]) ?? [];
  }, [db]);

  const open = useCallback(
    async (key: string) => {
      setStatus(null);
      setPage(key);
      setLocale("en");
      setDirty(false);

      const all = studies.length ? studies : await loadStudies();

      const { data: faqRows } = await db.from("page_faqs").select("locale,faqs").eq("page", key);
      const next = emptyByLocale<Faq[]>(() => []);
      const rows = (faqRows as { locale: AdminLocale; faqs: Faq[] | null }[]) ?? [];
      for (const l of LOCALES) {
        const row = rows.find((r) => r.locale === l);
        // No row means the built-in list is what visitors see, so that is what
        // the editor must show.
        next[l] = row ? (row.faqs ?? []) : builtInFaqs(key, l);
      }
      setFaqs(next);
      setSaved(rows.length > 0);

      const { data: caseRow } = await db.from("page_cases").select("slugs").eq("page", key).maybeSingle();
      const chosen = ((caseRow as { slugs: string[] | null } | null)?.slugs ?? []).filter(Boolean);
      // With nothing saved, show what the page shows today: the home page
      // features the first three studies overall, a sector page the first
      // three tagged with it.
      const automatic =
        key === "home" ? all.slice(0, 3) : all.filter((s) => s.sector === key).slice(0, 3);
      setPicks(chosen.length ? chosen : automatic.map((s) => s.slug));
    },
    [db, loadStudies, setStatus, studies],
  );

  // No mount-time prefetch: the study list is only needed once a page is
  // opened, and open() fetches it then. Loading it from an effect would be a
  // setState in an effect body for data nothing is showing yet.

  const save = async () => {
    if (!page || !meta) return;
    setStatus({ tone: "busy", text: "Saving…" });

    // All three languages are written together. Saving only the one on screen
    // would leave the others reading built-in copy, so an edit made here would
    // show in English and quietly not in French.
    const rows = LOCALES.map((l) => ({
      page,
      locale: l,
      faqs: faqs[l].filter((f) => String(f.q ?? "").trim() || String(f.a ?? "").trim()),
    }));
    const { error } = await db.from("page_faqs").upsert(rows, { onConflict: "page,locale" });
    if (error) return setStatus({ tone: "bad", text: error.message });

    if (meta.cases) {
      const { error: caseError } = await db
        .from("page_cases")
        .upsert({ page, slugs: picks }, { onConflict: "page" });
      if (caseError) return setStatus({ tone: "bad", text: caseError.message });
    }

    setSaved(true);
    setDirty(false);
    setStatus({ tone: "ok", text: "Saved. Live within a minute." });
  };

  /** Back to the built-in copy: drop the rows rather than blanking them. */
  const reset = () => {
    if (!page) return;
    const key = page;
    setAsk({
      text: "Put this page back to the built-in FAQs and the automatic case studies?",
      confirmLabel: "Reset",
      onYes: async () => {
        setStatus({ tone: "busy", text: "Resetting…" });
        await db.from("page_faqs").delete().eq("page", key);
        await db.from("page_cases").delete().eq("page", key);
        setDirty(false);
        setStatus({ tone: "ok", text: "Back to the built-in copy." });
        await open(key);
      },
    });
  };

  /** Runs `next`, asking first if there is unsaved work. */
  const guard = (next: () => void) => {
    if (!dirty) return next();
    setAsk({ text: "Discard unsaved changes?", confirmLabel: "Discard", onYes: next });
  };

  const chosen = picks
    .map((slug) => studies.find((s) => s.slug === slug))
    .filter((s): s is Study => s !== undefined);
  const available = studies.filter((s) => !picks.includes(s.slug));

  const move = (from: number, to: number) => {
    if (to < 0 || to >= picks.length) return;
    const next = [...picks];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    setPicks(next);
    setDirty(true);
  };

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[19rem_1fr]">
      <aside>
        <p className="px-1 pb-3 text-xs font-semibold uppercase tracking-wide text-ink/45">Pages</p>
        <ul className="space-y-1.5">
          {EDITABLE_PAGES.map((p) => (
            <li key={p.key}>
              <button
                onClick={() => guard(() => void open(p.key))}
                className={`w-full rounded-2xl px-3.5 py-2.5 text-start text-sm transition-all duration-300 ${
                  page === p.key
                    ? "bg-forest text-white shadow-lg shadow-forest/20"
                    : "border border-transparent bg-white/60 hover:-translate-y-0.5 hover:border-mint hover:bg-white hover:shadow-md hover:shadow-forest/5"
                }`}
              >
                <span className="block font-semibold">{p.label}</span>
                <span className={`block text-xs ${page === p.key ? "text-white/60" : "text-ink/45"}`}>
                  {p.cases ? "FAQs · case studies" : "FAQs"}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <section>
        {!page || !meta ? (
          <div className="admin-in rounded-[1.75rem] border border-dashed border-mint bg-white/50 py-24 text-center">
            <p className="font-display text-lg font-bold text-forest">Nothing open</p>
            <p className="mt-2 text-sm text-ink/55">Pick a page on the left.</p>
          </div>
        ) : (
          <>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <button
                onClick={() =>
                  guard(() => {
                    setPage(null);
                    setDirty(false);
                    setStatus(null);
                  })
                }
                className="rounded-full border border-mint bg-white px-4 py-2 text-sm font-bold text-ink/60 hover:border-fern hover:text-forest"
              >
                ← Back
              </button>
              <span className="font-display text-sm font-bold text-forest">{meta.label}</span>
              <span className="rounded-full bg-mint px-3 py-1 text-xs font-semibold text-forest">
                {saved ? "Edited here" : "Built-in copy"}
              </span>
            </div>

            <div className="admin-in mb-6 flex flex-wrap gap-1 rounded-full border border-mint/70 bg-white/80 p-1 shadow-sm shadow-forest/5">
              {LOCALES.map((l) => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className={`rounded-full px-4 py-1.5 text-sm font-bold transition-colors ${
                    locale === l ? "bg-forest text-white" : "text-ink/60 hover:bg-mint"
                  }`}
                >
                  {LOCALE_LABELS[l]}
                </button>
              ))}
              <span className="ms-auto self-center pe-3 text-xs text-ink/45">
                All three save together
              </span>
            </div>

            <div className="admin-in rounded-[1.75rem] border border-mint bg-white/90 p-6 shadow-xl shadow-forest/5 backdrop-blur-sm sm:p-8">
              <FieldInput
                field={PAGE_FAQ_FIELD}
                value={faqs[locale]}
                onChange={(v) => {
                  setFaqs({ ...faqs, [locale]: v as Faq[] });
                  setDirty(true);
                }}
              />
            </div>

            {meta.cases && (
              <div className="admin-in mt-6 rounded-[1.75rem] border border-mint bg-white/90 p-6 shadow-xl shadow-forest/5 backdrop-blur-sm sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-wide text-forest">
                  Case studies on this page
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-ink/60">
                  Shown in this order. Studies from any sector can be used, so a media page can
                  put forward work tagged elsewhere while it builds up its own.
                </p>

                <ol className="mt-4 space-y-2">
                  {chosen.map((s, i) => (
                    <li
                      key={s.slug}
                      className="flex items-center gap-3 rounded-xl border border-mint px-3 py-2"
                    >
                      <span className="font-display text-xs font-bold text-amber">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-forest">
                          {s.public_name}
                        </span>
                        <span className="block truncate text-xs text-ink/45">
                          {s.sector} · {s.slug}
                        </span>
                      </span>
                      <button
                        onClick={() => move(i, i - 1)}
                        disabled={i === 0}
                        aria-label="Move up"
                        className="rounded-lg px-2 py-1 text-sm text-ink/50 hover:bg-mint disabled:opacity-30"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => move(i, i + 1)}
                        disabled={i === chosen.length - 1}
                        aria-label="Move down"
                        className="rounded-lg px-2 py-1 text-sm text-ink/50 hover:bg-mint disabled:opacity-30"
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => {
                          setPicks(picks.filter((x) => x !== s.slug));
                          setDirty(true);
                        }}
                        className="rounded-lg px-2 py-1 text-xs font-bold text-ink/50 hover:bg-red-50 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                  {chosen.length === 0 && (
                    <li className="rounded-xl bg-cream px-3 py-4 text-sm text-ink/50">
                      None chosen: the page will hide its case-study section.
                    </li>
                  )}
                </ol>

                {available.length > 0 && (
                  <>
                    <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-ink/45">Add</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {available.map((s) => (
                        <button
                          key={s.slug}
                          onClick={() => {
                            setPicks([...picks, s.slug]);
                            setDirty(true);
                          }}
                          className="rounded-full border border-mint px-3 py-1.5 text-xs font-semibold text-ink/70 hover:border-fern hover:text-forest"
                        >
                          + {s.public_name}
                          <span className="ms-1.5 text-ink/40">{s.sector}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="sticky bottom-0 z-10 mt-5 flex items-center gap-3 border-t border-mint/70 bg-cream/85 py-4 backdrop-blur-xl">
              <button
                onClick={() => void save()}
                className="btn-shine relative overflow-hidden rounded-full bg-amber px-7 py-2.5 text-sm font-bold text-white transition-all hover:brightness-110 hover:shadow-lg hover:shadow-amber/30"
              >
                Save
              </button>
              {dirty && (
                <span className="rounded-full bg-amber/15 px-3 py-1.5 text-xs font-semibold text-amber">
                  Unsaved changes
                </span>
              )}
              {status && (
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    status.tone === "bad"
                      ? "bg-red-50 text-red-700 ring-1 ring-red-200"
                      : status.tone === "busy"
                        ? "bg-mint text-ink/60"
                        : "bg-fern/12 text-fern"
                  }`}
                >
                  {status.text}
                </span>
              )}
              {saved && (
                <button
                  onClick={() => void reset()}
                  className="ms-auto rounded-full border border-mint px-5 py-2.5 text-sm font-bold text-ink/60 hover:border-fern hover:text-forest"
                >
                  Reset to built-in
                </button>
              )}
            </div>
          </>
        )}
      </section>

      {ask && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center bg-forest/50 p-6 backdrop-blur-md"
        >
          <div className="admin-in w-full max-w-md rounded-[1.75rem] border border-mint bg-white p-7 shadow-2xl shadow-forest/30">
            <p className="font-display text-base font-bold leading-snug text-forest">{ask.text}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                autoFocus
                onClick={() => {
                  const run = ask.onYes;
                  setAsk(null);
                  run();
                }}
                className="rounded-full bg-amber px-5 py-2.5 text-sm font-bold text-white hover:brightness-110"
              >
                {ask.confirmLabel}
              </button>
              <button
                onClick={() => setAsk(null)}
                className="rounded-full border border-mint px-5 py-2.5 text-sm font-bold text-ink/60 hover:border-fern hover:text-forest"
              >
                Keep editing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
