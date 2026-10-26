"use client";

import { Award, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { certificates } from "@/data/profile";
import { Reveal } from "./reveal";
import { Section } from "./section";

const src = (file: string) => `/certificates/${file}.jpg`;

export function Certificates() {
  const [open, setOpen] = useState<number | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % certificates.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + certificates.length) % certificates.length));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      opener.current?.focus();
    };
  }, [open]);

  const current = open === null ? null : certificates[open];

  return (
    <Section
      id="certificates"
      index="05"
      eyebrow="Certificates"
      title="Learning beyond the classroom."
      intro={`${certificates.length} certificates from webinars and events on web development careers, cybersecurity, startups and creative work.`}
    >
      <ul className="grid grid-cols-[minmax(0,1fr)] gap-4 xs:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {certificates.map((c, i) => (
          <li key={c.file}>
            <Reveal delay={(i % 3) * 80} className="h-full">
              <button
                type="button"
                onClick={(e) => {
                  opener.current = e.currentTarget;
                  setOpen(i);
                }}
                className="card card-hover spot group flex h-full w-full flex-col text-left"
                aria-label={`View certificate: ${c.title}`}
              >
                <span className="relative block aspect-[4/3] w-full overflow-hidden border-b border-line bg-surface-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src(c.file)}
                    alt={`Certificate: ${c.title}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]"
                  />
                </span>
                <span className="flex flex-1 flex-col p-4 sm:p-5">
                  <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-accent">
                    <Award size={13} aria-hidden /> {c.kind} · {c.date}
                  </span>
                  <span className="mt-2 text-[15px] font-semibold leading-snug">{c.title}</span>
                  <span className="mt-auto pt-3 text-[13px] leading-snug text-muted">{c.issuer}</span>
                </span>
              </button>
            </Reveal>
          </li>
        ))}
      </ul>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          className="fixed inset-0 z-[90] flex flex-col bg-black/85 p-4 sm:p-8"
          onClick={() => setOpen(null)}
        >
          <div className="mx-auto flex w-full max-w-5xl items-start justify-between gap-4 pb-3 text-white" onClick={(e) => e.stopPropagation()}>
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-snug sm:text-base">{current.title}</p>
              <p className="mt-0.5 text-xs text-white/70">
                {current.issuer} · {current.date}
              </p>
            </div>
            <button
              ref={closeBtn}
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
            >
              <X size={20} aria-hidden />
            </button>
          </div>
          <div className="relative mx-auto flex min-h-0 w-full max-w-5xl flex-1 items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src(current.file)}
              alt={`Certificate: ${current.title}`}
              className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </Section>
  );
}
