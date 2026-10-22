import { ArrowUpRight, Check, Github } from "lucide-react";
import { project } from "@/data/profile";
import { ProjectGallery } from "./project-gallery";
import { Reveal } from "./reveal";
import { Section } from "./section";

const methodStyle: Record<string, string> = {
  GET: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  POST: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-300",
};

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <div className="card spot h-full p-6 sm:p-7">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="mt-4">{children}</div>
      </div>
    </Reveal>
  );
}

const arch = [
  { label: "Browser", sub: "Next.js · React · Tailwind" },
  { label: "API routes", sub: "Validation · rate limit" },
  { label: "Supabase", sub: "PostgreSQL · Storage · RLS" },
];

export function Project() {
  return (
    <Section
      id="project"
      index="03"
      eyebrow="Featured project"
      title={`${project.title} — ${project.subtitle}`}
      intro={project.summary}
    >
      <Reveal>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost !min-h-11"
          >
            <Github size={16} aria-hidden /> Source on GitHub <ArrowUpRight size={14} aria-hidden />
          </a>
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary !min-h-11"
            >
              Live demo <ArrowUpRight size={14} aria-hidden />
            </a>
          ) : (
            <span className="inline-flex min-h-11 items-center rounded-full border border-dashed border-line px-5 text-sm text-muted">
              Live demo coming soon
            </span>
          )}
        </div>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
          {project.stack.map((t) => (
            <li key={t} className="rounded-full bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
              {t}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-12">
        <ProjectGallery />
      </Reveal>

      <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-2">
        <Block title="Key features">
          <ul className="space-y-3">
            {project.features.map((f) => (
              <li key={f} className="flex gap-3 text-sm leading-relaxed text-muted">
                <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Architecture overview">
          <ol className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
            {arch.map((a, i) => (
              <li key={a.label} className="flex flex-1 flex-col items-center gap-2 sm:flex-row">
                <div className="w-full flex-1 rounded-xl border border-line bg-surface-2 p-3 text-center">
                  <p className="text-sm font-medium">{a.label}</p>
                  <p className="mt-0.5 text-[11px] text-muted">{a.sub}</p>
                </div>
                {i < arch.length - 1 && (
                  <span className="text-muted" aria-hidden>
                    <span className="sm:hidden">↓</span>
                    <span className="hidden sm:inline">→</span>
                  </span>
                )}
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            The browser never talks to the database with privileged keys. Every read and write goes through server routes
            that validate input, then call Supabase with a server-only service role. Photos are stored in a public
            Storage bucket; tables are protected by row-level security.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-xl border border-line bg-surface-2 p-4 font-mono text-xs leading-relaxed text-muted">
{`channels ─┬─< pulses (face, note, photo, reacts)
          │       └─< pulses (replies via parent_id)
          └─< wishes (status: open | kept | burned)`}
          </pre>
        </Block>

        <Block title="API endpoints">
          <ul className="divide-y divide-line">
            {project.api.map((a) => (
              <li key={a.method + a.path} className="flex flex-wrap items-center gap-x-3 gap-y-1 py-2.5">
                <span className={`rounded-md px-2 py-0.5 font-mono text-[11px] font-semibold ${methodStyle[a.method]}`}>
                  {a.method}
                </span>
                <code className="font-mono text-xs">{a.path}</code>
                <span className="w-full text-xs text-muted sm:ml-auto sm:w-auto">{a.note}</span>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Challenges & solutions">
          <ul className="space-y-5">
            {project.challenges.map((c) => (
              <li key={c.problem}>
                <p className="text-sm font-medium">{c.problem}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{c.solution}</p>
              </li>
            ))}
          </ul>
        </Block>
      </div>

      <Reveal className="mt-5">
        <div className="card spot p-6 sm:p-7">
          <h3 className="text-lg font-semibold">What I&apos;d improve next</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {project.next.map((n) => (
              <li key={n} className="flex gap-3 text-sm leading-relaxed text-muted">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2" aria-hidden />
                {n}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
