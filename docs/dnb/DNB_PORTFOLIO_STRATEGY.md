# DNB Portfolio Strategy

## Purpose

Translates the insight synthesis into a concrete page strategy: structure, sections, interaction, evidence hierarchy, visual direction, and implementation priorities. This is the bridge between strategy (`DNB_INSIGHT_SYNTHESIS.md`) and execution (`DNB_IMPLEMENTATION_BRIEF_FOR_AUTO.md`).

Constraints that govern everything below:

- Preserve the VG X portfolio. The DNB variant is a separate experience/branch/deploy.
- Engineering-lab feel, not a marketing site, and never anything resembling official DNB branding.
- Evidence over adjectives. Honest framing. Norwegian page copy.

## 0. Posting alignment (from `DNB_JOB_POSTING.md`)

The stored posting sharpens the emphasis. The role is about **enablement and AI-first tooling** ("build the tooling that lets everyone else do the same", "measure your impact by what the people around you can do"), **safe agent guardrails** ("designed in before agents are turned loose"), and **working in the open / innersource / reuse**. It explicitly welcomes new graduates and treats distributed-systems depth as a senior/staff plus.

Page consequences:

- Lead with the **documented, governed workflow** as an _enablement_ exhibit, not just a personal-productivity story.
- Frame Klar's Smart Import preview gate as a small, honest example of **agent guardrails / human-in-the-loop**.
- Use **transparency / build-in-the-open / reusable artefacts** language where natural.
- Name **TypeScript** as the language match; keep distributed systems / platform / MCP as growth direction.

---

## 1. Evidence hierarchy (what the page leans on, strongest first)

1. **The documented agentic workflow** — strongest and most distinctive; evidenced by the repo itself.
2. **Klar + Smart Import** — running fullstack AI product with a human-in-the-loop safety gate, user-validated.
3. **Examined method chain** — participatory design → architecture, from a formal master's thesis.
4. **Formal credentials** — master in digital learning design; graded competence in participatory design, innovation/prototyping, project management, research methods.
5. **Learning velocity** — cross-domain build, honestly framed.
6. **Honest growth direction** — lower-level/robustness/platform as trajectory.

Design implication: the page should not bury the workflow and Klar below a generic hero. Get to evidence fast.

---

## 2. Recommended page structure

Eight sections, mapping to the approved outline but re-prioritised so evidence leads:

1. **Hero** — one clear sentence on what Stian is (AI-first builder / software engineering candidate with system understanding) + what the page is. Three proof bullets. Primary CTA jumps to the workflow or Klar section.
2. **How I build with AI** (the differentiator) — the documented agentic workflow: context → requirements → human review → correction → QA → documentation → handoff → safety gates. State plainly that the repo itself is the evidence.
3. **Klar as evidence** — the product: fullstack PWA, React/Next.js, Supabase/PostgreSQL, auth + RBAC, teacher/student roles. Lead the AI story with Smart Import (bottleneck → AI choice → human preview gate → user validation). Keep the non-enterprise-scale disclaimer.
4. **From unclear needs to buildable systems** (method) — participatory design + design science, the probe → workshops → build → evaluation chain, landing each insight on a _technical_ decision. Plain language, no citation dump.
5. **Learning velocity and work capacity** — evidence-based, professional framing; the cross-domain build and sustained documented output.
6. **Honest growth direction** — lower-level engineering, robustness, observability, platform thinking as _direction_, not current expertise.
7. **Proof / documentation** — a short, honest "receipts" section linking the idea that the workflow, QA, and handoff docs exist (without exposing sensitive sources). Optional, can be folded into section 2.
8. **Contact / CTA** — clear, sober call to action for AI-first engineering roles. No DNB logo/branding.

Order rationale: sections 2 and 3 are the strongest exhibits and should come immediately after the hero. Method, velocity, and growth support them.

---

## 3. Per-section recommendations

### Hero

- One sentence, plain. Avoid buzzword stacking.
- Three proof bullets max, each pointing at a real artefact (Klar, the workflow, the method).
- Visual: restrained, technical, lots of whitespace. No stocky hero imagery.

### How I build with AI

- This is the lead exhibit. Present the workflow as a labelled sequence, not prose.
- State the honest meta-point: "this site was built with this workflow; the repo docs are the receipts."
- Tie to DNB: tempo without control creates rework; this method gives speed _and_ safety. Frame it as **enablement** — a workflow designed to be shared, reused, and run by others (matches the posting's force-multiplier theme).
- Soften the reuse claim: "designet for å kunne deles og læres av andre," not "proven reusable."

### Klar as evidence

- Lead with the system, then the AI decision.
- Smart Import story arc: real bottleneck → AI chosen deliberately → human-in-the-loop preview before publish → validated by users as the strongest adoption driver.
- Use the existing Klar screenshots in `public/images/cases/klar/`.
- Keep the disclaimer: robust prototype / fullstack proof, not enterprise platform.
- Safety: general framing ("godkjent personvernprosess", "menneske-i-løkka"), specifics only if user approves.

### Method

- Land every design insight on a technical or system decision (e.g. platform independence → PWA + Supabase choice). This keeps it engineering, not pure UX.
- Name the method honestly (participatory design, design science) but avoid an academic citation wall.

### Learning velocity

- Professional capacity, not personal narrative. No private/medical framing.
- Prefer "vist rask overgang fra nytt teknisk domene til fungerende prototype" over "dokumentert overgang."

### Growth direction

- "Har lyst til å bygge" / "motivert for", never "har erfaring med."
- Reaffirm current strongest evidence is AI-first fullstack product building with disciplined workflow.

### Contact / CTA

- Sober, direct. Link to Klar live and (optionally) GitHub. No DNB branding.

---

## 4. Visual vs text balance

- **Text-led, evidence-dense, scannable.** Short paragraphs, labelled lists, clear section headers.
- **Visuals are supporting**: Klar screenshots, a simple workflow diagram, restrained typography. No decorative gimmicks.
- **One signature interaction at most** (e.g. a clean expand/inspect on the workflow steps or a Klar screenshot lightbox — the repo already has `ImageLightbox`). Reliability and clarity over flash.
- The interaction design should itself model safe-AI values: clear states, confirmation where it matters, graceful empty/error states. This is a quiet way to _demonstrate_ the engineering posture.

---

## 5. What to avoid

- Gimmicky or over-designed AI theatrics (fake terminals, fake "AI thinking" animations).
- Over-UX-centered presentation that hides the engineering.
- Anything that looks like an official DNB property (logo, exact brand palette, official-sounding headers).
- Dense academic citation blocks on-page.
- Any student-outcome or effect claim for Klar.
- Reusing the VG X layout wholesale in a way that muddies the separate positioning.

---

## 6. Reuse from the existing codebase

Prefer existing components and patterns (per implementation rules). Likely reusable:

- `app/components/Reveal.tsx` — scroll reveal for sections.
- `app/components/ImageLightbox.tsx` — Klar screenshot inspection.
- `app/components/CaseCard.tsx` / `Shared.module.css` — card and shared styling patterns.
- `app/components/SiteFooter.tsx` — footer/contact.
- Existing CSS-module conventions and `globals.css` tokens.

A `ModeToggle` already exists, but the DNB variant is **not** a mode toggle: it is a root-level page on branch `dnb-main`, deployed as its own separate Vercel project, while VG X stays on `master` (decided 2026-06-20, see `DNB_IMPLEMENTATION_LOG.md`). Build the DNB root page on `dnb-main`; do not wire the split through `ModeToggle`.

---

## 7. Implementation priorities

1. **First**: hero + "How I build with AI" section. Highest evidence, lowest claim risk, fully backed by repo docs.
2. **Second**: Klar evidence section with Smart Import + screenshots.
3. **Third**: method section.
4. **Fourth**: learning velocity + growth direction.
5. **Last**: contact/CTA polish and the optional proof/receipts section.

Each step is a separate reviewable chunk. See `DNB_IMPLEMENTATION_BRIEF_FOR_AUTO.md` for chunk-level acceptance criteria suitable for GitHub Copilot Auto.
