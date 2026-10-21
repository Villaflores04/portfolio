export const profile = {
  name: "Paul Vincent N. Villaflores",
  shortName: "Paul Vincent",
  initials: "PV",
  role: "Full-Stack Web Developer",
  tagline:
    "I design and build fast, accessible web and mobile products — from polished React interfaces to the APIs and databases behind them.",
  email: "tkpaulvincent042005@gmail.com",
  github: "https://github.com/Villaflores04",
  linkedin: null as string | null, // "Coming soon"
  availability: "Open to internships, junior roles and freelance work",
};

export const skills = [
  {
    group: "Front-end",
    items: ["React", "Next.js", "TypeScript", "TailwindCSS"],
    blurb: "Responsive, accessible interfaces with clean component architecture.",
  },
  {
    group: "Back-end",
    items: ["Node.js", "REST APIs", "API Integration", "TypeScript"],
    blurb: "Validated endpoints, middleware-style guards and third-party integrations.",
  },
  {
    group: "Data",
    items: ["Database Management", "Schema design", "Row-level security", "Supabase / PostgreSQL"],
    blurb: "Relational schemas, indexes and policies that keep data safe and fast.",
  },
  {
    group: "Mobile",
    items: ["Mobile App Development", "Mobile-first UI", "Touch-friendly UX"],
    blurb: "Apps and layouts that feel native on small screens.",
  },
] as const;

export const headlineSkills = [
  "Full-Stack Development",
  "Next.js",
  "React",
  "TailwindCSS",
  "Node.js",
  "TypeScript",
  "Database Management",
  "API Integration",
  "Mobile App Development",
];

export const education = [
  { years: "2023 – 2026", school: "Our Lady of Lourdes College Foundation", detail: "BS Information Technology · 4B", current: true },
  { years: "2017 – 2022", school: "Daguit National High School", detail: "Secondary education", current: false },
  { years: "2011 – 2016", school: "Daguit Elementary School", detail: "Elementary education", current: false },
];

export const project = {
  title: "DAET Pulse",
  subtitle: "Emoji-based tourism feedback system",
  summary:
    "A public feedback desk for the Municipality of Daet, Camarines Norte. Visitors leave one of four faces plus an optional note and photo — no account needed — while municipal officers moderate and analyse feedback from a protected desk.",
  github: "https://github.com/Villaflores04/daet_feedback",
  live: null as string | null,
  stack: ["Next.js 15", "React 19", "TypeScript", "TailwindCSS 4", "Zustand", "Supabase (PostgreSQL + Storage)", "Vercel"],
  features: [
    "Four-face emoji rating (Wow · Happy · Okay · Sad) with optional note and photo",
    "Shared data across devices through a Supabase-backed /api/pulse API",
    "Photo uploads to a public Supabase Storage bucket, confirmed before success is shown",
    "Municipal desk: moderation, place management, wishes and sentiment insights",
    "English/Filipino text-sentiment lexicon alongside emoji tallies",
    "Layered parallax landing page with reduced-motion support",
    "Focus-trapped dialogs, mobile dock navigation and safe-area spacing",
    "Idempotent submissions: retries reuse the same ID, never duplicating feedback",
  ],
  api: [
    { method: "GET", path: "/api/pulse", note: "Load channels, pulses and wishes" },
    { method: "POST", path: "/api/pulse", note: "Save a pulse (face, note, optional photo)" },
    { method: "POST", path: "/api/pulse/reaction", note: "React to a pulse" },
    { method: "POST", path: "/api/pulse/photo", note: "Upload a photo to Storage" },
    { method: "POST", path: "/api/desk/session", note: "Municipal desk sign-in" },
    { method: "GET", path: "/api/desk/pulses", note: "Moderation list" },
    { method: "GET", path: "/api/desk/insights", note: "Sentiment summaries" },
    { method: "GET", path: "/api/desk/channels", note: "Place management" },
  ],
  challenges: [
    {
      problem: "A failed database table load looked identical to an empty system.",
      solution:
        "Each collection now loads independently and a failure returns null, so cached data survives and a retry notice appears instead of a blank page.",
    },
    {
      problem: "Photo uploads could fail silently after the note had saved.",
      solution:
        "Success is shown only after the upload and the database write are both confirmed; the draft stays intact on errors and retries reuse the submission ID.",
    },
    {
      problem: "Overall-trip feedback did not belong to any single place.",
      solution:
        "A reserved, protected channel holds overall feedback so existing foreign keys, replies and moderation keep working without schema changes.",
    },
  ],
  next: [
    "Replace the demo reward preview with an authenticated server-side award service",
    "Trained sentiment model instead of the lexicon",
    "Pagination beyond the latest 500 entries",
    "End-to-end tests against a staging Supabase project",
  ],
};
