"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/types";
import { href, isRtl } from "@/lib/i18n";

/**
 * Growth, the TDM mascot, in the corner of every page.
 *
 * It runs in from the edge on every page. On a visitor's first page it waves and
 * says hello; on later pages it acts as a guide, pointing to the next useful
 * thing for the kind of page they are on (the free tool for a service, a quiz
 * after an article, a game on the play page). It greets them again when they
 * come back to the tab, speaks up once when the pointer heads for the top of
 * the window, and opens a small menu when clicked.
 * The frames are renders of the 3D character (see scripts/mascot); the visitor
 * can hide it for the rest of the visit.
 */

export const MASCOT_NAME = "Growth";

type Mode = "off" | "enter" | "wave" | "idle" | "point" | "cheer";
/** What Growth can say. The last five are the guide lines, one per kind of page. */
type Guide = "service" | "sector" | "blog" | "tools" | "playhub";
type Line = "hi" | "back" | "leaving" | "tip" | "menu" | Guide;

const FRAMES: Record<Exclude<Mode, "off">, { frames: string[]; every: number }> = {
  enter: { frames: ["run1", "run2", "run3", "run4"], every: 95 },
  wave: { frames: ["wave1", "wave2"], every: 230 },
  // Mostly still, with a short happy blink now and then.
  idle: { frames: [...Array<string>(18).fill("idle1"), "idle2"], every: 210 },
  point: { frames: ["point"], every: 1000 },
  cheer: { frames: ["cheer", "jump"], every: 280 },
};
const ALL = ["idle1", "idle2", "wave1", "wave2", "cheer", "jump", "point", "run1", "run2", "run3", "run4"];

const COPY: Record<Locale, { lines: Record<Line, string>; consult: string; tools: string; play: string; tryTool: string; quiz: string; strike: string; close: string; hide: string; open: string }> = {
  en: {
    lines: {
      hi: `Hi, I'm ${MASCOT_NAME}, the arrow from the TDM logo. Need a hand with anything?`,
      back: "Welcome back. Shall we pick up where you left off?",
      leaving: "Leaving already? A free consultation only takes one short message.",
      tip: "Want a quick answer first? Try one of our free tools.",
      menu: "What would you like to do?",
      service: "Looking into this service? There's a free tool that goes with it.",
      sector: "Not sure which of these you need? A short quiz can point you in the right direction.",
      blog: "When you finish reading, test yourself. I host the quizzes.",
      tools: "Pick a tool and run it. If the result raises questions, I can get you a free consultation.",
      playhub: "Pick a quiz and I'll host it, or come and throw some arrows with me.",
    },
    consult: "Free consultation",
    tools: "Free tools",
    play: "Play a game",
    tryTool: "Try the free tool",
    quiz: "Take a quiz",
    strike: "Play Arrow Strike",
    close: "Close",
    hide: `Hide ${MASCOT_NAME}`,
    open: `${MASCOT_NAME}, the TDM mascot. Open menu`,
  },
  fr: {
    lines: {
      hi: `Bonjour, je suis ${MASCOT_NAME}, la flèche du logo TDM. Besoin d'un coup de main ?`,
      back: "Content de vous revoir. On reprend là où vous en étiez ?",
      leaving: "Vous partez déjà ? Une consultation gratuite ne demande qu'un court message.",
      tip: "Envie d'une réponse rapide ? Essayez l'un de nos outils gratuits.",
      menu: "Que souhaitez-vous faire ?",
      service: "Ce service vous intéresse ? Un outil gratuit va avec.",
      sector: "Vous hésitez entre ces services ? Un court quiz peut vous orienter.",
      blog: "Une fois la lecture finie, testez-vous. C'est moi qui anime les quiz.",
      tools: "Choisissez un outil et lancez-le. Si le résultat soulève des questions, je vous obtiens une consultation gratuite.",
      playhub: "Choisissez un quiz, je l'anime. Ou venez lancer quelques flèches avec moi.",
    },
    consult: "Consultation gratuite",
    tools: "Outils gratuits",
    play: "Jouer",
    tryTool: "Essayer l'outil gratuit",
    quiz: "Faire un quiz",
    strike: "Jouer à Arrow Strike",
    close: "Fermer",
    hide: `Masquer ${MASCOT_NAME}`,
    open: `${MASCOT_NAME}, la mascotte de TDM. Ouvrir le menu`,
  },
  ar: {
    lines: {
      hi: `مرحباً، أنا ${MASCOT_NAME}، السهم في شعار TDM. هل تحتاج إلى مساعدة؟`,
      back: "أهلاً بعودتك. هل نكمل من حيث توقفت؟",
      leaving: "هل ستغادر بهذه السرعة؟ الاستشارة المجانية لا تحتاج سوى رسالة قصيرة.",
      tip: "تريد إجابة سريعة أولاً؟ جرّب إحدى أدواتنا المجانية.",
      menu: "ماذا تودّ أن تفعل؟",
      service: "مهتم بهذه الخدمة؟ هناك أداة مجانية تناسبها.",
      sector: "لست متأكداً أي خدمة تحتاج؟ اختبار قصير قد يوجّهك.",
      blog: "عندما تنتهي من القراءة، اختبر نفسك. أنا من يقدّم الاختبارات.",
      tools: "اختر أداة وشغّلها. وإن أثارت النتيجة أسئلة، أرتّب لك استشارة مجانية.",
      playhub: "اختر اختباراً وسأقدّمه لك، أو تعال نرمِ بعض الأسهم معاً.",
    },
    consult: "استشارة مجانية",
    tools: "أدوات مجانية",
    play: "العب",
    tryTool: "جرّب الأداة المجانية",
    quiz: "خُض اختباراً",
    strike: "العب Arrow Strike",
    close: "إغلاق",
    hide: `إخفاء ${MASCOT_NAME}`,
    open: `${MASCOT_NAME}، تميمة TDM. افتح القائمة`,
  },
};

const SEEN = "tdm-growth-seen";
const HIDDEN = "tdm-growth-hidden";
const store = {
  get(key: string) {
    try {
      return window.sessionStorage.getItem(key);
    } catch {
      return null; // private window: it simply greets again
    }
  },
  set(key: string) {
    try {
      window.sessionStorage.setItem(key, "1");
    } catch {
      /* not remembered */
    }
  },
};

/** Which guide line fits a page, from its path without the language prefix. */
function guideFor(path: string, groups: string[]): Guide | null {
  const parts = path.split("/").filter(Boolean);
  if (parts[0] === "play") return parts.length === 1 ? "playhub" : null;
  if (parts[0] === "tools") return "tools";
  if (parts[0] === "blog") return parts.length > 1 && parts[1] !== "author" ? "blog" : null;
  if (groups.includes(parts[0])) return parts.length > 1 ? "service" : "sector";
  return null;
}

export function GrowthMascot({ locale, groups, serviceTools }: { locale: Locale; groups: string[]; serviceTools: Record<string, string> }) {
  const t = COPY[locale];
  const rtl = isRtl(locale);
  const pathname = usePathname();
  const prefix = href(locale, "/").replace(/\/$/, "");
  const path = prefix && pathname.startsWith(prefix) ? pathname.slice(prefix.length) || "/" : pathname;
  // Inside a game or a quiz Growth is the host on the page itself, so it stays out of the corner.
  const inGame = /^\/play\/[^/]+/.test(path);
  const guide = guideFor(path, groups);
  const tool = serviceTools[path.endsWith("/") ? path : `${path}/`];
  const [mode, setMode] = useState<Mode>("off");
  const [arrived, setArrived] = useState(false);
  const [tick, setTick] = useState(0);
  const [line, setLine] = useState<Line | null>(null);
  const timers = useRef<number[]>([]);
  const said = useRef<Set<Line>>(new Set());
  const still = useRef(false);

  const later = useCallback((fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  }, []);
  const clear = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  /** Say one line with a matching move, then settle back to idle. */
  const say = useCallback(
    (which: Line, move: Mode, hold = 8000) => {
      clear();
      setMode(still.current && move !== "point" ? "idle" : move);
      setLine(which);
      later(() => setMode("idle"), Math.min(hold, 2600));
      later(() => setLine((now) => (now === which ? null : now)), hold);
    },
    [clear, later],
  );

  // Arrival, on every page: run in from the edge; say hello on the first page of a visit,
  // and on later pages point to the next useful thing for that kind of page.
  useEffect(() => {
    if (store.get(HIDDEN) || inGame) return;
    still.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    for (const name of ALL) new window.Image().src = `/mascot/${name}.webp`;
    const first = !store.get(SEEN);
    const guideKey = guide && `tdm-growth-guide-${guide}`;
    const speak = () => {
      if (first) {
        say("hi", "wave");
      } else if (guide && guideKey && !store.get(guideKey) && (guide !== "service" || tool)) {
        store.set(guideKey);
        later(() => say(guide, "point", 11000), 3500);
      }
    };
    later(() => {
      store.set(SEEN);
      setLine(null);
      if (still.current) {
        setArrived(true);
        setMode("idle");
        later(speak, 600);
        return;
      }
      setArrived(false);
      setMode("enter");
      // Two frames on, so the slide starts from off-screen.
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => setArrived(true)));
      later(() => {
        setMode("idle");
        speak();
      }, first ? 1700 : 1100);
    }, first ? 1400 : 250);
    return clear;
  }, [clear, later, say, path, inGame, guide, tool]);

  // Frame clock for the current move.
  useEffect(() => {
    if (mode === "off") return;
    const id = window.setInterval(() => setTick((n) => n + 1), FRAMES[mode].every);
    return () => window.clearInterval(id);
  }, [mode]);

  // Coming back to the tab, heading for the top of the window, and reading far down the page.
  useEffect(() => {
    let leftAt = 0;
    const once = (which: Line, move: Mode) => {
      if (said.current.has(which) || store.get(HIDDEN)) return;
      said.current.add(which);
      say(which, move);
    };
    const onVisible = () => {
      if (document.hidden) {
        leftAt = Date.now();
      } else if (leftAt && Date.now() - leftAt > 4000 && !store.get(HIDDEN)) {
        say("back", "wave");
      }
    };
    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget && e.clientY <= 0) once("leaving", "cheer");
    };
    const onScroll = () => {
      const room = document.documentElement.scrollHeight - window.innerHeight;
      if (room > 1200 && window.scrollY / room > 0.6) once("tip", "point");
    };
    document.addEventListener("visibilitychange", onVisible);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("scroll", onScroll);
    };
  }, [say]);

  if (mode === "off" || inGame) return null;

  const set = FRAMES[mode];
  const frame = set.frames[tick % set.frames.length];
  // The run is rendered heading left; mirror it when Growth comes in from the left edge.
  const mirror = mode === "enter" && !rtl;
  const offscreen = rtl ? "translateX(180px)" : "translateX(-180px)";
  const cta =
    line === "tip"
      ? { to: "/tools/", label: t.tools }
      : line === "service" && tool
        ? { to: `/tools/${tool}/`, label: t.tryTool }
        : line === "sector"
          ? { to: "/play/scale-readiness-quiz/", label: t.quiz }
          : line === "blog"
            ? { to: "/play/", label: t.quiz }
            : line === "playhub"
              ? { to: "/play/arrow-strike/", label: t.strike }
              : { to: "/contact/", label: t.consult };

  const hide = () => {
    clear();
    store.set(HIDDEN);
    setLine(null);
    setMode("off");
  };

  return (
    <div className="pointer-events-none fixed bottom-2 start-2 z-40 print:hidden sm:bottom-3 sm:start-3">
      {line && (
        <div
          role="status"
          className="pointer-events-auto relative mb-1 ms-3 w-60 rounded-2xl border border-mint bg-white p-4 text-sm leading-relaxed text-ink shadow-[0_18px_40px_-14px_rgba(15,53,39,0.45)] sm:w-64"
        >
          <button
            onClick={() => setLine(null)}
            aria-label={t.close}
            className="absolute end-2 top-2 flex h-6 w-6 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-mint hover:text-forest"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <p className="pe-5 font-medium">{t.lines[line]}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link href={href(locale, cta.to)} onClick={() => setLine(null)} className="rounded-full bg-amber px-4 py-2 text-xs font-bold text-white transition hover:brightness-110">
              {cta.label}
            </Link>
            {line === "menu" && (
              <Link href={href(locale, "/tools/")} onClick={() => setLine(null)} className="rounded-full border border-mint px-4 py-2 text-xs font-bold text-forest transition-colors hover:border-fern">
                {t.tools}
              </Link>
            )}
            {(line === "menu" || line === "hi") && (
              <Link href={href(locale, "/play/")} onClick={() => setLine(null)} className="rounded-full border border-mint px-4 py-2 text-xs font-bold text-forest transition-colors hover:border-fern">
                {t.play}
              </Link>
            )}
          </div>
          {line === "menu" && (
            <button onClick={hide} className="mt-3 text-xs font-semibold text-ink/50 underline underline-offset-2 hover:text-forest">
              {t.hide}
            </button>
          )}
          <span className="absolute -bottom-1.5 start-10 h-3 w-3 rotate-45 border-b border-e border-mint bg-white" aria-hidden />
        </div>
      )}
      <button
        onClick={() => (line ? setLine(null) : say("menu", "wave", 20000))}
        aria-label={t.open}
        aria-expanded={line === "menu"}
        className="pointer-events-auto block h-[104px] w-[124px] cursor-pointer outline-none transition-transform ease-linear focus-visible:ring-2 focus-visible:ring-amber sm:h-[132px] sm:w-[157px]"
        style={{ transform: arrived ? "none" : offscreen, transitionDuration: mode === "enter" && arrived ? "1000ms" : "0ms" }}
      >
        {/* A plain image: the frames swap many times a second, which the image optimiser is not for. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/mascot/${frame}.webp`}
          alt=""
          draggable={false}
          className="h-full w-full select-none object-contain object-bottom drop-shadow-[0_6px_6px_rgba(15,53,39,0.28)]"
          style={{ transform: mirror ? "scaleX(-1)" : undefined }}
        />
      </button>
    </div>
  );
}
