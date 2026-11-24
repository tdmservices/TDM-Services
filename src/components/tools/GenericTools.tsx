"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/types";
import { href } from "@/lib/i18n";
import { getToolDef, type BuilderDef, type CalcDef, type Output, type QuizDef } from "@/lib/tool-defs";
import { getMoreTool, getToolUi } from "@/content/more-tools";
import { ToolLead } from "./Tools";

/**
 * Renders the tools that are described as data in src/lib/tool-defs.ts: a
 * calculator, a decision quiz or a document builder. The definition supplies
 * the logic and the copy supplies every word, so this file knows nothing about
 * any particular tool.
 */

const field =
  "w-full rounded-xl border border-mint bg-white px-3.5 py-3 text-base text-ink outline-none transition-colors focus:border-amber focus:ring-2 focus:ring-amber/30";
const labelCls = "block text-sm font-semibold text-forest";
const hintCls = "mt-1 block text-xs leading-relaxed text-ink/55";
const panel = "rounded-3xl border border-mint bg-white p-6 shadow-xl shadow-forest/5 sm:p-8";
const button =
  "btn-fluid rounded-full bg-amber px-7 py-3.5 font-semibold text-white shadow-lg shadow-amber/25 transition hover:brightness-110 disabled:opacity-50";
const ghost = "rounded-full border border-mint bg-white px-5 py-2.5 text-sm font-semibold text-forest transition-colors hover:border-fern";

const CURRENCIES = ["USD", "AED", "SAR", "EUR", "GBP", "QAR", "KWD", "BHD", "OMR", "PKR"];
const numberLocale = (locale: Locale) => (locale === "ar" ? "ar-AE-u-nu-latn" : locale === "fr" ? "fr-FR" : "en-US");
const countWords = (text: string) => text.trim().split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;

type Labels = (key: string) => string;

/** A label lookup that falls back to nothing, so an optional hint can be left out. */
function useLabels(locale: Locale, slug: string) {
  const copy = getMoreTool(locale, slug);
  const t: Labels = (key) => copy?.labels[key] ?? "";
  return { copy, t };
}

// --- calculator -------------------------------------------------------------------

function CalcTool({ def, locale }: { def: CalcDef; locale: Locale }) {
  const { copy, t } = useLabels(locale, def.slug);
  const ui = getToolUi(locale);
  const usesMoney = def.inputs.some((i) => i.type === "money");
  const [currency, setCurrency] = useState(locale === "ar" ? "AED" : locale === "fr" ? "EUR" : "USD");
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(def.inputs.map((i) => [i.id, i.type === "wordcount" ? "" : String(i.default)])),
  );

  const fmt = useMemo(() => {
    const nl = numberLocale(locale);
    return {
      money: (n: number, d = 0) => new Intl.NumberFormat(nl, { style: "currency", currency, minimumFractionDigits: d, maximumFractionDigits: d }).format(n),
      number: (n: number, d = 0) => new Intl.NumberFormat(nl, { minimumFractionDigits: d, maximumFractionDigits: d }).format(n),
    };
  }, [locale, currency]);

  const parsed: Record<string, number | string> = {};
  for (const i of def.inputs) {
    const raw = values[i.id] ?? "";
    if (i.type === "select") parsed[i.id] = raw;
    else if (i.type === "wordcount") parsed[i.id] = countWords(raw);
    else {
      const n = Number(raw.replace(",", "."));
      parsed[i.id] = Number.isFinite(n) && n >= 0 ? n : 0;
    }
  }
  const outputs = def.compute(parsed);

  const show = (o: Output): string => {
    if (o.kind === "text") return o.text;
    if (o.kind === "message") return t(o.key);
    if (o.kind === "money") return fmt.money(o.value, o.decimals ?? 0);
    if (o.kind === "percent") return `${fmt.number(o.value, o.decimals ?? 0)}%`;
    if (o.kind === "ratio") return `${fmt.number(o.value, 2)}×`;
    return fmt.number(o.value, o.decimals ?? 0);
  };

  const summary = `${copy?.name}: ${outputs.filter((o) => o.kind !== "message").map((o) => `${t(`o.${o.id}`)} ${show(o)}`).join("; ")}.`;
  const set = (id: string, v: string) => setValues((all) => ({ ...all, [id]: v }));

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className={`${panel} space-y-5`}>
          {usesMoney && (
            <label className="block">
              <span className={labelCls}>{ui.currency}</span>
              <select className={`${field} mt-1.5`} value={currency} onChange={(e) => setCurrency(e.target.value)} dir="ltr">
                {CURRENCIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
          )}
          {def.inputs.map((i) => (
            <label key={i.id} className="block">
              <span className={labelCls}>{t(`i.${i.id}`)}</span>
              {i.type === "select" ? (
                <select className={`${field} mt-1.5`} value={values[i.id]} onChange={(e) => set(i.id, e.target.value)}>
                  {i.options.map((o) => (
                    <option key={o} value={o}>
                      {t(`opt.${i.id}.${o}`) || o}
                    </option>
                  ))}
                </select>
              ) : i.type === "wordcount" ? (
                <textarea
                  className={`${field} mt-1.5 leading-relaxed`}
                  rows={8}
                  value={values[i.id]}
                  onChange={(e) => set(i.id, e.target.value)}
                  placeholder={t(`i.${i.id}.placeholder`)}
                  dir="auto"
                />
              ) : (
                <span className="relative mt-1.5 block">
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step={i.step ?? "any"}
                    className={`${field} ${i.type !== "number" ? "pe-14" : ""}`}
                    value={values[i.id]}
                    onChange={(e) => set(i.id, e.target.value)}
                    dir="ltr"
                  />
                  {i.type !== "number" && (
                    <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-sm font-semibold text-ink/45">
                      {i.type === "percent" ? "%" : currency}
                    </span>
                  )}
                </span>
              )}
              {t(`i.${i.id}.hint`) && <span className={hintCls}>{t(`i.${i.id}.hint`)}</span>}
            </label>
          ))}
        </div>

        <div className={panel} aria-live="polite">
          <h3 className="font-display text-xl font-bold text-forest">{ui.results}</h3>
          <div className="mt-4 space-y-3">
            {outputs.length === 0 && <p className="text-sm text-ink/60">{ui.enterValues}</p>}
            {outputs.map((o) =>
              o.kind === "message" ? (
                <p
                  key={o.id}
                  className={`rounded-2xl px-5 py-4 text-sm font-medium leading-relaxed ${
                    o.tone === "good" ? "bg-fern/12 text-forest" : o.tone === "bad" ? "bg-red-50 text-red-700" : "bg-amber/12 text-forest"
                  }`}
                >
                  {t(o.key)}
                </p>
              ) : (
                <div key={o.id} className={`rounded-2xl px-5 py-4 ${o.strong ? "bg-forest text-white" : "bg-cream"}`}>
                  <p className={`text-xs font-bold uppercase tracking-[0.1em] ${o.strong ? "text-sage" : "text-fern"}`}>{t(`o.${o.id}`)}</p>
                  <p className={`mt-1 font-display text-3xl font-extrabold ${o.strong ? "text-amber" : "text-forest"}`} dir="ltr">
                    {show(o)}
                  </p>
                  {t(`o.${o.id}.hint`) && (
                    <p className={`mt-1 text-xs leading-relaxed ${o.strong ? "text-white/70" : "text-ink/60"}`}>{t(`o.${o.id}.hint`)}</p>
                  )}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
      <ToolLead locale={locale} source={def.slug} title={t("lead.title") || ui.leadTitle} sub={t("lead.sub") || ui.leadSub} summary={summary} />
    </div>
  );
}

// --- quiz -------------------------------------------------------------------------

function QuizTool({ def, locale }: { def: QuizDef; locale: Locale }) {
  const { copy, t } = useLabels(locale, def.slug);
  const ui = getToolUi(locale);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  const done = step >= def.questions.length;

  const ranked = useMemo(() => {
    const totals: Record<string, number> = Object.fromEntries(def.results.map((r) => [r, 0]));
    for (const q of def.questions) {
      const chosen = q.options.find((o) => o.id === answers[q.id]);
      for (const [r, pts] of Object.entries(chosen?.scores ?? {})) totals[r] += pts;
    }
    const max = Math.max(1, ...Object.values(totals));
    return def.results.map((r) => ({ id: r, score: totals[r], share: Math.round((totals[r] / max) * 100) })).sort((a, b) => b.score - a.score);
  }, [answers, def]);

  const restart = () => {
    setAnswers({});
    setStep(0);
  };

  if (done) {
    const [best, second] = ranked;
    const summary = `${copy?.name}: ${t(`r.${best.id}.title`)} (${ranked.map((r) => `${r.id} ${r.score}`).join(", ")}). Answers: ${def.questions
      .map((q) => `${q.id}=${answers[q.id]}`)
      .join(", ")}.`;
    return (
      <div aria-live="polite">
        <div className="relative overflow-hidden rounded-3xl bg-forest p-6 text-white sm:p-9">
          <div aria-hidden className="blob pointer-events-none absolute -end-16 -top-16 h-64 w-64 rounded-full bg-fern/40 blur-3xl" />
          <div className="relative">
            <p className="kicker text-sage">{ui.yourResult}</p>
            <h3 className="mt-3 font-display text-3xl font-bold md:text-4xl">{t(`r.${best.id}.title`)}</h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/85">{t(`r.${best.id}.body`)}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={href(locale, def.links[best.id])} className={button}>
                {t(`r.${best.id}.cta`) || ui.learnMore}
              </Link>
              <button onClick={restart} className="rounded-full border-2 border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:border-white">
                {ui.restart}
              </button>
            </div>
          </div>
        </div>

        <div className={`${panel} mt-6`}>
          <h3 className="font-display text-lg font-bold text-forest">{ui.howScored}</h3>
          <ul className="mt-4 space-y-3">
            {ranked.map((r) => (
              <li key={r.id}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="font-semibold text-forest">{t(`r.${r.id}.title`)}</span>
                  <span className="text-ink/50" dir="ltr">
                    {r.share}%
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-mint">
                  <div className="h-full rounded-full bg-gradient-to-r from-fern to-amber" style={{ width: `${r.share}%` }} />
                </div>
              </li>
            ))}
          </ul>
          {second && second.score > 0 && second.share >= 75 && (
            <p className="mt-5 rounded-2xl bg-amber/12 px-5 py-4 text-sm leading-relaxed text-forest">
              {ui.closeCall} <strong>{t(`r.${second.id}.title`)}</strong>
            </p>
          )}
        </div>
        <ToolLead locale={locale} source={def.slug} title={t("lead.title") || ui.leadTitle} sub={t("lead.sub") || ui.leadSub} summary={summary} />
      </div>
    );
  }

  const q = def.questions[step];
  return (
    <div className={panel}>
      <div className="flex items-center justify-between gap-4 text-sm">
        <span className="font-semibold text-fern">
          {ui.question} {step + 1} / {def.questions.length}
        </span>
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} className="font-semibold text-ink/55 hover:text-forest">
            {ui.back}
          </button>
        )}
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-mint">
        <div className="h-full rounded-full bg-amber transition-all duration-500" style={{ width: `${(step / def.questions.length) * 100}%` }} />
      </div>
      <h3 className="mt-6 font-display text-2xl font-bold text-forest">{t(`q.${q.id}`)}</h3>
      <div className="mt-5 grid gap-3">
        {q.options.map((o) => (
          <button
            key={o.id}
            onClick={() => {
              setAnswers({ ...answers, [q.id]: o.id });
              setStep(step + 1);
            }}
            className={`rounded-2xl border-2 px-5 py-4 text-start text-base font-medium transition-colors ${
              answers[q.id] === o.id ? "border-amber bg-amber/10 text-forest" : "border-mint bg-white text-ink/85 hover:border-fern"
            }`}
          >
            {t(`q.${q.id}.${o.id}`)}
          </button>
        ))}
      </div>
    </div>
  );
}

// --- document builder -------------------------------------------------------------

function BuilderTool({ def, locale }: { def: BuilderDef; locale: Locale }) {
  const { copy, t } = useLabels(locale, def.slug);
  const ui = getToolUi(locale);
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(def.fields.map((f) => [f.id, f.type === "select" ? f.options[0] : ""])),
  );
  const [picked, setPicked] = useState<Record<string, string[]>>({});
  const [copied, setCopied] = useState(false);

  const ready = def.fields.every((f) => !("required" in f && f.required) || values[f.id]?.trim());
  const lines = def.build(
    (id) => (values[id] ?? "").trim(),
    (id) => picked[id] ?? [],
    (key) => t(key) || key,
  );
  const text = lines.map((l) => (l.startsWith("# ") ? l.slice(2).toUpperCase() : l)).join("\n");

  const download = () => {
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${def.slug}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className={`${panel} space-y-5`}>
          {def.fields.map((f) => (
            <div key={f.id}>
              <label className={labelCls} htmlFor={`f-${f.id}`}>
                {t(`f.${f.id}`)}
                {"required" in f && f.required ? <span className="text-amber"> *</span> : null}
              </label>
              {f.type === "select" ? (
                <select id={`f-${f.id}`} className={`${field} mt-1.5`} value={values[f.id]} onChange={(e) => setValues({ ...values, [f.id]: e.target.value })}>
                  {f.options.map((o) => (
                    <option key={o} value={o}>
                      {t(`o.${f.id}.${o}`) || o}
                    </option>
                  ))}
                </select>
              ) : f.type === "multi" ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {f.options.map((o) => {
                    const on = (picked[f.id] ?? []).includes(o);
                    return (
                      <button
                        key={o}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setPicked({ ...picked, [f.id]: on ? (picked[f.id] ?? []).filter((x) => x !== o) : [...(picked[f.id] ?? []), o] })}
                        className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors ${
                          on ? "border-forest bg-forest text-white" : "border-mint bg-white text-forest hover:border-fern"
                        }`}
                      >
                        {t(`o.${f.id}.${o}`) || o}
                      </button>
                    );
                  })}
                </div>
              ) : f.type === "textarea" ? (
                <textarea
                  id={`f-${f.id}`}
                  className={`${field} mt-1.5 leading-relaxed`}
                  rows={3}
                  value={values[f.id]}
                  onChange={(e) => setValues({ ...values, [f.id]: e.target.value })}
                  placeholder={t(`f.${f.id}.placeholder`)}
                  dir="auto"
                />
              ) : (
                <input
                  id={`f-${f.id}`}
                  className={`${field} mt-1.5`}
                  value={values[f.id]}
                  onChange={(e) => setValues({ ...values, [f.id]: e.target.value })}
                  placeholder={t(`f.${f.id}.placeholder`)}
                  dir="auto"
                />
              )}
              {t(`f.${f.id}.hint`) && <span className={hintCls}>{t(`f.${f.id}.hint`)}</span>}
            </div>
          ))}
        </div>

        <div className={`${panel} lg:sticky lg:top-28 lg:self-start`} aria-live="polite">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-display text-xl font-bold text-forest">{t("doc.heading") || ui.results}</h3>
            <div className="flex gap-2">
              <button
                disabled={!ready}
                onClick={async () => {
                  await navigator.clipboard.writeText(text);
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 1800);
                }}
                className={`${ghost} disabled:opacity-50`}
              >
                {copied ? ui.copied : ui.copy}
              </button>
              <button disabled={!ready} onClick={download} className={`${ghost} disabled:opacity-50`}>
                {ui.download}
              </button>
            </div>
          </div>
          {!ready ? (
            <p className="mt-4 rounded-2xl bg-cream px-5 py-4 text-sm leading-relaxed text-ink/65">{ui.fillRequired}</p>
          ) : (
            <div className="mt-4 max-h-[36rem] overflow-y-auto rounded-2xl bg-cream px-5 py-5 text-sm leading-relaxed text-ink/85" dir="auto">
              {lines.map((l, i) =>
                l.startsWith("# ") ? (
                  <p key={i} className={`font-display font-bold text-forest ${i === 0 ? "text-lg" : "mt-4 text-sm uppercase tracking-wide"}`}>
                    {l.slice(2)}
                  </p>
                ) : l.startsWith("- ") ? (
                  <p key={i} className="mt-1 flex gap-2">
                    <span aria-hidden className="text-amber">•</span>
                    <span>{l.slice(2)}</span>
                  </p>
                ) : l === "" ? null : (
                  <p key={i} className="mt-1 whitespace-pre-wrap">
                    {l}
                  </p>
                ),
              )}
            </div>
          )}
        </div>
      </div>
      <ToolLead
        locale={locale}
        source={def.slug}
        title={t("lead.title") || ui.leadTitle}
        sub={t("lead.sub") || ui.leadSub}
        summary={ready ? `${copy?.name}\n${text}`.slice(0, 4500) : `${copy?.name}`}
      />
    </div>
  );
}

export function GenericTool({ locale, slug }: { locale: Locale; slug: string }) {
  const def = getToolDef(slug);
  if (!def) return null;
  if (def.kind === "calc") return <CalcTool def={def} locale={locale} />;
  if (def.kind === "quiz") return <QuizTool def={def} locale={locale} />;
  return <BuilderTool def={def} locale={locale} />;
}
