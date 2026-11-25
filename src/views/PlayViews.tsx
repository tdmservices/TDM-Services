import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/types";
import { href, isRtl, localePrefix } from "@/lib/i18n";
import { site } from "@/lib/site";
import { getPlay } from "@/content/play";
import { getToolSummary } from "@/content/all-tools";
import { ui } from "@/content/ui";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs, CtaBand, PageHero, Prose } from "@/components/Sections";
import { Reveal } from "@/components/motion/Reveal";
import { LeadRunner } from "@/components/play/LeadRunner";
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
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
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
        <div className="mt-6">
          <LeadRunner locale={locale} copy={copy.game} />
        </div>
      </section>
      <CtaBand locale={locale} audit />
    </>
  );
}

export function playMeta(locale: Locale, slug: string) {
  const copy = getPlay(locale);
  if (slug === copy.game.slug) return { title: copy.game.metaTitle, description: copy.game.metaDescription };
  const quiz = copy.quizzes.find((q) => q.slug === slug);
  return quiz ? { title: quiz.metaTitle, description: quiz.metaDescription } : null;
}

/** One game or quiz on its own page. */
export function PlayItemView({ locale, slug }: { locale: Locale; slug: string }) {
  const copy = getPlay(locale);
  const t = ui[locale];
  const quiz = copy.quizzes.find((q) => q.slug === slug);
  const isGame = slug === copy.game.slug;
  if (!quiz && !isGame) notFound();
  const name = quiz ? quiz.name : copy.game.name;
  const url = `${site.url}${localePrefix(locale)}/play/${slug}/`;
  const others = copy.quizzes.filter((q) => q.slug !== slug);

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
                name: copy.game.name,
                description: copy.game.metaDescription,
                url,
                inLanguage: locale,
                gamePlatform: "Web browser",
                genre: "Endless runner",
                isAccessibleForFree: true,
                publisher: { "@type": "Organization", "@id": `${site.url}/#organization`, name: site.name, url: site.url },
              }
        }
      />
      <PageHero kicker={copy.hub.kicker} headline={name} sub={quiz ? quiz.tagline : copy.game.tagline} dark />
      <Breadcrumbs
        items={[
          { label: t.home, href: href(locale, "/") },
          { label: copy.hub.navLabel, href: href(locale, "/play/") },
          { label: name, href: href(locale, `/play/${slug}/`) },
        ]}
      />
      <section className="ribbon-bg mx-auto max-w-4xl px-4 py-12 sm:px-6">
        {quiz ? (
          <KnowledgeQuiz locale={locale} quiz={quiz} copy={copy.quiz} toolName={getToolSummary(locale, quiz.tool)?.name ?? ""} />
        ) : (
          <>
            <LeadRunner locale={locale} copy={copy.game} />
            <div className="mt-10">
              <Prose paragraphs={copy.game.intro} />
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
          {!isGame && (
            <li>
              <Link href={href(locale, `/play/${copy.game.slug}/`)} className={card}>
                <h3 className="font-display text-lg font-semibold text-forest">{copy.game.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">{copy.game.tagline}</p>
              </Link>
            </li>
          )}
        </ul>
      </section>
      <CtaBand locale={locale} audit />
    </>
  );
}
