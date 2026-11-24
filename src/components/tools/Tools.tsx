"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/types";
import type { AuditCheck, AuditResult, CheckStatus } from "@/lib/seo-audit";
import { getTools } from "@/content/tools";
import { saveLead } from "@/lib/leads";
import { ConsultationLink } from "@/components/ConsultationLink";

/**
 * The three free tools. Each is self-contained: its inputs, its result, and a
 * short form to ask TDM to follow up, which lands in the admin's Leads tab with
 * the tool's name as the source and the result in the message.
 */

const field =
  "w-full rounded-xl border border-mint bg-white px-3.5 py-3 text-base text-ink outline-none transition-colors focus:border-amber focus:ring-2 focus:ring-amber/30";
const labelCls = "block text-sm font-semibold text-forest";
const hintCls = "mt-1 text-xs leading-relaxed text-ink/55";
const panel = "rounded-3xl border border-mint bg-white p-6 shadow-xl shadow-forest/5 sm:p-8";
const button =
  "btn-fluid rounded-full bg-amber px-7 py-3.5 font-semibold text-white shadow-lg shadow-amber/25 transition hover:brightness-110 disabled:opacity-60";

const CURRENCIES = ["USD", "AED", "SAR", "EUR", "GBP", "QAR", "KWD", "BHD", "OMR", "PKR"] as const;

const numberLocale = (locale: Locale) => (locale === "ar" ? "ar-AE-u-nu-latn" : locale === "fr" ? "fr-FR" : "en-US");

function useMoney(locale: Locale, currency: string) {
  return useMemo(() => {
    const fmt = new Intl.NumberFormat(numberLocale(locale), { style: "currency", currency, maximumFractionDigits: 0 });
    return (n: number) => fmt.format(Math.round(n));
  }, [locale, currency]);
}

const num = (v: string) => {
  const n = Number(v.replace(",", "."));
  return Number.isFinite(n) && n >= 0 ? n : 0;
};

function NumberField({
  label,
  hint,
  value,
  onChange,
  suffix,
  step = "any",
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
  step?: string;
}) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <span className="relative mt-1.5 block">
        <input
          type="number"
          inputMode="decimal"
          min="0"
          step={step}
          className={`${field} ${suffix ? "pe-14" : ""}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          dir="ltr"
        />
        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-sm font-semibold text-ink/45">{suffix}</span>
        )}
      </span>
      {hint && <span className={`${hintCls} block`}>{hint}</span>}
    </label>
  );
}

function CurrencyField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <select className={`${field} mt-1.5`} value={value} onChange={(e) => onChange(e.target.value)} dir="ltr">
        {CURRENCIES.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
    </label>
  );
}

function Figure({ label, value, hint, strong = false }: { label: string; value: string; hint?: string; strong?: boolean }) {
  return (
    <div className={`rounded-2xl px-5 py-4 ${strong ? "bg-forest text-white" : "bg-cream"}`}>
      <p className={`text-xs font-bold uppercase tracking-[0.1em] ${strong ? "text-sage" : "text-fern"}`}>{label}</p>
      <p className={`mt-1 font-display text-3xl font-extrabold ${strong ? "text-amber" : "text-forest"}`} dir="ltr">
        {value}
      </p>
      {hint && <p className={`mt-1 text-xs leading-relaxed ${strong ? "text-white/70" : "text-ink/60"}`}>{hint}</p>}
    </div>
  );
}

/** "Have TDM follow up": a lead with the tool's result attached. */
function ToolLead({
  locale,
  source,
  title,
  sub,
  summary,
  children,
}: {
  locale: Locale;
  source: string;
  title: string;
  sub: string;
  summary: string;
  /** Shown above the form, e.g. a button to book a call instead. */
  children?: React.ReactNode;
}) {
  const t = getTools(locale).lead;
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    setStatus("sending");
    const ok = await saveLead({ name: data.name, email: data.email, message: summary, service: source, locale, source });
    setStatus(ok ? "sent" : "error");
  }

  return (
    <div className="relative mt-8 overflow-hidden rounded-3xl bg-forest p-6 text-white sm:p-8">
      <div aria-hidden className="blob pointer-events-none absolute -end-16 -top-16 h-56 w-56 rounded-full bg-fern/40 blur-3xl" />
      <div className="relative">
        <h3 className="font-display text-xl font-bold">{title}</h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/75">{sub}</p>
        {children}
        {status === "sent" ? (
          <p className="mt-5 rounded-2xl bg-white/10 px-5 py-4 font-semibold text-amber">{t.thanks}</p>
        ) : (
          <form onSubmit={submit} className="mt-5 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
            <input name="name" required autoComplete="name" placeholder={t.name} className={field} aria-label={t.name} />
            <input name="email" type="email" required autoComplete="email" placeholder={t.email} className={field} aria-label={t.email} dir="ltr" />
            <button type="submit" disabled={status === "sending"} className={button}>
              {status === "sending" ? t.sending : t.send}
            </button>
          </form>
        )}
        {status === "error" && <p className="mt-3 text-sm text-red-200">{t.error}</p>}
      </div>
    </div>
  );
}

// --- SEO audit ------------------------------------------------------------------

const tone: Record<CheckStatus, string> = {
  pass: "bg-fern/12 text-fern",
  warn: "bg-amber/15 text-amber",
  fail: "bg-red-50 text-red-600",
};
const icon: Record<CheckStatus, string> = { pass: "✓", warn: "!", fail: "✕" };
const GROUPS = ["basics", "content", "technical", "social", "ai"] as const;

export function SeoAuditTool({ locale }: { locale: Locale }) {
  const copy = getTools(locale);
  const t = copy.audit;
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AuditResult | null>(null);

  async function run(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim() || busy) return;
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/seo-audit/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const body = await res.json();
      if (!res.ok) {
        const code = (body?.error ?? "unreachable") as keyof typeof t.errors;
        setError(t.errors[code] ?? t.errors.unreachable);
      } else {
        setResult(body as AuditResult);
      }
    } catch {
      setError(t.errors.unreachable);
    }
    setBusy(false);
  }

  /** The value a check found, in a few words. */
  const found = (c: AuditCheck): string | null => {
    const d = c.data;
    const u = t.units;
    switch (c.id) {
      case "title":
      case "description":
        return d.text ? `“${d.text}” · ${d.length} ${u.chars}` : null;
      case "h1":
        return d.text ? `“${d.text}”${Number(d.count) > 1 ? ` · ×${d.count}` : ""}` : null;
      case "content":
        return `${d.words} ${u.words}`;
      case "alt":
        return `${d.images} ${u.images} · ${d.missing} ${u.missing}`;
      case "links":
        return `${d.internal} ${u.internal} · ${d.external} ${u.external}`;
      case "speed":
        return `${d.ms} ms · ${d.kb} KB`;
      case "canonical":
        return d.href ? String(d.href) : null;
      case "lang":
        return d.lang ? String(d.lang) : null;
      case "schema":
        return d.types ? String(d.types) : null;
      default:
        return null;
    }
  };

  const counts = result
    ? {
        pass: result.checks.filter((c) => c.status === "pass").length,
        warn: result.checks.filter((c) => c.status === "warn").length,
        fail: result.checks.filter((c) => c.status === "fail").length,
      }
    : null;

  const scoreTone = !result ? "" : result.score >= 85 ? "text-fern" : result.score >= 60 ? "text-amber" : "text-red-600";

  const summary = result
    ? `SEO audit of ${result.finalUrl}: score ${result.score}/100. To fix: ${
        result.checks.filter((c) => c.status !== "pass").map((c) => c.id).join(", ") || "nothing"
      }.`
    : "";

  return (
    <div>
      <form onSubmit={run} className={panel}>
        <label className={labelCls} htmlFor="audit-url">
          {t.label}
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <input
            id="audit-url"
            className={field}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={t.placeholder}
            inputMode="url"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            dir="ltr"
          />
          <button type="submit" disabled={busy} className={`${button} shrink-0`}>
            {busy ? t.running : t.run}
          </button>
        </div>
        {error && (
          <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        )}
        {busy && (
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-mint">
            <div className="shimmer h-full w-full animate-pulse rounded-full bg-gradient-to-r from-fern to-amber" />
          </div>
        )}
      </form>

      {result && counts && (
        <div className="mt-8" aria-live="polite">
          <div className={`${panel} grid items-center gap-6 md:grid-cols-[auto_1fr]`}>
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-fern">{t.score}</p>
              <p className={`font-display text-7xl font-extrabold leading-none ${scoreTone}`} dir="ltr">
                {result.score}
              </p>
              <p className="mt-1 text-xs text-ink/50">{t.scoreOf}</p>
            </div>
            <div>
              <p className="break-all text-sm text-ink/60" dir="ltr">
                {t.checked}: <span className="font-semibold text-forest">{result.finalUrl}</span>
              </p>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                {(
                  [
                    ["pass", t.passed],
                    ["warn", t.toImprove],
                    ["fail", t.critical],
                  ] as const
                ).map(([k, name]) => (
                  <div key={k} className={`rounded-2xl px-3 py-3 ${tone[k]}`}>
                    <p className="font-display text-2xl font-extrabold" dir="ltr">
                      {counts[k]}
                    </p>
                    <p className="text-xs font-semibold">{name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* The moment the result lands is when a call is most wanted. */}
          <div className="relative mt-6 overflow-hidden rounded-3xl bg-forest p-6 text-white sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8">
            <div aria-hidden className="blob pointer-events-none absolute -end-16 -top-16 h-56 w-56 rounded-full bg-fern/40 blur-3xl" />
            <div className="relative">
              <h3 className="font-display text-xl font-bold">{t.bookTitle}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/75">{t.bookSub}</p>
            </div>
            <ConsultationLink locale={locale} className={`${button} relative mt-5 inline-block shrink-0 text-center sm:mt-0`}>
              {t.bookCta}
            </ConsultationLink>
          </div>

          {GROUPS.map((group) => {
            const checks = result.checks.filter((c) => c.group === group);
            return (
              <div key={group} className="mt-8">
                <h3 className="font-display text-xl font-bold text-forest">{t.groups[group]}</h3>
                <ul className="mt-3 space-y-2">
                  {checks.map((c) => {
                    const words = t.checks[c.id];
                    const detail = found(c);
                    return (
                      <li key={c.id} className="flex gap-4 rounded-2xl border border-mint bg-white px-5 py-4">
                        <span
                          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${tone[c.status]}`}
                          title={t.statuses[c.status]}
                        >
                          <span aria-hidden>{icon[c.status]}</span>
                          <span className="sr-only">{t.statuses[c.status]}</span>
                        </span>
                        <div className="min-w-0">
                          <p className="font-semibold text-forest">{words?.name ?? c.id}</p>
                          <p className="mt-1 text-sm leading-relaxed text-ink/75">{c.status === "pass" ? words?.good : words?.fix}</p>
                          {detail && (
                            <p className="mt-1.5 break-words text-xs text-ink/50" dir="auto">
                              {t.units.found}: {detail}
                            </p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}

          <ToolLead locale={locale} source="seo-audit" title={t.leadTitle} sub={`${t.leadSub} ${t.orEmail}`} summary={summary}>
            <ConsultationLink locale={locale} className={`${button} mt-5 inline-block`}>
              {t.bookCta}
            </ConsultationLink>
          </ToolLead>
        </div>
      )}
    </div>
  );
}

// --- break-even ROAS ------------------------------------------------------------

export function RoasCalculator({ locale }: { locale: Locale }) {
  const copy = getTools(locale);
  const t = copy.roas;
  const [currency, setCurrency] = useState<string>(locale === "ar" ? "AED" : locale === "fr" ? "EUR" : "USD");
  const [aov, setAov] = useState("100");
  const [cogs, setCogs] = useState("35");
  const [shipping, setShipping] = useState("8");
  const [fees, setFees] = useState("3");
  const [target, setTarget] = useState("15");
  const [budget, setBudget] = useState("5000");
  const money = useMoney(locale, currency);

  const order = num(aov);
  const margin = order - num(cogs) - num(shipping) - order * (num(fees) / 100);
  const marginPct = order > 0 ? (margin / order) * 100 : 0;
  const breakeven = margin > 0 ? order / margin : 0;
  // After keeping the target profit, what is left to spend on ads per order.
  const adRoom = margin - order * (num(target) / 100);
  const targetRoas = adRoom > 0 ? order / adRoom : 0;
  const spend = num(budget);
  const revenue = targetRoas > 0 ? spend * targetRoas : 0;
  const orders = order > 0 ? revenue / order : 0;
  const profit = orders * order * (num(target) / 100);

  const ratio = (n: number) => (n > 0 ? `${n.toFixed(2)}×` : "—");
  const summary = `ROAS calculator: order ${money(order)}, margin before ads ${money(margin)} (${marginPct.toFixed(0)}%), break-even ROAS ${ratio(breakeven)}, target ROAS ${ratio(targetRoas)}, monthly budget ${money(spend)}.`;

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className={`${panel} space-y-5`}>
          <CurrencyField label={t.currency} value={currency} onChange={setCurrency} />
          <NumberField label={t.aov} hint={t.aovHint} value={aov} onChange={setAov} suffix={currency} />
          <NumberField label={t.cogs} hint={t.cogsHint} value={cogs} onChange={setCogs} suffix={currency} />
          <NumberField label={t.shipping} hint={t.shippingHint} value={shipping} onChange={setShipping} suffix={currency} />
          <NumberField label={t.fees} hint={t.feesHint} value={fees} onChange={setFees} suffix="%" />
          <NumberField label={t.target} hint={t.targetHint} value={target} onChange={setTarget} suffix="%" />
          <NumberField label={t.budget} hint={t.budgetHint} value={budget} onChange={setBudget} suffix={currency} />
        </div>

        <div className={panel} aria-live="polite">
          <h3 className="font-display text-xl font-bold text-forest">{t.results}</h3>
          {margin <= 0 ? (
            <p className="mt-4 rounded-2xl bg-red-50 px-5 py-4 text-sm font-medium leading-relaxed text-red-700">{t.noMargin}</p>
          ) : (
            <div className="mt-4 space-y-3">
              <Figure strong label={t.breakeven} value={ratio(breakeven)} hint={t.breakevenHint} />
              <Figure label={t.margin} value={money(margin)} hint={`${marginPct.toFixed(0)}% ${t.marginPct}`} />
              <Figure label={t.maxCpa} value={money(margin)} hint={t.maxCpaHint} />
              {adRoom > 0 ? (
                <Figure label={t.targetRoas} value={ratio(targetRoas)} hint={t.targetRoasHint} />
              ) : (
                <p className="rounded-2xl bg-amber/12 px-5 py-4 text-sm font-medium leading-relaxed text-forest">{t.impossible}</p>
              )}
              {adRoom > 0 && spend > 0 && (
                <div className="grid gap-3 sm:grid-cols-3">
                  <Figure label={t.revenueNeeded} value={money(revenue)} />
                  <Figure label={t.ordersNeeded} value={Math.ceil(orders).toLocaleString(numberLocale(locale))} />
                  <Figure label={t.profitAtTarget} value={money(profit)} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <ToolLead locale={locale} source="roas-calculator" title={t.leadTitle} sub={t.leadSub} summary={summary} />
    </div>
  );
}

// --- staff augmentation savings ---------------------------------------------------

export function StaffCalculator({ locale }: { locale: Locale }) {
  const copy = getTools(locale);
  const t = copy.staff;
  const [currency, setCurrency] = useState<string>(locale === "ar" ? "AED" : locale === "fr" ? "EUR" : "USD");
  const [salary, setSalary] = useState("80000");
  const [overhead, setOverhead] = useState("25");
  const [team, setTeam] = useState("1");
  const money = useMoney(locale, currency);

  const people = Math.max(1, Math.round(num(team)));
  const local = num(salary) * (1 + num(overhead) / 100) * people;
  // TDM's stated range: typically 50–70% below an equivalent local hire.
  const savingLow = local * 0.5;
  const savingHigh = local * 0.7;
  const costLow = local - savingHigh;
  const costHigh = local - savingLow;

  const range = (a: number, b: number) => `${money(a)} ${t.to} ${money(b)}`;
  const summary = `Staff augmentation calculator: ${people} role(s), local salary ${money(num(salary))} + ${num(overhead)}% overhead = ${money(local)} per year. Estimated saving ${money(savingLow)}–${money(savingHigh)} per year.`;

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className={`${panel} space-y-5`}>
          <CurrencyField label={t.currency} value={currency} onChange={setCurrency} />
          <NumberField label={t.salary} hint={t.salaryHint} value={salary} onChange={setSalary} suffix={currency} />
          <NumberField label={t.overhead} hint={t.overheadHint} value={overhead} onChange={setOverhead} suffix="%" />
          <NumberField label={t.team} hint={t.teamHint} value={team} onChange={setTeam} step="1" />
        </div>

        <div className={panel} aria-live="polite">
          <h3 className="font-display text-xl font-bold text-forest">{t.results}</h3>
          <div className="mt-4 space-y-3">
            <div className="rounded-2xl bg-forest px-5 py-5 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-sage">{t.saving}</p>
              <p className="mt-1 font-display text-3xl font-extrabold leading-tight text-amber sm:text-4xl" dir="ltr">
                {range(savingLow, savingHigh)}
              </p>
              <p className="mt-1 text-sm text-white/75">{t.perYear}</p>
              <p className="mt-3 text-sm text-white/75" dir="ltr">
                {range(savingLow / 12, savingHigh / 12)} <span dir="auto">{t.perMonth}</span>
              </p>
            </div>
            <Figure label={t.localCost} value={money(local)} hint={t.localCostHint} />
            <Figure label={t.tdmCost} value={range(costLow, costHigh)} hint={t.tdmCostHint} />
            <p className="text-xs leading-relaxed text-ink/55">{t.note}</p>
          </div>
        </div>
      </div>
      <ToolLead locale={locale} source="staff-calculator" title={t.leadTitle} sub={t.leadSub} summary={summary} />
    </div>
  );
}
