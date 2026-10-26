import { designThinking } from "@/data/profile";
import { Reveal } from "./reveal";

export function DesignThinking() {
  return (
    <div>
      <Reveal>
        <h3 className="text-xl font-semibold sm:text-2xl">Design thinking process</h3>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted sm:text-base">{designThinking.intro}</p>
      </Reveal>

      <ol className="relative mt-8 space-y-5 border-l border-line pl-6 sm:pl-8">
        {designThinking.stages.map((s, i) => (
          <li key={s.name} className="relative">
            <span
              aria-hidden
              className="absolute -left-[2.2rem] top-5 grid h-7 w-7 place-items-center rounded-full border border-accent bg-bg font-mono text-xs text-accent sm:-left-[2.7rem] sm:h-8 sm:w-8"
            >
              {i + 1}
            </span>
            <Reveal delay={i * 60}>
              <div className="card spot p-5 sm:p-6">
                <h4 className="text-lg font-semibold">{s.name}</h4>
                <p className="mt-1 text-sm font-medium text-accent">{s.what}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">{s.did}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
