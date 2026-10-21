import { ArrowDown, ArrowUpRight, Github, Mail } from "lucide-react";
import { headlineSkills, profile } from "@/data/profile";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden />
      <div className="glow pointer-events-none absolute -top-24 left-1/2 -z-10 h-[420px] w-[620px] -translate-x-1/2" aria-hidden />

      <div className="mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 pb-16 pt-28 sm:px-8">
        <p className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-xs text-muted backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {profile.availability}
        </p>

        <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          Hi, I&apos;m <span className="text-gradient">{profile.shortName}</span>.
          <br />
          I build full-stack web apps.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-xl">{profile.tagline}</p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="#project"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 text-sm font-medium text-white shadow-lg shadow-accent/25 transition hover:brightness-110"
          >
            View my project <ArrowUpRight size={16} aria-hidden />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line bg-surface px-6 text-sm font-medium transition hover:border-accent"
          >
            <Mail size={16} aria-hidden /> Email me
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line bg-surface px-6 text-sm font-medium transition hover:border-accent"
          >
            <Github size={16} aria-hidden /> GitHub
          </a>
        </div>

        <ul className="mt-14 flex flex-wrap gap-2" aria-label="Core skills">
          {headlineSkills.map((s) => (
            <li key={s} className="rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-xs text-muted backdrop-blur sm:text-sm">
              {s}
            </li>
          ))}
        </ul>

        <a
          href="#about"
          aria-label="Scroll to about section"
          className="float mt-12 hidden w-fit rounded-full border border-line p-3 text-muted transition hover:text-accent sm:block"
        >
          <ArrowDown size={18} aria-hidden />
        </a>
      </div>
    </section>
  );
}
