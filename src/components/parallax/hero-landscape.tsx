import { hills, peaks, pines, stars, VIEW_H, VIEW_W } from "@/lib/scene";

const starField = stars(7, 110);

const ridges = {
  far: peaks(11, 0.5, 0.42, 9),
  mid: peaks(23, 0.62, 0.34, 11),
  nearHills: hills(5, 0.78, 0.2),
  nearPines: pines(31, 0.8, 34, 34, 78),
  front: hills(13, 0.92, 0.12),
};

/** One mountain/hill silhouette, filled with a vertical theme-aware gradient. */
function Ridge({ id, d, from, to, className = "" }: { id: string; d: string; from: string; to: string; className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMax slice"
      className={`absolute inset-x-0 bottom-0 h-full w-full ${className}`}
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

/** Bubble with an emoji inside — a nod to the feedback system. */
function Bubble({
  glyph,
  className,
  delay = 0,
}: {
  glyph: string;
  className: string;
  delay?: number;
}) {
  return (
    <span
      className={`bubble absolute place-items-center rounded-full ${className}`}
      style={{ animationDelay: `${delay}s` }}
      aria-hidden
    >
      <span className="leading-none">{glyph}</span>
    </span>
  );
}

const layer = "absolute inset-x-[-5%] will-change-transform";

export function HeroLandscape() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* 0 · sky */}
      <div className="absolute inset-0 sky" />

      {/* 1 · stars (dark) */}
      <div data-depth="0.34" data-pointer="4" className={`${layer} -top-[40%] h-[140%] stars-layer`}>
        {starField.map((s, i) => (
          <span
            key={i}
            className={`star absolute rounded-full ${s.bright ? "star-bright" : ""}`}
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}
      </div>

      {/* 2 · sun / moon */}
      <div data-depth="0.3" data-pointer="9" className={`${layer} top-0 h-full`}>
        <div className="celestial absolute right-[9%] top-[5.1rem] sm:right-[12%] sm:top-[6.2rem] lg:right-[14%] lg:top-[6.6rem]">
          <span className="celestial-glow" />
          <span className="celestial-body" />
        </div>
      </div>

      {/* 3 · back clouds */}
      <div data-depth="0.27" data-pointer="12" className={`${layer} top-0 h-full`}>
        <div className="cloud cloud-a" />
        <div className="cloud cloud-b" />
      </div>

      {/* 4 · far mountains */}
      <div data-depth="0.22" data-pointer="8" className={`${layer} bottom-0 h-[78%]`}>
        <Ridge id="g-far" d={ridges.far} from="--m-far" to="--m-far-b" />
      </div>

      {/* 5 · floating emoji bubbles (back) */}
      <div data-depth="0.2" data-pointer="20" className={`${layer} top-0 h-full`}>
        <Bubble glyph="🤩" delay={0} className="bubble-lg left-[47%] top-[17%] hidden text-5xl lg:grid" />
        <Bubble glyph="😢" delay={1.4} className="bubble-md bottom-[20%] right-[3%] hidden text-3xl lg:grid" />
      </div>

      {/* 6 · mid mountains */}
      <div data-depth="0.14" data-pointer="14" className={`${layer} bottom-0 h-[66%]`}>
        <Ridge id="g-mid" d={ridges.mid} from="--m-mid" to="--m-mid-b" />
      </div>

      {/* 7 · mist */}
      <div data-depth="0.1" data-pointer="18" className={`${layer} bottom-0 h-[52%]`}>
        <div className="mist mist-a" />
        <div className="mist mist-b" />
      </div>

      {/* 8 · near hills + pines */}
      <div data-depth="0.06" data-pointer="22" className={`${layer} bottom-0 h-[54%]`}>
        <Ridge id="g-near" d={ridges.nearHills} from="--m-near" to="--m-near-b" />
        <Ridge id="g-pines" d={ridges.nearPines} from="--m-pine" to="--m-pine-b" />
      </div>

      {/* 9 · foreground bubbles (closer than the content) */}
      <div data-depth="-0.04" data-pointer="34" className={`${layer} top-0 h-full`}>
        <Bubble glyph="😊" delay={0.7} className="bubble-md right-[4%] top-[15%] hidden text-4xl lg:grid" />
        <Bubble glyph="😐" delay={2.1} className="bubble-sm bottom-[17%] left-[49%] hidden text-2xl lg:grid" />
        <Bubble glyph="✨" delay={3} className="bubble-sm bottom-[34%] right-[1.5%] hidden text-xl xl:grid" />
      </div>

      {/* 10 · front ridge */}
      <div data-depth="-0.05" data-pointer="30" className={`${layer} bottom-[-2%] h-[34%]`}>
        <Ridge id="g-front" d={ridges.front} from="--m-front" to="--m-front-b" />
      </div>

      {/* melt into the page */}
      <div className="absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}
