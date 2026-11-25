/** Copy for the Play & Learn section: one game and the training quizzes. */
export interface QuizQuestion {
  q: string;
  options: string[];
  /** Index of the right option. */
  answer: number;
  /** Shown after answering: why that option is right, or why the question matters. */
  why: string;
  /**
   * For a self-assessment: points for each option, in order. When present the
   * question has no wrong answer and the quiz adds up points instead.
   */
  weights?: number[];
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
  /** Result messages for a self-assessment, lowest score first. Knowledge quizzes use the shared ones. */
  tiers?: [string, string, string];
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
    /** Shown after an answer in a self-assessment, where nothing is right or wrong. */
    noted: string;
  };
  /** The small games shown in side columns. */
  widget: {
    title: string;
    sub: string;
    tabDaily: string;
    tabWord: string;
    tabMatch: string;
    dailyHeading: string;
    fullQuiz: string;
    wordHeading: string;
    clue: string;
    clear: string;
    solved: string;
    another: string;
    matchHeading: string;
    moves: string;
    matched: string;
    again: string;
    more: string;
  };
  /** Words for the unscramble game: one word, no spaces, with a one-line clue. */
  words: { word: string; clue: string }[];
  quizzes: Quiz[];
}
