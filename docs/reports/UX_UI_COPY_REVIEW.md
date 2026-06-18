# UX/UI + Copy Review — portfolio-site

Date: 2026-06-18
Scope: full-site copy humanization (AI-marker audit) + UX/UI review of both
modes, with the highest-value fixes implemented. Guided by
[`STIAN_VOICE_PROFILE.md`](../../STIAN_VOICE_PROFILE.md).

Verdict up front: the site was already in good shape. The content layer
(`app/data/portfolio.ts`, `app/components/skamlos/worldGyms.ts`) is well-written,
factual, and largely free of AI-marker phrasing. This pass removed the few
remaining markers and closed two concrete UX gaps (a non-working contact email
and a visible placeholder string). No structural rewrite was needed or done.

---

## 1. Overall information architecture

Two modes, one source of truth:

- **Professional mode** (default): Hero → Klar (featured case) → supporting
  cases → agentic workflow → footer/contact. Linear, scannable, sendable.
- **Skamløs AI-pitch mode** (`mode === "agentic"`): Hero → playable world
  ("Stians verden") with a journal overlay (Reise / Bevis / VG X-match /
  Kontakt). Game-first, not a duplicated long-scroll.

The IA is sound and matches the profile constraints. No changes made here.

## 2. First impression / hero clarity

The professional H1 was a three-part noun-phrase list — the single clearest
AI-marker on the page — and the intro opened with the consultant tell
"i skjæringspunktet mellom …". Both rewritten (see §7). The hero now states who
Stian is (teacher + master) before what he does, which reads more human and
credible for a recruiter.

## 3. Professional mode UX

Clear and application-ready. Cases use a consistent problem → role → process →
artifact → relevance structure. Demo-access notes and external prototype links
are present and honest about prototype status. **Fix:** the contact footer
linked to `[email placeholder]` (rendered "E-post: kommer") — a real gap on a
job-application site. Wired to a working `mailto:` using the address already
published in the case copy.

## 4. Skamløs AI-pitch UX

Playful but coherent; it does not bury the portfolio. The journal exposes all
evidence as text (good progressive disclosure and a non-game path via `J`). The
"VG X as next arena, not job unlocked" framing is respected in copy and gym
data. **Fix:** the agentic-only footer/journal closing line was a visible
placeholder ("Plass reservert til en liten, lett AI-spøk …", `aria-hidden`).
Replaced with a real, on-brand line and made it accessible.

## 5. Game / playable-world UX

The world renders fully: HUD (progress + four energies), 7 trainable gyms + the
VG X portal, proximity popovers, an avatar, a touch D-pad for coarse pointers,
and an explicit controls line (`WASD/piler · Space · Esc · J · or click`). A
fallback sentence points keyboard-averse / recruiter users to professional mode.
Copy is concise and factual. No changes needed.

## 6. Case presentation UX

Screenshot galleries open an accessible lightbox (portal-based, centered,
click-outside + Esc to close, focus restoration). Verified earlier this session.
No copy issues found in case bodies.

## 7. Copy tone & AI-marker audit (before / after)

| Location | Before | After |
| --- | --- | --- |
| Professional H1 (`hero.professional.tagline`) | "Brukerinvolvert design, AI-native prototyping og praktisk teknologisk problemløsning" | "Jeg designer med brukere og bygger fungerende prototyper — med AI som en styrt del av arbeidet" |
| Professional intro | "Jeg arbeider i skjæringspunktet mellom brukerinnsikt, digital læringsdesign, AI-assistert prototyping og fungerende produktutvikling. …" | "Jeg er lærer med master i digital læringsdesign, og jobber nå med UX, AI-assistert prototyping og produktutvikling. …" |
| Agentic intro | "… og en sterk hånd på agentiske AI-workflows." | "… og mye praktisk erfaring med agentiske AI-workflows." |
| Workflow lead (`agenticWorkflow.text`) | "Min sterkeste AI-kompetanse ligger ikke bare i å bruke verktøyene, men i å utvikle robuste agentiske workflows: …" | "Det jeg er best på med AI er ikke å bruke verktøyene, men å bygge arbeidsflyter rundt dem: …" |
| Workflow heading | "Slik bygger jeg robuste AI-workflows" | "Slik bygger jeg AI-workflows jeg kan stole på" |
| Fit-scan evidence ×2 | "Robuste agentiske workflows …" / "Robuste AI-workflows …" | "Agentiske workflows …" / "Pålitelige AI-workflows …" |

Markers removed: three-part marketing list, "skjæringspunktet" opener, the
"sterk hånd" idiom, one "ikke bare X, men Y" construction, and repeated vague
"robust(e)". A full re-scan for `sømløs|innovativ|banebrytende|transformativ|
robust|leverage|seamless|skjæringspunkt|sterk hånd` returns clean.

## 8. Visual hierarchy

Unchanged — already clear (eyebrow → H1 → intro → CTAs; HUD above the world).

## 9. Navigation & orientation

Mode toggle is a labelled radio-style group with roving tabindex. Anchored CTAs
work. Journal `J` shortcut + on-screen controls keep the game navigable. No
changes.

## 10. Accessibility & keyboard

Strengths confirmed: `role="application"` world with an instructive label,
keyboard movement (WASD/arrows), Esc-to-close, focus restoration, progressbar
semantics, `prefers-reduced-motion` honored via an external store (no
setState-in-effect). **Fix:** the agentic closing line was `aria-hidden` while
being a placeholder; now it is real content and exposed to screen readers.

## 11. Mobile / responsive behavior

Responsive affordances exist (touch D-pad on coarse pointers; lightbox mobile
max-heights). **Not verified live:** I could not drive a resized/phone viewport
in this automation harness, so mobile remains a visual-inspection
recommendation rather than a confirmed pass.

## 12. Performance / implementation concerns

`npm run build` is clean and the route prerenders as static. No new
dependencies. No console errors on the healthy dev server (port 3007); the
WebSocket-refused errors seen mid-session were a stale dev server on port 3000,
not the app.

## 13. Prioritized fixes implemented

1. Removed AI-marker copy in both heroes + the workflow section (§7).
2. Working contact email (`mailto:`) in the professional footer and the agentic
   journal Kontakt tab.
3. Replaced the visible footer placeholder with a real, accessible closing line.

## 14. Remaining issues / tradeoffs

- LinkedIn / GitHub / CV footer links are still honest "kommer" placeholders —
  intentionally not invented. Fill these when URLs exist.
- Klar teacher/student demo credentials remain "by request" (unchanged).
- Mobile/narrow-viewport behavior not verified live (harness limitation).
- Live in-world keystroke gameplay and backdrop-close could not be driven by the
  click-automation (element-stability gate from `scroll-behavior: smooth` +
  Reveal transforms). The world was verified to render and navigate via journal.

## Browser QA performed (localhost:3007)

- Professional hero renders the new H1 + intro. ✅
- Footer email resolves to `mailto:stianglomsrod@gmail.com`. ✅
- Mode toggle switches to Skamløs; agentic hero shows the new intro. ✅
- Playable world renders (HUD, 7 gyms + VG X portal, controls, fallback). ✅
- Journal opens; tabs navigate; Kontakt shows the working email + new closing
  line. ✅

## Commands run

- `npm run lint` → pass (exit 0, no warnings).
- `npm run build` → pass (`/` prerendered static).
- AI-marker grep re-scan → clean.
