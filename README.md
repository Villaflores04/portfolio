# Paul Vincent N. Villaflores — Full-Stack Developer Portfolio

A premium, responsive developer portfolio built with **Next.js 15, React 19, TypeScript and TailwindCSS 4**. It features a working emoji feedback system (a live slice of my [DAET Pulse](https://github.com/Villaflores04/daet_feedback) project) backed by a validated, rate-limited API route and optional Supabase storage.

- **GitHub:** https://github.com/Villaflores04
- **Email:** tkpaulvincent042005@gmail.com
- **LinkedIn:** coming soon

## What it does

- Presents my profile, skills, education and featured project in a fast single-page layout.
- Opens with a **10-layer parallax landscape** (sky, stars, sun/moon, clouds, three mountain ranges, mist, pines, floating emoji bubbles) driven by scroll *and* pointer movement.
- Embeds an interactive **emoji feedback widget** (🤩 Wow · 😊 Happy · 😐 Okay · 😢 Sad + optional note) with live results.
- Shows **DAET Pulse screenshots** in a tabbed browser + phone device gallery.
- **Light and dark mode** (follows the OS until you choose, remembered afterwards, no flash on load).
- Responsive from 320px phones to wide desktops: floating pill navigation, full-screen mobile menu, active-section highlighting, scroll-progress bar and back-to-top.

## Design system

| Piece | How it works |
|---|---|
| Parallax hero | `ParallaxRoot` writes `translate3d` straight to layers tagged with `data-depth` (scroll factor) and `data-pointer` (cursor offset) inside one `requestAnimationFrame` loop, with no React re-renders. The loop only runs while the hero is on screen. |
| Procedural landscape | `src/lib/scene.ts` generates the mountains, hills, pines and stars from fixed seeds, so server and client always match. |
| Page-wide depth | `AmbientBackground` (three drifting colour fields at different speeds) and `ParallaxWord` (oversized outlined section numerals) extend the layered effect past the hero. |
| Theming | CSS variables on `:root` / `.dark` drive every colour, including the sky, mountains, sun/moon, clouds and mist, so both modes have a distinct atmosphere. |
| Micro-interactions | Cursor spotlight on cards, 3D-tilt developer card, shine buttons, scroll reveals, animated theme toggle. |

All motion is disabled under `prefers-reduced-motion`.

## Screenshots

DAET Pulse, captured from a local production build against a fresh database (the six places seeded by its `schema.sql`, no visitor feedback):

| Landing | Feedback form | Places |
|---|---|---|
| ![DAET Pulse landing](public/projects/daet-home-desktop.jpg) | ![DAET Pulse feedback form](public/projects/daet-feedback-desktop.jpg) | ![DAET Pulse places](public/projects/daet-places-desktop.jpg) |

Mobile: [`daet-home-mobile.jpg`](public/projects/daet-home-mobile.jpg), [`daet-feedback-mobile.jpg`](public/projects/daet-feedback-mobile.jpg).

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
src/components/       UI sections (hero, about, skills, project, gallery, education, contact…)
src/components/parallax/  parallax engine, landscape layers, ambient background, spotlight
public/projects/      DAET Pulse screenshots
src/data/profile.ts   all profile + project content in one place
src/lib/feedback.ts   validation, summary and rate-limit logic (unit tested)
src/lib/scene.ts      seeded generators for the parallax landscape
supabase/schema.sql   database schema with row-level security
tests/                Vitest unit tests
.github/workflows/    CI: typecheck, test, build
```

## Security & quality

- Server-side input validation and control-character stripping.
- Per-IP rate limiting on writes.
- Service-role key kept server-side; table protected by row-level security with no public policies.
- Security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`).
- Accessible: semantic landmarks, skip link, labelled controls, keyboard focus styles, `aria-live` status messages, a keyboard-navigable tab gallery (arrow keys, Home/End), focus handling and scroll-lock in the mobile menu, 44px minimum touch targets, and reduced-motion support.
- CI runs typecheck, tests and build on every push and pull request.

## Verified in a real browser

Checked with headless Chromium at 375, 768, 1024 and 1440px in both themes: no horizontal overflow and no console errors at any size; the 10 hero layers move at distinct rates on scroll (far layers lag, foreground layers move faster); pointer parallax scales with depth; mobile menu opens, locks scroll, closes on Escape and navigates; theme choice persists across reloads; the feedback widget saves and updates live results; reduced-motion disables all motion.

## Features & limitations

**Features:** layered parallax hero, responsive layout, light/dark theming, live feedback widget, device-frame screenshot gallery, SEO metadata + JSON-LD, optional persistent storage.

**Limitations:**
- Rate limiting and the in-memory fallback are per server instance, so they are not shared across serverless instances. Use a shared store (e.g. Redis) for stricter limits.
- Feedback is anonymous with no moderation UI in this portfolio (the full municipal desk lives in DAET Pulse).
- The live demo link for DAET Pulse is not yet published; its source is linked. Set `live` in `src/data/profile.ts` once it is deployed.
- Parallax is pointer-driven on desktop only; touch devices get scroll parallax.

## Author

**Paul Vincent N. Villaflores** — BSIT 4B, Our Lady of Lourdes College Foundation.
