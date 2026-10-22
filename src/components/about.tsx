import { Code2, Database, Rocket, Smartphone } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal } from "./reveal";
import { Section } from "./section";

const highlights = [
  { icon: Code2, title: "Clean front-ends", text: "Component-driven React and Next.js with accessibility built in." },
  { icon: Database, title: "Solid data layers", text: "Relational schemas, indexes and row-level security." },
  { icon: Smartphone, title: "Mobile-first", text: "Layouts and apps designed for thumbs before desktops." },
  { icon: Rocket, title: "Ships to production", text: "Deployed on Vercel with environment-safe configuration." },
];

export function About() {
  return (
    <Section id="about" index="01" eyebrow="About" title="Building things people actually use.">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-5 lg:gap-14">
        <Reveal className="space-y-5 text-base leading-relaxed text-muted sm:text-lg lg:col-span-3">
          <p>
            I&apos;m <strong className="font-semibold text-fg">{profile.name}</strong>, a fourth-year BS Information
            Technology student at Our Lady of Lourdes College Foundation, focused on full-stack web development.
          </p>
          <p>
            I like owning a feature end to end: sketching the interface, writing the API, modelling the database and
            deploying it. My go-to stack is Next.js, React, TypeScript, TailwindCSS and Node.js, with PostgreSQL-style
            databases behind it.
          </p>
          <p>
            My featured project, DAET Pulse, is a tourism feedback system built for the Municipality of Daet, with a public
            visitor side and a protected municipal desk.
          </p>
        </Reveal>

        <div className="grid gap-4 xs:grid-cols-2 lg:col-span-2">
          {highlights.map((h, i) => (
            <Reveal key={h.title} delay={i * 80}>
              <div className="card card-hover spot h-full p-5">
                <h.icon size={22} className="text-accent" aria-hidden />
                <h3 className="mt-3 font-medium">{h.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{h.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
