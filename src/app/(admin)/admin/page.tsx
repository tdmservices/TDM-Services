"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { asset } from "@/lib/asset-manifest";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { browserDb, isConfigured } from "@/lib/supabase";
import { FieldInput } from "./FieldInput";
import { ShatterDefs, ShatterSurface } from "@/components/Sections";
import { PagesPanel } from "./PagesPanel";
import {
  BLOG_LOCALE_FIELDS,
  BLOG_SHARED_FIELDS,
  CASE_LOCALE_FIELDS,
  CASE_SHARED_FIELDS,
  LOCALES,
  LOCALE_LABELS,
  emptyFor,
  type AdminLocale,
  type Field,
} from "./schema";

type Row = Record<string, unknown>;
type Collection = "blog" | "case-studies" | "pages";

/**
 * Both collections are edited the same way: some fields are shared by every
 * language, the rest are written per language.
 *
 * Blog posts used to be a single English row. They are keyed on (slug, locale)
 * now, like case studies, so each language is written and published
 * independently: filling in English alone puts the post on the English site
 * alone, and the other two show it only once they have been written.
 */
const COLLECTIONS = {
  blog: { table: "blog_posts", shared: BLOG_SHARED_FIELDS, perLocale: BLOG_LOCALE_FIELDS, label: "post" },
  "case-studies": {
    table: "case_studies",
    shared: CASE_SHARED_FIELDS,
    perLocale: CASE_LOCALE_FIELDS,
    label: "case study",
  },
} as const;

type Editable = Exclude<Collection, "pages">;
type Draft = Record<AdminLocale, Row>;

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);

/** Empty optional values are stored as null rather than "", so the columns stay honest. */
function clean(row: Row): Row {
  const out: Row = {};
  for (const [k, v] of Object.entries(row)) {
    if (v === "" || v === undefined) {
      out[k] = null;
      continue;
    }
    if (Array.isArray(v)) {
      out[k] = v.filter((x) =>
        typeof x === "string" ? x.trim() : Object.values(x ?? {}).some((s) => String(s ?? "").trim()),
      );
      continue;
    }
    if (v && typeof v === "object" && !Object.values(v).some((s) => String(s ?? "").trim())) {
      out[k] = null;
      continue;
    }
    out[k] = v;
  }
  return out;
}

/** The same palette the blog and portfolio cards use, so a category reads the
 *  same colour here as it does on the live site. */
const categoryColor: Record<string, string> = {
  Marketing: "bg-fern/12 text-fern",
  Media: "bg-amber/15 text-amber",
  Development: "bg-plum/12 text-plum",
  "Staff Augmentation": "bg-forest/10 text-forest",
  marketing: "bg-fern/12 text-fern",
  media: "bg-amber/15 text-amber",
  development: "bg-plum/12 text-plum",
  "staff-augmentation": "bg-forest/10 text-forest",
};

const missingRequired = (fields: Field[], row: Row) =>
  fields.filter((f) => "required" in f && f.required && !String(row[f.name] ?? "").trim()).map((f) => f.label);

// --- sign in ----------------------------------------------------------------

function SignIn({ db }: { db: SupabaseClient }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error: err } = await db.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (err) setError(err.message);
    // On success onAuthStateChange fires, which swaps this form for the editor.
  };

  const box =
    "mt-1.5 w-full rounded-xl border border-white/15 bg-white/10 px-3.5 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-amber focus:bg-white/15 focus:ring-2 focus:ring-amber/40";

  return (
    <main className="grid min-h-screen place-items-center px-6 py-16">
      <form
        onSubmit={submit}
        className="admin-sweep hero-enter relative w-full max-w-md overflow-hidden rounded-[2rem] bg-forest p-8 text-white shadow-2xl shadow-forest/25 sm:p-10"
      >
        {/* The same blooms that sit behind the site's dark sections. */}
        <div
          aria-hidden
          className="blob pointer-events-none absolute -end-24 -top-24 h-72 w-72 rounded-full bg-fern/50 blur-3xl"
        />
        <div
          aria-hidden
          className="blob-slow pointer-events-none absolute -start-20 -bottom-24 h-64 w-64 rounded-full bg-amber/25 blur-3xl"
        />

        <div className="relative">
          <Image
            src={asset("branding/logo-white.png")}
            alt="TDM"
            width={640}
            height={147}
            priority
            className="h-9 w-auto"
          />
          <p className="kicker mt-8 flex items-center gap-2.5 text-sage">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
            </span>
            Content admin
          </p>
          <h1 className="mt-3 font-display text-2xl font-bold leading-snug sm:text-3xl">
            Sign in to publish.
          </h1>
          <p className="mt-2.5 text-sm leading-relaxed text-white/65">
            Posts and case studies go live within a minute of saving. No deploy needed.
          </p>
        </div>

        {error && (
          <p className="relative mt-6 rounded-xl border border-red-300/40 bg-red-500/15 px-3 py-2 text-sm text-red-100">
            {error}
          </p>
        )}

        <label className="relative mt-6 block text-[0.72rem] font-bold uppercase tracking-[0.09em] text-sage">
          Email
          <input className={box} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
        </label>
        <label className="relative mt-4 block text-[0.72rem] font-bold uppercase tracking-[0.09em] text-sage">
          Password
          <input
            className={box}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </label>

        <button
          type="submit"
          disabled={busy}
          className="btn-fluid btn-shine relative mt-7 w-full rounded-full bg-amber py-3.5 text-sm font-bold text-white hover:brightness-110 disabled:opacity-60"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}

// --- admin ------------------------------------------------------------------

export default function AdminPage() {
  const configured = isConfigured();
  const db = useMemo(() => (configured ? browserDb() : null), [configured]);

  const [session, setSession] = useState<Session | null>(null);
  // Derived, not stored: with no database configured there is nothing to wait
  // for, so readiness is a fact about the inputs rather than another state
  // update fired synchronously from the effect.
  const [checked, setChecked] = useState(false);
  const ready = !db || checked;

  const [collection, setCollection] = useState<Collection>("blog");
  const [locale, setLocale] = useState<AdminLocale>("en");
  const [data, setData] = useState<Record<Editable, Record<AdminLocale, Row[]>>>({
    blog: { en: [], fr: [], ar: [] },
    "case-studies": { en: [], fr: [], ar: [] },
  });
  const [selected, setSelected] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [status, setStatus] = useState<{ tone: "ok" | "bad" | "busy"; text: string } | null>(null);
  const [dirty, setDirty] = useState(false);
  const [ask, setAsk] = useState<{
    text: string;
    confirmLabel: string;
    onYes: () => void;
    /** A second, wider-reaching choice, e.g. deleting every language at once. */
    altLabel?: string;
    onAlt?: () => void;
  } | null>(null);

  const load = useCallback(async () => {
    if (!db) return;
    setStatus({ tone: "busy", text: "Loading…" });
    const [posts, studies] = await Promise.all([
      db.from("blog_posts").select("*").order("sort_order"),
      db.from("case_studies").select("*").order("sort_order"),
    ]);
    if (posts.error || studies.error) {
      setStatus({ tone: "bad", text: posts.error?.message ?? studies.error?.message ?? "Load failed" });
      return;
    }
    const empty = (): Record<AdminLocale, Row[]> => ({ en: [], fr: [], ar: [] });
    const next = { blog: empty(), "case-studies": empty() } as Record<Editable, Record<AdminLocale, Row[]>>;
    // A blog_posts row has no locale until the migration has been run against
    // this database; those rows are the English ones.
    for (const row of posts.data ?? []) next.blog[((row as Row).locale as AdminLocale) ?? "en"]?.push(row as Row);
    for (const row of studies.data ?? []) next["case-studies"][(row as Row).locale as AdminLocale]?.push(row as Row);
    setData(next);
    const count = (c: Editable) => new Set(LOCALES.flatMap((l) => next[c][l].map((r) => String(r.slug)))).size;
    setStatus({ tone: "ok", text: `${count("blog")} posts · ${count("case-studies")} case studies` });
  }, [db]);

  useEffect(() => {
    if (!db) return;
    // Loading happens in the auth callbacks rather than in a second effect
    // keyed on the session: the data depends on being signed in, not on a
    // render, and this keeps the fetch out of the render cycle.
    db.auth.getSession().then(({ data: got }) => {
      setSession(got.session);
      setChecked(true);
      if (got.session) void load();
    });
    const { data: sub } = db.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      if (next) void load();
    });
    return () => sub.subscription.unsubscribe();
  }, [db, load]);

  if (!ready) return <main className="min-h-screen" />;

  if (!configured || !db) {
    return (
      <main className="mx-auto max-w-lg px-6 py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-forest">Database not configured</h1>
        <p className="mt-3 text-sm leading-relaxed text-ink/70">
          Set <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in{" "}
          <code>.env.local</code>, and in the Vercel project settings. See <code>supabase/README.md</code>.
        </p>
      </main>
    );
  }

  if (!session) return <SignIn db={db} />;

  const editable: Editable = collection === "case-studies" ? "case-studies" : "blog";
  const spec = COLLECTIONS[editable];
  const fields: Field[] = [...spec.shared, ...spec.perLocale];
  const byLocale = data[editable];

  /** A language counts as written when its required fields are filled in. */
  const written = (row: Row) => missingRequired(fields, clean(row)).length === 0;

  // One entry per slug across all languages, so something that exists only in
  // English is still listed while French is selected — that is where you go to
  // add the translation.
  //
  // The English row is written last because a Map keeps the last value for a
  // key: the list is a stable index of what exists, so it is labelled in one
  // language rather than changing script depending on which translations happen
  // to have been written.
  const listed = new Map<string, Row>();
  for (const l of LOCALES) if (l !== "en") for (const r of byLocale[l]) listed.set(String(r.slug), r);
  for (const r of byLocale.en) listed.set(String(r.slug), r);
  const rows: Row[] = [...listed.values()].sort(
    (a, b) => Number(a.sort_order ?? 99) - Number(b.sort_order ?? 99),
  );

  const uniqueSlugs = (c: Editable) =>
    new Set(LOCALES.flatMap((l) => data[c][l].map((r) => String(r.slug)))).size;
  const counts = { blog: uniqueSlugs("blog"), cases: uniqueSlugs("case-studies") };

  const current: Row = draft ? draft[locale] : {};

  /**
   * Runs `next`, asking first if there is unsaved work.
   *
   * This used to call window.confirm. Browsers suppress those dialogs in
   * embedded and automated contexts, and a suppressed confirm returns false, so
   * Back and Cancel silently did nothing exactly where they were needed most.
   * The question is asked in the page instead, where it cannot be blocked.
   */
  const guard = (next: () => void) => {
    if (!dirty) return next();
    setAsk({ text: "Discard unsaved changes?", confirmLabel: "Discard", onYes: next });
  };

  const closeDraft = () => {
    setSelected(null);
    setDraft(null);
    setDirty(false);
  };

  const goBack = () =>
    guard(() => {
      closeDraft();
      setStatus(null);
    });

  const select = (slug: string) =>
    guard(() => {
    setSelected(slug);
    setDirty(false);
    // A language with no row of its own starts from the shared values of one
    // that has, so only the translation itself has to be typed.
    const source = (LOCALES.map((l) => byLocale[l].find((r) => String(r.slug) === slug)).find(Boolean) ?? {}) as Row;
    const shared: Row = {};
    for (const f of spec.shared) shared[f.name] = source[f.name];
    const next = {} as Draft;
    for (const l of LOCALES) {
      const row = byLocale[l].find((r) => String(r.slug) === slug);
      next[l] = row ? { ...row } : { ...shared, ...emptyFor(spec.perLocale), locale: l };
    }
    setDraft(next);
    });

  const startNew = () =>
    guard(() => {
    setSelected(null);
    setDirty(true);
    const shared = emptyFor(spec.shared);
    if (editable === "blog") shared.published_on = new Date().toISOString().slice(0, 10);
    const next = {} as Draft;
    for (const l of LOCALES) next[l] = { ...shared, ...emptyFor(spec.perLocale), locale: l };
    setDraft(next);
    });

  const setValue = (name: string, value: unknown) => {
    if (!draft) return;
    setDirty(true);
    // Shared fields go to all three rows, so translations cannot drift apart on
    // slug, order, category or the real client name.
    const isShared = spec.shared.some((f) => f.name === name);
    const next = { ...draft };
    for (const l of LOCALES) if (isShared || l === locale) next[l] = { ...next[l], [name]: value };
    setDraft(next);
  };

  const save = async () => {
    if (!draft) return;
    try {
      // Only the languages actually filled in are written. The others are not
      // published at all, rather than being filled with a stand-in.
      const done = LOCALES.filter((l) => written(draft[l]));
      if (done.length === 0) {
        const missing = missingRequired(fields, clean(draft[locale]));
        return setStatus({ tone: "bad", text: `Still needed: ${missing.join(", ")}` });
      }

      const slug = slugify(String(draft[done[0]].slug));
      setStatus({ tone: "busy", text: "Saving…" });

      // A renamed slug is a new row; drop the old one so the post is not
      // published twice under two names.
      if (selected && selected !== slug) await db.from(spec.table).delete().eq("slug", selected);
      // A language that was filled in and then emptied is removed rather than
      // left behind as a half-written row.
      const dropped = LOCALES.filter((l) => !done.includes(l));
      if (dropped.length) await db.from(spec.table).delete().eq("slug", slug).in("locale", dropped);

      const payload = done.map((l) => ({ ...clean(draft[l]), slug, locale: l }));
      const { error } = await db.from(spec.table).upsert(payload, { onConflict: "slug,locale" });
      if (error) return setStatus({ tone: "bad", text: error.message });

      setSelected(slug);
      await load();
      setDirty(false);
      setStatus({
        tone: "ok",
        text: `Saved in ${done.map((l) => LOCALE_LABELS[l]).join(", ")}. Live within a minute.`,
      });
    } catch (err) {
      setStatus({ tone: "bad", text: (err as Error).message });
    }
  };

  /**
   * Delete acts on the language you are looking at.
   *
   * Each language is its own site, so deleting the Arabic version takes the
   * post off the Arabic site and leaves the others alone. Removing every
   * language at once is still offered, as the second choice rather than the
   * only one.
   */
  const remove = () => {
    if (!selected) return;
    const slug = selected;
    const langs = LOCALES.filter((l) => byLocale[l].some((r) => String(r.slug) === slug));

    const wipe = async (targets: AdminLocale[]) => {
      setStatus({ tone: "busy", text: "Deleting…" });
      const query = db.from(spec.table).delete().eq("slug", slug);
      const { error } = await (targets.length === LOCALES.length
        ? query
        : query.in("locale", targets));
      if (error) return setStatus({ tone: "bad", text: error.message });

      const left = langs.filter((l) => !targets.includes(l));
      closeDraft();
      await load();
      setStatus({
        tone: "ok",
        text: left.length
          ? `Deleted the ${targets.map((l) => LOCALE_LABELS[l]).join(", ")} version. Still published in ${left
              .map((l) => LOCALE_LABELS[l])
              .join(", ")}.`
          : "Deleted.",
      });
    };

    // With only one language written, deleting it is deleting the thing, so
    // there is no second option to offer.
    if (langs.length <= 1) {
      setAsk({
        text: `Delete “${slug}”? This cannot be undone.`,
        confirmLabel: "Delete",
        onYes: () => void wipe(LOCALES.slice()),
      });
      return;
    }

    setAsk({
      text: `Delete “${slug}” in ${LOCALE_LABELS[locale]}? It is removed from the ${LOCALE_LABELS[locale]} site only, and stays published in the other languages.`,
      confirmLabel: `Delete ${LOCALE_LABELS[locale]}`,
      onYes: () => void wipe([locale]),
      altLabel: "Delete all languages",
      onAlt: () => void wipe(LOCALES.slice()),
    });
  };

  const tab = (active: boolean) =>
    `rounded-full px-4 py-1.5 text-sm font-bold transition-colors ${active ? "bg-forest text-white" : "text-ink/60 hover:bg-mint"}`;

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-mint/70 bg-cream/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-6 py-3.5">
          <span className="flex items-center gap-3">
            <Image src={asset("branding/logo.png")} alt="TDM" width={640} height={147} priority className="h-7 w-auto" />
            <span className="hidden text-[0.7rem] font-bold uppercase tracking-[0.14em] text-fern sm:inline">
              Content
            </span>
          </span>

          <div className="flex gap-1 rounded-full border border-mint/70 bg-white/80 p-1 shadow-sm shadow-forest/5">
            {(["blog", "case-studies", "pages"] as Collection[]).map((c) => (
              <button
                key={c}
                className={tab(collection === c)}
                onClick={() =>
                  guard(() => {
                    setCollection(c);
                    closeDraft();
                  })
                }
              >
                {c === "blog" ? "Blog posts" : c === "case-studies" ? "Case studies" : "Pages"}
              </button>
            ))}
          </div>

          <div className="ms-auto flex items-center gap-3">
            {status && (
              <span
                className={`text-xs font-semibold ${
                  status.tone === "bad" ? "text-red-600" : status.tone === "busy" ? "text-ink/50" : "text-fern"
                }`}
              >
                {status.text}
              </span>
            )}
            <button
              onClick={() => db.auth.signOut()}
              className="rounded-full border border-mint bg-white/80 px-4 py-2 text-sm font-bold text-ink/60 transition-colors hover:border-fern hover:text-forest"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* The band gives the tool a front door: the same dark ground, drifting
          blooms and glass tiles the site opens its own sections with. Without
          it the page went straight from a thin bar into a field of white
          cards, which is what made it read as unfinished. */}
      <section className="relative overflow-hidden bg-forest text-white">
        <div
          aria-hidden
          className="blob pointer-events-none absolute -start-28 -top-40 h-96 w-96 rounded-full bg-fern/45 blur-3xl"
        />
        <div
          aria-hidden
          className="blob-slow pointer-events-none absolute end-[14%] -bottom-44 h-80 w-80 rounded-full bg-amber/20 blur-3xl"
        />
        <div className="relative mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-x-8 gap-y-6 px-6 py-9">
          <div className="admin-in">
            <p className="kicker kicker-pill inline-flex items-center gap-2.5 rounded-full bg-white/10 px-4 py-1.5 text-sage">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
              </span>
              {collection === "blog" ? "Blog posts" : collection === "case-studies" ? "Case studies" : "Pages"}
            </p>
            <h1 className="mt-4 font-display text-2xl font-bold leading-snug md:text-3xl">
              Everything you publish, in one place.
            </h1>
            <div className="mt-4 h-1 w-14 rounded-full bg-amber" />
          </div>

          <div className="admin-in flex flex-wrap gap-3" style={{ "--in-delay": "0.12s" } as React.CSSProperties}>
            {[
              { value: counts.blog, label: "Posts" },
              { value: counts.cases, label: "Case studies" },
              { value: LOCALES.length, label: "Languages" },
            ].map((t) => (
              <div key={t.label} className="glass card-lift rounded-2xl px-5 py-3.5 text-center">
                <p className="font-display text-2xl font-bold text-amber">{t.value}</p>
                <p className="mt-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white/60">
                  {t.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ShatterDefs />

      {collection === "pages" ? (
        <PagesPanel db={db} status={status} setStatus={setStatus} />
      ) : (
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[19rem_1fr]">
          <aside>
            <button
              onClick={startNew}
              className="btn-shine admin-in relative w-full overflow-hidden rounded-full border-2 border-amber bg-amber/10 px-4 py-3 text-sm font-bold text-forest transition-colors hover:bg-amber hover:text-white"
            >
              + New {spec.label}
            </button>
            <ul className="mt-4 space-y-1.5">
              {rows.map((r, i) => {
                const slug = String(r.slug);
                const langs = LOCALES.filter((l) => byLocale[l].some((x) => String(x.slug) === slug));
                return (
                  <li key={slug} className="admin-in" style={{ "--in-delay": `${Math.min(i, 12) * 0.035}s` } as React.CSSProperties}>
                    <button
                      onClick={() => select(slug)}
                      className={`group relative isolate w-full overflow-hidden rounded-2xl px-4 py-3 text-start text-sm transition-all duration-300 ${
                        selected === slug
                          ? "bg-forest text-white shadow-lg shadow-forest/25"
                          : "border border-transparent hover:-translate-y-0.5 hover:border-fern hover:shadow-lg hover:shadow-forest/10"
                      }`}
                    >
                      {/* The site's faceted card surface: shards at rest that
                          close up as the pointer arrives. */}
                      {selected !== slug && <ShatterSurface index={i} />}

                      <span className="relative flex items-center gap-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wide ${
                            selected === slug
                              ? "bg-white/15 text-white/85"
                              : (categoryColor[String(r.category ?? r.sector ?? "")] ?? "bg-mint text-forest")
                          }`}
                        >
                          {String(r.category ?? r.sector ?? "—")}
                        </span>
                        <span className={`text-[0.68rem] ${selected === slug ? "text-white/45" : "text-ink/35"}`}>
                          #{String(r.sort_order ?? "-")}
                        </span>
                      </span>

                      <span className="relative mt-1.5 block truncate font-semibold leading-snug">
                        {String(r.title ?? r.public_name ?? slug)}
                      </span>

                      {/* Which languages exist, at a glance: filled is written,
                          hollow is still to do. */}
                      <span className="relative mt-2 flex gap-1.5">
                        {LOCALES.map((l) => {
                          const has = langs.includes(l);
                          return (
                            <span
                              key={l}
                              title={`${LOCALE_LABELS[l]}: ${has ? "written" : "not written"}`}
                              className={`rounded-md px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide transition-colors ${
                                has
                                  ? selected === slug
                                    ? "bg-amber text-white"
                                    : "bg-fern/15 text-fern"
                                  : selected === slug
                                    ? "text-white/30 ring-1 ring-inset ring-white/20"
                                    : "text-ink/30 ring-1 ring-inset ring-mint"
                              }`}
                            >
                              {l}
                            </span>
                          );
                        })}
                      </span>
                    </button>
                  </li>
                );
              })}
              {rows.length === 0 && (
                <li className="rounded-2xl border border-dashed border-mint px-3 py-8 text-center text-sm text-ink/50">
                  Nothing here yet.
                </li>
              )}
            </ul>
          </aside>

          <section>
            {!draft ? (
              <div className="admin-in rounded-[1.75rem] border border-dashed border-mint bg-white/50 py-24 text-center">
                <p className="font-display text-lg font-bold text-forest">Nothing open</p>
                <p className="mt-2 text-sm text-ink/55">Pick something on the left, or start a new one.</p>
              </div>
            ) : (
              <>
                {/* The way out, at the top where the eye already is. The form runs
                    well past a screen, so a control at its foot is not a way back
                    from a field near the head of it. */}
                <div className="admin-in mb-5 flex items-center gap-3">
                  <button
                    onClick={goBack}
                    className="group rounded-full border border-mint bg-white/80 px-4 py-2 text-sm font-bold text-ink/60 transition-colors hover:border-fern hover:text-forest"
                  >
                    <span className="inline-block transition-transform duration-300 group-hover:-translate-x-0.5">←</span> Back
                  </button>
                  <span className="truncate font-display text-sm font-bold text-forest">
                    {selected ? selected : `New ${spec.label}`}
                  </span>
                </div>

                <div className="admin-in mb-6 flex flex-wrap gap-1 rounded-full border border-mint/70 bg-white/80 p-1 shadow-sm shadow-forest/5">
                  {LOCALES.map((l) => (
                    <button key={l} className={tab(locale === l)} onClick={() => setLocale(l)}>
                      {LOCALE_LABELS[l]}
                      {!written(draft[l]) && <span className="ms-1.5 text-amber">•</span>}
                    </button>
                  ))}
                  <span className="ms-auto self-center pe-3 text-xs text-ink/45">
                    Each language publishes on its own site only
                  </span>
                </div>

                <div
                  className="admin-in space-y-5 rounded-[1.75rem] border border-mint bg-white/90 p-6 shadow-xl shadow-forest/5 backdrop-blur-sm sm:p-8"
                  style={{ "--in-delay": "0.06s" } as React.CSSProperties}
                >
                  {fields.map((f) => (
                    <FieldInput key={f.name} field={f} value={current[f.name]} onChange={(v) => setValue(f.name, v)} />
                  ))}
                </div>

                {/* Sticks to the foot of the viewport: on a post with a long body
                    Save was several screens below whatever was being typed. */}
                <div className="sticky bottom-0 z-10 mt-5 flex items-center gap-3 border-t border-mint/70 bg-cream/85 py-4 backdrop-blur-xl">
                  <button
                    onClick={save}
                    className="btn-shine relative overflow-hidden rounded-full bg-amber px-7 py-2.5 text-sm font-bold text-white transition-all hover:brightness-110 hover:shadow-lg hover:shadow-amber/30"
                  >
                    Save
                  </button>
                  <button
                    onClick={goBack}
                    className="rounded-full border border-mint bg-white px-5 py-2.5 text-sm font-bold text-ink/60 hover:border-fern hover:text-forest"
                  >
                    Cancel
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
                  {/* Pushed away from the two safe buttons, so Delete is never
                      the thing you hit reaching for Cancel. */}
                  {selected && (
                    <button
                      onClick={remove}
                      className="ms-auto rounded-full border border-mint px-5 py-2.5 text-sm font-bold text-ink/60 hover:border-red-300 hover:text-red-600"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </>
            )}
          </section>
        </div>
      )}

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
              {ask.altLabel && ask.onAlt && (
                <button
                  onClick={() => {
                    const run = ask.onAlt!;
                    setAsk(null);
                    run();
                  }}
                  className="rounded-full border border-mint px-5 py-2.5 text-sm font-bold text-ink/60 hover:border-red-300 hover:text-red-600"
                >
                  {ask.altLabel}
                </button>
              )}
              <button
                onClick={() => setAsk(null)}
                className="rounded-full border border-mint px-5 py-2.5 text-sm font-bold text-ink/60 hover:border-fern hover:text-forest"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
