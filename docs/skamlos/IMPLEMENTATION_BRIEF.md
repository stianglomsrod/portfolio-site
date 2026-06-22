# Skamløs Pitch — Implementation Brief (self-authored execution spec)

> This is the improved internal brief the agent wrote for itself from the user
> prompt + repo context, then executed. It supersedes generic low-cost / small-
> chunk rules **for this one task only**, per the user's explicit override. All
> non-negotiable claim, branding, privacy and git rules still apply.

## 1. One-line goal

A genuinely playable, browser-based **first-person 3D "Skamløs Pitch"** game at
`/skamlos-pitch` where the player is Stian and walks through a symbolic
competence world — completing quests, unlocking skills, collecting evidence
artifacts, and opening the **DNB AI Tech Gate** to deliver an application
package. Skamløs (shameless) in ambition, but truthful and claim-safe.

## 2. Hard constraints (non-negotiable)

- Branch `feature/skamlos-pitch-game` off `dnb-main`. Never touch `master` / VG X.
- No DNB logos, official branding, or implication of official DNB affiliation.
- No PII, national ID, private medical/health context, school/student names,
  or any gitignored sensitive source content.
- No senior/distributed-systems/platform **expertise** claims — growth direction only.
- No "you got the job" / "you deserve the job".
- No student-outcome claims. Klar evaluated **with teachers, not students**.
- Klar = robust prototype / fullstack proof, **not** enterprise-scale platform.
- Do not commit. Do not push. Report exactly what changed.

## 3. Tech decision (and why)

- **React Three Fiber v9** (`@react-three/fiber`) + **Drei v10** + **three 0.180**.
  - R3F v9 + drei v10 are the React 19 / current-three generation — matches the
    repo's Next 16.2.9 / React 19.2.4 stack.
  - Declarative scene graph fits a **data-driven** zone/quest/artifact model and
    keeps game code modular and maintainable (prompt requirement).
  - Drei gives `PointerLockControls`, `Text` (troika SDF text), `Sparkles`,
    `Float`, `Edges` — enough to look stylized/dark-tech without custom shaders.
- **No new state library.** Game state is a typed `useReducer` + context. Keeps
  the dependency footprint reasonable.
- **Route pattern (Next 16-safe):** `app/skamlos-pitch/page.tsx` is a Server
  Component (exports `metadata`) that renders a Client wrapper which uses
  `next/dynamic(..., { ssr: false })` to load the WebGL game only on the client.
  `ssr:false` is illegal in a Server Component in Next 16 — verified in
  `node_modules/next/dist/docs/01-app/02-guides/lazy-loading.md`.

## 4. Architecture / file plan

    app/skamlos-pitch/
      page.tsx                  Server component: metadata + <SkamlosPitchClient/>
      SkamlosPitchClient.tsx    'use client'; dynamic(ssr:false) + WebGL/size guard + fallback
      skamlos-pitch.module.css  Page-level shell + HUD + modal + fallback styles
      game/
        Game.tsx                Top orchestrator: <Canvas>, HUD, modals, phases
        state/
          types.ts              Skill/Quest/Artifact/EasterEgg/GameState types
          gameReducer.ts        Pure reducer + initial state + derived selectors
          GameContext.tsx       Provider + useGame() hook
        data/
          skills.ts             Skill registry (bilingual)
          quests.ts             8 zones/quests w/ prereqs, rewards, missions (bilingual)
          artifacts.ts          Evidence artifacts + external links (bilingual)
          easterEggs.ts         Flutterfly, Laser Egg, Rubber Duck, Overclaim Monster
          world.ts              Zone world positions + layout constants
        world/
          Player.tsx            First-person controller (WASD + pointer-lock look)
          Ground.tsx            Hub floor + grid + fog
          Zone.tsx              One zone pod: platform, beacon, label, gate, interactable
          Interactable.tsx      Glowing monolith/terminal/NPC + proximity highlight
          Gate.tsx              Locked/unlocked barrier visual
          ArtifactPickup.tsx    Floating collectible shard
          DnbGate.tsx           Final gate; opens when win condition met
          EasterEggs.tsx        Flutterfly + Laser Egg meshes
          Decor.tsx             Ambient particles, distant pillars, skybox tint
        ui/
          Hud.tsx               Crosshair, objective, prompt, panel toggles, controls
          QuestLog.tsx          Quest list panel
          SkillTree.tsx         Skill list panel
          QuestModal.tsx        Quest detail + mission choices + accept/complete
          ArtifactModal.tsx     Artifact card with external link
          Endgame.tsx           Win summary: stats, message, contacts, replay, back
          StartScreen.tsx       Intro + controls + click-to-play (pointer lock)
        i18n.ts                 Local useLanguage re-export + UI string table

## 5. Game systems (acceptance)

1. First-person movement (WASD/arrows + mouse look via pointer lock) + sprint.
2. Compact hub world, 8 zones, fog + emissive dark-tech styling.
3. Interactables (terminals/NPCs/monoliths) with proximity + crosshair + `E`.
4. Quest log (`Q`/`Tab`), skill tree (`K`), objective tracker.
5. Skill unlock system; quests grant skills.
6. Locked gates that open when prerequisite skills are owned.
7. Artifact/evidence collection with external links (real, verified URLs only).
8. Modal UI for quest descriptions + mission choices.
9. Two **decision missions** that bake in claim discipline:
   - **Smart Import** (Klar): feed weekly letter → AI proposes structure → must
     *Review & approve* before publish. Publishing first → human-in-the-loop
     guardrail warning (teaches the gate, no student data shown).
   - **Agentic Workflow**: an AI agent proposes a too-broad/unsafe rewrite;
     player must apply context/requirements/review/QA to win and beat the
     **Overclaim Monster** / **Scope Creep Slime**.
10. Final DNB AI Tech Gate checks skills+artifacts; opens endgame.
11. Endgame summary: completed quests, skills, artifacts, eggs, serious +
    playful stats, personal message, contacts, replay, back-to-portfolio.
12. At least one easter egg (ship **Flutterfly** + **Laser Egg** + duck + monster).
13. Fallback: no-WebGL / tiny-screen → accessible static pitch view with the
    same quests/skills/artifacts/contacts. Respect `prefers-reduced-motion`.
14. Bilingual NO/EN via existing `useLanguage` store.

## 6. Claim-safety mapping (per artifact)

- Teacher/Needfinding → micro:bit + Kitronik + small Python/JS exercises (DnbCapacity).
- CS50x → C/Python/SQL/HTML/CSS/JS; **foundation, not a CS degree**; public cert URL.
- Participatory Design → graded master course + thesis method (co-design,
  empathy maps, Crazy Eights, journey mapping). Small, non-representative.
- PD-app → Django + Vue, predecessor to Klar, pupils as co-designers (repos public).
- Design Science → build/evaluate/theorize/justify; artifact as instantiation.
- Klar → Next/React + Supabase/Postgres + auth/RBAC + Smart Import + human-in-
  the-loop. **Robust prototype, evaluated with teachers, not a platform.**
- Agentic Workflow → Copilot + PROJECT_DNA/FILE_TREE/TECH_DEBT/QA/handoff
  (evidenced by the repo docs themselves).
- Growth direction (DNB gate epilogue) → low-level eng, observability,
  distributed systems, MCP = **motivation**, never current mastery.

## 7. Endgame message (preserve meaning)

NO: "Jeg søker ikke fordi jeg tror jeg er ferdig utlært. Jeg søker fordi jeg har
funnet ut at programmering, AI-verktøy og systembygging gir meg energi, og fordi
jeg vil bli skikkelig god i et miljø der læring og bidrag faktisk betyr noe."

EN: "I am not applying because I think I am finished learning. I am applying
because programming, AI tools and system-building give me energy, and because I
want to become genuinely good in an environment where learning and contribution
actually matter."

## 8. Validation plan

- `npm run lint`, `npm run build`, `git status --untracked-files=all`.
- Manual game QA: movement, interaction, quest/skill/gate progression, artifact
  links, Smart Import + Agentic missions, eggs, endgame, replay, back-to-
  portfolio, desktop + small viewport fallback, console errors.

## 9. Explicitly out of scope (cut to protect a coherent slice)

- Open-world streaming, physics engine, multiplayer, save files, audio, asset
  pipelines/glTF models. Geometry is primitives + emissive materials only.
- Full screen-reader parity for the 3D mode itself; the static fallback is the
  accessible path and this is stated honestly on-page.
