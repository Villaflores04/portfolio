"use client";

import { useEffect, useRef } from "react";

/**
 * Oversized outlined word/numeral that sits behind a section heading and drifts at a
 * different speed from the page, giving each section a foreground/background split.
 * Position is derived from the parent section's distance to viewport centre.
 */
export function ParallaxWord({ children, speed = 0.18 }: { children: React.ReactNode; speed?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let visible = false;

    const update = () => {
      raf = 0;
      const r = parent.getBoundingClientRect();
      const offset = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${(offset * speed).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (visible && !raf) raf = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible) update();
      },
      { rootMargin: "20% 0px" },
    );
    io.observe(parent);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <span
      ref={ref}
      aria-hidden
      className="ghost-word pointer-events-none absolute right-0 top-8 select-none will-change-transform sm:top-4"
    >
      {children}
    </span>
  );
}
