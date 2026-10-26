"use client";

import { useEffect } from "react";

/** One delegated listener makes every `.spot` element glow under the cursor. */
export function Spotlight() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    let last: PointerEvent | null = null;

    const apply = () => {
      raf = 0;
      if (!last) return;
      const target = (last.target as HTMLElement | null)?.closest<HTMLElement>(".spot");
      if (!target) return;
      const r = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${last.clientX - r.left}px`);
      target.style.setProperty("--my", `${last.clientY - r.top}px`);
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
