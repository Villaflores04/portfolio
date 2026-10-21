import { skills } from "@/data/profile";
import { Reveal } from "./reveal";
import { Section } from "./section";

export function Skills() {
  return (
    <Section
      id="skills"
      index="02"
      eyebrow="Skills"
      title="A full-stack toolkit."
      intro="From pixels to Postgres — the technologies I use to take an idea from sketch to deployed product."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {skills.map((s, i) => (
          <Reveal key={s.group} delay={i * 70}>
            <article className="card card-hover spot h-full p-6 sm:p-7">
              <h3 className="text-lg font-semibold">{s.group}</h3>
              <p className="mt-1.5 text-sm text-muted">{s.blurb}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-line bg-surface-2 px-3 py-1.5 font-mono text-xs text-fg"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
