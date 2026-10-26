# Paul Vincent N. Villaflores — Full-Stack Developer Portfolio

A premium, responsive developer portfolio built with **Next.js 15, React 19, TypeScript and TailwindCSS 4**. It is fully static: no backend, no database and no environment variables are needed to run or deploy it.

- **GitHub:** https://github.com/Villaflores04
- **Email:** tkpaulvincent042005@gmail.com
- **LinkedIn:** coming soon

## What it does

- Presents my profile, skills, education and featured project (DAET Pulse) as a fast single page.
- Opens with a clean hero: headline, call-to-action buttons, stats and a developer card, over a static gradient background.
- **Dark theme only**, with a static gradient hero.
- A **certificates gallery** (8 webinar and event certificates in `public/certificates`) with a full-size viewer: Esc to close, arrow keys to browse.
- Shows **DAET Pulse screenshots** in a tabbed browser-and-phone gallery, plus its features, architecture, API endpoints, challenges and next steps.
- Responsive from 320px phones to wide desktops: floating pill navigation, full-screen mobile menu, active-section highlighting, scroll-progress bar and back-to-top.

## Tech stack

| Layer | Tools |
|---|---|
| Front-end | Next.js 15 (App Router), React 19, TypeScript, TailwindCSS 4, lucide-react, Geist font |
| Hosting | Vercel (static output) |
| Tooling | Vitest, GitHub Actions |

## Setup

```bash
git clone https://github.com/Villaflores04/portfolio.git
cd portfolio
npm install
npm run dev        # http://localhost:3000
```

| Script | Purpose |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run typecheck` | TypeScript check |
| `npm test` | Unit tests (Vitest) |

**Deploy:** import the repo on Vercel (Framework Preset: Next.js). Optionally set `NEXT_PUBLIC_SITE_URL` to the deployed URL for correct social-preview metadata.

**Edit content:** everything (bio, skills, education, project details, links) lives in [`src/data/profile.ts`](src/data/profile.ts). Set `linkedin` there when it is ready.

## Performance

Scrolling does no animation work: the parallax and fade-on-scroll effects were removed.

- The hero background is a static CSS gradient and dot grid, painted once.
- No scroll listeners drive visuals; the only scroll-linked element is the thin progress bar (a CSS scroll timeline where supported, one rAF-throttled fallback elsewhere).
- Backdrop blur is limited to the nav on large screens; entrance and reveal animations use only `opacity` and `transform`.
- Certificate images are lazy-loaded and compressed.

## Design system

| Piece | How it works |
|---|---|
| Theming | One dark palette defined as CSS variables in `app/globals.css`. |
| Micro-interactions | Cursor spotlight on cards, 3D-tilt developer card, shine buttons, scroll reveals. |

## Featured project: DAET Pulse

Tourism feedback system for the Municipality of Daet, Camarines Norte. Live demo: https://daetfeedback.vercel.app/ · Source: https://github.com/Villaflores04/daet_feedback. Built with Next.js, React, TypeScript, TailwindCSS, Zustand and Supabase (PostgreSQL + Storage). Screenshots in [`public/projects`](public/projects) were captured from a local production build against a fresh database (the six seeded places, no visitor feedback).

| Landing | Feedback form | Places |
|---|---|---|
| ![DAET Pulse landing](public/projects/daet-home-desktop.jpg) | ![DAET Pulse feedback form](public/projects/daet-feedback-desktop.jpg) | ![DAET Pulse places](public/projects/daet-places-desktop.jpg) |

## Project structure

```
app/                      routes, layout, global styles
src/components/           UI sections (hero, about, skills, project, gallery, education, contact…)
src/data/profile.ts       all profile and project content in one place
public/projects/          DAET Pulse screenshots
.github/workflows/        CI: typecheck, test, build
```

## Quality

- Security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`); no user input, forms or secrets.
- Accessible: semantic landmarks, skip link, keyboard-navigable tab gallery (arrow keys, Home/End), focus handling and scroll-lock in the mobile menu, 44px minimum touch targets, reduced-motion support.
- Checked in headless Chromium at 375, 768, 1024 and 1440px: no horizontal overflow and no console errors.
- CI runs typecheck, tests (when present) and build on every push and pull request.

## Limitations

- Verified in headless Chromium only, not on physical devices or other browsers.

## Author

**Paul Vincent N. Villaflores** — BSIT 4B, Our Lady of Lourdes College Foundation.
