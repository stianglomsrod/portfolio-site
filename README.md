# Stian Glomsrød — Portefølje

A two-mode portfolio site built as Stian Glomsrød's application for the **UX Designer** role at
**VG X** (Schibsted). It is itself an AI-native prototype that argues its own thesis.

- **Normal pitch** (default): a calm, scannable, application-ready portfolio —
  Hero → featured case (Klar) → supporting cases → agentic workflow → contact.
- **Skamløs AI-pitch**: a game-first, playable world ("Stians verden") where the real learning
  journey is the pitch. All evidence is also available as text via the journal (`J`), so it stays
  fully usable without playing.

The mode toggle persists to `localStorage` (`portfolio-mode`) and drives a `data-mode` attribute.

## Tech stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **TypeScript** (strict)
- **CSS Modules** + a small global theme in [`app/globals.css`](app/globals.css)
- No runtime UI dependencies beyond React/Next.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script          | Purpose                               |
| --------------- | ------------------------------------- |
| `npm run dev`   | Start the dev server (Turbopack)      |
| `npm run build` | Production build                      |
| `npm run start` | Serve the production build            |
| `npm run lint`  | ESLint (core-web-vitals + TypeScript) |

## Project structure

```
app/
  layout.tsx          Root layout + SEO/OpenGraph metadata
  page.tsx            Renders <Portfolio/>
  globals.css         Theme tokens, reduced-motion handling
  components/         UI (Portfolio, SkamlosWorld, cases, footer, …)
  data/portfolio.ts   Single source of truth for copy + the VG X fit-scan
docs/                 Epic, AI pitch log, reports
public/images/        Case screenshots + avatar
```

## Content & integrity rules

- Copy lives in [`app/data/portfolio.ts`](app/data/portfolio.ts) and
  [`app/components/skamlos/worldGyms.ts`](app/components/skamlos/worldGyms.ts) — no invented
  metrics, awards, or seniority.
- Contact links live in `footer.links` in [`app/data/portfolio.ts`](app/data/portfolio.ts). Any
  link written as `[bracketed text]` is treated as a placeholder and renders as a non-clickable
  chip (see [`app/components/CaseLink.tsx`](app/components/CaseLink.tsx)).

## Configuration

Optional environment variable:

| Variable               | Purpose                                                                                                                                                                  |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Absolute site URL for canonical/OpenGraph tags (e.g. `https://…`). On Vercel it falls back automatically to the production URL, and to `http://localhost:3000` locally. |

## Deploy on Vercel

This is a standard Next.js app and deploys on Vercel with zero extra configuration:

1. Push the repo to GitHub.
2. At [vercel.com/new](https://vercel.com/new), import the repository — Next.js is auto-detected.
3. (Optional) Add the `NEXT_PUBLIC_SITE_URL` environment variable for correct canonical/OpenGraph
   URLs.
4. Click **Deploy**.

Local production check before deploying:

```bash
npm run lint && npm run build
```
