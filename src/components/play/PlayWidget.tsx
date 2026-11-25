"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Locale } from "@/lib/types";
import { href } from "@/lib/i18n";
import type { PlayCopy } from "@/content/play/types";

/**
 * Three small games in one compact card, sized for a side column:
 * a question of the day, a word to unscramble and a pairs game.
 *
 * "Today" is the same for every visitor: the day number picks the question and
 * the first word, so colleagues get the same puzzle. Nothing is sent anywhere.
 */

type Tab = "daily" | "word" | "match";
const PAIRS = ["SEO", "ROAS", "CPA", "CTR", "UGC", "CRM"];

/** Small seeded shuffle, so a given day or round always deals the same order. */
function shuffle<T>(items: T[], seed: number): T[] {
  const out = [...items];
  let s = seed || 1;
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function PlayWidget({
  locale,
  copy,
  className = "",
  startClosed = false,
}: {
  locale: Locale;
  copy: PlayCopy;
  className?: string;
  /** In a tight side column the card opens on request, so it does not crowd what sits above it. */
  startClosed?: boolean;
}) {
  const w = copy.widget;
  const [openCard, setOpenCard] = useState(!startClosed);
  const [tab, setTab] = useState<Tab>("daily");
  // The day is read after the first paint so the server and the browser render the same thing first.
  const [day, setDay] = useState(0);
  useEffect(() => {
    const id = window.requestAnimationFrame(() =>
      setDay(Math.floor(Date.now() / 86_400_000)),
    );
    return () => window.cancelAnimationFrame(id);
  }, []);

  const tabs: [Tab, string][] = [
    ["daily", w.tabDaily],
    ["word", w.tabWord],
    ["match", w.tabMatch],
  ];

  return (
    <div className={`rounded-3xl border border-mint bg-white p-5 ${className}`}>
      <button
        type="button"
        onClick={() => setOpenCard(!openCard)}
        aria-expanded={openCard}
        className="flex w-full items-center justify-between gap-3 text-start"
      >
        <span>
          <span className="kicker block text-fern">{w.title}</span>
          {!openCard && (
            <span className="mt-1 block text-xs text-ink/60">{w.sub}</span>
          )}
        </span>
        <span
          aria-hidden
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber text-sm font-bold text-white transition-transform ${openCard ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      {openCard && (
        <>
          <div
            className="mt-3 flex gap-1 rounded-full border border-mint p-1 text-xs font-bold"
            role="tablist"
          >
            {tabs.map(([id, label]) => (
              <button
                key={id}
                role="tab"
                aria-selected={tab === id}
                onClick={() => setTab(id)}
                className={`flex-1 rounded-full px-2 py-1.5 transition-colors ${tab === id ? "bg-forest text-white" : "text-ink/60 hover:text-forest"}`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="mt-4">
            {tab === "daily" && <Daily locale={locale} copy={copy} day={day} />}
            {tab === "word" && (
              <Word copy={copy} day={day} rtl={locale === "ar"} />
            )}
            {tab === "match" && <Match copy={copy} />}
          </div>
          <Link
            href={href(locale, "/play/")}
            className="mt-4 block text-xs font-semibold text-fern underline underline-offset-4 hover:text-forest"
          >
            {w.more}
          </Link>
        </>
      )}
    </div>
  );
}

function Daily({
  locale,
  copy,
  day,
}: {
  locale: Locale;
  copy: PlayCopy;
  day: number;
}) {
  // Knowledge questions only: a self-assessment question has no single answer.
  const pool = useMemo(
    () =>
      copy.quizzes.flatMap((quiz) =>
        quiz.questions
          .filter((q) => !q.weights)
          .map((q) => ({ q, slug: quiz.slug })),
      ),
    [copy],
  );
  const [picked, setPicked] = useState<number | null>(null);
  const item = pool[day % pool.length];
  if (!item) return null;
  const { q } = item;
  return (
    <div>
      <p className="text-sm font-semibold leading-snug text-forest">{q.q}</p>
      <div className="mt-3 grid gap-1.5">
        {q.options.map((option, i) => {
          const state =
            picked === null
              ? "border-mint text-ink/80 hover:border-fern"
              : i === q.answer
                ? "border-fern bg-fern/10 text-forest"
                : i === picked
                  ? "border-red-300 bg-red-50 text-red-700"
                  : "border-mint text-ink/45";
          return (
            <button
              key={option}
              disabled={picked !== null}
              onClick={() => setPicked(i)}
              className={`rounded-xl border px-3 py-2 text-start text-xs font-medium transition-colors ${state}`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div
          className="mt-3 text-xs leading-relaxed text-ink/75"
          aria-live="polite"
        >
          <p
            className={`font-bold ${picked === q.answer ? "text-fern" : "text-red-600"}`}
          >
            {picked === q.answer ? copy.quiz.correct : copy.quiz.wrong}
          </p>
          <p className="mt-1">{q.why}</p>
          <Link
            href={href(locale, `/play/${item.slug}/`)}
            className="mt-2 inline-block font-semibold text-fern underline underline-offset-4"
          >
            {copy.widget.fullQuiz}
          </Link>
        </div>
      )}
    </div>
  );
}

function Word({
  copy,
  day,
  rtl,
}: {
  copy: PlayCopy;
  day: number;
  rtl: boolean;
}) {
  const dir = rtl ? "rtl" : "ltr";
  const w = copy.widget;
  const [round, setRound] = useState(0);
  const entry = copy.words[(day + round) % copy.words.length];
  const letters = useMemo(() => {
    const chars = [...entry.word];
    let mixed = shuffle(chars, day + round * 7 + chars.length);
    if (mixed.join("") === entry.word) mixed = [...chars].reverse();
    return mixed;
  }, [entry, day, round]);
  // Positions of the tiles chosen so far, in order.
  const [chosen, setChosen] = useState<number[]>([]);
  const guess = chosen.map((i) => letters[i]).join("");
  const solved = guess === entry.word;

  return (
    <div>
      <p className="text-xs font-semibold text-ink/60">{w.wordHeading}</p>
      <div
        className="mt-3 flex min-h-9 flex-wrap gap-1"
        dir={dir}
        aria-live="polite"
      >
        {[...entry.word].map((_, i) => (
          <span
            key={i}
            className={`flex h-8 w-7 items-center justify-center rounded-lg border text-sm font-bold ${solved ? "border-fern bg-fern/10 text-forest" : "border-mint text-forest"}`}
          >
            {guess[i] ?? ""}
          </span>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-1" dir={dir}>
        {letters.map((ch, i) => (
          <button
            key={i}
            disabled={chosen.includes(i) || solved}
            onClick={() => setChosen([...chosen, i])}
            className="flex h-8 w-7 items-center justify-center rounded-lg bg-forest text-sm font-bold text-white transition disabled:opacity-25"
          >
            {ch}
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs leading-relaxed text-ink/70">
        <span className="font-bold text-forest">{w.clue}:</span> {entry.clue}
      </p>
      <div className="mt-3 flex items-center gap-3 text-xs font-semibold">
        {solved ? (
          <>
            <span className="text-fern">{w.solved} ✓</span>
            <button
              onClick={() => {
                setRound(round + 1);
                setChosen([]);
              }}
              className="rounded-full bg-amber px-3 py-1.5 text-white"
            >
              {w.another}
            </button>
          </>
        ) : (
          <button
            onClick={() => setChosen([])}
            className="rounded-full border border-mint px-3 py-1.5 text-forest hover:border-fern"
          >
            {w.clear}
          </button>
        )}
      </div>
    </div>
  );
}

function Match({ copy }: { copy: PlayCopy }) {
  const w = copy.widget;
  const [round, setRound] = useState(1);
  const cards = useMemo(
    () => shuffle([...PAIRS, ...PAIRS], round * 31),
    [round],
  );
  const [open, setOpen] = useState<number[]>([]);
  const [found, setFound] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const done = found.length === cards.length;

  const flip = (i: number) => {
    if (open.length === 2 || open.includes(i) || found.includes(i)) return;
    const next = [...open, i];
    setOpen(next);
    if (next.length === 2) {
      setMoves(moves + 1);
      if (cards[next[0]] === cards[next[1]]) {
        setFound([...found, ...next]);
        setOpen([]);
      } else {
        window.setTimeout(() => setOpen([]), 750);
      }
    }
  };

  return (
    <div>
      <p className="flex items-center justify-between text-xs font-semibold text-ink/60">
        <span>{w.matchHeading}</span>
        <span dir="ltr">
          {w.moves}: {moves}
        </span>
      </p>
      <div className="mt-3 grid grid-cols-4 gap-1.5" dir="ltr">
        {cards.map((label, i) => {
          const shown = open.includes(i) || found.includes(i);
          return (
            <button
              key={i}
              onClick={() => flip(i)}
              aria-label={shown ? label : "?"}
              className={`flex aspect-square items-center justify-center rounded-xl text-[0.7rem] font-bold transition-colors ${
                found.includes(i)
                  ? "bg-fern/15 text-fern"
                  : shown
                    ? "bg-amber text-white"
                    : "bg-forest text-white/30 hover:bg-pine"
              }`}
            >
              {shown ? label : "?"}
            </button>
          );
        })}
      </div>
      {done && (
        <div
          className="mt-3 flex items-center gap-3 text-xs font-semibold"
          aria-live="polite"
        >
          <span className="text-fern">{w.matched} ✓</span>
          <button
            onClick={() => {
              setRound(round + 1);
              setOpen([]);
              setFound([]);
              setMoves(0);
            }}
            className="rounded-full bg-amber px-3 py-1.5 text-white"
          >
            {w.again}
          </button>
        </div>
      )}
    </div>
  );
}
