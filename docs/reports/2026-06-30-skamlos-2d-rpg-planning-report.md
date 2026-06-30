# 2026-06-30 — Skamløs 2D RPG Planning Layer Report

NOTE: This file is the saved copy of the session report. Per project rules it contains no
triple-backtick fences; directory trees and command output are shown as plain indented text.

## 0. User prompt

You are working in the existing portfolio-site repository on branch
feature/skamlos-2d-rpg-planning.

Task:
Create the planning layer for a new top-down 2D RPG version of the "Skamløs Pitch" game.

This is a documentation/planning task only.
Do not implement the game yet.
Do not change app code.
Do not add dependencies.
Do not change deployment.
Do not touch VG X / master.
Do not merge anything.
Do not commit.
Do not push.

Context:
The previous 3D first-person version proved that a playable game was possible, but the user
now wants to pivot to a more charming, readable, Pokémon/Zelda-inspired top-down RPG.

The 3D branch should be treated as an archived experiment. You may inspect it read-only for
ideas, data structures, lessons learned, quest logic, and pitfalls, but do not build on it
directly and do not merge it.

Read first: docs/skamlos/SKAMLOS_2D_RPG_GAME_DESIGN_BRIEF.md
Also read: AGENTS.md, .github/copilot-instructions.md, FILE_TREE.md,
docs/dnb/DNB_CLAIM_SOURCE_MAP.md, docs/dnb/DNB_QA_CHECKLIST.md, docs/dnb/DNB_JOB_POSTING.md,
docs/dnb/DNB_CROSS_REPO_EVIDENCE.md, docs/dnb/DNB_SOURCE_EVIDENCE_NOTES.md, latest relevant
files under docs/reports/.

If useful, inspect the previous 3D branch read-only: feature/skamlos-pitch-game
Allowed read-only commands: git fetch --all --prune, git ls-tree, git show <branch>:<path>.
Do not merge or cherry-pick anything from the 3D branch.

Goal:
Turn the 2D RPG game design brief into concrete implementation-planning documents for the
first playable top-down RPG slice.

Important extra goal:
Design the structure so it can later become a reusable "application RPG framework" for future
job-application games. The DNB / Skamløs Pitch game is the first content pack, but the
underlying structure should be reusable for future applications by swapping: target
company/role, world locations, quest chain, skills, artifacts, NPCs, dialogue, final
application screen, claim boundaries, visual theme. Keep this distinction clear: (1) Generic
reusable application-RPG framework, (2) DNB-specific Skamløs Pitch content. Do not
over-engineer the first slice, but plan the architecture so future reuse is realistic.

Game direction: small top-down RPG town inspired by Pokémon/Zelda (tile-based or
tile-inspired; small town/worldmap; grusveier, trær, busker, signs, NPCs, buildings; clear
locked/unlocked buildings; no invisible walls; DNB building visible early but locked;
buildings not yet unlocked give clear feedback; world should feel alive).

Core world locations: 1 School (starting classroom; later separate workshop entrance),
2 Stian's home (desk; PC with two monitors; rubber duck hint), 3 OsloMet/university (starts
Workshop/Participatory Design chain; later master chain; Kari appears here later), 4 Nikkos
house (sidequest; Flutterfly outside; companion/Flutter/local-first sidequest), 5 DNB building
(visible early, locked until application package ready; final delivery at reception; egg
easter egg near application pile).

Immediate implementation target: only the first playable prologue slice. Prologue slice:
start inside classroom; last class of the day; bell rings; quest go home and finish CS50x final
project Ordkryss (it is "Ordkryss", not "Ordryss"); walk out of school through a small
town/worldmap to home; inside home desk, PC with two monitors, rubber duck; interact with PC;
complete a tiny Ordkryss coding minigame (one simple JavaScript for-loop challenge + one git
commit challenge); reward skill Grunnleggende programmering, skill-log details C, Python, SQL,
Flask, Django, JavaScript, HTML/CSS, web fundamentals, artifact CS50x certificate, artifact
Ordkryss YouTube demo https://youtu.be/tI5fU1aAAvI; unlock next direction OsloMet/Workshop
chain but do not implement that next chain yet.

Important content decisions: learning itself should not be a skill (learning is the implicit
theme); do not create "learning drive" as a skill; use concrete skills like Grunnleggende
programmering; details live in a skill log; workshop should not be called Klarlab; the Workshop
chain starts at OsloMet; Kari belongs at OsloMet (former fellow student/collaborator and later
reference-person, worked with Stian on several projects including the predecessor prototype);
school eventually has two entrances (main classroom + workshop); workshop entrance unlocks
later (separate room with teachers, journey mapping, green/red/blue notes, markers, tables,
ideation props); at DNB the egg easter egg should not be overexplained, only "Du prøver å lese
teksten, men den er altfor liten."; a signpost/NPC should only suggest where to go next.

Future quest chain after the prologue (1 OsloMet workshop intro; 2 School collect student
insights "Oversikt og struktur" / "Motivasjon gjennom spill"; 3 Home PC build predecessor
prototype, unlock grunnleggende fullstack and deltakende design, artifacts pd-app
frontend/backend; 4 OsloMet master thesis chain starts, Design Science; 5 School workshop
entrance collect teacher insights "Tidsbesparende verktøy"/"Hjelpekø"/"Opt-in spillelementer";
6 Home PC build Klar/master prototype React/Next.js, Supabase/PostgreSQL, roles/auth, Smart
Import, human-in-the-loop; 7 OsloMet graduation, graduate cap, Master i digital læringsdesign,
UX, agentic workflow; 8 Phone notification from Kari suggesting DNB, quest build portfolio page;
9 Home PC metaquest build the page/game the player is experiencing, unlock higher-level agentic
workflow and claim-boundary discipline; 10 DNB building deliver application package at
reception, application pile, egg easter egg, endgame screen).

Endgame text (emotional core): "Jeg søker ikke fordi jeg tror jeg er ferdig utlært. Jeg søker
fordi jeg har funnet ut at programmering, AI-verktøy og systembygging gir meg energi, og fordi
jeg vil bli skikkelig god i et miljø der læring og bidrag faktisk betyr noe." Endgame screen
should eventually include quests completed, skills unlocked, artifacts collected, optional
easter eggs found, GitHub, LinkedIn, email, phone 94186688, play again, back to portfolio.

Create these docs: 1 docs/skamlos/SKAMLOS_2D_RPG_IMPLEMENTATION_BRIEF.md (concrete
implementation plan for first playable prologue slice; recommended tech stack; route; file
structure; data model; acceptance criteria; what not to build yet). 2
docs/skamlos/SKAMLOS_APPLICATION_RPG_FRAMEWORK.md (generalized framework for future playable
job-application games; reusable engine vs role/company-specific content; content-pack concept;
suggested schemas for quests, skills, artifacts, NPCs, maps, endgame; how claim boundaries
should be represented). 3 docs/skamlos/SKAMLOS_2D_RPG_WORLD_MAP.md (worldmap v1; buildings;
interiors; locked/unlocked states; NPC placement; visual style notes; natural barriers;
signpost/navigation logic). 4 docs/skamlos/SKAMLOS_2D_RPG_PROLOGUE_SLICE.md (step-by-step
storyboard for the first playable slice; classroom scene; walk home; home/PC; Ordkryss coding
minigame; git commit minigame; skill/artifact reward; handoff into the next OsloMet/Workshop
quest). Also create docs/skamlos/SKAMLOS_IMPLEMENTATION_LOG.md. Update FILE_TREE.md and create
a short report under docs/reports/.

Technology recommendation: evaluate and recommend one primary approach (Phaser; React +
Canvas/custom loop; another browser-friendly 2D approach). Current preferred direction is
Phaser. If recommending Phaser, explain why it fits, how to integrate with Next, where to put
game code, how to keep game engine separate from DNB portfolio page, how to avoid dependency
sprawl, how to keep it reusable for future application RPGs.

Important: this is not yet the implementation prompt; this is the planning layer. Output should
be detailed enough that a fresh high-capability agent can implement the first 2D slice without
needing chat history.

Validation: Run git status --untracked-files=all. No lint/build required unless code was
accidentally touched.

Final report: Return exactly one detailed Markdown report in one single fenced Markdown code
block. No prose before or after the block. No nested triple-backtick fences inside the block.
The first section must be ## 0. User prompt. Use full relative paths. Include sections 0–11 as
required by project reporting rules. Be explicit about: what you read; what docs you created;
what framework/generalization plan you proposed; what tech stack you recommend and why; what
the first playable slice should include; what is deliberately deferred; whether any code was
changed; git status; recommended next step.

## 1. Session context

- Branch: feature/skamlos-2d-rpg-planning (master / VG X untouched and protected).
- Task type: documentation / planning only. Not code, not UI, not QA of code.
- VG X protected: yes. No app code, no app/data/portfolio.ts, no existing SkamlosWorld DOM
  world, no deployment config touched.
- 3D branch (feature/skamlos-pitch-game) inspected read-only only (git ls-tree / git show).
  Nothing merged or cherry-picked.
- Roles: Copilot (Opus) as implementation agent producing the planning layer; user runs the
  environment; ChatGPT is tech lead / continuity keeper (recipient of this report).

## 2. Files and sources read (full relative paths, why each mattered)

- docs/skamlos/SKAMLOS_2D_RPG_GAME_DESIGN_BRIEF.md — the creative source of truth (worldmap,
  locations, full quest chain v1, skill log, artifacts, NPCs, easter eggs, dialogue rules,
  endgame). Every planning doc derives from it.
- AGENTS.md — operating model, positioning rules, claim boundaries, FILE_TREE rule, report
  format and delivery rules, dependency/commit policy, and the Next.js "read node_modules
  docs first" rule.
- .github/copilot-instructions.md — repo operating model, discovery expectations, validation
  and reporting requirements, FILE_TREE rule.
- FILE_TREE.md — current tracked structure; needed to update it and to see that
  docs/skamlos/ was not yet listed.
- docs/dnb/DNB_CLAIM_SOURCE_MAP.md — per-claim source ratings and the no-overclaim guardrails
  (Klar = robust prototype, no senior distributed systems, no student-outcome claims).
- docs/dnb/DNB_QA_CHECKLIST.md — candidate-narrative, evidence, claim, DNB-fit, and report
  checklists used to keep the game text claim-safe.
- docs/dnb/DNB_JOB_POSTING.md — the canonical role-fit reference; confirms AI-first builder
  framing and that distributed-systems depth is a senior plus (growth direction only).
- docs/dnb/DNB_CROSS_REPO_EVIDENCE.md — Klar / nikkoprogging-companion / lori-frisor evidence
  split; informs artifacts and honest boundaries.
- docs/dnb/DNB_SOURCE_EVIDENCE_NOTES.md — primary-source distillation (Klar stack, Smart
  Import, participatory design, safety, learning velocity) and the PII guardrails.
- package.json — confirmed current stack (Next 16.2.9, React 19.2.4) and that there is NO game
  dependency yet (informs the single-dependency recommendation).
- .gitignore — confirmed *.md is ignored except allowlisted paths; docs/skamlos/*.md and
  docs/reports/*.md are explicitly tracked, so the new docs will be tracked.
- app/components/Portfolio.tsx, app/components/SkamlosWorld.tsx, app/components/skamlos/worldGyms.ts
  — the existing DOM/CSS "SkamlosWorld" embedded in the DNB portfolio page; informs the
  "keep the engine out of the portfolio bundle / link only" decision and the existing
  data-driven, claim-safe world data pattern.
- app/components/DnbContact.tsx and app/data/portfolio.ts — canonical contact values
  (stianglomsrod@gmail.com, LinkedIn, GitHub github.com/stianglomsrod) so the endgame doc
  references real data instead of inventing it.
- 3D branch read-only (feature/skamlos-pitch-game): app/skamlos-pitch/game/state/types.ts,
  app/skamlos-pitch/game/data/quests.ts, docs/skamlos/SKAMLOS_GAME_DNA.md, and
  docs/reports/2026-06-22-skamlos-pitch-game-report.md — to learn the data-driven model
  (Loc/LocList, Quest/Skill/Artifact/EasterEgg, reducer/selectors, decision missions), the
  Next 16 route/load contract (ssr:false dynamic import must be in a client component;
  robots noindex), and the documented pitfalls (first-person readability, pointer-lock
  untestable in headless browsers, per-frame React state thrash, R3F lint friction).

## 3. Reasoning against project rules

- DNB positioning: the plan presents Stian as an AI-first builder with system understanding.
  The skill is concrete ("Grunnleggende programmering"), framed as an honest foundation, not a
  CS degree or expert level, and distributed systems stay a growth direction (the agentic
  mission, deferred, makes "rebuild as a distributed platform, deploy to prod, no review" the
  WRONG answer).
- Claim boundaries as a first-class, reusable feature: per-artifact boundary strings, a
  pack-level claims.deny list, and an optional dev "claim lint". This carries the
  DNB_CLAIM_SOURCE_MAP / DNB_QA_CHECKLIST discipline into the game data itself.
- Content decisions honored: learning is the implicit theme, not a skill; no "learning drive"
  skill; workshop is never called Klarlab; the Workshop chain starts at OsloMet; Kari is an
  OsloMet reference-person/former fellow student; school has main + (later) workshop entrance;
  the egg gets only the single unreadable-text line; signposts give direction, not the
  metaphor; spelling is "Ordkryss" (guarded against "Ordryss").
- Cost / dependency control: exactly one new runtime dependency proposed (phaser), flagged for
  explicit approval per AGENTS.md; maps authored offline in Tiled; no state/audio/ECS libs;
  engine kept out of the portfolio bundle.
- Agent role discipline: planning only; no code, no deps installed, no commit, no push, no
  branch merges; 3D branch read-only.
- Privacy: no PII, no participant/school names, no national ID, no medical/psychological
  framing anywhere in the docs or planned game text.

## 4. Files created, modified, moved, deleted (full relative paths)

Created (docs/skamlos/):
- docs/skamlos/SKAMLOS_2D_RPG_IMPLEMENTATION_BRIEF.md — first-slice implementation plan:
  Phaser-3 recommendation + alternatives, single-dependency policy, Next 16 three-layer
  client-only route, file structure (engine vs content pack), the engine-level data model
  subset, controls/camera/feel, acceptance criteria, claim safety, what-not-to-build, build
  order, risks.
- docs/skamlos/SKAMLOS_APPLICATION_RPG_FRAMEWORK.md — the reusable framework: engine-vs-pack
  table, content-pack concept and authoring workflow, the nine swap axes, full TypeScript
  schemas (Requirement, MapDef/Exit/GateRef, Npc, Interactable, Quest, Skill, Artifact,
  MinigameDef union, EndgameDef, ClaimPolicy, SaveState, ContentPack), claim-boundary-as-data,
  safe minigame host, React/Phaser bridge, multi-pack routing, non-goals.
- docs/skamlos/SKAMLOS_2D_RPG_WORLD_MAP.md — worldmap v1 ASCII, tile/Tiled conventions,
  building lock-state table, interiors (classroom + home built in v1; others deferred), NPC
  placement table, natural barriers (no invisible walls), signpost/navigation state machine,
  visual style notes, map authoring checklist.
- docs/skamlos/SKAMLOS_2D_RPG_PROLOGUE_SLICE.md — step-by-step storyboard (start screen →
  classroom → bell → town → home/PC → Ordkryss for-loop + git commit minigames → reward →
  OsloMet pointer), a Mermaid flow diagram, per-beat acceptance table, and a claim-safe
  Norwegian text bank.
- docs/skamlos/SKAMLOS_IMPLEMENTATION_LOG.md — running continuity log with this session's
  entry, key decisions, lessons carried from the 3D branch, and open TODOs for the next agent.

Created (docs/reports/):
- docs/reports/2026-06-30-skamlos-2d-rpg-planning-report.md — this report.

Modified:
- FILE_TREE.md — added the docs/skamlos/ folder (existing design brief + 5 new docs) and the
  new report under docs/reports/, with corrected tree connectors.

Moved / renamed / deleted: none.

## 5. What was delivered

A complete planning layer that lets a fresh agent build the first playable top-down 2D RPG
slice without chat history:

- A clear tech recommendation: Phaser 3 (primary) with Excalibur.js as the documented
  fallback; React+Canvas and Pixi explicitly rejected with reasons; three.js/R3F out (this is
  the pivot away from 3D).
- A concrete Next 16 integration contract (three-layer client-only route at /skamlos-rpg,
  robots noindex), reusing the pattern already verified on the 3D branch in this repo.
- A clean engine/content split so the same engine renders many application games; the
  DNB/Skamløs story is the first swappable content pack; nine swap axes documented.
- Full, reusable TypeScript schemas for maps, exits/gates, NPCs, interactables, quests,
  skills, artifacts, minigames, endgame, claim policy and save state.
- A readable worldmap v1 with explicit lock states and "no invisible walls" barriers.
- A shot-by-shot prologue storyboard with a claim-safe Norwegian text bank and acceptance
  criteria.
- Claim safety promoted to a reusable engine feature (per-item boundaries + deny list + dev
  claim lint).
- A running implementation log and an updated FILE_TREE.md.

## 6. Claim and risk QA

- No senior/distributed-systems or platform-scale mastery claimed; kept as growth direction.
- No pure-UX-only and no prompt-user-only framing; AI-first builder with system understanding.
- Grunnleggende programmering framed as honest foundation, not a CS degree / expert level.
- Klar (in deferred chain) still framed as a robust prototype evaluated with teachers — no
  student-outcome and no enterprise-scale claims; this is documented for the deferred work.
- No DNB logos/palette/official branding; DNB building is a clearly symbolic, locked goal.
- Egg easter egg limited to the single sanctioned line; signposts give direction only.
- No private/medical/psychological framing; no PII (no national ID, no participant/school
  names) anywhere.
- External links: only the user-provided public Ordkryss video URL is hard-stated; the CS50x
  certificate URL is left as a TODO for the user (do not invent). Contact values reference the
  existing canonical source rather than being re-invented.
- Open claim nuance flagged for the implementer: the user-specified skill log lists Django
  under Grunnleggende programmering, but CS50x itself covered Flask, not Django (Django comes
  from the later predecessor prototype). The docs honor the user's list but require honest
  framing ("foundation spans these across CS50x and early projects"), never "CS50x taught me
  Django."

## 7. Validation performed

- Command run: git status --untracked-files=all. Output:

      On branch feature/skamlos-2d-rpg-planning
      Your branch is up to date with 'origin/feature/skamlos-2d-rpg-planning'.
      Changes not staged for commit:
        modified:   FILE_TREE.md
      Untracked files:
        docs/skamlos/SKAMLOS_2D_RPG_IMPLEMENTATION_BRIEF.md
        docs/skamlos/SKAMLOS_2D_RPG_PROLOGUE_SLICE.md
        docs/skamlos/SKAMLOS_2D_RPG_WORLD_MAP.md
        docs/skamlos/SKAMLOS_APPLICATION_RPG_FRAMEWORK.md
        docs/skamlos/SKAMLOS_IMPLEMENTATION_LOG.md
      no changes added to commit

  (The report file at docs/reports/2026-06-30-skamlos-2d-rpg-planning-report.md is created
  after this command and is an additional untracked file.)
- git branch verification: current branch feature/skamlos-2d-rpg-planning; the 3D branch
  origin/feature/skamlos-pitch-game was only read via git ls-tree / git show.
- No build/lint run: documentation-only change; no app code, config, or dependencies touched
  (consistent with copilot-instructions and the task's validation note).

## 8. File tree / path updates

FILE_TREE.md updated: yes.
- Added docs/skamlos/ (SKAMLOS_2D_RPG_GAME_DESIGN_BRIEF.md existing; plus the 5 new docs).
- Added docs/reports/2026-06-30-skamlos-2d-rpg-planning-report.md.
- Corrected tree connectors for the reports/ and skamlos/ subtrees.
Observation (pre-existing, not changed): FILE_TREE.md still lists docs/AI_PITCH_LOG.md and
docs/epics/EPIC_SKAMLOS_AI_PITCH.md, which are not present in the working tree. This drift
pre-dates this session; left untouched to keep the change scoped — flagged here for the tech
lead to reconcile separately.

## 9. Git / commit status

- Committed: no (no commit was requested; AGENTS.md forbids auto-commit).
- Pushed: no.
- Branch: feature/skamlos-2d-rpg-planning, up to date with its origin remote (the new
  working-tree changes are local and uncommitted).
- Merges/cherry-picks: none. No interaction with master / VG X.

## 10. Risks, uncertainties, and follow-up

- Dependency approval needed: the implementation pass needs phaser (one runtime dep) approved,
  or a switch to the Excalibur.js fallback. Without it, only a heavier zero-dep custom canvas
  path remains.
- Next 16 API drift: implementer must confirm dynamic-import/metadata/client-component APIs
  against node_modules/next/dist/docs/ before coding.
- CS50x certificate URL is an open TODO (must be user-supplied; do not invent).
- Asset sourcing: original or CC0/CC-BY tiles/sprites required; attributions to be logged.
- Django-in-skill-log nuance must be framed honestly (see section 6).
- Minigame security: the for-loop challenge must not eval arbitrary user input; use
  fill-in-the-blank / whitelisted checking.
- FILE_TREE pre-existing drift (AI_PITCH_LOG.md, epics/) noted for separate reconciliation.

## 11. Recommended next step

Approve adding phaser as the single new dependency, then issue the implementation prompt for
the prologue slice using docs/skamlos/SKAMLOS_2D_RPG_IMPLEMENTATION_BRIEF.md (sections 1–5 and
the build order in section 8), docs/skamlos/SKAMLOS_2D_RPG_PROLOGUE_SLICE.md (storyboard +
acceptance), and docs/skamlos/SKAMLOS_2D_RPG_WORLD_MAP.md (maps + lock states), with the
engine/content split from docs/skamlos/SKAMLOS_APPLICATION_RPG_FRAMEWORK.md. Scope that pass to
the classroom → home → Ordkryss → reward → OsloMet-pointer slice only, and keep the OsloMet /
Workshop / master / DNB chains deferred.
