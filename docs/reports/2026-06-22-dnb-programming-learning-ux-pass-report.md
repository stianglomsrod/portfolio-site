# DNB Programming-Learning Evidence + De-AI + Whole-Card UX Pass — Report

## 0. User prompt

Perform another focused DNB page polish pass, with three goals:

1. Language pass: Remove remaining obvious AI-writing markers and make the copy sound more natural, specific, and human.
2. Learning/programming evidence pass: Add a stronger but honest programming-learning narrative using CS50x, earlier Python/JS/Django/Vue work, and teaching-related programming experience.
3. UX consistency pass: Make cards, links, hover states, and clickable areas consistent across the whole DNB page.

Constraints: Do not build the Skamløs pitch / playable game. Do not redesign the whole page. Do not change deployment. Do not add dependencies unless absolutely necessary and explained. Do not commit automatically. Do not push.

Follow-up: "The cs50x.pdf should exist."

## 1. Session context

- Branch: feature/dnb-opus-full-page-buildout
- Task type: code + UI + copy polish (third DNB polish pass), plus doc upkeep
- VG X protected: yes — no VG X / master files, portfolio.ts, Skamløs (worldGyms.ts, SkamlosWorld) touched
- No new dependencies added; no deployment change; not committed; not pushed

## 2. Files and sources read — why each mattered

- app/components/DnbCapacity.tsx / .module.css — target for the new programming-learning block and de-AI of velocity copy
- app/components/DnbWorkflow.tsx / .module.css — de-AI of lede/steps/strip and whole-card link conversion + hover/focus
- app/components/DnbKlar.tsx — disclaimer de-AI while keeping the factual "med lærere, ikke elever" boundary
- app/components/DnbMethod.tsx — trim "ikke bare …" / "ikke en påstand" AI tells without losing meaningful design contrasts
- app/page.tsx — metadata description cleanup
- docs/dnb/DNB_CLAIM_SOURCE_MAP.md — CS50x verification status flip
- docs/dnb/DNB_IMPLEMENTATION_LOG.md, FILE_TREE.md — required doc upkeep
- Local CS50x.pdf + docs/CS50x.pdf (gitignored) — confirmed the certificate exists; used the official public verify URL instead of committing the binary

## 3. Reasoning against project rules

- DNB positioning: the programming-learning block is framed as learning velocity and foundation, never senior/expert. "Python og JavaScript sitter løsest i hendene" = most familiar, not expert. Growth items remain direction.
- Claim boundaries: CS50x framed as foundational learning, not a CS degree; pd-app as early/predecessor work, not production; Klar as a robust full-width prototype, not a finished platform; "med lærere, ikke elever" retained; no student-outcome claims; no private/medical framing.
- Cost control: small, surgical edits reusing existing components, content shape (no/en const objects), and CSS-module/token conventions; no redesign.
- Agent discipline: no commit, no push, no dependency, Skamløs and VG X untouched.

## 4. Files created, modified, moved, deleted

Modified:
- app/components/DnbCapacity.tsx — de-AI velocity; new "Programmering og veien hit" / "Programming and how I got here" block (lede, 4-item learn list, verified learnLinks, honest close)
- app/components/DnbCapacity.module.css — .learn, .learnLinks, .learnLink (+hover), .learnClose
- app/components/DnbWorkflow.tsx — de-AI lede/step03/step08/stripLede (NO+EN); project cards converted to whole-card anchor links, cardLink demoted to span
- app/components/DnbWorkflow.module.css — .card as full-height link with hover lift/border/glow, .card:hover .cardLink, .card:focus-visible; removed stale .cardLink:hover
- app/components/DnbKlar.tsx — disclaimer de-AI (NO+EN), kept "med lærere, ikke elever"
- app/components/DnbMethod.tsx — trimmed lede tail and basisTail tag (NO+EN), kept meaningful mapping contrasts
- app/page.tsx — metadata description de-AI ("kvalitetsporter" removed)
- docs/dnb/DNB_CLAIM_SOURCE_MAP.md — CS50x row → Verified
- docs/dnb/DNB_IMPLEMENTATION_LOG.md — new dated entry
- FILE_TREE.md — added this report path

Created:
- docs/reports/2026-06-22-dnb-programming-learning-ux-pass-report.md

Deleted / moved: none.

## 5. What was delivered

- A natural-sounding, less formulaic DNB page: removed "X, ikke Y" / "ikke bare X" constructions, repeated "bevis/proof" framing, the "fart … kontroll" symmetry, and the "ikke en påstand" tag.
- An honest programming-learning narrative in the capacity section: CS50x stack (C, Python, SQL, HTML/CSS, JS), pd-app (Python/Django backend, JS/Vue frontend with pupils as co-designers), teaching with micro:bit/Kitronik plus small Python/JS/HTML/CSS, and an honest closing about wanting to become a genuinely good programmer in a learning-oriented engineering environment.
- Verified evidence links: CS50x certificate verify URL, pd-app-frontend (Vue) repo, pd-app-backend (Django) repo. LinkedIn already present in contact.
- Consistent UX: every workflow project card is now a single whole-card clickable link with a unified hover lift, accent border, glow shadow, and keyboard focus ring; no nested interactive elements.

## 6. Claim and risk QA

- No senior / distributed-systems / platform claim. No expert-level programming claim. CS50x not presented as a degree. pd-app not presented as production. Klar kept as robust prototype, not finished platform. "med lærere, ikke elever" retained; no student-outcome claims. No private/medical framing. No DNB-official branding. Skamløs untouched. VG X / master untouched.

## 7. Validation performed

- npm run lint — clean.
- npm run build — succeeds (Next.js 16.2.9 Turbopack; "/" prerendered static).
- get_errors on all edited TSX — none.
- Visual QA on localhost:3000 (Playwright via DOM evaluation due to integrated-browser viewport quirk):
  - programming-learning block renders ("Programmering og veien hit").
  - CS50x cert link href = cs50.harvard.edu/certificates/0e9210d1-86f5-445a-b4d6-46fad1a5fd45.
  - whole-card links: Klar → klar-sigma.vercel.app, Companion → github.com/stianglomsrod/nikkoprogging, Lori Frisør → lori-frisor.vercel.app.
  - LinkedIn present.
  - NO↔EN toggle flips document.lang to "en", aria-pressed true, and swaps the new learn block + Klar disclaimer to English.
- git status: 10 modified files, 1 new untracked report; nothing committed or pushed.

## 8. File tree / path updates

FILE_TREE.md updated: yes — added docs/reports/2026-06-22-dnb-programming-learning-ux-pass-report.md. CS50x.pdf NOT added (gitignored binary, excluded by design).

## 9. Git / commit status

Not committed, not pushed. Branch feature/dnb-opus-full-page-buildout, up to date with origin. Working tree has the 10 modified files plus this report.

## 10. Risks, uncertainties, and follow-up

- EN tone for the new programming-learning block could use a native-speaker review pass.
- The CS50x certificate is hosted only as a gitignored local PDF; if a directly clickable artifact is desired, consider copying it to public/ (user decision) — currently the official verify URL is linked, which is sufficient.
- Integrated browser viewport returns width 0, so Playwright clicks need DOM-level .click(); not a site bug.

## 11. Recommended next step

Have Stian review the new "Programmering og veien hit" block wording (NO + EN) and decide whether to host the CS50x PDF in public/ for a direct download link; then commit this pass on the branch.
