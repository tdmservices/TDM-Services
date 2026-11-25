"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/lib/types";
import { href } from "@/lib/i18n";
import type { PlayCopy, Quiz } from "@/content/play/types";

/**
 * A training quiz: one question at a time, and the reason for the right answer
 * straight after each choice, so it teaches as it scores.
 */
export function KnowledgeQuiz({ locale, quiz, copy, toolName }: { locale: Locale; quiz: Quiz; copy: PlayCopy["quiz"]; toolName: string }) {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number[]>([]);
  const total = quiz.questions.length;
  const done = step >= total;
  const q = quiz.questions[Math.min(step, total - 1)];
  const choice = picked[step];
  const answered = choice !== undefined;
  // A self-assessment adds up the points of each chosen option; a knowledge quiz counts right answers.
  const assess = quiz.questions.some((item) => item.weights);
  const pointsOf = (i: number, p: number) => {
    const item = quiz.questions[i];
    return item?.weights ? (item.weights[p] ?? 0) : p === item?.answer ? 1 : 0;
  };
  const max = quiz.questions.reduce((sum, item) => sum + (item.weights ? Math.max(...item.weights) : 1), 0);
  const score = picked.reduce((sum, p, i) => sum + (p === undefined ? 0 : pointsOf(i, p)), 0);
  const tier = score >= max * 0.8 ? 2 : score >= max * 0.5 ? 1 : 0;
  const tiers = quiz.tiers ?? copy.tiers;
  const panel = "rounded-3xl border border-mint bg-white p-6 shadow-xl shadow-forest/5 sm:p-8";

  if (done) {
    return (
      <div className={panel} aria-live="polite">
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-fern">{copy.yourScore}</p>
        <p className="mt-1 font-display text-6xl font-extrabold leading-none text-forest" dir="ltr">
          {score}
          <span className="text-2xl text-ink/40"> / {max}</span>
        </p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/80">{tiers[tier]}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={href(locale, quiz.service)} className="rounded-full bg-amber px-6 py-3 font-semibold text-white shadow-lg shadow-amber/25 transition hover:brightness-110">
            {copy.learn}
          </Link>
          <Link href={href(locale, `/tools/${quiz.tool}/`)} className="rounded-full border-2 border-mint px-6 py-3 font-semibold text-forest transition-colors hover:border-fern">
            {copy.tryTool}: {toolName}
          </Link>
          <button
            onClick={() => {
              setPicked([]);
              setStep(0);
            }}
            className="rounded-full border-2 border-mint px-6 py-3 font-semibold text-forest transition-colors hover:border-fern"
          >
            {copy.again}
          </button>
        </div>

        <h3 className="mt-10 font-display text-xl font-bold text-forest">{copy.review}</h3>
        <ol className="mt-4 space-y-4">
          {quiz.questions.map((item, i) => {
            const full = pointsOf(i, picked[i]) === (item.weights ? Math.max(...item.weights) : 1);
            const right = full;
            return (
              <li key={item.q} className="rounded-2xl border border-mint px-5 py-4">
                <p className="font-semibold text-forest">
                  <span className={`me-2 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${right ? "bg-fern/15 text-fern" : assess ? "bg-amber/15 text-amber" : "bg-red-50 text-red-600"}`} aria-hidden>
                    {right ? "✓" : assess ? "!" : "✕"}
                  </span>
                  {item.q}
                </p>
                <p className="mt-2 text-sm font-semibold text-fern">{assess ? item.options[picked[i]] : item.options[item.answer]}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink/75">{item.why}</p>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  return (
    <div className={panel}>
      <div className="flex items-center justify-between gap-4 text-sm">
        <span className="font-semibold text-fern">
          {copy.question} {step + 1} {copy.of} {total}
        </span>
        {!assess && (
          <span className="font-semibold text-ink/50" dir="ltr">
            {score} ✓
          </span>
        )}
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-mint">
        <div className="h-full rounded-full bg-amber transition-all duration-500" style={{ width: `${((step + (answered ? 1 : 0)) / total) * 100}%` }} />
      </div>
      <h3 className="mt-6 font-display text-xl font-bold leading-snug text-forest sm:text-2xl">{q.q}</h3>
      <div className="mt-5 grid gap-3">
        {q.options.map((option, i) => {
          const isRight = i === q.answer;
          const state = !answered
            ? "border-mint bg-white text-ink/85 hover:border-fern"
            : assess
              ? i === choice
                ? "border-forest bg-mint/60 text-forest"
                : "border-mint bg-white text-ink/50"
              : isRight
              ? "border-fern bg-fern/10 text-forest"
              : i === choice
                ? "border-red-300 bg-red-50 text-red-700"
                : "border-mint bg-white text-ink/50";
          return (
            <button
              key={option}
              disabled={answered}
              onClick={() => setPicked((old) => Object.assign([...old], { [step]: i }))}
              className={`rounded-2xl border-2 px-5 py-4 text-start text-base font-medium transition-colors ${state}`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="mt-5 rounded-2xl bg-cream px-5 py-4" aria-live="polite">
          <p className={`font-display font-bold ${assess || choice === q.answer ? "text-fern" : "text-red-600"}`}>
            {assess ? copy.noted : choice === q.answer ? copy.correct : copy.wrong}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-ink/80">{q.why}</p>
          <button onClick={() => setStep(step + 1)} className="mt-4 rounded-full bg-amber px-6 py-3 font-semibold text-white shadow-lg shadow-amber/25 transition hover:brightness-110">
            {step + 1 === total ? copy.finish : copy.next}
          </button>
        </div>
      )}
    </div>
  );
}
