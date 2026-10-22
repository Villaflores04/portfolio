"use client";

import { useEffect, useRef } from "react";

/**
 * Pointer parallax (desktop) plus a scroll fallback for browsers without CSS scroll-driven animations.
 *
 * Where `animation-timeline: scroll()` exists (Chromium, Safari 26+), the scroll motion runs entirely on the
 * compositor via CSS (`.plx` in globals.css), so scrolling never touches the main thread. This component then only
 * handles the cursor. In other browsers (e.g. Firefox) it drives the scroll motion itself.
 *
 * Performance rules: no layout reads on scroll or pointer move (sizes are cached), numbers parsed once, one rAF loop
 * that only runs while the hero is on screen and still settling.
 */
export function ParallaxRoot({
  children,
  className = "",
  id,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  label?: string;
}) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const nativeScroll = typeof CSS !== "undefined" && CSS.supports("animation-timeline: scroll()");
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (nativeScroll && !fine) return; // nothing for JS to do: CSS owns scroll, there is no cursor

    const nodes = Array.from(el.querySelectorAll<HTMLElement>("[data-depth]"));
    const depth = nodes.map((n) => Number(n.dataset.depth ?? 0));
    const pointer = nodes.map((n) => Number(n.dataset.pointer ?? 0));

    let heroHeight = el.offsetHeight || 1;
    let scrollY = 0;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let visible = true;
    let raf = 0;

    const render = () => {
      raf = 0;
      curX += (targetX - curX) * 0.1;
      curY += (targetY - curY) * 0.1;
      for (let i = 0; i < nodes.length; i++) {
        const y = (nativeScroll ? 0 : scrollY * depth[i]) + curY * pointer[i];
        nodes[i].style.transform = `translate3d(${(curX * pointer[i]).toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      }
      const settling = Math.abs(targetX - curX) > 0.003 || Math.abs(targetY - curY) > 0.003;
      if (settling && visible) raf = requestAnimationFrame(render);
    };

    const schedule = () => {
      if (!raf && visible) raf = requestAnimationFrame(render);
    };

    const onScroll = () => {
      scrollY = Math.min(window.scrollY, heroHeight * 1.3);
      schedule();
    };
    const onPointer = (e: PointerEvent) => {
      if (!fine || !visible) return;
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
      schedule();
    };
    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      schedule();
    };

    const ro = new ResizeObserver(() => {
      heroHeight = el.offsetHeight || 1;
    });
    ro.observe(el);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          if (!nativeScroll) onScroll();
          schedule();
        }
      },
      { threshold: 0 },
    );
    io.observe(el);

    if (!nativeScroll) {
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    if (fine) {
      el.addEventListener("pointermove", onPointer, { passive: true });
      el.addEventListener("pointerleave", onLeave);
    }

    return () => {
      io.disconnect();
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      el.removeEventListener("pointermove", onPointer);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section ref={root} id={id} aria-label={label} className={className}>
      {children}
    </section>
  );
}
