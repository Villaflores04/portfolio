# Paul Vincent N. Villaflores — Full-Stack Developer Portfolio

A premium, responsive developer portfolio built with **Next.js 15, React 19, TypeScript and TailwindCSS 4**. It features a working emoji feedback system (a live slice of my [DAET Pulse](https://github.com/Villaflores04/daet_feedback) project) backed by a validated, rate-limited API route and optional Supabase storage.

- **GitHub:** https://github.com/Villaflores04
- **Email:** tkpaulvincent042005@gmail.com
- **LinkedIn:** coming soon

## What it does

- Presents my profile, skills, education and featured project in a fast single-page layout.
- Embeds an interactive **emoji feedback widget** (🤩 Wow · 😊 Happy · 😐 Okay · 😢 Sad + optional note) with live results.
- Dark / light theme with no flash on load, mobile menu, scroll-reveal animations, skip link and reduced-motion support.

## Tech stack

| Layer | Tools |
|---|---|
| Front-end | Next.js 15 (App Router), React 19, TypeScript, TailwindCSS 4, lucide-react, Geist font |
| Back-end | Next.js Route Handlers (Node runtime) |
| Database | Supabase / PostgreSQL via REST (optional; in-memory fallback) |
| Tooling | Vitest, GitHub Actions, Vercel |

## Setup

```bash
git clone https://github.com/Villaflores04/portfolio.git
cd portfolio
npm install
cp .env.example .env.local   # optional
npm run dev                  # http://localhost:3000
```

| Script | Purpose |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run typecheck` | TypeScript check |
| `npm test` | Unit tests (Vitest) |

### Optional: persistent feedback with Supabase

Without configuration the feedback demo stores entries in server memory (they reset on restart). To persist them:

1. Run [`supabase/schema.sql`](supabase/schema.sql) in the Supabase SQL editor. It is safe to run more than once.
2. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` (and in Vercel project settings). These are **server-only** — never prefix them with `NEXT_PUBLIC_`.

### Deploy to Vercel

Import the repo on Vercel (Framework Preset: Next.js), add the environment variables above, and set `NEXT_PUBLIC_SITE_URL` to the deployed URL.

## API

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/feedback` | Returns totals per face, the latest notes and the active storage backend |
| `POST` | `/api/feedback` | Saves feedback. Body: `{ "face": "wow\|happy\|medium\|sad", "note"?: string (≤280), "name"?: string (≤40) }` |

Responses: `201` saved · `400` invalid input · `429` rate-limited (5 submissions / minute / IP) · `503` storage unavailable.

## Project structure

```
app/                  routes, layout, global styles, /api/feedback handler
src/components/       UI sections (hero, about, skills, project, education, contact…)
src/data/profile.ts   all profile + project content in one place
src/lib/feedback.ts   validation, summary and rate-limit logic (unit tested)
supabase/schema.sql   database schema with row-level security
tests/                Vitest unit tests
.github/workflows/    CI: typecheck, test, build
```

## Security & quality

- Server-side input validation and control-character stripping.
- Per-IP rate limiting on writes.
- Service-role key kept server-side; table protected by row-level security with no public policies.
- Security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`).
- Accessible: semantic landmarks, labelled controls, keyboard focus styles, `aria-live` status messages, reduced-motion support.
- CI runs typecheck, tests and build on every push and pull request.

## Features & limitations

**Features:** responsive layout, theming, live feedback widget, SEO metadata + JSON-LD, optional persistent storage.

**Limitations:**
- Rate limiting and the in-memory fallback are per server instance, so they are not shared across serverless instances. Use a shared store (e.g. Redis) for stricter limits.
- Feedback is anonymous with no moderation UI in this portfolio (the full municipal desk lives in DAET Pulse).
- The live demo link for DAET Pulse is not yet published; its source is linked.

## Author

**Paul Vincent N. Villaflores** — BSIT 4B, Our Lady of Lourdes College Foundation.
