/** Copy for the Play & Learn section: one game and the training quizzes. */
export interface QuizQuestion {
  q: string;
  options: string[];
  /** Index of the right option. */
  answer: number;
  /** Shown after answering: why that option is right. */
  why: string;
}

export interface Quiz {
  slug: string;
  name: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  /** Canonical path of the service this quiz belongs with. */
  service: string;
  /** A free tool to try next. */
  tool: string;
  questions: QuizQuestion[];
}

export interface PlayCopy {
  hub: {
    navLabel: string;
    kicker: string;
    headline: string;
    sub: string;
    metaTitle: string;
    metaDescription: string;
    gameHeading: string;
    quizHeading: string;
    play: string;
    start: string;
    questions: string;
  };
  game: {
    slug: string;
    name: string;
    tagline: string;
    metaTitle: string;
    metaDescription: string;
    intro: string[];
    how: string;
    start: string;
    again: string;
    over: string;
    score: string;
    best: string;
    leads: string;
    tap: string;
    cta: string;
  };
  quiz: {
    question: string;
    of: string;
    correct: string;
    wrong: string;
    next: string;
    finish: string;
    yourScore: string;
    again: string;
    review: string;
    tiers: [string, string, string];
    learn: string;
    tryTool: string;
    other: string;
  };
  quizzes: Quiz[];
}
