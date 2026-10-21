"use client";

import { useEffect, useRef } from "react";

/** Glass "developer card" with a gentle 3D tilt on desktop pointers. */
export function DevCard() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateY(${(x * 9).toFixed(2)}deg) rotateX(${(-y * 9).toFixed(2)}deg)`;
      });
    };
    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="glass w-full rounded-3xl p-1 transition-transform duration-300 ease-out will-change-transform"
    >
      <div className="rounded-[1.35rem] bg-surface/70 p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-3 w-3 rounded-full bg-red-400/80" />
            <span className="h-3 w-3 rounded-full bg-amber-400/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
          </div>
          <span className="font-mono text-[11px] text-muted">paul.config.ts</span>
        </div>

        <pre
          className="mt-4 overflow-x-auto font-mono text-[12px] leading-[1.75] text-fg sm:text-[13px]"
          aria-label="Developer profile as code"
        >
          <code>
            <span className="tok-k">const</span> paul = {"{"}
            {"\n"}
            {"  "}role: <span className="tok-s">&quot;Full-Stack Developer&quot;</span>,{"\n"}
            {"  "}stack: [<span className="tok-s">&quot;Next.js&quot;</span>, <span className="tok-s">&quot;React&quot;</span>,{"\n"}
            {"          "}
            <span className="tok-s">&quot;TypeScript&quot;</span>, <span className="tok-s">&quot;Node.js&quot;</span>],{"\n"}
            {"  "}styling: <span className="tok-s">&quot;TailwindCSS&quot;</span>,{"\n"}
            {"  "}data: <span className="tok-s">&quot;PostgreSQL&quot;</span>,{"\n"}
            {"  "}mobile: <span className="tok-k">true</span>,{"\n"}
            {"  "}openToWork: <span className="tok-k">true</span>,{"\n"}
            {"}"};<span className="caret ml-1" aria-hidden />
          </code>
        </pre>

        <div className="mt-4 grid grid-cols-4 gap-2" aria-hidden>
          {["🤩", "😊", "😐", "😢"].map((g) => (
            <span key={g} className="grid h-11 place-items-center rounded-xl border border-line bg-surface-2/80 text-xl">
              {g}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
