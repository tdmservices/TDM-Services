import Link from "next/link";
import type { Locale } from "@/lib/types";
import { href, isRtl } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { CtaBand, Kicker, PageHero } from "@/components/Sections";
import { getWidgetPlay } from "@/content/play";
import { PlayWidget } from "@/components/play/PlayWidget";

/**
 * The page behind every dead end: `missing` for an address that never matched
 * anything (404), `gone` for one that was deliberately removed (410).
 *
 * It is a wayfinding page rather than an apology — the hero says what happened
 * in one line, and the cards under it are the places a lost visitor most likely
 * wanted.
 */
type Variant = "missing" | "gone";

const copy: Record<
  Locale,
  Record<Variant, { kicker: string; headline: string; sub: string; code: string }> & {
    whereNext: string;
    whereNextTitle: string;
    links: { home: string; services: string; work: string; blog: string; contact: string };
  }
> = {
  en: {
    missing: {
      kicker: "Error 404",
      headline: "This page took a wrong turn.",
      sub: "The address may be mistyped, or the page has moved. Everything we do is still a click away.",
      code: "Page not found",
    },
    gone: {
      kicker: "Page removed",
      headline: "This page no longer exists.",
      sub: "It was taken down and is not coming back. Here is where to find what we actually do.",
      code: "Gone for good",
    },
    whereNext: "Where next",
    whereNextTitle: "Pick up the trail from here.",
    links: {
      home: "Start again from the front page.",
      services: "Marketing, development, media and staffing.",
      work: "Results we have delivered for clients.",
      blog: "Practical guides from the team.",
      contact: "Tell us what you were looking for.",
    },
  },
  fr: {
    missing: {
      kicker: "Erreur 404",
      headline: "Cette page s'est égarée.",
      sub: "L'adresse est peut-être mal saisie, ou la page a été déplacée. Tout ce que nous faisons reste à portée de clic.",
      code: "Page introuvable",
    },
    gone: {
      kicker: "Page supprimée",
      headline: "Cette page n'existe plus.",
      sub: "Elle a été retirée définitivement. Voici où trouver ce que nous faisons réellement.",
      code: "Supprimée définitivement",
    },
    whereNext: "Et maintenant",
    whereNextTitle: "Reprenez le fil à partir d'ici.",
    links: {
      home: "Repartez de la page d'accueil.",
      services: "Marketing, développement, média et renfort d'équipe.",
      work: "Les résultats obtenus pour nos clients.",
      blog: "Des guides pratiques rédigés par l'équipe.",
      contact: "Dites-nous ce que vous cherchiez.",
    },
  },
  ar: {
    missing: {
      kicker: "خطأ 404",
      headline: "هذه الصفحة ضلّت الطريق.",
      sub: "قد يكون العنوان مكتوبًا بشكل خاطئ، أو أن الصفحة نُقلت. كل ما نقدّمه ما زال على بُعد نقرة.",
      code: "الصفحة غير موجودة",
    },
    gone: {
      kicker: "صفحة محذوفة",
      headline: "هذه الصفحة لم تعد موجودة.",
      sub: "تمت إزالتها نهائيًا. إليك أين تجد ما نقدّمه فعلًا.",
      code: "أُزيلت نهائيًا",
    },
    whereNext: "إلى أين الآن",
    whereNextTitle: "تابع من هنا.",
    links: {
      home: "ابدأ من الصفحة الرئيسية.",
      services: "التسويق والتطوير والإعلام ودعم الفرق.",
      work: "نتائج حققناها لعملائنا.",
      blog: "أدلة عملية من فريقنا.",
      contact: "أخبرنا بما كنت تبحث عنه.",
    },
  },
};

export function NotFoundView({ locale = "en", variant = "missing" }: { locale?: Locale; variant?: Variant }) {
  const t = ui[locale];
  const c = copy[locale];
  const v = c[variant];
  const arrow = isRtl(locale) ? "←" : "→";

  const links = [
    { label: t.home, desc: c.links.home, to: "/" },
    { label: t.services, desc: c.links.services, to: "/marketing/" },
    { label: t.caseStudiesLabel, desc: c.links.work, to: "/case-studies/" },
    { label: t.blog, desc: c.links.blog, to: "/blog/" },
    { label: t.contact, desc: c.links.contact, to: "/contact/" },
  ];

  return (
    <>
      <PageHero
        dark
        kicker={v.kicker}
        headline={v.headline}
        sub={v.sub}
        aside={
          <div className="glass rounded-3xl px-6 py-7 text-center">
            <p aria-hidden className="font-display text-7xl font-extrabold leading-none text-amber md:text-8xl">
              {variant === "gone" ? "410" : "404"}
            </p>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-white/65">{v.code}</p>
          </div>
        }
      />

      <section className="ribbon-bg mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
        <Kicker>{c.whereNext}</Kicker>
        <h2 className="mt-3 text-3xl font-bold text-forest md:text-4xl">{c.whereNextTitle}</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                href={href(locale, l.to)}
                className="card-lift group flex h-full flex-col rounded-2xl border border-mint bg-white p-5 transition-colors hover:border-amber/60"
              >
                <span className="flex items-center justify-between gap-3 font-bold text-forest">
                  {l.label}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber/15 text-amber transition-colors group-hover:bg-amber group-hover:text-white">
                    {arrow}
                  </span>
                </span>
                <span className="mt-2 text-sm leading-relaxed text-ink/70">{l.desc}</span>
              </Link>
            </li>
          ))}
        </ul>
        {/* A wrong turn is a good moment for a small game. Not on the "removed"
            page, which exists for search engines clearing out old addresses. */}
        {variant === "missing" && (
          <div className="mt-10 max-w-sm">
            <PlayWidget locale={locale} copy={getWidgetPlay(locale)} />
          </div>
        )}
      </section>

      <CtaBand locale={locale} />
    </>
  );
}
