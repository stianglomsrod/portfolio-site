# FILE_TREE.md — Portfolio Site

> Purpose: Compact project file tree for onboarding ChatGPT, Codex, Copilot, and future agents. Update this file whenever files are created, deleted, moved, renamed, or structurally reorganized.

## Maintenance rule

Any future agent that creates, deletes, moves, renames, or meaningfully reorganizes files must update this file in the same session and report the changed paths in the final summary.

## Full repo tree

Excludes: `node_modules/`, `.next/`, `.git/`, `dist/`, `build/`, coverage output, OS/editor cache files.

```text
portfolio-site/
├── .github/
│   └── copilot-instructions.md
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── DEPLOYMENT.md
├── FILE_TREE.md
├── README.md
├── README_COPY_INSTRUCTIONS.md
├── STIAN_VOICE_PROFILE.md
├── agent-prompt-ux-humanize.md
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── tsconfig.json
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── components/
│   │   ├── AgenticWorkflow.module.css
│   │   ├── AgenticWorkflow.tsx
│   │   ├── CaseCard.module.css
│   │   ├── CaseCard.tsx
│   │   ├── CaseLink.tsx
│   │   ├── CaseScreenshotGallery.tsx
│   │   ├── DnbCapacity.module.css      (DNB variant only)
│   │   ├── DnbCapacity.tsx             (DNB variant only)
│   │   ├── DnbContact.module.css       (DNB variant only)
│   │   ├── DnbContact.tsx              (DNB variant only)
│   │   ├── DnbHero.module.css          (DNB variant only)
│   │   ├── DnbHero.tsx                 (DNB variant only)
│   │   ├── DnbKlar.module.css          (DNB variant only)
│   │   ├── DnbKlar.tsx                 (DNB variant only)
│   │   ├── DnbMethod.module.css        (DNB variant only)
│   │   ├── DnbMethod.tsx               (DNB variant only)
│   │   ├── DnbWorkflow.module.css      (DNB variant only)
│   │   ├── DnbWorkflow.tsx             (DNB variant only)
│   │   ├── FeaturedKlar.module.css
│   │   ├── FeaturedKlar.tsx
│   │   ├── FitScan.module.css
│   │   ├── FitScan.tsx
│   │   ├── Hero.module.css
│   │   ├── Hero.tsx
│   │   ├── ImageLightbox.module.css
│   │   ├── ImageLightbox.tsx
│   │   ├── JourneyTimeline.module.css
│   │   ├── JourneyTimeline.tsx
│   │   ├── LanguageContext.tsx         (DNB variant only — NO/EN store + provider)
│   │   ├── LanguageToggle.module.css   (DNB variant only)
│   │   ├── LanguageToggle.tsx          (DNB variant only — NO/EN switch)
│   │   ├── ModeToggle.module.css
│   │   ├── ModeToggle.tsx
│   │   ├── Portfolio.module.css
│   │   ├── Portfolio.tsx
│   │   ├── Reveal.module.css
│   │   ├── Reveal.tsx
│   │   ├── ScreenshotPlaceholder.tsx
│   │   ├── Shared.module.css
│   │   ├── SiteFooter.module.css
│   │   ├── SiteFooter.tsx
│   │   ├── SkamlosWorld.module.css
│   │   ├── SkamlosWorld.tsx
│   │   ├── SupportingCases.module.css
│   │   ├── SupportingCases.tsx
│   │   ├── caseScreenshotData.ts
│   │   └── skamlos/
│   │       └── worldGyms.ts
│   ├── data/
│   │   └── portfolio.ts
│   └── skamlos-pitch/                   (DNB variant only — playable 3D first-person pitch, /skamlos-pitch)
│       ├── page.tsx                     server component, exports metadata (robots: noindex)
│       ├── SkamlosPitchClient.tsx       'use client' wrapper: WebGL probe + dynamic import (ssr:false)
│       ├── skamlos-pitch.module.css     HUD / modals / panels / start / endgame / fallback styling
│       └── game/
│           ├── Game.tsx                 orchestrator: state, Canvas, keyboard, pointer-lock, overlay routing
│           ├── i18n.ts                  all UI chrome strings (NO/EN) + CONTACT details
│           ├── data/                    data-driven content (single source of truth)
│           │   ├── skills.ts            SKILLS[] + SKILL_BY_ID
│           │   ├── artifacts.ts         ARTIFACTS[] + ARTIFACT_BY_ID (honest claim boundaries)
│           │   ├── quests.ts            QUESTS[] + QUEST_BY_ID (chain, gates, missions)
│           │   ├── easterEggs.ts        EASTER_EGGS[] + EGG_BY_ID
│           │   └── world.ts             tuning constants + DNB_GATE + GATE_CHECKS
│           ├── state/
│           │   ├── types.ts             shared game types
│           │   ├── gameReducer.ts       reducer + pure selectors
│           │   └── GameContext.tsx      useGameController() / useGame()
│           ├── world/                   react-three-fiber 3D scene
│           │   ├── placement.ts         derives artifact world positions (NOT layout.ts — reserved Next name)
│           │   ├── Scene.tsx            composes world + PointerLockControls
│           │   ├── Player.tsx           first-person controller (movement, head-bob, interaction scan)
│           │   ├── Decor.tsx            ground grid, sparkles, perimeter pillars
│           │   ├── Zone.tsx             quest platform/monolith + label
│           │   ├── ArtifactPickup.tsx   floating evidence pickup
│           │   ├── EasterEggs.tsx       flutterfly / egg / duck pickups
│           │   ├── DnbGate.tsx          final gate (opens on signature skills)
│           │   └── world.module.css     in-world Html label styling
│           └── ui/                      DOM overlay (HUD + modals + panels + screens)
│               ├── LangToggle.tsx
│               ├── StartScreen.tsx
│               ├── Hud.tsx
│               ├── QuestLog.tsx
│               ├── SkillTree.tsx
│               ├── QuestModal.tsx       includes the decision-mission flow
│               ├── ArtifactModal.tsx
│               ├── EggModal.tsx
│               ├── GateLockedModal.tsx
│               ├── Endgame.tsx
│               └── Fallback.tsx         accessible no-WebGL text version
├── docs/
│   ├── AI_PITCH_LOG.md
│   ├── context/
│   │   ├── 2026-06-19-agent-context-pack.zip
│   │   └── 2026-06-19-agent-context-pack/
│   │       ├── 01_BRIEF_MAAL_OG_RAMMER.md
│   │       ├── 02_SKILLS_OG_BEVIS.md
│   │       ├── 03_AGENTISK_UX_OG_FELTNOTAT.md
│   │       └── 04_STARTPROMPT_NY_AGENT.md
│   ├── dnb/
│   │   ├── DNB_AGENT_HANDOFF_PROTOCOL.md
│   │   ├── DNB_AGENT_ONBOARDING_INDEX.md
│   │   ├── DNB_CLAIM_SOURCE_MAP.md
│   │   ├── DNB_CROSS_REPO_EVIDENCE.md
│   │   ├── DNB_CONTENT_OUTLINE.md
│   │   ├── DNB_COST_CONTROL.md
│   │   ├── DNB_IMPLEMENTATION_BRIEF_FOR_AUTO.md
│   │   ├── DNB_IMPLEMENTATION_LOG.md
│   │   ├── DNB_INSIGHT_SYNTHESIS.md
│   │   ├── DNB_JOB_POSTING.md
│   │   ├── DNB_POSITIONING.md
│   │   ├── DNB_PORTFOLIO_STRATEGY.md
│   │   ├── DNB_QA_CHECKLIST.md
│   │   ├── DNB_SECTION_COPY_V1.md
│   │   ├── DNB_SOURCE_EVIDENCE_NOTES.md
│   │   ├── DNB_WORKFLOW_DNA.md
│   │   └── sources/        (gitignored, local-only raw sources: thesis.pdf, diploma PDF [contains PII], exam prep .md — never committed)
│   ├── epics/
│   │   └── EPIC_SKAMLOS_AI_PITCH.md
│   ├── reports/
│   │   ├── 2026-06-19-bootstrap-cleanup-report.md
│   │   ├── 2026-06-19-report-format-hardening.md
│   │   ├── 2026-06-20-source-synthesis-posting-report.md
│   │   ├── 2026-06-22-dnb-cross-repo-evidence-synthesis-report.md
│   │   ├── 2026-06-22-dnb-deai-bilingual-redundancy-report.md
│   │   ├── 2026-06-22-dnb-opus-full-page-buildout-report.md
│   │   ├── 2026-06-22-dnb-programming-learning-ux-pass-report.md
│   │   ├── 2026-06-22-dnb-hero-portrait-ux-refinement-report.md
│   │   ├── 2026-06-22-dnb-final-copy-label-fix-report.md
│   │   ├── 2026-06-22-skamlos-pitch-game-report.md
│   │   └── UX_UI_COPY_REVIEW.md
│   └── skamlos/                          (DNB variant only — playable pitch design docs)
│       ├── IMPLEMENTATION_BRIEF.md
│       ├── SKAMLOS_GAME_DNA.md
│       └── QUEST_AND_SKILL_TREE.md
├── public/
│   └── images/
│       ├── avatar/
│       │   ├── stian-face.png
│       │   └── stian-portrait.webp
│       └── cases/
│           ├── klar/           (7 screenshots)
│           └── supporting/     (3 screenshots)
└── scripts/
    ├── build-avatar.mjs
    └── build-hero-portrait.mjs
```
