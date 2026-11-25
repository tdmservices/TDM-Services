import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/types";
import { href, isRtl, localePrefix } from "@/lib/i18n";
import { site } from "@/lib/site";
import { getPlay, getWidgetPlay } from "@/content/play";
import { PlayWidget } from "@/components/play/PlayWidget";
import { getToolSummary } from "@/content/all-tools";
import { ui } from "@/content/ui";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs, CtaBand, PageHero, Prose } from "@/components/Sections";
import { Reveal } from "@/components/motion/Reveal";
import { LeadRunner } from "@/components/play/LeadRunner";
import { ArrowStrike } from "@/components/play/ArrowStrike";
import { KnowledgeQuiz } from "@/components/play/KnowledgeQuiz";

const card =
  "card-lift group flex h-full flex-col rounded-3xl border border-mint bg-white p-7 transition-colors duration-300 hover:border-fern hover:shadow-2xl";

/** The hub: the game on the page itself, then the quizzes. */
export function PlayIndexView({ locale }: { locale: Locale }) {
  const copy = getPlay(locale);
  const t = ui[locale];
  const arrow = isRtl(locale) ? "←" : "→";
  return (
    <>
      <PageHero kicker={copy.hub.kicker} headline={copy.hub.headline} sub={copy.hub.sub} dark />
      <Breadcrumbs items={[{ label: t.home, href: href(locale, "/") }, { label: copy.hub.navLabel, href: href(locale, "/play/") }]} />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="font-display text-3xl font-bold text-forest">{copy.hub.quizHeading}</h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {copy.quizzes.map((q, i) => (
            <li key={q.slug}>
              <Reveal delay={i * 0.08} className="h-full">
                <Link href={href(locale, `/play/${q.slug}/`)} className={card}>
                  <span className="text-xs font-semibold uppercase tracking-wide text-amber">
                    {q.questions.length} {copy.hub.questions}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-forest">{q.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/75">{q.tagline}</p>
                  <span className="mt-5 font-semibold text-fern">
                    {copy.hub.start} <span className="arrow-nudge">{arrow}</span>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-3xl font-bold text-forest">{copy.hub.gameHeading}</h2>
            <p className="mt-2 max-w-2xl text-ink/75">{copy.game.tagline}</p>
          </div>
          <Link href={href(locale, `/play/${copy.game.slug}/`)} className="font-semibold text-fern underline underline-offset-4 hover:text-forest">
            {copy.game.name} {arrow}
          </Link>
        </div>
        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_20rem]">
          <LeadRunner locale={locale} copy={copy.game} host={copy.host} />
          <PlayWidget locale={locale} copy={getWidgetPlay(locale)} />
        </div>
        <Link href={href(locale, `/play/${copy.shooter.slug}/`)} className={`${card} mt-6 sm:flex-row sm:items-center sm:gap-6`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/mascot/point.webp" alt="" className="h-28 w-auto shrink-0 -scale-x-100 self-start sm:self-center" />
          <span className="flex-1">
            <span className="block font-display text-xl font-semibold text-forest">{copy.shooter.name}</span>
            <span className="mt-2 block text-sm leading-relaxed text-ink/75">{copy.shooter.tagline}</span>
          </span>
          <span className="mt-4 font-semibold text-fern sm:mt-0">
            {copy.hub.play} <span className="arrow-nudge">{arrow}</span>
          </span>
        </Link>
      </section>
      <CtaBand locale={locale} audit />
    </>
  );
}

export function playMeta(locale: Locale, slug: string) {
  const copy = getPlay(locale);
  if (slug === copy.game.slug) return { title: copy.game.metaTitle, description: copy.game.metaDescription };
  if (slug === copy.shooter.slug) return { title: copy.shooter.metaTitle, description: copy.shooter.metaDescription };
  const quiz = copy.quizzes.find((q) => q.slug === slug);
  return quiz ? { title: quiz.metaTitle, description: quiz.metaDescription } : null;
}

/** One game or quiz on its own page. */
export function PlayItemView({ locale, slug }: { locale: Locale; slug: string }) {
  const copy = getPlay(locale);
  const t = ui[locale];
  const quiz = copy.quizzes.find((q) => q.slug === slug);
  const isShooter = slug === copy.shooter.slug;
  const isGame = slug === copy.game.slug || isShooter;
  if (!quiz && !isGame) notFound();
  // The game on this page, and the other one to offer underneath.
  const game = isShooter ? copy.shooter : copy.game;
  const otherGame = isShooter ? copy.game : copy.shooter;
  const name = quiz ? quiz.name : game.name;
  const url = `${site.url}${localePrefix(locale)}/play/${slug}/`;
  const others = copy.quizzes.filter((q) => q.slug !== slug).slice(0, 2);

  return (
    <>
      <JsonLd
        data={
          quiz
            ? {
                "@context": "https://schema.org",
                "@type": "Quiz",
                name: quiz.name,
                description: quiz.metaDescription,
                url,
                inLanguage: locale,
                educationalUse: "self-assessment",
                isAccessibleForFree: true,
                provider: { "@type": "Organization", "@id": `${site.url}/#organization`, name: site.name, url: site.url },
                hasPart: quiz.questions.map((item) => ({
                  "@type": "Question",
                  name: item.q,
                  acceptedAnswer: { "@type": "Answer", text: `${item.options[item.answer]}. ${item.why}` },
                })),
              }
            : {
                "@context": "https://schema.org",
                "@type": "VideoGame",
                name: game.name,
                description: game.metaDescription,
                url,
                inLanguage: locale,
                gamePlatform: "Web browser",
                genre: isShooter ? "Shooter" : "Endless runner",
                isAccessibleForFree: true,
                publisher: { "@type": "Organization", "@id": `${site.url}/#organization`, name: site.name, url: site.url },
              }
        }
      />
      <PageHero kicker={copy.hub.kicker} headline={name} sub={quiz ? quiz.tagline : game.tagline} dark />
      <Breadcrumbs
        items={[
          { label: t.home, href: href(locale, "/") },
          { label: copy.hub.navLabel, href: href(locale, "/play/") },
          { label: name, href: href(locale, `/play/${slug}/`) },
        ]}
      />
      <section className="ribbon-bg mx-auto max-w-4xl px-4 py-12 sm:px-6">
        {quiz ? (
          <KnowledgeQuiz locale={locale} quiz={quiz} copy={copy.quiz} host={copy.host} toolName={getToolSummary(locale, quiz.tool)?.name ?? ""} />
        ) : (
          <>
            {isShooter ? <ArrowStrike locale={locale} copy={copy.shooter} host={copy.host} /> : <LeadRunner locale={locale} copy={copy.game} host={copy.host} />}
            <div className="mt-10">
              <Prose paragraphs={game.intro} />
            </div>
          </>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <h2 className="font-display text-2xl font-bold text-forest">{copy.quiz.other}</h2>
        <ul className="mt-6 grid gap-5 md:grid-cols-3">
          {others.map((q) => (
            <li key={q.slug}>
              <Link href={href(locale, `/play/${q.slug}/`)} className={card}>
                <h3 className="font-display text-lg font-semibold text-forest">{q.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">{q.tagline}</p>
              </Link>
            </li>
          ))}
          <li>
            <Link href={href(locale, `/play/${otherGame.slug}/`)} className={card}>
              <h3 className="font-display text-lg font-semibold text-forest">{otherGame.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">{otherGame.tagline}</p>
            </Link>
          </li>
        </ul>
      </section>
      <CtaBand locale={locale} audit />
    </>
  );
}
