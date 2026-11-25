"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/types";
import { href, isRtl } from "@/lib/i18n";
import type { PlayCopy } from "@/content/play/types";
import { GrowthSays } from "@/components/mascot/GrowthSays";

/**
 * Arrow Strike: an aiming game drawn on a canvas.
 *
 * Growth, the mascot, stands on the left and throws arrows to the right. The
 * player moves it up and down and chooses when to throw. Blockers (the things
 * that hold a business back) must be hit before they get past; leads must be
 * left alone. Three blockers through and the round is over. The best score is
 * kept on the device.
 */

const W = 800;
const H = 360;
const PX = 74; // where Growth stands
const TOP = 70;
const BOTTOM = H - 62;
const BEST_KEY = "tdm-arrow-strike-best";
const LIVES = 3;

type Phase = "idle" | "running" | "over";
interface Shot { x: number; y: number }
interface Target { x: number; y: number; w: number; h: number; lead: boolean; label: string; seed: number }
interface Spark { x: number; y: number; vx: number; vy: number; life: number; lead: boolean }

export function ArrowStrike({ locale, copy, host }: { locale: Locale; copy: PlayCopy["shooter"]; host: PlayCopy["host"] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(LIVES);
  const [best, setBest] = useState(0);
  const rtl = isRtl(locale);
  // The running game lives in a ref so the animation loop never restarts on a re-render.
  const game = useRef({
    phase: "idle" as Phase, y: H / 2, aim: H / 2, score: 0, lives: LIVES, time: 0, cool: 0, next: 50, hurt: 0, threw: 0,
    shots: [] as Shot[], targets: [] as Target[], sparks: [] as Spark[], keys: { up: false, down: false }, t: 0,
  });
  const labels = useRef(copy.targets);

  useEffect(() => {
    labels.current = copy.targets;
  }, [copy.targets]);

  useEffect(() => {
    // Read after the first paint, so the server and the browser render the same thing first.
    const id = window.requestAnimationFrame(() => {
      try {
        setBest(Number(window.localStorage.getItem(BEST_KEY)) || 0);
      } catch {
        /* private window: the best score just is not remembered */
      }
    });
    return () => window.cancelAnimationFrame(id);
  }, []);

  /** Start a round, or throw an arrow if one is under way. */
  const act = useCallback(() => {
    const g = game.current;
    if (g.phase !== "running") {
      Object.assign(g, { phase: "running", score: 0, lives: LIVES, time: 0, cool: 10, next: 15, hurt: 0, threw: 0, shots: [], targets: [], sparks: [] });
      setPhase("running");
      setScore(0);
      setLives(LIVES);
      return;
    }
    if (g.cool <= 0) {
      g.shots.push({ x: PX + 44, y: g.y - 8 });
      g.cool = 13;
      g.threw = 8;
    }
  }, []);

  const aimAt = useCallback((clientY: number) => {
    const box = canvasRef.current?.getBoundingClientRect();
    if (!box) return;
    game.current.aim = Math.max(TOP, Math.min(BOTTOM, ((clientY - box.top) / box.height) * H));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const css = getComputedStyle(document.documentElement);
    const c = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback;
    const col = { forest: c("--color-forest", "#0f3527"), pine: c("--color-pine", "#1b5e43"), sage: c("--color-sage", "#6ba58c"), mint: c("--color-mint", "#dfede6"), amber: c("--color-amber", "#e8862d"), cream: c("--color-cream", "#f7f5ef") };
    const font = `700 13px ${getComputedStyle(canvas).fontFamily || "sans-serif"}`;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * ratio;
    canvas.height = H * ratio;
    ctx.scale(ratio, ratio);

    const sprites: Record<string, HTMLImageElement> = {};
    for (const name of ["point", "hit", "idle1", "cheer"]) {
      sprites[name] = new window.Image();
      sprites[name].src = `/mascot/${name}.webp`;
    }
    const rounded = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
      ctx.fill();
    };

    let raf = 0;
    let last = performance.now();
    let shownScore = -1;
    const frame = (now: number) => {
      const g = game.current;
      const dt = Math.min((now - last) / 16.67, 2.5);
      last = now;
      g.t += dt;

      if (g.phase === "running") {
        g.time += dt;
        const pace = Math.min(g.time / 2400, 1); // 0 at the start, 1 after about 40 seconds
        if (g.keys.up) g.aim = Math.max(TOP, g.aim - 6 * dt);
        if (g.keys.down) g.aim = Math.min(BOTTOM, g.aim + 6 * dt);
        g.y += (g.aim - g.y) * Math.min(0.28 * dt, 1);
        g.cool -= dt;
        g.hurt -= dt;
        g.threw -= dt;

        g.next -= dt;
        if (g.next <= 0) {
          const lead = Math.random() < 0.24;
          const label = lead ? "" : labels.current[Math.floor(Math.random() * labels.current.length)];
          ctx.font = font;
          const w = lead ? 30 : Math.max(64, ctx.measureText(label).width + 26);
          g.targets.push({ x: W + w / 2 + 10, y: TOP + Math.random() * (BOTTOM - TOP), w, h: lead ? 30 : 34, lead, label, seed: Math.random() * 100 });
          g.next = 58 - pace * 30 + Math.random() * 26;
        }
        const speed = 2.1 + pace * 2.6;
        for (const s of g.shots) s.x += 14 * dt;
        for (const tg of g.targets) tg.x -= speed * dt;
        for (const p of g.sparks) {
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.vy += 0.25 * dt;
          p.life -= dt;
        }

        for (const s of g.shots) {
          for (const tg of g.targets) {
            if (tg.w && Math.abs(s.x + 16 - tg.x) < tg.w / 2 + 4 && Math.abs(s.y - tg.y) < tg.h / 2 + 5) {
              g.score = Math.max(0, g.score + (tg.lead ? -5 : 10));
              for (let i = 0; i < 9; i++) g.sparks.push({ x: tg.x, y: tg.y, vx: (Math.random() - 0.3) * 5, vy: (Math.random() - 0.6) * 5, life: 22, lead: tg.lead });
              tg.w = 0;
              s.x = W + 100;
            }
          }
        }
        for (const tg of g.targets) {
          if (tg.w && tg.x < PX - 10) {
            if (tg.lead) {
              g.score += 5;
            } else {
              g.lives -= 1;
              g.hurt = 26;
              setLives(g.lives);
            }
            tg.w = 0;
          }
        }
        g.shots = g.shots.filter((s) => s.x < W + 30);
        g.targets = g.targets.filter((tg) => tg.w);
        g.sparks = g.sparks.filter((p) => p.life > 0);

        if (g.lives <= 0) {
          g.phase = "over";
          setPhase("over");
          const total = g.score;
          setScore(total);
          setBest((old) => {
            const top = Math.max(old, total);
            try {
              window.localStorage.setItem(BEST_KEY, String(top));
            } catch {
              /* not remembered */
            }
            return top;
          });
        } else if (g.score !== shownScore) {
          shownScore = g.score;
          setScore(g.score);
        }
      }

      // --- draw ---
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = col.cream;
      ctx.fillRect(0, 0, W, H);
      // soft bands drifting past, for a sense of movement
      ctx.fillStyle = col.mint;
      for (let i = 0; i < 6; i++) {
        const x = (((i * 190 - g.t * 0.6) % (W + 240)) + (W + 240)) % (W + 240) - 120;
        rounded(x, 40 + ((i * 97) % 240), 120 + (i % 3) * 40, 10, 5);
      }
      // the line the blockers must not cross
      ctx.strokeStyle = col.sage;
      ctx.setLineDash([6, 8]);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(PX + 46, 16);
      ctx.lineTo(PX + 46, H - 16);
      ctx.stroke();
      ctx.setLineDash([]);

      // targets
      ctx.font = font;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.direction = rtl ? "rtl" : "ltr";
      for (const tg of g.targets) {
        const y = tg.y + Math.sin((g.t + tg.seed * 10) / 16) * 5;
        if (tg.lead) {
          ctx.fillStyle = col.sage;
          ctx.beginPath();
          ctx.arc(tg.x, y, 15, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 3;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.beginPath();
          ctx.moveTo(tg.x - 6, y);
          ctx.lineTo(tg.x - 1, y + 5);
          ctx.lineTo(tg.x + 7, y - 5);
          ctx.stroke();
        } else {
          ctx.fillStyle = col.forest;
          rounded(tg.x - tg.w / 2, y - tg.h / 2, tg.w, tg.h, 10);
          ctx.fillStyle = "#fff";
          ctx.fillText(tg.label, tg.x, y + 1);
        }
      }
      // arrows
      ctx.strokeStyle = col.amber;
      ctx.fillStyle = col.amber;
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      for (const s of g.shots) {
        ctx.beginPath();
        ctx.moveTo(s.x - 16, s.y);
        ctx.lineTo(s.x + 8, s.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(s.x + 18, s.y);
        ctx.lineTo(s.x + 5, s.y - 7);
        ctx.lineTo(s.x + 5, s.y + 7);
        ctx.closePath();
        ctx.fill();
      }
      // bursts
      for (const p of g.sparks) {
        ctx.globalAlpha = Math.max(p.life / 22, 0);
        ctx.fillStyle = p.lead ? col.sage : col.amber;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Growth: pointing while it aims, knocked back when a blocker gets through.
      const name = g.phase === "over" || g.hurt > 0 ? "hit" : g.phase === "idle" ? "idle1" : "point";
      const img = sprites[name];
      if (img?.complete && img.naturalWidth) {
        const h = 118;
        const w = (img.naturalWidth / img.naturalHeight) * h;
        const lean = g.threw > 0 ? 5 : 0;
        const x = PX - w / 2 + lean;
        const y = g.y - h * 0.62;
        if (name === "point") {
          // The pose is rendered pointing left; here Growth throws to the right.
          ctx.save();
          ctx.translate(x + w, y);
          ctx.scale(-1, 1);
          ctx.drawImage(img, 0, 0, w, h);
          ctx.restore();
        } else {
          ctx.drawImage(img, x, y, w, h);
        }
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [rtl]);

  // Arrow keys aim and space throws, without scrolling the page while the game is in view.
  useEffect(() => {
    const inView = () => {
      const box = canvasRef.current?.getBoundingClientRect();
      return Boolean(box && box.bottom > 0 && box.top < window.innerHeight);
    };
    const onKey = (e: KeyboardEvent) => {
      const down = e.type === "keydown";
      if (e.code !== "Space" && e.code !== "ArrowUp" && e.code !== "ArrowDown") return;
      const el = document.activeElement;
      if (el && /^(INPUT|TEXTAREA|SELECT|BUTTON|A)$/.test(el.tagName) && el !== canvasRef.current) return;
      if (!inView()) return;
      e.preventDefault();
      if (e.code === "ArrowUp") game.current.keys.up = down;
      else if (e.code === "ArrowDown") game.current.keys.down = down;
      else if (down && !e.repeat) act();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
    };
  }, [act]);

  return (
    <div className="rounded-3xl border border-mint bg-white p-4 shadow-xl shadow-forest/5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-semibold text-forest">
        <p className="text-ink/60">{copy.how}</p>
        <p className="flex gap-4" dir="ltr" aria-live="off">
          <span>
            {copy.lives}: {lives}
          </span>
          <span>
            {copy.score}: {score}
          </span>
          <span className="text-fern">
            {copy.best}: {best}
          </span>
        </p>
      </div>
      <div className="relative mt-3 overflow-hidden rounded-2xl border border-mint">
        <canvas
          ref={canvasRef}
          onPointerMove={(e) => aimAt(e.clientY)}
          onPointerDown={(e) => {
            e.preventDefault();
            aimAt(e.clientY);
            // On a touch screen the finger both aims and throws, so jump straight to the spot.
            if (e.pointerType !== "mouse") game.current.y = game.current.aim;
            act();
          }}
          tabIndex={0}
          role="img"
          aria-label={copy.name}
          className="block aspect-[20/9] w-full cursor-crosshair touch-none select-none outline-none focus-visible:ring-2 focus-visible:ring-amber"
          dir="ltr"
        />
        {phase !== "running" && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 bg-cream/75 px-4 text-center backdrop-blur-[1px]">
            {phase === "over" && <p className="font-display text-2xl font-extrabold text-forest">{copy.over}</p>}
            <GrowthSays frame={phase === "over" ? "peek" : "wave1"} compact>
              {phase === "over" ? host.shooterOver : host.shooterTip}
            </GrowthSays>
            <button onClick={act} className="pointer-events-auto rounded-full bg-amber px-7 py-3 font-semibold text-white shadow-lg shadow-amber/25 transition hover:brightness-110">
              {phase === "over" ? copy.again : copy.start}
            </button>
            <p className="hidden text-xs font-medium text-ink/60 sm:block">{copy.tap}</p>
          </div>
        )}
      </div>
      {phase === "over" && (
        <p className="mt-4 text-center text-sm">
          <Link href={href(locale, "/tools/seo-audit/")} className="font-semibold text-fern underline underline-offset-4 hover:text-forest">
            {copy.cta}
          </Link>
        </p>
      )}
    </div>
  );
}
