"use client";

import { useEffect } from "react";

/**
 * Brings pasted HTML to life.
 *
 * Pasted content cannot carry scripts, so the behaviours an article or landing
 * page wants are provided here and switched on by attributes in the markup:
 *
 *   data-reveal="up|down|left|right|zoom|fade"   animate in when scrolled to
 *   data-reveal-delay="150"                       …after a delay, in ms
 *   data-count="350"                              count up to a number
 *   data-tabs                                     tab buttons + panels
 *   data-copy="text"                              copy text when clicked
 *   data-progress                                 bar that fills when visible
 *
 * Everything degrades to plain, readable content when JavaScript is off: the
 * reveal styles only apply once this has marked the container as ready.
 */
export function HtmlWidgets({ target }: { target: string }) {
  useEffect(() => {
    const root = document.getElementById(target);
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: (() => void)[] = [];

    // --- reveal on scroll ---------------------------------------------------
    const reveals = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (reduce) {
      reveals.forEach((el) => el.classList.add("is-in"));
    } else if (reveals.length) {
      root.classList.add("reveal-ready");
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            const el = e.target as HTMLElement;
            const delay = Number(el.dataset.revealDelay ?? 0);
            window.setTimeout(() => el.classList.add("is-in"), Math.min(Math.max(delay, 0), 2000));
            io.unobserve(el);
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
      );
      reveals.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    // --- count up -----------------------------------------------------------
    const counters = Array.from(root.querySelectorAll<HTMLElement>("[data-count]"));
    if (counters.length) {
      const run = (el: HTMLElement) => {
        const end = Number(el.dataset.count);
        if (!Number.isFinite(end)) return;
        const decimals = (el.dataset.count?.split(".")[1] ?? "").length;
        const prefix = el.dataset.prefix ?? "";
        const suffix = el.dataset.suffix ?? "";
        const format = (n: number) =>
          `${prefix}${n.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;
        if (reduce) {
          el.textContent = format(end);
          return;
        }
        const started = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const t = Math.min((now - started) / duration, 1);
          el.textContent = format(end * (1 - Math.pow(1 - t, 3)));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      };
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            run(e.target as HTMLElement);
            io.unobserve(e.target);
          }
        },
        { threshold: 0.4 },
      );
      counters.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    // --- progress bars ------------------------------------------------------
    const bars = Array.from(root.querySelectorAll<HTMLElement>("[data-progress]"));
    if (bars.length) {
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            const el = e.target as HTMLElement;
            const pct = Math.min(Math.max(Number(el.dataset.progress), 0), 100);
            el.style.setProperty("--progress", `${pct}%`);
            el.classList.add("is-in");
            io.unobserve(el);
          }
        },
        { threshold: 0.4 },
      );
      bars.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    // --- tabs ---------------------------------------------------------------
    root.querySelectorAll<HTMLElement>("[data-tabs]").forEach((group) => {
      const buttons = Array.from(group.querySelectorAll<HTMLElement>("[data-tab]"));
      const panels = Array.from(group.querySelectorAll<HTMLElement>("[data-panel]"));
      if (!buttons.length || !panels.length) return;
      const show = (name: string) => {
        buttons.forEach((b) => {
          const on = b.dataset.tab === name;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-selected", String(on));
        });
        panels.forEach((p) => {
          p.hidden = p.dataset.panel !== name;
        });
      };
      buttons.forEach((b) => {
        b.setAttribute("role", "tab");
        const onClick = () => show(b.dataset.tab ?? "");
        b.addEventListener("click", onClick);
        cleanups.push(() => b.removeEventListener("click", onClick));
      });
      show(buttons[0].dataset.tab ?? "");
    });

    // --- copy to clipboard --------------------------------------------------
    root.querySelectorAll<HTMLElement>("[data-copy]").forEach((el) => {
      const onClick = async () => {
        try {
          await navigator.clipboard.writeText(el.dataset.copy ?? "");
          el.classList.add("is-copied");
          window.setTimeout(() => el.classList.remove("is-copied"), 1600);
        } catch {
          /* clipboard unavailable — nothing to do */
        }
      };
      el.addEventListener("click", onClick);
      cleanups.push(() => el.removeEventListener("click", onClick));
    });

    return () => cleanups.forEach((fn) => fn());
  }, [target]);

  return null;
}
