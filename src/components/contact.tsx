import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal } from "./reveal";
import { Section } from "./section";

export function Contact() {
  const items = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: Github, label: "GitHub", value: "github.com/Villaflores04", href: profile.github },
    { icon: Linkedin, label: "LinkedIn", value: "Coming soon", href: profile.linkedin },
  ];

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something together."
      intro="I'm looking for opportunities to grow as a full-stack developer. Send me a message — I read everything."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {items.map((it, i) => {
          const inner = (
            <>
              <it.icon size={22} className="text-accent" aria-hidden />
              <p className="mt-4 text-sm text-muted">{it.label}</p>
              <p className="mt-1 flex items-center gap-1.5 break-all font-medium">
                {it.value}
                {it.href && <ArrowUpRight size={14} className="shrink-0 text-muted" aria-hidden />}
              </p>
            </>
          );
          return (
            <Reveal key={it.label} delay={i * 80}>
              {it.href ? (
                <a
                  href={it.href}
                  target={it.href.startsWith("http") ? "_blank" : undefined}
                  rel={it.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="card card-hover block h-full p-6"
                >
                  {inner}
                </a>
              ) : (
                <div className="card h-full border-dashed p-6 opacity-80">{inner}</div>
              )}
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
