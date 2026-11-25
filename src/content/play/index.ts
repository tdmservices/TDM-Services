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

/** Slugs are the same in every language: the game, then the quizzes. */
export const PLAY_SLUGS: string[] = [en.game.slug, ...en.quizzes.map((q) => q.slug)];
