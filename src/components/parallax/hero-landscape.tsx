import type { CSSProperties } from "react";
import { hills, peaks, pines, starShadows, VIEW_H, VIEW_W } from "@/lib/scene";

const ridges = {
  far: peaks(11, 0.5, 0.42, 9),
  mid: peaks(23, 0.62, 0.34, 11),
  nearHills: hills(5, 0.78, 0.2),
  nearPines: pines(31, 0.8, 34, 34, 78),
  front: hills(13, 0.92, 0.12),
};

const stars = {
  a: starShadows(7, 46, "rgba(255,255,255,.85)"),
  b: starShadows(19, 30, "rgba(255,255,255,.95)"),
  c: starShadows(43, 12, "rgba(190,205,255,1)"),
};

/**
 * One parallax layer. `depth` is the scroll factor (positive lags the page, negative runs ahead);
 * `pointer` is the max cursor offset in px. The same numbers feed both the CSS scroll-driven
 * animation (--depth) and the JS fallback / pointer handler (data-*).
 */
function Layer({
  depth,
  pointer = 0,
  className = "",
  children,
}: {
  depth: number;
  pointer?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`plx absolute inset-x-[-5%] ${className}`}
      data-depth={depth}
      data-pointer={pointer}
      style={{ "--depth": depth } as CSSProperties}
    >
      {children}
    </div>
  );
}

/** One mountain/hill silhouette, filled with a vertical theme-aware gradient. */
function Ridge({ id, d, from, to }: { id: string; d: string; from: string; to: string }) {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-x-0 bottom-0 h-full w-full"
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: `var(${from})` }} />
          <stop offset="1" style={{ stopColor: `var(${to})` }} />
        </linearGradient>
      </defs>
      <path d={d} fill={`url(#${id})`} />
    </svg>
  );
}

export function HeroLandscape() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* sky */}
      <div className="sky absolute inset-0" />

      {/* stars (dark mode only; three twinkling groups) */}
      <Layer depth={0.34} pointer={4} className="stars-layer top-[-60svh] h-[200svh]">
        <i className="star-group sg-a" style={{ boxShadow: stars.a }} />
        <i className="star-group sg-b" style={{ boxShadow: stars.b }} />
        <i className="star-group sg-c" style={{ boxShadow: stars.c }} />
      </Layer>

      {/* sun / moon */}
      <Layer depth={0.3} pointer={9} className="top-0 h-full">
        <div className="celestial absolute right-[9%] top-[5.1rem] sm:right-[12%] sm:top-[6.2rem] lg:right-[14%] lg:top-[6.6rem]">
          <span className="celestial-glow" />
          <span className="celestial-body" />
        </div>
      </Layer>

      {/* clouds */}
      <Layer depth={0.27} pointer={12} className="top-0 h-full">
        <div className="cloud cloud-a" />
        <div className="cloud cloud-b" />
      </Layer>

      {/* far mountains */}
      <Layer depth={0.22} pointer={8} className="bottom-0 h-[78%]">
        <Ridge id="g-far" d={ridges.far} from="--m-far" to="--m-far-b" />
      </Layer>

      {/* mid mountains */}
      <Layer depth={0.14} pointer={14} className="bottom-0 h-[66%]">
        <Ridge id="g-mid" d={ridges.mid} from="--m-mid" to="--m-mid-b" />
      </Layer>

      {/* mist */}
      <Layer depth={0.1} pointer={18} className="bottom-0 h-[52%]">
        <div className="mist" />
      </Layer>

      {/* near hills + pines */}
      <Layer depth={0.06} pointer={22} className="bottom-0 h-[54%]">
        <Ridge id="g-near" d={ridges.nearHills} from="--m-near" to="--m-near-b" />
        <Ridge id="g-pines" d={ridges.nearPines} from="--m-pine" to="--m-pine-b" />
      </Layer>

      {/* front ridge (moves faster than the page) */}
      <Layer depth={-0.05} pointer={30} className="bottom-[-2%] h-[34%]">
        <Ridge id="g-front" d={ridges.front} from="--m-front" to="--m-front-b" />
      </Layer>

      {/* melt into the page */}
      <div className="absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}
