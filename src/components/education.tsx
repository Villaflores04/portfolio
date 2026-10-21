import { GraduationCap } from "lucide-react";
import { education } from "@/data/profile";
import { Reveal } from "./reveal";
import { Section } from "./section";

export function Education() {
  return (
    <Section id="education" index="04" eyebrow="Education" title="Where I learned.">
      <ol className="relative space-y-6 border-l border-line pl-8">
        {education.map((e, i) => (
          <li key={e.school} className="relative">
            <span
              className={`absolute -left-[2.85rem] top-5 grid h-9 w-9 place-items-center rounded-full border ${
                e.current ? "border-accent bg-accent text-white" : "border-line bg-surface text-muted"
              }`}
            >
              <GraduationCap size={16} aria-hidden />
            </span>
            <Reveal delay={i * 80}>
              <div className="card card-hover spot p-5 sm:p-6">
                <p className="font-mono text-xs uppercase tracking-widest text-accent">
                  {e.years} {e.current && <span className="ml-2 rounded-full bg-accent/15 px-2 py-0.5 text-[10px]">Current</span>}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{e.school}</h3>
                <p className="text-sm text-muted">{e.detail}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
