"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/types";
import { href } from "@/lib/i18n";
import type { PlayCopy } from "@/content/play/types";
import { GrowthSays } from "@/components/mascot/GrowthSays";

/**
 * Lead Runner: a small endless runner drawn on a canvas.
 *
 * Growth, the TDM mascot, runs by itself; the player jumps the blockers and picks
 * up leads. The scenery is drawn from shapes in the site's colours; the mascot is
 * a set of rendered frames (see scripts/mascot). The best score is kept on the device.
 */

const W = 800;
const H = 300;
const GROUND = 248;
const SIZE = 34;
const BEST_KEY = "tdm-lead-runner-best";
const RUN = ["run1", "run2", "run3", "run4"];

type Phase = "idle" | "running" | "over";
interface Blocker { x: number; w: number; h: number }
interface Lead { x: number; y: number; taken: boolean }

export function LeadRunner({ locale, copy, host }: { locale: Locale; copy: PlayCopy["game"]; host: PlayCopy["host"] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [score, setScore] = useState(0);
  const [leads, setLeads] = useState(0);
  const [best, setBest] = useState(0);
  // The running game lives in a ref so the animation loop never restarts on a re-render.
  const game = useRef({ phase: "idle" as Phase, y: GROUND - SIZE, vy: 0, speed: 5, dist: 0, leads: 0, next: 60, nextLead: 140, blockers: [] as Blocker[], coins: [] as Lead[], t: 0 });

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

  const jump = useCallback(() => {
    const g = game.current;
    if (g.phase !== "running") {
      Object.assign(g, { phase: "running", y: GROUND - SIZE, vy: 0, speed: 5, dist: 0, leads: 0, next: 70, nextLead: 150, blockers: [], coins: [] });
      setPhase("running");
      setScore(0);
      setLeads(0);
      return;
    }
    if (g.y >= GROUND - SIZE - 0.5) g.vy = -11.6;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const css = getComputedStyle(document.documentElement);
    const c = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback;
    const col = { forest: c("--color-forest", "#0f3527"), pine: c("--color-pine", "#1b5e43"), sage: c("--color-sage", "#6ba58c"), mint: c("--color-mint", "#dfede6"), amber: c("--color-amber", "#f08a24"), cream: c("--color-cream", "#f7f5ef") };
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * ratio;
    canvas.height = H * ratio;
    ctx.scale(ratio, ratio);

    const rounded = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
      ctx.fill();
    };

    const sprites: Record<string, HTMLImageElement> = {};
    for (const name of [...RUN, "jump", "hit", "idle1"]) {
      sprites[name] = new window.Image();
      sprites[name].src = `/mascot/${name}.webp`;
    }

    let raf = 0;
    let last = performance.now();
    let shown = -1;
    const frame = (now: number) => {
      const g = game.current;
      const dt = Math.min((now - last) / 16.67, 2.5);
      last = now;
      g.t += dt;

      if (g.phase === "running") {
        g.speed = Math.min(5 + g.dist / 900, 11.5);
        g.dist += g.speed * dt;
        g.vy += 0.62 * dt;
        g.y = Math.min(g.y + g.vy * dt, GROUND - SIZE);
        if (g.y >= GROUND - SIZE) g.vy = 0;

        g.next -= dt;
        if (g.next <= 0) {
          g.blockers.push({ x: W + 20, w: 20 + Math.random() * 16, h: 28 + Math.random() * 26 });
          g.next = 62 + Math.random() * 60 - Math.min(g.dist / 220, 26);
        }
        g.nextLead -= dt;
        if (g.nextLead <= 0) {
          g.coins.push({ x: W + 20, y: 120 + Math.random() * 70, taken: false });
          g.nextLead = 90 + Math.random() * 110;
        }
        for (const b of g.blockers) b.x -= g.speed * dt;
        for (const k of g.coins) k.x -= g.speed * dt;
        g.blockers = g.blockers.filter((b) => b.x + b.w > -10);
        g.coins = g.coins.filter((k) => k.x > -20 && !k.taken);

        const px = 80;
        for (const k of g.coins) {
          if (Math.abs(k.x - (px + SIZE / 2)) < 26 && Math.abs(k.y - (g.y + SIZE / 2)) < 30) {
            k.taken = true;
            g.leads += 1;
            setLeads(g.leads);
          }
        }
        for (const b of g.blockers) {
          // A little forgiveness on every edge, so a near miss feels fair.
          if (px + SIZE - 5 > b.x && px + 5 < b.x + b.w && g.y + SIZE - 4 > GROUND - b.h) {
            g.phase = "over";
            setPhase("over");
            const total = Math.floor(g.dist / 10) + g.leads * 10;
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
          }
        }
        const total = Math.floor(g.dist / 10) + g.leads * 10;
        if (total !== shown && g.phase === "running") {
          shown = total;
          setScore(total);
        }
      }

      // --- draw ---
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = col.cream;
      ctx.fillRect(0, 0, W, H);
      // far hills, drifting slowly
      ctx.fillStyle = col.mint;
      for (let i = 0; i < 5; i++) {
        const x = ((i * 230 - g.dist * 0.15) % (W + 260)) + (W + 260);
        ctx.beginPath();
        ctx.ellipse((x % (W + 260)) - 130, GROUND + 6, 150, 60 + (i % 3) * 22, 0, Math.PI, 0);
        ctx.fill();
      }
      // ground
      ctx.fillStyle = col.forest;
      ctx.fillRect(0, GROUND, W, 3);
      ctx.fillStyle = col.sage;
      for (let i = 0; i < 16; i++) {
        const x = ((i * 60 - g.dist) % (W + 60) + (W + 60)) % (W + 60) - 30;
        ctx.fillRect(x, GROUND + 12 + (i % 3) * 8, 18, 2);
      }
      // leads: a coin with a tick
      for (const k of g.coins) {
        const bob = Math.sin((g.t + k.x) / 14) * 3;
        ctx.fillStyle = col.sage;
        ctx.beginPath();
        ctx.arc(k.x, k.y + bob, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(k.x - 5, k.y + bob);
        ctx.lineTo(k.x - 1, k.y + bob + 4);
        ctx.lineTo(k.x + 6, k.y + bob - 4);
        ctx.stroke();
      }
      // blockers: dark blocks with a cross
      for (const b of g.blockers) {
        ctx.fillStyle = col.pine;
        rounded(b.x, GROUND - b.h, b.w, b.h, 5);
        ctx.strokeStyle = col.mint;
        ctx.lineWidth = 2;
        const cx = b.x + b.w / 2;
        const cy = GROUND - b.h + 12;
        ctx.beginPath();
        ctx.moveTo(cx - 4, cy - 4);
        ctx.lineTo(cx + 4, cy + 4);
        ctx.moveTo(cx + 4, cy - 4);
        ctx.lineTo(cx - 4, cy + 4);
        ctx.stroke();
      }
      // Growth, the mascot: runs on the ground, jumps in the air, falls back when hit.
      const py = g.y;
      const air = py < GROUND - SIZE - 0.5;
      const name = g.phase === "over" ? "hit" : g.phase === "idle" ? "run2" : air ? "jump" : RUN[Math.floor(g.dist / 16) % RUN.length];
      const img = sprites[name];
      if (img?.complete && img.naturalWidth) {
        // The front-facing frames have more room around the character, so they are drawn a little larger to match.
        const h = RUN.includes(name) ? 92 : 107;
        const w = (img.naturalWidth / img.naturalHeight) * h;
        const x = 80 + SIZE / 2 - w / 2;
        const y = py + SIZE - h + 3;
        // soft shadow on the ground, smaller the higher the jump
        const lift = Math.min((GROUND - SIZE - py) / 90, 1);
        ctx.fillStyle = "rgba(15,53,39,0.16)";
        ctx.beginPath();
        ctx.ellipse(80 + SIZE / 2, GROUND + 1, 24 - lift * 10, 4.5 - lift * 1.5, 0, 0, Math.PI * 2);
        ctx.fill();
        if (RUN.includes(name)) {
          // The run is rendered heading left; the game runs to the right.
          ctx.save();
          ctx.translate(x + w, y);
          ctx.scale(-1, 1);
          ctx.drawImage(img, 0, 0, w, h);
          ctx.restore();
        } else {
          ctx.drawImage(img, x, y, w, h);
        }
      } else {
        // Until the pictures arrive: the plain amber block.
        ctx.fillStyle = col.amber;
        rounded(80, py, SIZE, SIZE, 8);
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Space and the up arrow jump, without scrolling the page while the game is in play.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "Space" && e.code !== "ArrowUp") return;
      const el = document.activeElement;
      if (el && /^(INPUT|TEXTAREA|SELECT|BUTTON|A)$/.test(el.tagName) && el !== canvasRef.current) return;
      const box = canvasRef.current?.getBoundingClientRect();
      if (!box || box.bottom < 0 || box.top > window.innerHeight) return;
      e.preventDefault();
      jump();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [jump]);

  return (
    <div className="rounded-3xl border border-mint bg-white p-4 shadow-xl shadow-forest/5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-semibold text-forest">
        <p className="text-ink/60">{copy.how}</p>
        <p className="flex gap-4" dir="ltr" aria-live="off">
          <span>
            {copy.leads}: {leads}
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
          onPointerDown={(e) => {
            e.preventDefault();
            jump();
          }}
          tabIndex={0}
          role="img"
          aria-label={copy.name}
          className="block aspect-[8/3] w-full cursor-pointer touch-none select-none outline-none focus-visible:ring-2 focus-visible:ring-amber"
          dir="ltr"
        />
        {phase !== "running" && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 bg-cream/70 text-center backdrop-blur-[1px]">
            {phase === "over" && <p className="font-display text-2xl font-extrabold text-forest">{copy.over}</p>}
            <GrowthSays frame={phase === "over" ? "peek" : "wave1"} compact>
              {phase === "over" ? host.runnerOver : host.runnerTip}
            </GrowthSays>
            <button onClick={jump} className="pointer-events-auto rounded-full bg-amber px-7 py-3 font-semibold text-white shadow-lg shadow-amber/25 transition hover:brightness-110">
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
