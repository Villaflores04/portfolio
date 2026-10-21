import { Reveal } from "./reveal";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        {intro && <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
  );
}
