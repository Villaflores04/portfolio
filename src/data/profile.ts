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
  availabilityShort: "Open to internships & freelance",
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
  live: "https://daetfeedback.vercel.app/" as string | null,
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

export type Certificate = {
  file: string;
  title: string;
  issuer: string;
  date: string;
  kind: "Webinar" | "Event";
  portrait?: boolean;
};

/** Images live in public/certificates. Newest first. */
export const certificates: Certificate[] = [
  {
    file: "out-of-the-box",
    title: "Mapapakain ka ba ng Passion na yan?: The Realities of a 3rd World Creative",
    issuer: "OUT-OF-THE-BOX: Cuadro Creative Camp · WVSU CICT",
    date: "October 3, 2026",
    kind: "Webinar",
    portrait: true,
  },
  {
    file: "participation",
    title: "From IS Graduate to Industry Professional: Career, Portfolio & Emerging Roles",
    issuer: "West Visayas State University · College of ICT",
    date: "October 3, 2026",
    kind: "Webinar",
  },
  {
    file: "level-up",
    title: "LEVEL UP — Where Risk Meets Data: Cybersecurity for Information Systems Professionals",
    issuer: "West Visayas State University",
    date: "September 26, 2026",
    kind: "Webinar",
  },
  {
    file: "creative-career",
    title: "From Student to Professional: The Creative Career Starter Pack",
    issuer: "West Visayas State University · College of ICT",
    date: "September 26, 2026",
    kind: "Webinar",
  },
  {
    file: "create-to-earn",
    title: "Create to Earn! Freelance Work, Business Mindset and Creative Career Growth",
    issuer: "Webinar series · Division of EMC",
    date: "September 25, 2026",
    kind: "Webinar",
  },
  {
    file: "dict-startup",
    title: "Startup Awareness Webinar — Spot the Gap, Build the System",
    issuer: "DICT Regional Office VIII · ICT Industry Development Bureau",
    date: "September 2, 2026",
    kind: "Webinar",
  },
  {
    file: "appearance-3",
    title: "Opening Ceremonies, 2026 Regional Science and Technology Week in Bicol",
    issuer: "DOST Regional Office No. 5",
    date: "August 19, 2026",
    kind: "Event",
  },
  {
    file: "appearance-2",
    title: "Viewing of Exhibits, 2026 Regional Science and Technology Week in Bicol",
    issuer: "DOST Regional Office No. 5",
    date: "August 19, 2026",
    kind: "Event",
  },
];

/** Design Thinking write-up for DAET Pulse. Edit the `did` paragraphs to match your real process. */
export const designThinking = {
  intro:
    "I used the five stages of design thinking to turn a simple question — how can visitors tell Daet what their trip was like, and how can the municipality actually use it? — into DAET Pulse.",
  stages: [
    {
      name: "Empathize",
      what: "Understanding the people the system is for before deciding what to build.",
      did: "I looked at the two groups who would use it: visitors, who are usually on a phone, in a hurry and unwilling to create an account, and municipal staff, who need feedback they can trust and sort through. I also looked at how feedback is normally gathered, such as paper forms and long online surveys, and why people skip them.",
    },
    {
      name: "Define",
      what: "Turning what was learned into a clear problem to solve.",
      did: "I framed the problem as: visitors need a way to share how their visit felt in a few seconds, and the municipality needs that feedback in one organised place. From that I set the rules for the design: no account for visitors, one tap to rate, optional notes and photos, and a protected desk for officers.",
    },
    {
      name: "Ideate",
      what: "Exploring many possible solutions before choosing one.",
      did: "I compared long surveys, star ratings and emoji faces, and chose four faces (Wow, Happy, Okay, Sad) because they are quick, work across languages and are easy to total. I then planned the features around them: places to rate, an overall-visit option, reactions and replies, and a desk with moderation and sentiment insights.",
    },
    {
      name: "Prototype",
      what: "Building a working version that people can try.",
      did: "I built it with Next.js, React and TypeScript, with Supabase for the database and photo storage. I started with the visitor flow on mobile (landing, feedback form, places), then added the municipal desk and the API routes behind both. Details such as retry-safe submissions and clear loading and error states came from building it.",
    },
    {
      name: "Test",
      what: "Trying the prototype, finding what breaks and improving it.",
      did: "I used the live site, fixed the problems I found, and wrote them up as the challenges above: failed loads that looked like empty data, photo uploads failing silently, and overall feedback that belonged to no place. Next I want to add end-to-end tests and gather feedback from real visitors and municipal staff.",
    },
  ],
};
