"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";

const links = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "project", label: "Project" },
  { id: "education", label: "Education" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const bar = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  // condensed state (state only changes when the threshold is crossed, so scrolling does not re-render)
  // + scroll progress: CSS scroll timeline where supported, otherwise a cached-height JS fallback
  useEffect(() => {
    const native = typeof CSS !== "undefined" && CSS.supports("animation-timeline: scroll()");
    let raf = 0;
    let max = 1;
    const measure = () => {
      max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };
    const update = () => {
      raf = 0;
      if (!native && bar.current) {
        bar.current.style.transform = `scaleX(${Math.min(1, window.scrollY / max).toFixed(4)})`;
      }
    };
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (!native && !raf) raf = requestAnimationFrame(update);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    measure();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // active section
  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.id)).filter((n): n is HTMLElement => !!n);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    const top = document.getElementById("top");
    const topIo = new IntersectionObserver(([e]) => e.isIntersecting && setActive(""), { threshold: 0.5 });
    if (top) topIo.observe(top);
    return () => {
      io.disconnect();
      topIo.disconnect();
    };
  }, []);

  // mobile menu: scroll lock, Escape, focus handling
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <nav
          aria-label="Primary"
          className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full pl-2.5 pr-2 transition-all duration-300 sm:h-[3.75rem] sm:pl-3 ${
            scrolled || open ? "glass glass-blur" : "border border-transparent"
          }`}
        >
          <a href="#top" className="flex items-center gap-2.5 rounded-full pr-3 font-semibold tracking-tight" onClick={() => setOpen(false)}>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-[13px] font-bold text-white shadow-md shadow-accent/30">
              {profile.initials}
            </span>
            <span className="hidden text-[15px] xs:inline">{profile.shortName}</span>
          </a>

          <ul className="hidden items-center gap-0.5 md:flex">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  aria-current={active === l.id ? "true" : undefined}
                  className={`relative block rounded-full px-4 py-2 text-sm transition ${
                    active === l.id ? "bg-accent/12 text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {l.label}
                  {active === l.id && (
                    <span className="absolute inset-x-4 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-accent to-transparent" aria-hidden />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a href={`mailto:${profile.email}`} className="btn btn-primary hidden !min-h-10 !px-4 text-[13px] lg:inline-flex">
              Hire me <ArrowUpRight size={14} aria-hidden />
            </a>
            <button
              ref={toggle}
              type="button"
              className="glass grid h-11 w-11 place-items-center rounded-full md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
            </button>
          </div>
        </nav>

        {/* scroll progress */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px]" aria-hidden>
          <div
            ref={bar}
            className="progress-bar h-full origin-left bg-gradient-to-r from-accent via-accent-2 to-accent-3"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </header>

      {/* mobile full-screen menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="glass-blur fixed inset-0 z-40 bg-bg/92 px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-24 md:hidden"
      >
        <ul className="flex flex-col">
          {links.map((l, i) => (
            <li key={l.id} className="border-b border-line/70">
              <a
                ref={i === 0 ? firstLink : undefined}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="flex min-h-16 items-center justify-between text-2xl font-medium tracking-tight"
              >
                <span>
                  <span className="mr-3 font-mono text-xs text-accent">0{i + 1}</span>
                  {l.label}
                </span>
                <ArrowUpRight size={20} className="text-muted" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
        <a href={`mailto:${profile.email}`} className="btn btn-primary mt-8 w-full" onClick={() => setOpen(false)}>
          Hire me
        </a>
      </div>
    </>
  );
}
