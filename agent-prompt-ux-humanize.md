# Agent prompt: Humanize portfolio copy, run full UX/UI review, implement improvements

You are working in Stian Glomsrød’s `portfolio-site` project.

This pass can be broad and thorough. Use strong judgment. The goal is not only to polish text, but to make the entire portfolio feel more human, credible, usable, and aligned with Stian’s actual voice and the VG X / Schibsted application context.

## Important context

Read the project first. Inspect the existing file structure, routes, components, content files, docs, and any existing logs/reports before changing code.

Also read this file if present:

- `STIAN_VOICE_PROFILE.md`

Treat it as a voice/style guide for Stian’s writing, not as page content.

If the file is not present, create it from the provided profile before proceeding, then use it as a guide.

## Main goals

1. Scan the site for AI-markers in all visible copy.
2. Rewrite text so it feels more human, specific, credible, and closer to Stian’s voice.
3. Preserve factual accuracy and avoid overclaiming.
4. Run a full UX/UI review of the entire site, including:
   - professional portfolio mode
   - Skamløs AI-pitch mode
   - the playable/game interface
   - case pages/sections
   - navigation
   - CTAs
   - screenshots/lightboxes
   - responsive behavior
   - keyboard behavior
   - accessibility basics
5. Implement improvements, not only report them.
6. Run the site locally and inspect it visually.
7. Use browser automation/manual clicking/screenshots to test the real experience.
8. Programmatically verify the result.
9. Iterate until the site is meaningfully better.

## Product positioning

The site has two modes:

- Professional mode: safe, clear, sendable portfolio/application site.
- Skamløs AI-pitch mode: experimental, playful, game-first application experience.

Professional mode must stay credible and easy to understand for someone evaluating Stian for a UX/product/AI-adjacent role.

Skamløs mode can be playful and a little shameless, but it must still communicate real evidence and competence. It should not become confusing, noisy, or self-indulgent.

## Voice and copy requirements

Use `STIAN_VOICE_PROFILE.md` as your main guide.

Actively remove or reduce copy that sounds like generic AI output, including:

- “innovative”
- “seamless”
- “robust” when used vaguely
- “transformative”
- “cutting-edge”
- “leveraging”
- “unlock potential”
- generic “passionate about” phrasing
- vague claims with no artifact, example, or evidence
- repetitive three-part marketing sentences
- exaggerated certainty about prototype impact
- “not only X, but Y” overuse
- consultant-brochure language

Prefer copy that is:

- specific
- grounded
- reflective
- slightly personal where appropriate
- direct
- honest about prototypes and learning
- tied to visible evidence

Do not invent new achievements, test results, user numbers, employment history, or production maturity.

## UX/UI review requirements

Create a report in the project, for example:

- `docs/reports/UX_UI_COPY_REVIEW.md`

The report should cover at least:

1. Overall information architecture
2. First impression / hero clarity
3. Professional mode UX
4. Skamløs AI-pitch UX
5. Game/playable-world UX
6. Case presentation UX
7. Copy tone and AI-marker audit
8. Visual hierarchy
9. Navigation and orientation
10. Accessibility and keyboard use
11. Mobile/responsive behavior
12. Performance or implementation concerns if discovered
13. Prioritized fixes implemented
14. Remaining issues/tradeoffs

Be concrete. Include examples before/after where useful.

## Implementation expectations

After reviewing, implement the improvements you judge most important.

Likely areas to inspect and improve:

- headings and subheadings
- hero copy
- case summaries
- project descriptions
- CTA labels
- demo access notes
- modal/lightbox copy
- Skamløs game instructions
- journal/side-panel text
- gym/landmark text
- VG X portal/contact text
- accessibility labels
- empty/error/help states
- duplicated or overly long sections
- mobile layout and interaction clarity

Keep the structure that is already working. Do not rewrite the whole app unless necessary.

Preserve:

- the two-mode concept
- Professional mode as safe/sendable
- Skamløs AI-pitch as playful/game-first
- Klar as a major case/landmark
- VG X as “next arena” rather than “job unlocked”
- image lightbox behavior if implemented
- demo links and demo access notes
- keyboard accessibility in the game

Do not:

- remove important evidence
- bury the portfolio behind the game
- make Skamløs mode a duplicate long-scroll portfolio
- add unnecessary dependencies unless clearly justified
- introduce secrets into committed files
- hardcode private credentials into public UI
- over-polish Stian into a generic corporate applicant

## Visual/browser QA requirements

You are allowed and expected to run the site locally, open it in a browser, click around, use keyboard controls, and take screenshots.

Start the dev server, for example:

- `npm run dev`
- or the project’s documented equivalent

Then inspect the live site in a browser. Use browser automation if available, for example Playwright, MCP/browser tools, DevTools, or any available screenshot/clicking tool. If browser automation is not available, perform the closest possible manual/visual checks and say what you could not verify.

Capture screenshots as useful evidence for your own review and mention them in the report. Save screenshots in a sensible temporary/report location if the project conventions allow it, for example:

- `docs/reports/screenshots/`

Do not commit huge/unnecessary screenshot dumps. Keep only screenshots that help document meaningful UX findings or before/after improvements.

Check at least these real interactions:

### Desktop professional mode

- Load the homepage.
- Check that the hero explains who Stian is and why he is relevant quickly.
- Click main navigation items.
- Open case sections/pages.
- Open external prototype/demo links where safe.
- Open screenshot lightboxes/carousels.
- Close overlays with Escape.
- Use keyboard Tab navigation.
- Check visible focus states.
- Check console for errors.

### Desktop Skamløs AI-pitch mode

- Switch into Skamløs AI-pitch mode.
- Confirm the mode is understandable as an experimental application experience.
- Confirm it does not duplicate long professional sections unnecessarily.
- Confirm the game/playable world remains the primary interface.
- Check that Klar is treated as its own major landmark.
- Check that VG X is framed as “next arena” / “next mission”, not “job unlocked”.
- Check journal, side panels, portals, overlays, and map/help controls if present.
- Check console for errors.

### Playable game controls

- Move with WASD and/or arrow keys.
- Interact with Space and/or E.
- Confirm focus remains in the game after interaction where appropriate.
- Confirm overlays do not trap the user incorrectly.
- Confirm Escape closes overlays.
- Confirm the user can recover orientation after interacting.
- Confirm game text is not too long/heavy for the interaction.
- Confirm important evidence is reachable without requiring obscure controls.

### Lightbox/image interactions

- Click screenshots.
- Check that the enlarged image is readable.
- Check previous/next controls.
- Check Escape close.
- Check focus restoration after close.
- Check mobile behavior if relevant.

### Mobile/narrow viewport

Use browser viewport tools or responsive mode. Test at least one phone-like width.

Check:

- hero readability
- nav/menu behavior
- case card layout
- screenshot/lightbox behavior
- Skamløs mode fallback or playability
- whether game instructions and controls make sense on small screens

## Programmatic QA

Run appropriate commands, likely including:

- `npm run lint`
- `npm run build`
- any existing tests
- type checking if available
- formatting if configured

Also consider:

- searching the codebase for AI-marker phrases after editing
- checking for console errors during browser QA
- checking accessibility basics with available tools if the project has them

If you find issues, fix them and repeat the relevant checks.

## Iteration rule

Do not stop after the first pass if obvious problems remain. Iterate until:

- the most important copy no longer sounds AI-generated
- the professional mode is clearer and more credible
- Skamløs mode is more usable and less text-heavy/confusing
- major UX issues found during review are either fixed or explicitly documented as remaining tradeoffs
- browser QA has been performed on the actual running site
- lint/build/tests are green, or any failure is clearly explained with cause and next step

## Documentation requirements

Update or create documentation as needed:

- `docs/reports/UX_UI_COPY_REVIEW.md`
- update any existing AI pitch / project log if the project has one, for example `docs/AI_PITCH_LOG.md`
- update relevant README/docs only if your changes affect how the project is run or understood

## Final agent report

Return a concise but complete Markdown report with:

1. Summary of what changed
2. Copy/voice improvements made
3. Examples of AI-markers removed or rewritten
4. UX/UI improvements made
5. Skamløs/game-specific improvements made
6. Browser/visual QA performed, including screenshots taken if applicable
7. Programmatic commands run and results
8. Files changed
9. Remaining issues/tradeoffs
10. Recommended next step

Be honest. If something could not be verified, say so.
