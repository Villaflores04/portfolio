import { ParallaxWord } from "./parallax/parallax-word";
import { Reveal } from "./reveal";

export function Section({
  id,
  index,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <ParallaxWord>{index}</ParallaxWord>
      </div>
      <Reveal className="relative">
        <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">
          <span className="h-px w-8 bg-gradient-to-r from-accent to-transparent" aria-hidden />
          {index} · {eyebrow}
        </p>
        <h2 className="mt-4 max-w-3xl text-[clamp(1.75rem,4.4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
          {title}
        </h2>
        {intro && <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-lg">{intro}</p>}
      </Reveal>
      <div className="relative mt-10 sm:mt-14">{children}</div>
    </section>
  );
}
