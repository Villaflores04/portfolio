import { ArrowDown, ArrowUpRight, Github, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { DevCard } from "./dev-card";
import { HeroLandscape } from "./parallax/hero-landscape";
import { ParallaxRoot } from "./parallax/parallax-root";

const stats = [
  { value: "9", label: "Skills" },
  { value: "4th", label: "Year BSIT" },
  { value: "1", label: "Project" },
];

const delay = (s: number) => ({ ["--d" as string]: `${s}s` });

export function Hero() {
  return (
    <ParallaxRoot id="top" label="Introduction" className="relative isolate min-h-[100svh] overflow-hidden">
      <HeroLandscape />

      <div
        data-depth="0.12"
        style={{ "--depth": 0.12 } as React.CSSProperties}
        className="plx plx-fade relative z-10 mx-auto grid min-h-[100svh] w-full max-w-6xl grid-cols-[minmax(0,1fr)] content-start gap-9 px-5 pb-20 pt-[6.5rem] sm:px-8 sm:pt-36 md:pb-28 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:content-center lg:items-center lg:gap-8 lg:pt-24"
      >
        {/* text column */}
        <div className="min-w-0">
          <p
            className="rise glass inline-flex max-w-full items-center gap-2 rounded-full py-1.5 pl-3 pr-3.5 text-[12.5px] text-muted sm:text-[13px]"
            style={delay(0.05)}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="truncate sm:hidden">{profile.availabilityShort}</span>
            <span className="hidden sm:inline">{profile.availability}</span>
          </p>

          <h1
            className="rise mt-5 text-[clamp(2.1rem,8.6vw,4.15rem)] font-semibold leading-[1.06] tracking-[-0.035em] sm:text-[clamp(2.25rem,7vw,4.15rem)]"
            style={delay(0.15)}
          >
            Hi, I&apos;m <span className="text-gradient">{profile.shortName}</span>.
            <br />
            I build full-stack
            <br />
            web &amp; mobile apps.
          </h1>

          <p
            className="rise mt-4 max-w-md text-[15px] leading-[1.65] text-fg/75 sm:mt-5 sm:max-w-xl sm:text-lg sm:font-medium sm:text-fg/80"
            style={delay(0.28)}
          >
            {profile.tagline}
          </p>

          {/* actions: one primary on its own row, two equal secondaries beneath */}
          <div className="rise mt-7 grid grid-cols-2 gap-3 sm:mt-8 sm:flex sm:flex-wrap sm:items-center" style={delay(0.4)}>
            <a href="#project" className="btn btn-primary col-span-2 w-full !min-h-[3.25rem] sm:col-auto sm:w-auto sm:!min-h-12">
              View my project <ArrowUpRight size={17} aria-hidden />
            </a>
            <a href={`mailto:${profile.email}`} className="btn btn-ghost w-full !min-h-[3.25rem] sm:w-auto sm:!min-h-12">
              <Mail size={17} aria-hidden /> Email
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost w-full !min-h-[3.25rem] sm:w-auto sm:!min-h-12"
            >
              <Github size={17} aria-hidden /> GitHub
            </a>
          </div>

          {/* one strip, three equal columns, so labels never wrap or misalign */}
          <dl
            className="rise glass mt-7 grid max-w-md grid-cols-3 divide-x divide-line rounded-2xl py-3.5 sm:mt-9"
            style={delay(0.52)}
          >
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center px-2 text-center">
                <dd className="text-xl font-semibold leading-none tracking-tight sm:text-2xl">{s.value}</dd>
                <dt className="mt-1.5 whitespace-nowrap text-[11.5px] text-muted sm:text-xs">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        {/* developer card */}
        <div
          className="rise mx-auto w-full min-w-0 max-w-md lg:max-w-none lg:justify-self-end"
          style={delay(0.45)}
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
