"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";

const shots = [
  {
    id: "home",
    label: "Landing",
    desktop: "/projects/daet-home-desktop.jpg",
    mobile: "/projects/daet-home-mobile.jpg",
    alt: "DAET Pulse landing page with the headline 'Your visit. Your voice.' over a coastal photo and four emoji faces",
    mobileAlt: "DAET Pulse landing page on a phone with emoji faces and a Give feedback button",
  },
  {
    id: "feedback",
    label: "Feedback form",
    desktop: "/projects/daet-feedback-desktop.jpg",
    mobile: "/projects/daet-feedback-mobile.jpg",
    alt: "DAET Pulse feedback form with place or overall-visit choice, four emoji faces and a submit button",
    mobileAlt: "DAET Pulse feedback form on a phone with bottom navigation",
  },
  {
    id: "places",
    label: "Places",
    desktop: "/projects/daet-places-desktop.jpg",
    mobile: "/projects/daet-feedback-mobile.jpg",
    alt: "DAET Pulse places catalogue with search, category filters and photo cards for six Daet destinations",
    mobileAlt: "DAET Pulse feedback form on a phone with bottom navigation",
  },
] as const;

export function ProjectGallery() {
  const [active, setActive] = useState(0);
  const base = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const shot = shots[active];

  function onKey(e: React.KeyboardEvent, i: number) {
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % shots.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + shots.length) % shots.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = shots.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <figure>
      <div role="tablist" aria-label="DAET Pulse screens" className="mb-5 flex flex-wrap gap-2">
        {shots.map((s, i) => (
          <button
            key={s.id}
            ref={(n) => {
              tabs.current[i] = n;
            }}
            id={`${base}-tab-${s.id}`}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls={`${base}-panel`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
            className={`min-h-11 rounded-full border px-5 text-sm transition ${
              i === active
                ? "border-accent bg-accent/12 font-medium text-fg"
                : "border-line bg-surface/70 text-muted hover:border-accent/60 hover:text-fg"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div
        id={`${base}-panel`}
        role="tabpanel"
        aria-labelledby={`${base}-tab-${shot.id}`}
        className="relative pb-10 sm:pb-0 sm:pr-16 lg:pr-24"
      >
        {/* browser window */}
        <div className="glass overflow-hidden rounded-2xl p-1.5 sm:rounded-3xl sm:p-2">
          <div className="flex items-center gap-2 px-3 pb-2 pt-1.5 sm:px-4">
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </span>
            <span className="ml-2 hidden min-w-0 flex-1 truncate rounded-full bg-surface-2 px-3 py-1 text-center font-mono text-[11px] text-muted sm:block">
              daet-pulse · {shot.label.toLowerCase()}
            </span>
          </div>
          <Image
            key={shot.desktop}
            src={shot.desktop}
            alt={shot.alt}
            width={1440}
            height={900}
            sizes="(min-width: 1152px) 1050px, 92vw"
            className="pop h-auto w-full rounded-xl border border-line object-cover object-top"
          />
        </div>

        {/* phone */}
        <div className="absolute -bottom-0 right-2 w-[34%] max-w-[170px] sm:-bottom-6 sm:right-0 sm:w-[24%] sm:max-w-[210px] lg:-bottom-10">
          <div className="rounded-[1.6rem] border border-line bg-surface p-1.5 shadow-2xl shadow-black/30 sm:rounded-[2rem] sm:p-2">
            <Image
              key={shot.mobile + shot.id}
              src={shot.mobile}
              alt={shot.mobileAlt}
              width={585}
              height={1266}
              sizes="210px"
              className="pop h-auto w-full rounded-[1.2rem] object-cover object-top sm:rounded-[1.5rem]"
            />
          </div>
        </div>
      </div>

      <figcaption className="mt-8 text-xs leading-relaxed text-muted sm:mt-14 sm:text-sm">
        Screenshots of DAET Pulse running locally against a fresh database: the six seeded places and no visitor feedback
        yet.
      </figcaption>
    </figure>
  );
}
