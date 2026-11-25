import type { Locale } from "@/lib/types";
import type { PlayCopy } from "./types";
import { en } from "./en";
import { fr } from "./fr";
import { ar } from "./ar";

/**
 * Play & Learn copy. A language that has not been translated yet falls back to
 * English, so the section works everywhere from the first day.
 */
const registry: Partial<Record<Locale, PlayCopy>> = { en, fr, ar };

export const getPlay = (locale: Locale): PlayCopy => registry[locale] ?? en;

/** Slugs are the same in every language: the games, then the quizzes. */
export const PLAY_SLUGS: string[] = [en.game.slug, en.shooter.slug, ...en.quizzes.map((q) => q.slug)];

/**
 * The copy the side widget needs, without the self-assessment quizzes: they
 * have no single right answer, and leaving them out keeps the page lighter.
 */
export const getWidgetPlay = (locale: Locale): PlayCopy => {
  const copy = getPlay(locale);
  return { ...copy, quizzes: copy.quizzes.filter((quiz) => !quiz.questions.some((q) => q.weights)) };
};
