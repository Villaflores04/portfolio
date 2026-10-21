"use client";

import { useEffect, useRef } from "react";

/**
 * Drives a stack of layers with scroll + pointer parallax.
 *
 * Children carry data attributes:
 *   data-depth    scroll factor. Positive layers lag behind the page (feel far away),
 *                 negative layers move faster than the page (feel close).
 *   data-pointer  max pointer offset in px (desktop / fine pointers only).
 *   data-fade     marks the content wrapper that should fade as the hero scrolls away.
 *
 * Nothing re-renders: transforms are written straight to the DOM inside one rAF loop,
 * which only runs while the scene is on screen. Reduced-motion users get a static scene.
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

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const layers = Array.from(el.querySelectorAll<HTMLElement>("[data-depth]"));
    const fade = el.querySelector<HTMLElement>("[data-fade]");

    let height = el.offsetHeight || 1;
    let scrollY = 0;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let visible = true;
    let raf = 0;

    const render = () => {
      raf = 0;
      curX += (targetX - curX) * 0.085;
      curY += (targetY - curY) * 0.085;

      for (const layer of layers) {
        const depth = Number(layer.dataset.depth ?? 0);
        const pointer = Number(layer.dataset.pointer ?? 0);
        layer.style.transform = `translate3d(${(curX * pointer).toFixed(2)}px, ${(scrollY * depth + curY * pointer).toFixed(2)}px, 0)`;
      }

      if (fade) {
        const p = Math.min(1, scrollY / (height * 0.85));
        fade.style.opacity = String(1 - p * 0.95);
        fade.style.transform = `translate3d(0, ${(scrollY * 0.14).toFixed(2)}px, 0)`;
      }

      const settling = Math.abs(targetX - curX) > 0.002 || Math.abs(targetY - curY) > 0.002;
      if (settling && visible) raf = requestAnimationFrame(render);
    };

    const schedule = () => {
      if (!raf && visible) raf = requestAnimationFrame(render);
    };

    const onScroll = () => {
      scrollY = Math.min(window.scrollY, height * 1.3);
      schedule();
    };

    const onPointer = (e: PointerEvent) => {
      if (!fine || !visible) return;
      const rect = el.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      schedule();
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      schedule();
    };

    const onResize = () => {
      height = el.offsetHeight || 1;
      onScroll();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) onScroll();
      },
      { threshold: 0 },
    );
    io.observe(el);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    el.addEventListener("pointermove", onPointer, { passive: true });
    el.addEventListener("pointerleave", onLeave);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
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
