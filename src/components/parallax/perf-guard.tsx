"use client";

import { useEffect } from "react";

/**
 * Adaptive "lite mode". Samples frame times during the first stretch of scrolling; if the median frame is slow
 * (about under 40 fps) or the user asked to save data, it adds `lite` to <html>, which freezes the parallax and
 * ambient effects (see globals.css). Fast devices never see a change.
 */
export function PerfGuard() {
  useEffect(() => {
    const root = document.documentElement;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) {
      root.classList.add("lite");
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const frames: number[] = [];
    let last = 0;
    let raf = 0;
    let scrolling = false;
    let idle: ReturnType<typeof setTimeout>;
    let done = false;

    const tick = (t: number) => {
      if (done) return;
      if (last) frames.push(t - last);
      last = t;
      if (scrolling) raf = requestAnimationFrame(tick);
      else last = 0;
    };
    const finish = () => {
      done = true;
      window.removeEventListener("scroll", onScroll);
    };
    const onScroll = () => {
      if (!scrolling) {
        scrolling = true;
        last = 0;
        raf = requestAnimationFrame(tick);
      }
      clearTimeout(idle);
      idle = setTimeout(() => {
        scrolling = false;
        if (frames.length >= 45) {
          const sorted = [...frames].sort((a, b) => a - b);
          const median = sorted[Math.floor(sorted.length / 2)];
          const p90 = sorted[Math.floor(sorted.length * 0.9)];
          if (median > 25 || p90 > 50) root.classList.add("lite");
          finish();
        }
      }, 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      finish();
      clearTimeout(idle);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
