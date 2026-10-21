import { headlineSkills } from "@/data/profile";

export function Marquee() {
  // duplicated so the -50% translate loops seamlessly; the copy is hidden from assistive tech
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-3 pr-3" aria-hidden={hidden || undefined}>
      {headlineSkills.map((s) => (
        <li
          key={s}
          className="flex items-center gap-3 whitespace-nowrap rounded-full border border-line bg-surface/70 px-5 py-2.5 text-sm text-muted backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-accent to-accent-2" aria-hidden />
          {s}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative z-10 -mt-10 pb-4 sm:-mt-14">
      <div className="marquee-wrap overflow-hidden" role="region" aria-label="Core skills">
        <div className="marquee">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  );
}
