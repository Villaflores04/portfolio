"use client";

import { useEffect, useRef } from "react";

/**
 * Page-wide depth: soft colour fields fixed behind every section, each drifting at its own
 * rate as you scroll. Cheap (3 transforms in one rAF) and disabled for reduced motion.
 */
const blobs = [
  { cls: "left-[-12%] top-[18%] h-[46vmax] w-[46vmax] ambient-a", speed: -0.06 },
  { cls: "right-[-14%] top-[48%] h-[40vmax] w-[40vmax] ambient-b", speed: -0.11 },
  { cls: "left-[18%] top-[88%] h-[34vmax] w-[34vmax] ambient-c", speed: -0.17 },
];

export function AmbientBackground() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      refs.current.forEach((node, i) => {
        if (node) node.style.transform = `translate3d(0, ${(y * blobs[i].speed).toFixed(1)}px, 0)`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {blobs.map((b, i) => (
        <div
          key={i}
          ref={(n) => {
            refs.current[i] = n;
          }}
          className={`absolute will-change-transform ${b.cls}`}
        >
          <div className="ambient-blob h-full w-full rounded-full" />
        </div>
      ))}
      <div className="grain absolute inset-0" />
    </div>
  );
}
