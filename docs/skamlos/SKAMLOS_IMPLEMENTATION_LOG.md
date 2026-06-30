# SKAMLOS Implementation Log

> Running log for the top-down 2D RPG ("Skamløs Pitch: Kompetansebyen") and the reusable
> application-RPG framework. Append newest entries at the top of §2. Keep entries short and
> factual. This is the continuity record between agents/sessions.

## 1. How to use this log

- One entry per working session that changes plan or code.
- Record: date, branch, what changed, decisions, validation, and the next step.
- Decisions that affect claims, dependencies, routes, or the engine/pack boundary must be
  written down here so the next agent inherits them.
- This file is tracked (see `.gitignore` allowlist for `docs/skamlos/*.md`).

---

## 2. Entries (newest first)

### 2026-06-30 — Planning layer created (docs only)

- **Branch:** `feature/skamlos-2d-rpg-planning`.
- **Type:** documentation/planning only. No game code, no dependencies, no route, no deploy.
- **Why:** pivot from the archived 3D first-person experiment to a charming, readable
  top-down RPG, and set up the structure so it can become a reusable application-RPG
  framework with the DNB/Skamløs story as the first content pack.
- **Created docs (docs/skamlos/):**
  - `SKAMLOS_2D_RPG_IMPLEMENTATION_BRIEF.md` — first-slice plan, stack, route, file
    structure, data model, acceptance criteria, what-not-to-build.
  - `SKAMLOS_APPLICATION_RPG_FRAMEWORK.md` — engine-vs-content split, content-pack concept,
    full schemas, claim-boundary-as-data, minigame host, bridge, routing.
  - `SKAMLOS_2D_RPG_WORLD_MAP.md` — worldmap v1, buildings, interiors, lock states, NPC
    placement, natural barriers, signpost logic, visual style.
  - `SKAMLOS_2D_RPG_PROLOGUE_SLICE.md` — step-by-step storyboard for the first playable
    slice with claim-safe text bank.
  - `SKAMLOS_IMPLEMENTATION_LOG.md` — this file.
- **Key decisions:**
  1. **Engine:** Phaser 3 (primary). Excalibur.js documented as fallback. Rejected
     React+Canvas (engine reinvention) and Pixi (renderer-only).
  2. **One new dependency only:** `phaser` (requires explicit approval before the code pass).
     Maps authored offline in Tiled → JSON in `public/`. No state lib, no audio lib.
  3. **Route:** `/skamlos-rpg`, `noindex`, 3-layer client-only load (server shell → client
     probe → `GameMount`), reusing the verified Next 16 pattern from the 3D branch
     (`ssr:false` dynamic import must live in a client component).
  4. **Engine/pack boundary:** `game/engine/` is company-agnostic; `game/content/dnb-skamlos/`
     is the first swappable content pack. Nine swap axes documented.
  5. **Keep Phaser out of the DNB portfolio bundle:** portfolio links to the route; it does
     not embed the engine. Existing `SkamlosWorld` DOM world left untouched.
  6. **Claim safety as data:** per-artifact boundaries + pack `claims.deny` list + optional
     dev "claim lint". Carries the DNB claim discipline into the game.
  7. **Prologue spelling/skill notes:** project is **"Ordkryss"** (never "Ordryss"); the
     **Grunnleggende programmering** skill log lists C/Python/SQL/Flask/Django/JS/HTML-CSS/web
     fundamentals, with an honest annotation that Django comes from the predecessor prototype,
     not CS50x.
- **Lessons carried from the archived 3D branch** (`feature/skamlos-pitch-game`, read-only):
  - Data-driven design (quests/skills/artifacts as plain data) worked well — keep & generalize.
  - First-person 3D hurt readability and was untestable under pointer-lock in headless
    browsers — top-down keyboard 2D fixes both.
  - Per-frame React state thrashes; keep continuous motion in the engine, push only discrete
    changes to React.
  - Route `noindex` + WebGL/canvas probe + text fallback are good patterns to reuse.
- **Validation:** none required (docs only). `git status` to be reported in the session
  report; no build/lint because no code changed.
- **Next step:** get approval for the `phaser` dependency, then implement the prologue slice
  per the implementation brief §8 order.

---

## 3. Open decisions / TODOs for the next agent

- [ ] Approve adding `phaser` (or choose Excalibur.js fallback) before any code.
- [ ] Confirm Next 16 dynamic-import/metadata APIs against `node_modules/next/dist/docs/`.
- [ ] Supply the public **CS50x certificate URL** (do not invent one) if it is to appear on
      the Ordkryss reward artifact.
- [ ] Decide tile size (16 vs 32) and lock it for all packs.
- [ ] Decide whether the prologue ships NO-only or NO+EN (types are bilingual-ready either way).
- [ ] Source original/CC0/CC-BY tileset + sprites; record attributions here when added.
