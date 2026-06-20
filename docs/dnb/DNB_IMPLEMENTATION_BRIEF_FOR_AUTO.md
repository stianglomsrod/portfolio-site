# DNB Implementation Brief for GitHub Copilot Auto

## Purpose

Turn the strategy (`DNB_PORTFOLIO_STRATEGY.md`) into small, safe, reviewable implementation chunks that cheaper GitHub Copilot Auto sessions can execute with low risk. Each chunk has a goal, likely files, acceptance criteria, validation, risks, and review gates.

Read first: `DNB_AGENT_ONBOARDING_INDEX.md`, `DNB_JOB_POSTING.md`, `DNB_INSIGHT_SYNTHESIS.md`, `DNB_PORTFOLIO_STRATEGY.md`, `DNB_CLAIM_SOURCE_MAP.md`, `DNB_SECTION_COPY_V1.md`.

---

## 0. Global rules for every chunk

- Preserve the VG X portfolio. Never edit VG X content/structure unless the chunk explicitly says so.
- Norwegian page copy. Use the approved wording in `DNB_SECTION_COPY_V1.md` with the softening edits from `DNB_CLAIM_SOURCE_MAP.md`.
- No claim may exceed its rating in `DNB_CLAIM_SOURCE_MAP.md`. When in doubt, soften.
- Reuse existing components (`Reveal`, `ImageLightbox`, `CaseCard`, `SiteFooter`, CSS-module patterns, `globals.css` tokens). Do not add dependencies without explicit approval.
- No DNB logos, official brand palette, or anything implying official DNB affiliation.
- Small chunks. One section or concern per chunk. Stop and report.
- Run `npm run lint` and `npm run build` when code changes; report results. Documentation-only chunks skip the build.
- Do not commit automatically. Do not push. Update `FILE_TREE.md` if files are added/moved.

---

## 1. Pre-implementation decision (human/ChatGPT, before any code)

Before chunk 2, the user/tech lead must confirm:

- **Routing model**: how the DNB variant is served (separate route, separate branch/deploy, or a mode toggle). Inspect `app/page.tsx`, `app/layout.tsx`, and `ModeToggle.tsx` before deciding. Do NOT assume.
- **Thesis topic phrasing**: public wording for the master project (recommend a brief, non-clinical phrasing decided by the user).
- **Safety specifics**: whether to name Sikt/GDPR on-page (recommend: general framing only).

Output: a one-paragraph decision note appended to `DNB_IMPLEMENTATION_LOG.md`. No code in this step.

---

## 2. Chunk: DNB page scaffold + Hero

- **Goal**: create the DNB page entry (route/component per the routing decision) with the Hero section only.
- **Likely files**: a new `app/` route or component + a CSS module; possibly a small addition to navigation. No VG X files.
- **Copy**: Hero from `DNB_SECTION_COPY_V1.md` §1, headline + subheadline + 3 proof bullets + one CTA.
- **Acceptance criteria**: renders on desktop and mobile; first screen states clearly what the page is; VG X route unchanged; no console errors.
- **Validation**: `npm run lint`, `npm run build`, local visual check of the new route.
- **Risks**: routing collision with VG X; over-styled hero. Keep restrained.
- **Screenshots needed?** Yes — hero on desktop + mobile.
- **Human/ChatGPT review?** Yes (routing + first impression).

## 3. Chunk: "How I build with AI" section (lead exhibit)

- **Goal**: the documented agentic workflow as a labelled sequence (context → requirements → human review → correction → QA → documentation → handoff → safety gates).
- **Copy**: `DNB_SECTION_COPY_V1.md` §2, with softened reuse wording ("designet for å kunne deles og læres av andre").
- **DNB hook**: connect to the posting's *enabler / force-multiplier* and *guardrails* themes — honestly, at Stian's scale.
- **Likely files**: new section component + CSS module; reuse `Reveal`.
- **Acceptance criteria**: scannable, not a wall of prose; no overclaim beyond claim map; mobile-friendly.
- **Validation**: lint, build, visual check.
- **Risks**: sounding boastful; implying enterprise-scale guardrails. Keep honest.
- **Screenshots needed?** Yes.
- **Human/ChatGPT review?** Yes (claims tone).

## 4. Chunk: "Klar as evidence" section + Smart Import + screenshots

- **Goal**: Klar system overview, then the Smart Import AI-decision story, with screenshots.
- **Copy**: `DNB_SECTION_COPY_V1.md` §3. Keep the non-enterprise-scale disclaimer. General safety framing only.
- **Assets**: existing screenshots in `public/images/cases/klar/`. Reuse `ImageLightbox`.
- **Acceptance criteria**: tech facts match `DNB_SOURCE_EVIDENCE_NOTES.md` §3–4 exactly (React/Next.js, Supabase/PostgreSQL, auth+RBAC, PWA, human-in-the-loop preview); no student-outcome claim; lightbox works.
- **Validation**: lint, build, visual check, link/lightbox check.
- **Risks**: overstating Klar as production platform; AI claims beyond preview-gate reality.
- **Screenshots needed?** Yes.
- **Human/ChatGPT review?** Yes (technical accuracy + claims).

## 5. Chunk: "From unclear needs to buildable systems" (method)

- **Goal**: participatory-design + design-science method, each insight landing on a technical decision.
- **Copy**: `DNB_SECTION_COPY_V1.md` §4. Plain language; no citation wall.
- **Acceptance criteria**: reads as engineering (needs → requirements → architecture), not pure UX; no academic jargon dump.
- **Validation**: lint, build, visual check.
- **Risks**: drifting into UX-only framing. Always end on a system/tech choice.
- **Screenshots needed?** Optional.
- **Human/ChatGPT review?** Yes (engineering-vs-UX balance).

## 6. Chunk: Learning velocity + Honest growth direction

- **Goal**: two sober sections.
- **Copy**: `DNB_SECTION_COPY_V1.md` §5–6, with the "vist rask overgang" softening (not "dokumentert overgang").
- **Acceptance criteria**: professional-capacity framing; no private/medical content; growth direction uses "motivert for / har lyst til å bygge", never "har erfaring med".
- **Validation**: lint, build, visual check.
- **Risks**: overclaiming current expertise; personal/medical drift.
- **Screenshots needed?** No.
- **Human/ChatGPT review?** Yes (claims discipline).

## 7. Chunk: Contact / CTA + optional proof section + final QA pass

- **Goal**: sober contact/CTA; optional "receipts" note; full `DNB_QA_CHECKLIST.md` pass.
- **Likely files**: reuse `SiteFooter`; small CTA component.
- **Acceptance criteria**: links work; no DNB branding; entire `DNB_QA_CHECKLIST.md` passes; VG X intact.
- **Validation**: lint, build, full-page desktop + mobile review, link check.
- **Risks**: broken links; brand-implying styling.
- **Screenshots needed?** Yes — full page.
- **Human/ChatGPT review?** Yes (final QA + claims sign-off).

---

## 8. Why this is Copilot-Auto-safe

- Copy is pre-written and pre-rated; the agent assembles, it does not invent claims.
- Each chunk is small, isolated from VG X, and independently verifiable.
- Acceptance criteria and the claim map make "done" objective.
- Human/ChatGPT review gates catch tone and accuracy before anything ships.

## 9. What still needs a human or stronger model

- The routing/serving decision (chunk 1).
- Final claims and tone sign-off per section.
- Any change touching VG X shared components.
- Any new dependency or non-trivial interaction beyond reusing existing components.
