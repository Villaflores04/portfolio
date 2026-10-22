import { ArrowDown, ArrowUpRight, Github, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { DevCard } from "./dev-card";
import { HeroLandscape } from "./parallax/hero-landscape";
import { ParallaxRoot } from "./parallax/parallax-root";

const stats = [
  { value: "9", label: "Core skills" },
  { value: "4th", label: "Year BSIT" },
  { value: "1", label: "Featured system" },
];

export function Hero() {
  return (
    <ParallaxRoot id="top" label="Introduction" className="relative isolate min-h-[100svh] overflow-hidden">
        <HeroLandscape />

        <div
          data-depth="0.12"
          style={{ "--depth": 0.12 } as React.CSSProperties}
          className="plx plx-fade relative z-10 mx-auto grid min-h-[100svh] w-full max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-10 px-5 pb-28 pt-40 sm:px-8 sm:pt-44 md:pb-32 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-8 lg:pt-24"
        >
          <div className="min-w-0">
            <p
              className="rise glass inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-muted sm:text-[13px]"
              style={{ ["--d" as string]: "0.05s" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {profile.availability}
            </p>

            <h1
              className="rise mt-5 text-[clamp(2.25rem,7vw,4.15rem)] font-semibold leading-[1.04] tracking-[-0.035em]"
              style={{ ["--d" as string]: "0.15s" }}
            >
              Hi, I&apos;m <span className="text-gradient">{profile.shortName}</span>.
              <br />
              I build full-stack
              <br className="hidden sm:block" /> web &amp; mobile apps.
            </h1>

            <p
              className="rise mt-5 max-w-xl text-[15px] font-medium leading-relaxed text-fg/80 sm:text-lg"
              style={{ ["--d" as string]: "0.28s" }}
            >
              {profile.tagline}
            </p>

            <div
              className="rise mt-8 grid grid-cols-2 gap-3 xs:flex xs:flex-wrap xs:items-center"
              style={{ ["--d" as string]: "0.4s" }}
            >
              <a href="#project" className="btn btn-primary col-span-2 xs:col-auto">
                View my project <ArrowUpRight size={16} aria-hidden />
              </a>
              <a href={`mailto:${profile.email}`} className="btn btn-ghost">
                <Mail size={16} aria-hidden /> Email me
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <Github size={16} aria-hidden /> GitHub
              </a>
            </div>

            <dl
              className="rise mt-9 grid max-w-md grid-cols-3 gap-3 sm:mt-10"
              style={{ ["--d" as string]: "0.52s" }}
            >
              {stats.map((s) => (
                <div key={s.label} className="glass flex flex-col rounded-2xl px-3 py-3 text-center sm:px-4">
                  <dt className="order-2 text-[11px] text-muted sm:text-xs">{s.label}</dt>
                  <dd className="text-xl font-semibold tracking-tight sm:text-2xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div
            className="rise mx-auto w-full min-w-0 max-w-md lg:max-w-none lg:justify-self-end"
            style={{ ["--d" as string]: "0.45s" }}
          >
            <DevCard />
          </div>
        </div>

        <a
          href="#about"
          aria-label="Scroll to the about section"
          className="glass absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 rounded-full p-3 text-muted transition hover:text-accent md:block"
        >
          <ArrowDown size={18} aria-hidden className="animate-bounce motion-reduce:animate-none" />
        </a>
    </ParallaxRoot>
  );
}
