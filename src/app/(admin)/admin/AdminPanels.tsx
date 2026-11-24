"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Locale } from "@/lib/types";
import { getContent } from "@/content";
import { ui } from "@/content/ui";
import { Count, FieldInput } from "./FieldInput";
import { HTML_GUIDE } from "./htmlGuide";
import { LOCALES, LOCALE_LABELS, type AdminLocale, type Field } from "./schema";

/**
 * The parts of the admin that are not posts or case studies: pages published
 * as HTML, SEO titles and descriptions, redirects, leads, and the guide that
 * tells a writer how to produce HTML the site accepts.
 *
 * Each panel loads its own table when it opens and reports through the shared
 * status line in the header.
 */

type Status = { tone: "ok" | "bad" | "busy"; text: string } | null;
type PanelProps = { db: SupabaseClient; setStatus: (s: Status) => void };
type Row = Record<string, unknown>;

const shell = "mx-auto max-w-7xl px-6 py-8";
const card = "rounded-[1.75rem] border border-mint bg-white/90 p-6 shadow-xl shadow-forest/5 sm:p-8";
const input =
  "w-full rounded-xl border border-mint bg-white px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-amber focus:ring-2 focus:ring-amber/30";
const label = "block text-[0.72rem] font-bold uppercase tracking-[0.09em] text-fern";
const primary =
  "rounded-full bg-amber px-6 py-2.5 text-sm font-bold text-white transition-all hover:brightness-110 disabled:opacity-50";
const ghost =
  "rounded-full border border-mint bg-white px-4 py-2 text-sm font-bold text-ink/60 transition-colors hover:border-fern hover:text-forest";
const danger =
  "rounded-full border border-mint bg-white px-4 py-2 text-sm font-bold text-ink/60 transition-colors hover:border-red-300 hover:text-red-600";
const pill = (on: boolean) =>
  `rounded-full px-4 py-1.5 text-sm font-bold transition-colors ${on ? "bg-forest text-white" : "text-ink/55 hover:text-forest"}`;

const str = (v: unknown) => (v === null || v === undefined ? "" : String(v));

/**
 * A table's rows, loaded when the panel opens. `reload` fetches again after a
 * change; the setter is there for edits that can be applied without a refetch.
 */
function useRows(
  fetchRows: () => PromiseLike<{ data: unknown[] | null; error: { message: string } | null }>,
  setStatus: (s: Status) => void,
) {
  const [rows, setRows] = useState<Row[]>([]);

  const reload = useCallback(async () => {
    const { data, error } = await fetchRows();
    if (error) return setStatus({ tone: "bad", text: error.message });
    setRows((data ?? []) as Row[]);
  }, [fetchRows, setStatus]);

  useEffect(() => {
    let live = true;
    fetchRows().then(({ data, error }) => {
      if (!live) return;
      if (error) setStatus({ tone: "bad", text: error.message });
      else setRows((data ?? []) as Row[]);
    });
    return () => {
      live = false;
    };
  }, [fetchRows, setStatus]);

  return [rows, setRows, reload] as const;
}

function LocaleTabs({ locale, onChange }: { locale: AdminLocale; onChange: (l: AdminLocale) => void }) {
  return (
    <div className="flex w-fit gap-1 rounded-full border border-mint/70 bg-white/80 p-1">
      {LOCALES.map((l) => (
        <button key={l} className={pill(locale === l)} onClick={() => onChange(l)}>
          {LOCALE_LABELS[l]}
        </button>
      ))}
    </div>
  );
}

// --- pages --------------------------------------------------------------------

/** First path segments the site already uses; a page there would never be reached. */
const RESERVED = new Set([
  "admin", "blog", "case-studies", "about", "contact", "clients", "portfolio", "locations", "fr", "ar",
  "gone", "terms-and-conditions", "privacy-policy", "legal-notice", "tools", "api",
  "shopdetail", "category", "shop",
]);

/** "USA / Florida/ Miami " → "usa/florida/miami". */
const toPath = (raw: string) =>
  raw
    .split("/")
    .map((part) => part.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""))
    .filter(Boolean)
    .join("/");

const PAGE_FIELDS: Field[] = [
  { name: "title", label: "Page title", type: "text", required: true, hint: "Shown in the breadcrumbs, and as the main heading if the HTML has no <h1> of its own." },
  {
    name: "html",
    label: "HTML",
    type: "html",
    required: true,
    hint: "Everything between the site's header and footer. Scripts are removed; use the blocks and data attributes from the HTML guide tab for layout, animation and interactivity.",
  },
  { name: "meta_title", label: "SEO title", type: "text", limit: 60, hint: "Shown in Google and the browser tab. Falls back to the page title." },
  { name: "meta_description", label: "SEO description", type: "textarea", limit: 160 },
  { name: "published", label: "Published", type: "boolean", hint: "Off keeps the page as a draft that visitors cannot open." },
];

const emptyPage = (): Row => ({ title: "", html: "", meta_title: "", meta_description: "", published: false });

export function SitePagesPanel({ db, setStatus }: PanelProps) {
  const fetchRows = useCallback(() => db.from("site_pages").select("*").order("slug"), [db]);
  const [rows, , load] = useRows(fetchRows, setStatus);
  const [selected, setSelected] = useState<string | null>(null);
  const [path, setPath] = useState("");
  const [locale, setLocale] = useState<AdminLocale>("en");
  const [draft, setDraft] = useState<Record<AdminLocale, Row> | null>(null);
  const [filter, setFilter] = useState("");

  const slugs = useMemo(() => {
    const all = [...new Set(rows.map((r) => str(r.slug)))];
    return filter ? all.filter((s) => s.includes(filter.toLowerCase())) : all;
  }, [rows, filter]);

  const open = (slug: string | null) => {
    const next = {} as Record<AdminLocale, Row>;
    for (const l of LOCALES) next[l] = { ...emptyPage(), ...(rows.find((r) => r.slug === slug && r.locale === l) ?? {}) };
    setSelected(slug);
    setPath(slug ?? "");
    setDraft(next);
    setLocale("en");
  };

  const written = (row: Row) => str(row.title).trim() !== "" && str(row.html).trim() !== "";

  const save = async () => {
    if (!draft) return;
    const slug = toPath(path);
    if (!slug) return setStatus({ tone: "bad", text: "Give the page an address, e.g. usa/florida" });
    if (RESERVED.has(slug.split("/")[0])) {
      return setStatus({ tone: "bad", text: `“/${slug.split("/")[0]}/” is already used by the site. Pick another address.` });
    }
    const done = LOCALES.filter((l) => written(draft[l]));
    if (done.length === 0) return setStatus({ tone: "bad", text: "Still needed: a title and the HTML, in at least one language" });

    // Changing the address of a page moves it. Anything published at the old
    // address gets a permanent redirect, so links and rankings follow it.
    const moved = Boolean(selected && selected !== slug);
    if (moved && rows.some((r) => r.slug === slug)) {
      return setStatus({ tone: "bad", text: `There is already a page at /${slug}/. Pick another address.` });
    }
    const under = moved ? rows.filter((r) => str(r.slug).startsWith(`${selected}/`)) : [];
    const moveUnder =
      under.length > 0 &&
      window.confirm(
        `${new Set(under.map((r) => str(r.slug))).size} page(s) sit under /${selected}/. Move them under /${slug}/ as well? Redirects are added for the published ones.`,
      );
    const prefixOf = (l: unknown) => (l === "en" ? "" : `/${str(l)}`);
    const redirects: { source: string; destination: string; permanent: boolean; enabled: boolean; note: string }[] = [];
    const redirect = (l: unknown, from: string, to: string) =>
      redirects.push({ source: `${prefixOf(l)}/${from}/`, destination: `${prefixOf(l)}/${to}/`, permanent: true, enabled: true, note: "Added automatically when the page address changed" });
    if (moved) for (const r of rows.filter((x) => x.slug === selected && x.published)) redirect(r.locale, str(selected), slug);

    setStatus({ tone: "busy", text: "Saving…" });
    if (moved) await db.from("site_pages").delete().eq("slug", selected);
    const dropped = LOCALES.filter((l) => !done.includes(l));
    if (dropped.length) await db.from("site_pages").delete().eq("slug", slug).in("locale", dropped);

    const payload = done.map((l) => ({
      slug,
      locale: l,
      title: str(draft[l].title).trim(),
      html: str(draft[l].html),
      meta_title: str(draft[l].meta_title).trim(),
      meta_description: str(draft[l].meta_description).trim(),
      published: Boolean(draft[l].published),
    }));
    const { error } = await db.from("site_pages").upsert(payload, { onConflict: "slug,locale" });
    if (error) return setStatus({ tone: "bad", text: error.message });

    if (moveUnder) {
      for (const r of under) {
        const next = `${slug}${str(r.slug).slice(str(selected).length)}`;
        const res = await db.from("site_pages").update({ slug: next }).eq("slug", str(r.slug)).eq("locale", str(r.locale));
        if (res.error) return setStatus({ tone: "bad", text: `Saved, but /${str(r.slug)}/ could not be moved: ${res.error.message}` });
        if (r.published) redirect(r.locale, str(r.slug), next);
      }
    }
    if (redirects.length) {
      const olds = redirects.map((r) => r.source);
      // A new address must not itself be redirected away, and older redirects
      // that pointed at the old address should go straight to the new one.
      await db.from("redirects").delete().in("source", redirects.map((r) => r.destination));
      for (const r of redirects) await db.from("redirects").update({ destination: r.destination }).eq("destination", r.source);
      const res = await db.from("redirects").upsert(redirects, { onConflict: "source" });
      if (res.error) return setStatus({ tone: "bad", text: `Saved, but the redirect from ${olds[0]} could not be added: ${res.error.message}. Add it in the Redirects tab.` });
    }

    await load();
    setSelected(slug);
    setPath(slug);
    const live = payload.filter((p) => p.published).length;
    const note = redirects.length ? ` ${redirects.length} redirect${redirects.length > 1 ? "s" : ""} added from the old address.` : "";
    setStatus({ tone: "ok", text: (live ? `Saved. ${live} language${live > 1 ? "s" : ""} live within a minute.` : "Saved as a draft.") + note });
  };

  const remove = async () => {
    if (!selected || !window.confirm(`Delete /${selected}/ in every language?`)) return;
    const { error } = await db.from("site_pages").delete().eq("slug", selected);
    if (error) return setStatus({ tone: "bad", text: error.message });
    setDraft(null);
    setSelected(null);
    await load();
    setStatus({ tone: "ok", text: "Page deleted." });
  };

  const publicUrl = (l: AdminLocale) => `${l === "en" ? "" : `/${l}`}/${toPath(path)}/`;

  return (
    <div className={`${shell} grid gap-8 lg:grid-cols-[19rem_1fr]`}>
      <aside>
        <button onClick={() => open(null)} className="w-full rounded-full border-2 border-amber bg-amber/10 px-4 py-3 text-sm font-bold text-forest transition-colors hover:bg-amber hover:text-white">
          + New page
        </button>
        <input className={`${input} mt-4`} placeholder="Filter by address…" value={filter} onChange={(e) => setFilter(e.target.value)} />
        <ul className="mt-3 space-y-1.5">
          {slugs.map((slug) => {
            const mine = rows.filter((r) => r.slug === slug);
            return (
              <li key={slug}>
                <button
                  onClick={() => open(slug)}
                  className={`w-full rounded-2xl px-4 py-3 text-start text-sm transition-colors ${
                    selected === slug ? "bg-forest text-white" : "border border-transparent hover:border-fern"
                  }`}
                >
                  <span className="block truncate font-semibold">/{slug}/</span>
                  <span className="mt-1.5 flex gap-1.5">
                    {LOCALES.map((l) => {
                      const row = mine.find((r) => r.locale === l);
                      return (
                        <span
                          key={l}
                          title={row ? (row.published ? "Published" : "Draft") : "Not written"}
                          className={`rounded-md px-1.5 py-0.5 text-[0.6rem] font-bold uppercase ${
                            !row ? "text-ink/30 ring-1 ring-inset ring-mint" : row.published ? "bg-fern/15 text-fern" : "bg-amber/15 text-amber"
                          } ${selected === slug && row ? "bg-white/15 text-white" : ""}`}
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
          {slugs.length === 0 && (
            <li className="rounded-2xl border border-dashed border-mint px-3 py-8 text-center text-sm text-ink/50">No pages yet.</li>
          )}
        </ul>
      </aside>

      <section>
        {!draft ? (
          <div className="rounded-[1.75rem] border border-dashed border-mint bg-white/50 px-6 py-20 text-center">
            <p className="font-display text-lg font-bold text-forest">Publish a page from HTML</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink/55">
              Ask Claude for the page using the brief in the HTML guide tab, then paste what it gives you here. Green means published,
              amber means draft.
            </p>
          </div>
        ) : (
          <>
            <div className={card}>
              <label className={label}>
                Page address <span className="text-amber">*</span>
              </label>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="text-sm text-ink/45">thedigitalmarketing.services/</span>
                <input className={input} value={path} onChange={(e) => setPath(e.target.value)} placeholder="usa/florida/miami" dir="ltr" />
              </div>
              <p className="mt-1 text-xs text-ink/55">
                Lowercase words separated by hyphens. Use slashes for levels, e.g. <code>usa/florida/miami</code>. The same address is used in
                every language (French at /fr/…, Arabic at /ar/…). Changing the address of a published page adds a redirect from the old
                one automatically.
              </p>
            </div>

            <div className="my-5 flex flex-wrap items-center gap-3">
              <LocaleTabs locale={locale} onChange={setLocale} />
              {selected && draft[locale].published ? (
                <a href={publicUrl(locale)} target="_blank" rel="noreferrer" className={ghost}>
                  View live page ↗
                </a>
              ) : null}
              <span className="text-xs text-ink/45">Each language is published separately</span>
            </div>

            <div className={`${card} space-y-5`}>
              {PAGE_FIELDS.map((f) => (
                <FieldInput
                  key={f.name}
                  field={f}
                  value={draft[locale][f.name]}
                  onChange={(v) => setDraft({ ...draft, [locale]: { ...draft[locale], [f.name]: v } })}
                />
              ))}
            </div>

            <div className="sticky bottom-0 z-10 mt-5 flex items-center gap-3 border-t border-mint/70 bg-cream/85 py-4 backdrop-blur-xl">
              <button onClick={save} className={primary}>
                Save
              </button>
              <button onClick={() => setDraft(null)} className={ghost}>
                Close
              </button>
              {selected && (
                <button onClick={remove} className={`${danger} ms-auto`}>
                  Delete
                </button>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

// --- SEO ------------------------------------------------------------------------

type SeoRow = { path: string; group: string; name: string; title: string; description: string };

/** Every page defined in the codebase, with the title and description it has today. */
function builtInPages(locale: AdminLocale): SeoRow[] {
  const c = getContent(locale as Locale);
  const p = c.pages;
  const blog = ui[locale as Locale].blogPage;
  const rows: SeoRow[] = [
    { path: "/", group: "Main pages", name: "Home", title: p.home.metaTitle, description: p.home.metaDescription },
    { path: "/about/", group: "Main pages", name: "About", title: p.about.metaTitle, description: p.about.metaDescription },
    { path: "/contact/", group: "Main pages", name: "Contact", title: p.contact.metaTitle, description: p.contact.metaDescription },
    { path: "/clients/", group: "Main pages", name: "Clients", title: p.clientsPage.metaTitle, description: p.clientsPage.metaDescription },
    { path: "/portfolio/", group: "Main pages", name: "Portfolio", title: p.portfolioPage.metaTitle, description: p.portfolioPage.metaDescription },
    { path: "/case-studies/", group: "Main pages", name: "Case studies", title: p.caseStudiesPage.metaTitle, description: p.caseStudiesPage.metaDescription },
    { path: "/locations/", group: "Main pages", name: "Locations", title: p.locationsPage.metaTitle, description: p.locationsPage.metaDescription },
    { path: "/blog/", group: "Main pages", name: "Blog", title: blog.metaTitle, description: blog.metaDescription },
  ];
  for (const s of c.sectors) {
    rows.push({ path: `/${s.slug}/`, group: "Sectors", name: s.name, title: s.metaTitle, description: s.metaDescription });
  }
  for (const sv of c.services) {
    rows.push({ path: `/${sv.sector}/${sv.slug}/`, group: "Services", name: sv.name, title: sv.metaTitle, description: sv.metaDescription });
  }
  for (const o of c.offices) {
    rows.push({ path: `/locations/${o.slug}/`, group: "Locations", name: o.country, title: o.metaTitle, description: o.metaDescription });
  }
  return rows;
}

export function SeoPanel({ db, setStatus }: PanelProps) {
  const [locale, setLocale] = useState<AdminLocale>("en");
  const fetchRows = useCallback(() => db.from("page_meta").select("*"), [db]);
  const [saved, , load] = useRows(fetchRows, setStatus);
  const [edits, setEdits] = useState<Record<string, { title: string; description: string }>>({});
  const [openPath, setOpenPath] = useState<string | null>(null);

  const pages = useMemo(() => builtInPages(locale), [locale]);
  const override = (path: string) => saved.find((r) => r.path === path && r.locale === locale);
  const key = (path: string) => `${locale}:${path}`;
  const current = (row: SeoRow) =>
    edits[key(row.path)] ?? {
      title: str(override(row.path)?.meta_title) || row.title,
      description: str(override(row.path)?.meta_description) || row.description,
    };

  const save = async (row: SeoRow) => {
    const value = current(row);
    setStatus({ tone: "busy", text: "Saving…" });
    // Text identical to the built-in copy is not an override; store nothing for it.
    const title = value.title.trim() === row.title ? null : value.title.trim() || null;
    const description = value.description.trim() === row.description ? null : value.description.trim() || null;
    const { error } =
      title === null && description === null
        ? await db.from("page_meta").delete().eq("path", row.path).eq("locale", locale)
        : await db.from("page_meta").upsert({ path: row.path, locale, meta_title: title, meta_description: description }, { onConflict: "path,locale" });
    if (error) return setStatus({ tone: "bad", text: error.message });
    setEdits((e) => {
      const next = { ...e };
      delete next[key(row.path)];
      return next;
    });
    await load();
    setStatus({ tone: "ok", text: "Saved. Live within a minute." });
  };

  const reset = async (row: SeoRow) => {
    const { error } = await db.from("page_meta").delete().eq("path", row.path).eq("locale", locale);
    if (error) return setStatus({ tone: "bad", text: error.message });
    setEdits((e) => {
      const next = { ...e };
      delete next[key(row.path)];
      return next;
    });
    await load();
    setStatus({ tone: "ok", text: "Back to the built-in text." });
  };

  const groups = [...new Set(pages.map((r) => r.group))];

  return (
    <div className={shell}>
      <div className="flex flex-wrap items-center gap-4">
        <LocaleTabs locale={locale} onChange={setLocale} />
        <p className="text-sm text-ink/55">
          The title and description Google shows for each built-in page. Blog posts, case studies and HTML pages have these fields in their
          own editors.
        </p>
      </div>

      {groups.map((group) => (
        <div key={group} className="mt-8">
          <h2 className="font-display text-lg font-bold text-forest">{group}</h2>
          <ul className="mt-3 space-y-2">
            {pages
              .filter((r) => r.group === group)
              .map((row) => {
                const value = current(row);
                const changed = Boolean(override(row.path));
                const isOpen = openPath === row.path;
                return (
                  <li key={row.path} className="rounded-2xl border border-mint bg-white/90">
                    <button onClick={() => setOpenPath(isOpen ? null : row.path)} className="flex w-full items-center gap-3 px-5 py-3.5 text-start">
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-forest">
                          {row.name} <span className="font-normal text-ink/40">{row.path}</span>
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-ink/55">{value.title}</span>
                      </span>
                      {changed && <span className="rounded-full bg-amber/15 px-2.5 py-1 text-[0.65rem] font-bold uppercase text-amber">Edited</span>}
                      <span className={`text-xs font-bold ${value.title.length > 60 || value.description.length > 160 ? "text-red-600" : "text-fern"}`}>
                        {value.title.length}/{value.description.length}
                      </span>
                      <span className="text-ink/40">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && (
                      <div className="space-y-4 border-t border-mint px-5 py-5">
                        <div>
                          <label className={label}>SEO title</label>
                          <input
                            className={`${input} mt-1.5`}
                            value={value.title}
                            onChange={(e) => setEdits({ ...edits, [key(row.path)]: { ...value, title: e.target.value } })}
                            dir="auto"
                          />
                          <Count value={value.title} limit={60} />
                        </div>
                        <div>
                          <label className={label}>SEO description</label>
                          <textarea
                            className={`${input} mt-1.5 leading-relaxed`}
                            rows={3}
                            value={value.description}
                            onChange={(e) => setEdits({ ...edits, [key(row.path)]: { ...value, description: e.target.value } })}
                            dir="auto"
                          />
                          <Count value={value.description} limit={160} />
                        </div>
                        {/* How it will look in Google. */}
                        <div className="rounded-xl bg-cream px-4 py-3">
                          <p className="truncate text-xs text-ink/50">thedigitalmarketing.services{locale === "en" ? "" : `/${locale}`}{row.path}</p>
                          <p className="mt-0.5 truncate text-base text-[#1a0dab]">{value.title}</p>
                          <p className="mt-0.5 line-clamp-2 text-sm text-ink/70">{value.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <button onClick={() => save(row)} className={primary}>
                            Save
                          </button>
                          {changed && (
                            <button onClick={() => reset(row)} className={ghost}>
                              Use built-in text
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
          </ul>
        </div>
      ))}
    </div>
  );
}

// --- redirects ------------------------------------------------------------------

const emptyRedirect = { source: "", destination: "", permanent: true, enabled: true, note: "" };

export function RedirectsPanel({ db, setStatus }: PanelProps) {
  const fetchRows = useCallback(() => db.from("redirects").select("*").order("created_at", { ascending: false }), [db]);
  const [rows, , load] = useRows(fetchRows, setStatus);
  const [form, setForm] = useState<typeof emptyRedirect & { id?: string }>(emptyRedirect);
  const [filter, setFilter] = useState("");

  const save = async () => {
    let source = form.source.trim();
    const destination = form.destination.trim();
    // A pasted full address is fine: keep its path.
    try {
      if (/^https?:\/\//i.test(source)) source = new URL(source).pathname;
    } catch {
      /* not a URL — validated below */
    }
    if (!source.startsWith("/")) return setStatus({ tone: "bad", text: "“From” must be a path starting with /, e.g. /old-page/" });
    if (!destination.startsWith("/") && !/^https?:\/\//i.test(destination)) {
      return setStatus({ tone: "bad", text: "“To” must be a path starting with / or a full https:// address" });
    }
    if (source.replace(/\/+$/, "") === destination.replace(/\/+$/, "")) {
      return setStatus({ tone: "bad", text: "A page cannot redirect to itself" });
    }
    setStatus({ tone: "busy", text: "Saving…" });
    const payload = { source, destination, permanent: form.permanent, enabled: form.enabled, note: form.note.trim() || null };
    const { error } = form.id
      ? await db.from("redirects").update(payload).eq("id", form.id)
      : await db.from("redirects").insert(payload);
    if (error) {
      return setStatus({ tone: "bad", text: error.message.includes("duplicate") ? `There is already a redirect from ${source}` : error.message });
    }
    setForm(emptyRedirect);
    await load();
    setStatus({ tone: "ok", text: "Saved. Active within a minute." });
  };

  const toggle = async (row: Row) => {
    const { error } = await db.from("redirects").update({ enabled: !row.enabled }).eq("id", row.id);
    if (error) return setStatus({ tone: "bad", text: error.message });
    await load();
  };

  const remove = async (row: Row) => {
    if (!window.confirm(`Delete the redirect from ${str(row.source)}?`)) return;
    const { error } = await db.from("redirects").delete().eq("id", row.id);
    if (error) return setStatus({ tone: "bad", text: error.message });
    await load();
    setStatus({ tone: "ok", text: "Redirect deleted." });
  };

  const shown = rows.filter((r) => !filter || `${str(r.source)} ${str(r.destination)}`.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className={shell}>
      <div className={card}>
        <h2 className="font-display text-lg font-bold text-forest">{form.id ? "Edit redirect" : "Add a redirect"}</h2>
        <p className="mt-1 text-sm text-ink/55">
          Sends visitors and search engines from an old address to a new one. Use “permanent” when a page has moved for good.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div>
            <label className={label}>From (old address)</label>
            <input className={`${input} mt-1.5`} value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} placeholder="/old-page/" dir="ltr" />
          </div>
          <div>
            <label className={label}>To (new address)</label>
            <input className={`${input} mt-1.5`} value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} placeholder="/marketing/seo/" dir="ltr" />
          </div>
          <div className="md:col-span-2">
            <label className={label}>Note (optional)</label>
            <input className={`${input} mt-1.5`} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Why this redirect exists" />
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-5">
          <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-forest">
            <input type="checkbox" className="h-4 w-4 accent-amber" checked={form.permanent} onChange={(e) => setForm({ ...form, permanent: e.target.checked })} />
            Permanent
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-forest">
            <input type="checkbox" className="h-4 w-4 accent-amber" checked={form.enabled} onChange={(e) => setForm({ ...form, enabled: e.target.checked })} />
            Active
          </label>
          <button onClick={save} className={primary}>
            {form.id ? "Save changes" : "Add redirect"}
          </button>
          {form.id && (
            <button onClick={() => setForm(emptyRedirect)} className={ghost}>
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <h2 className="font-display text-lg font-bold text-forest">{rows.length} redirect{rows.length === 1 ? "" : "s"}</h2>
        <input className={`${input} max-w-xs`} placeholder="Search…" value={filter} onChange={(e) => setFilter(e.target.value)} />
        <p className="text-xs text-ink/50">The redirects from the old WordPress site are built into the site and are not listed here.</p>
      </div>
      <div className="mt-3 overflow-x-auto rounded-2xl border border-mint bg-white/90">
        <table className="w-full text-sm">
          <thead className="bg-forest text-start text-xs uppercase tracking-wide text-white">
            <tr>
              <th className="px-4 py-3 text-start">From</th>
              <th className="px-4 py-3 text-start">To</th>
              <th className="px-4 py-3 text-start">Type</th>
              <th className="px-4 py-3 text-start">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {shown.map((r) => (
              <tr key={str(r.id)} className="border-t border-mint align-top">
                <td className="px-4 py-3 font-mono text-xs" dir="ltr">
                  {str(r.source)}
                  {r.note ? <span className="mt-1 block font-sans text-ink/50">{str(r.note)}</span> : null}
                </td>
                <td className="px-4 py-3 font-mono text-xs" dir="ltr">{str(r.destination)}</td>
                <td className="px-4 py-3 text-xs">{r.permanent ? "Permanent" : "Temporary"}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggle(r)}
                    className={`rounded-full px-2.5 py-1 text-[0.65rem] font-bold uppercase ${r.enabled ? "bg-fern/15 text-fern" : "bg-ink/10 text-ink/50"}`}
                  >
                    {r.enabled ? "Active" : "Off"}
                  </button>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-end">
                  <button
                    onClick={() =>
                      setForm({ id: str(r.id), source: str(r.source), destination: str(r.destination), permanent: Boolean(r.permanent), enabled: Boolean(r.enabled), note: str(r.note) })
                    }
                    className="text-xs font-bold text-fern hover:text-forest"
                  >
                    Edit
                  </button>
                  <button onClick={() => remove(r)} className="ms-4 text-xs font-bold text-ink/50 hover:text-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {shown.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-sm text-ink/50">
                  No redirects yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- leads ----------------------------------------------------------------------

const LEAD_STATUSES = ["new", "contacted", "qualified", "won", "lost", "spam"] as const;
const statusTone: Record<string, string> = {
  new: "bg-amber/15 text-amber",
  contacted: "bg-plum/12 text-plum",
  qualified: "bg-fern/15 text-fern",
  won: "bg-forest text-white",
  lost: "bg-ink/10 text-ink/55",
  spam: "bg-red-50 text-red-600",
};

const csvCell = (v: unknown) => `"${str(v).replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;

export function LeadsPanel({ db, setStatus }: PanelProps) {
  const fetchRows = useCallback(() => db.from("leads").select("*").order("created_at", { ascending: false }).limit(1000), [db]);
  const [rows, setRows, load] = useRows(fetchRows, setStatus);
  const [filter, setFilter] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const update = async (id: string, patch: Row) => {
    const { error } = await db.from("leads").update(patch).eq("id", id);
    if (error) return setStatus({ tone: "bad", text: error.message });
    setRows((all) => all.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    setStatus({ tone: "ok", text: "Lead updated." });
  };

  const remove = async (row: Row) => {
    if (!window.confirm(`Delete the lead from ${str(row.name)}? This cannot be undone.`)) return;
    const { error } = await db.from("leads").delete().eq("id", row.id);
    if (error) return setStatus({ tone: "bad", text: error.message });
    setRows((all) => all.filter((r) => r.id !== row.id));
    setStatus({ tone: "ok", text: "Lead deleted." });
  };

  const shown = rows.filter(
    (r) =>
      (filter === "all" || r.status === filter) &&
      (!query || [r.name, r.email, r.phone, r.service, r.message].some((v) => str(v).toLowerCase().includes(query.toLowerCase()))),
  );

  const exportCsv = () => {
    const cols = ["created_at", "name", "email", "phone", "service", "message", "status", "notes", "source", "page", "locale"];
    const csv = [cols.join(","), ...shown.map((r) => cols.map((c) => csvCell(r[c])).join(","))].join("\r\n");
    const url = URL.createObjectURL(new Blob([`﻿${csv}`], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `tdm-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const count = (s: string) => rows.filter((r) => r.status === s).length;

  return (
    <div className={shell}>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-1 rounded-full border border-mint/70 bg-white/80 p-1">
          <button className={pill(filter === "all")} onClick={() => setFilter("all")}>
            All ({rows.length})
          </button>
          {LEAD_STATUSES.map((s) => (
            <button key={s} className={pill(filter === s)} onClick={() => setFilter(s)}>
              {s[0].toUpperCase() + s.slice(1)} ({count(s)})
            </button>
          ))}
        </div>
        <input className={`${input} max-w-xs`} placeholder="Search name, email, message…" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button onClick={exportCsv} className={`${ghost} ms-auto`} disabled={shown.length === 0}>
          Export CSV
        </button>
        <button onClick={load} className={ghost}>
          Refresh
        </button>
      </div>

      <ul className="mt-5 space-y-2">
        {shown.map((r) => {
          const id = str(r.id);
          const isOpen = openId === id;
          return (
            <li key={id} className="rounded-2xl border border-mint bg-white/90">
              <button onClick={() => setOpenId(isOpen ? null : id)} className="flex w-full flex-wrap items-center gap-x-4 gap-y-1 px-5 py-3.5 text-start">
                <span className={`rounded-full px-2.5 py-1 text-[0.65rem] font-bold uppercase ${statusTone[str(r.status)] ?? "bg-mint text-forest"}`}>
                  {str(r.status)}
                </span>
                <span className="font-semibold text-forest">{str(r.name)}</span>
                <span className="text-sm text-ink/60" dir="ltr">{str(r.email)}</span>
                {r.service ? <span className="rounded-full bg-mint px-2.5 py-0.5 text-xs font-semibold text-forest">{str(r.service)}</span> : null}
                <span className="ms-auto text-xs text-ink/45">
                  {new Date(str(r.created_at)).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                </span>
              </button>
              {isOpen && (
                <div className="space-y-4 border-t border-mint px-5 py-5 text-sm">
                  <dl className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                    <div>
                      <dt className={label}>Email</dt>
                      <dd dir="ltr">
                        <a className="text-fern underline" href={`mailto:${str(r.email)}`}>{str(r.email)}</a>
                      </dd>
                    </div>
                    <div>
                      <dt className={label}>Phone</dt>
                      <dd dir="ltr">{r.phone ? <a className="text-fern underline" href={`tel:${str(r.phone)}`}>{str(r.phone)}</a> : "—"}</dd>
                    </div>
                    <div>
                      <dt className={label}>Came from</dt>
                      <dd>
                        {str(r.source)} · {str(r.page) || "—"} · {str(r.locale).toUpperCase() || "—"}
                      </dd>
                    </div>
                    <div>
                      <dt className={label}>Interested in</dt>
                      <dd>{str(r.service) || "—"}</dd>
                    </div>
                  </dl>
                  <div>
                    <p className={label}>Message</p>
                    <p className="mt-1 whitespace-pre-wrap rounded-xl bg-cream px-4 py-3 leading-relaxed text-ink/85" dir="auto">
                      {str(r.message) || "—"}
                    </p>
                  </div>
                  <div>
                    <p className={label}>Status</p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {LEAD_STATUSES.map((s) => (
                        <button
                          key={s}
                          onClick={() => update(id, { status: s })}
                          className={`rounded-full px-3 py-1.5 text-xs font-bold uppercase transition-colors ${
                            r.status === s ? statusTone[s] : "border border-mint text-ink/50 hover:border-fern hover:text-forest"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className={label}>Internal notes</p>
                    <textarea
                      className={`${input} mt-1.5 leading-relaxed`}
                      rows={3}
                      value={notes[id] ?? str(r.notes)}
                      onChange={(e) => setNotes({ ...notes, [id]: e.target.value })}
                      placeholder="Call notes, next step, who is handling it…"
                    />
                    <div className="mt-2 flex gap-3">
                      <button onClick={() => update(id, { notes: (notes[id] ?? str(r.notes)).trim() || null })} className={ghost}>
                        Save notes
                      </button>
                      <button onClick={() => remove(r)} className={`${danger} ms-auto`}>
                        Delete lead
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </li>
          );
        })}
        {shown.length === 0 && (
          <li className="rounded-2xl border border-dashed border-mint px-3 py-14 text-center text-sm text-ink/50">
            {rows.length === 0 ? "No leads yet. Every contact-form enquiry will appear here." : "Nothing matches this filter."}
          </li>
        )}
      </ul>
    </div>
  );
}

// --- HTML guide -----------------------------------------------------------------

export function HtmlGuidePanel() {
  const [copied, setCopied] = useState(false);
  return (
    <div className={shell}>
      <div className={card}>
        <h2 className="font-display text-xl font-bold text-forest">How to publish a page, post or case study from HTML</h2>
        <ol className="mt-4 list-decimal space-y-2 ps-5 text-sm leading-relaxed text-ink/80">
          <li>Copy the brief below and paste it into Claude. Replace the last line with what you want written.</li>
          <li>Claude replies with one HTML fragment. Copy it, or save it as an .html file.</li>
          <li>
            Open <strong>Pages</strong>, <strong>Blog posts</strong> or <strong>Case studies</strong>, and paste or upload it in the HTML field.
          </li>
          <li>Fill in the SEO title and description, save, and it is live within a minute.</li>
        </ol>
        <p className="mt-4 rounded-xl bg-mint px-4 py-3 text-sm leading-relaxed text-forest">
          Scripts are removed from pasted HTML for safety. Animations, counters, tabs and accordions still work, because the site provides
          them: the brief tells Claude which class names and attributes to use.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            className={primary}
            onClick={async () => {
              await navigator.clipboard.writeText(HTML_GUIDE);
              setCopied(true);
              window.setTimeout(() => setCopied(false), 2000);
            }}
          >
            {copied ? "Copied ✓" : "Copy the brief for Claude"}
          </button>
          <span className="text-xs text-ink/50">{HTML_GUIDE.length.toLocaleString()} characters</span>
        </div>
        <pre className="mt-4 max-h-[32rem] overflow-auto whitespace-pre-wrap rounded-2xl bg-forest p-5 text-xs leading-relaxed text-white/90" dir="ltr">
          {HTML_GUIDE}
        </pre>
      </div>
    </div>
  );
}
