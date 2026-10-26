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
      index="06"
      eyebrow="Contact"
      title="Let's build something together."
      intro="I'm looking for opportunities to grow as a full-stack developer. Send me a message — I read everything."
    >
      <div className="grid grid-cols-[minmax(0,1fr)] gap-3 sm:gap-4 lg:grid-cols-3">
        {items.map((it, i) => {
          // Offer a line-break opportunity at the "@" so a narrow email wraps there, not mid-word.
          const [local, domain] = it.value.split("@");
          const value = domain ? (
            <>
              {local}
              <wbr />@{domain}
            </>
          ) : (
            it.value
          );
          // Phones and tablets: a compact row (icon tile + text + arrow). Desktop: a taller stacked card.
          const inner = (
            <div className="flex items-center gap-4 lg:block">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                <it.icon size={22} aria-hidden />
              </span>
              <div className="min-w-0 flex-1 lg:mt-5">
                <p className="text-[13px] text-muted">{it.label}</p>
                <p className="mt-0.5 break-words text-[15px] font-medium leading-snug sm:text-base">{value}</p>
              </div>
              {it.href && <ArrowUpRight size={18} className="shrink-0 text-muted lg:hidden" aria-hidden />}
            </div>
          );
          return (
            <Reveal key={it.label} delay={i * 80}>
              {it.href ? (
                <a
                  href={it.href}
                  target={it.href.startsWith("http") ? "_blank" : undefined}
                  rel={it.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="card card-hover spot block h-full p-4 sm:p-5 lg:p-6"
                >
                  {inner}
                </a>
              ) : (
                <div className="card h-full border-dashed p-4 opacity-80 sm:p-5 lg:p-6">{inner}</div>
              )}
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
