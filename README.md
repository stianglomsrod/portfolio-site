# stianglomsrod.no

Stian Glomsrød's portfolio site: AI-first fullstack product building with a
documented workflow. Norwegian first, with an English toggle. The site also
hosts **«Skamløs pitch»** — a small playable 2D RPG prologue about building
competence stone by stone — at [`/skamlos-rpg`](https://stianglomsrod.no/skamlos-rpg).

## Tech stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript** (strict), **CSS Modules**
- **Phaser 3** — loaded only on the game route
- No analytics or tracking. The only localStorage keys are the language
  choice (`site-lang`) and the game's save state.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script                   | Purpose                                    |
| ------------------------ | ------------------------------------------ |
| `npm run dev`            | Start the dev server                       |
| `npm run build`          | Production build                           |
| `npm run lint`           | ESLint (core-web-vitals + TypeScript)      |
| `npm run check:skamlos`  | Content guard for the game pack            |
| `npm run assets:skamlos` | Regenerate the game's procedural PNG assets |

## Project structure

```
app/
  layout.tsx           Root layout + SEO/OpenGraph metadata
  page.tsx             Front page (Hero → Workflow → Klar → Method → Capacity → Contact)
  components/          UI components; copy lives inline as { no, en } objects
  skamlos-rpg/         The game route
    game/engine/       Reusable, content-agnostic RPG engine (Phaser)
    game/content/      The "kompetansebyen" content pack (maps, quests, dialogue)
public/skamlos-rpg/    Generated pixel-art assets (see scripts/)
scripts/               Asset generation + content guard
```

## Content rules

- All visible copy exists in both Norwegian and English.
- The game engine knows nothing about the content pack; everything specific
  to the story lives under `game/content/kompetansebyen/`.
- Game assets are drawn procedurally in `scripts/build-skamlos-rpg-assets.mjs`
  — no external or copyrighted art.

## Deploy

Standard Next.js app on Vercel. Optional environment variable
`NEXT_PUBLIC_SITE_URL` sets the absolute URL for canonical/OpenGraph tags;
it falls back to the Vercel production URL automatically.
