# DNB Hero Portrait + Layout / Gamification / UX Refinement — Report

## 0. User prompt

You are working in the existing `portfolio-site` repository on branch `feature/dnb-opus-full-page-buildout`. Do one disciplined refinement pass on the DNB AI-First Engineering page. Do not touch VG X / master. Do not build or modify the Skamløs pitch/game. Do not change deployment. Do not add dependencies unless absolutely necessary and clearly justified. Do not commit. Do not push.

Goals: (1) add a tasteful portrait of Stian to the hero (existing `public` image named `stian`; crop to a bust, crop out the raised hand/horns, keep it calm and technical, do not let it dominate; portrait may sit beside the text on desktop and must stack/scale on mobile); (2) fix cramped/squeezed layout with restrained CSS; (3) correct the gamification wording so it reflects that the teacher decides whether such support is enabled (optional support, enabled/configured by the teacher, support without pressure), in NO and EN; (4) one more de-AI language pass; (5) one more UX consistency pass for cards, links, hover/focus, and clickable areas — whole-card clickable where a card has a link, and Klar and Lori Frisør should expose repo access, avoiding clutter. Inspect the page and relevant docs; run lint, build, and visual QA (desktop, ~390px mobile, NO, EN). Update the implementation log and FILE_TREE, save a report, and return exactly one detailed Markdown report in one fenced block.

## 1. Session context

- Branch: feature/dnb-opus-full-page-buildout
- Task type: code + UI + copy refinement, plus a derived image asset and doc upkeep
- VG X protected: yes — no master/VG X files, `app/data/portfolio.ts`, or Skamløs files were touched
- No dependencies added (sharp was already present locally and is only used by a build script); no deployment change; not committed; not pushed

## 2. Files and sources read — why each mattered

- public/images/stian.jpg — the source photo; confirmed it is the full-body shot with the raised-hand gesture that had to be cropped out
- scripts/build-avatar.mjs — existing sharp pattern and the source crop geometry (EXIF-oriented 3024×4032); reused as the model for the new portrait script
- app/components/DnbHero.tsx / .module.css — to add the portrait and a two-column layout
- app/components/DnbMethod.tsx — located and corrected the gamification wording (NO line and EN line)
- app/components/DnbWorkflow.tsx / .module.css — card structure for the whole-card-clickable + repo-access change
- app/components/DnbKlar.tsx, DnbCapacity.tsx, DnbContact.tsx, globals.css, Shared.module.css — to audit copy, spacing tokens, and focus conventions
- https://github.com/stianglomsrod?tab=repositories — verified `klar` and `lori-frisor` are public before linking them
- DNB_CLAIM_SOURCE_MAP.md / DNB_IMPLEMENTATION_LOG.md — claim boundaries and log continuity

## 3. Reasoning against project rules

- Positioning: portrait is calm and personal, not corporate stock; copy keeps Stian as an AI-first builder, growth framed as direction. No senior/expert claim added.
- Claim boundaries: gamification correction stays within the documented boundary (teacher-controlled, optional, no student-outcome claim). Repo links point only to verified public repos.
- Cost/scope: restrained CSS, reused the existing sharp pattern, no redesign, no new runtime dependency.
- Agent discipline: VG X and Skamløs untouched; nothing committed or pushed.

## 4. Files created, modified, moved, deleted

Created:

- scripts/build-hero-portrait.mjs — sharp crop script (source crop box left:1080, top:150, width:1340, height:1620; output 760px-wide WebP, slightly muted)
- public/images/avatar/stian-portrait.webp — 760×919 derived head-and-shoulders portrait (committed; referenced by the hero)
- docs/reports/2026-06-22-dnb-hero-portrait-ux-refinement-report.md — this report

Modified:

- app/components/DnbHero.tsx — `next/image` portrait + bilingual `portraitAlt`; copy/portrait two-column layout
- app/components/DnbHero.module.css — `.layout` grid, `.copy`, framed `.portrait` with subtle vignette, `.portraitImg`; ≤860px stacks a smaller portrait above the name
- app/components/DnbMethod.tsx — gamification decision corrected (NO + EN)
- app/components/DnbWorkflow.tsx — cards restructured: stretched primary link + optional secondary repo chip; Klar and Lori repos exposed; `repoAria`
- app/components/DnbWorkflow.module.css — `.card` relative container, stretched `.cardLink::after`, `.cardLinks`, `.cardRepo`, `:has()` focus ring
- app/components/DnbCapacity.tsx — de-AI'd growth lede (NO + EN)
- docs/dnb/DNB_IMPLEMENTATION_LOG.md — new dated entry
- FILE_TREE.md — added portrait asset, build script, this report

Deleted / moved: none.

## 5. What was delivered

- Hero portrait: a calm head-and-shoulders bust of Stian beside the copy on desktop (vertically centred, framed with a soft vignette) and stacked above the name at a smaller size on mobile. The raised hand / horns gesture is fully cropped out.
- Layout: the hero is now a balanced two-column grid; copy column has `min-width: 0` so long lines wrap cleanly; the portrait collapses gracefully at ≤860px.
- Gamification correctness (NO + EN): "Game elements are optional support, off by default. The teacher decides whether they suit a student and turns them on." / "Spillelementer er valgfri støtte som er av som standard. Læreren vurderer om de passer for eleven, og slår dem på." Removed the previous "the student chooses" / "Eleven velger selv".
- De-AI: removed the "this is direction, not a claim of senior experience" / "Dette er retning, ikke en påstand…" formula in the capacity growth lede, keeping it honest as a growth path.
- UX consistency: every project card is clickable as a whole via a stretched primary link; Klar and Lori now expose their public GitHub repos through a small secondary chip layered above the stretched link (no nested interactive elements); keyboard focus rings the whole card.

## 6. Claim and risk QA

- No senior / distributed-systems / platform / expert claim. CS50x not a degree (unchanged). pd-app/Klar boundaries unchanged. Gamification: teacher-controlled, optional, no student-tested effect claimed. No private/medical framing. No DNB-official branding. Repo links verified public. Skamløs and VG X/master untouched.

## 7. Validation performed

- npm run lint — clean.
- npm run build — succeeds (Next.js 16.2.9 Turbopack; "/" prerendered static).
- get_errors on edited TSX — none.
- Visual QA on localhost:3000 (Playwright, viewport set explicitly to work around the integrated browser reporting width 0):
  - 1280px desktop, EN and NO: hero balanced, portrait framed, hand cropped out.
  - 390px mobile: portrait stacks above the name at ~180px, copy below; project cards single-column.
  - Project cards: Klar → klar-sigma + repo github.com/stianglomsrod/klar; Companion → repo nikkoprogging (single link); Lori → lori-frisor + repo github.com/stianglomsrod/lori-frisor.
  - Gamification wording confirmed corrected in both NO and EN.
  - NO/EN toggle flips document.lang and all copy; portrait alt text switches language.
  - Console: the transient portrait preload warning was removed by dropping `priority` (only Next.js default font preload warnings remain).
- git status: listed in section 9.

## 8. File tree / path updates

FILE_TREE.md updated: yes — added public/images/avatar/stian-portrait.webp, scripts/build-hero-portrait.mjs, and docs/reports/2026-06-22-dnb-hero-portrait-ux-refinement-report.md. The committed portrait WebP is a site asset (referenced by next/image), so unlike the gitignored CS50x.pdf it belongs in the repo.

## 9. Git / commit status

Not committed, not pushed. Branch feature/dnb-opus-full-page-buildout, tracking origin. Working tree (this pass plus the prior uncommitted polish pass):
M FILE_TREE.md
M app/components/DnbCapacity.module.css
M app/components/DnbCapacity.tsx
M app/components/DnbHero.module.css
M app/components/DnbHero.tsx
M app/components/DnbKlar.tsx
M app/components/DnbMethod.tsx
M app/components/DnbWorkflow.module.css
M app/components/DnbWorkflow.tsx
M app/page.tsx
M docs/dnb/DNB_CLAIM_SOURCE_MAP.md
M docs/dnb/DNB_IMPLEMENTATION_LOG.md
?? docs/reports/2026-06-22-dnb-hero-portrait-ux-refinement-report.md
?? docs/reports/2026-06-22-dnb-programming-learning-ux-pass-report.md
?? public/images/avatar/stian-portrait.webp
?? scripts/build-hero-portrait.mjs

## 10. Risks, uncertainties, and open questions

- The portrait shows a small wall label/sticker in the background; it is subtle but present. If undesired, the crop box in scripts/build-hero-portrait.mjs can be tightened.
- `object-position: 50% 18%` frames the face well for this photo; if the source photo changes, re-run the script and re-check framing.
- The `:has()` focus selector for the card ring relies on an evergreen browser (the project already uses color-mix and text-wrap, so this is consistent).
- "Repo" chip label is intentionally terse; confirm the wording reads clearly enough for Stian.
- EN tone for the refined growth lede could use a native-speaker glance.

## 11. Recommended next step

Have Stian eyeball the hero portrait framing (and the background label) and the Klar/Lori "Repo" chips, then commit this pass together with the prior uncommitted polish pass on the branch.
