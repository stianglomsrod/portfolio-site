# DNB Source Evidence Notes

## Purpose

Compact, safe evidence notes distilled from the raw source material for the DNB portfolio variant. This is the tracked bridge between sensitive raw sources (kept local-only in `docs/dnb/sources/`, gitignored) and the public-facing claim map, synthesis, and implementation docs.

Rules followed when writing this file:

- No personally identifying data (no national ID, no participant names, no school name).
- No long verbatim passages from the thesis. Only distilled, paraphrased evidence.
- Each note is tagged with a source-strength type so downstream docs can rate claims honestly.
- The exam manuscript uses a placeholder name ("Vetle"). The real candidate is Stian Glomsrød. Never surface the placeholder.

---

## 1. Source inventory and strength tiers

Raw sources live in `docs/dnb/sources/` (gitignored, local-only). They must not be committed.

| Source file (local-only) | Type | Strength tier | What it can support |
| --- | --- | --- | --- |
| sources/thesis.pdf | Master's thesis, OsloMet MAIKT, design-science format B | Primary / formal | Klar architecture, Smart Import, human-in-the-loop, participatory design process, design principles, safety/privacy, limitations |
| sources/Results_from_Diploma_registry (3).pdf | Official Sikt diploma registry export | Primary / formal (PII) | Education credentials, degrees, grades, named courses |
| sources/Eksamensmanus_ord_for_ord.md | Self-authored oral exam manuscript | Self-authored prep | Reasoning, framing, language — NOT independent proof |
| sources/QA_bank_samtale.md | Self-authored Q&A defence bank | Self-authored prep | Source-by-source academic grounding, anticipated critique, language |

Strength tiers, used by the claim map:

- **Primary / formal** — independent, verifiable, citable. Strongest.
- **Strong project evidence** — tracked repo docs and live Klar deployment.
- **Self-authored prep** — useful for reasoning and wording, but circular as proof of a claim. Treat as supporting, not load-bearing.
- **Derived** — context packs and summaries built from the above.

---

## 2. Education and formal competence (primary, from diploma registry)

> Privacy: the diploma PDF also contains a national ID number. That number must never appear in any tracked file, page copy, or report.

- **Master's degree, OsloMet** — MAIKT (Master i IKT-støttet læring / digital learning design), 120 ECTS. Master's thesis title (English in registry): "Designing a Prototype for a Digital Assistive Tool for Students with Executive Function Difficulties."
- Named master-level coursework on the transcript includes: Digital Learning Design, Project Management, Pedagogical Innovation and Prototyping, Philosophy of Science and Research Methods, Participatory Design. Grades on graded courses include A-level results.
- **Prior higher education**: a Bachelor (BMus, Popular Music) from Kristiania/Westerdals (180 ECTS), plus additional graded humanities/method coursework (literature, language/text theory, philosophy of science and methods) at the University of Inland Norway.
- **DNB-relevant reading of the credentials**: formal, graded competence in *participatory design, pedagogical innovation and prototyping, project management, and research methods*. This is the formal backbone for the "research-based product/design strength" positioning. It is credential-verifiable, not just asserted.

Safe framing for the page: "Master i digital læringsdesign (OsloMet), med formell kompetanse i participatory design, innovasjon og prototyping, prosjektledelse og vitenskapsteori/metode." Do not list grades on the page; keep them as backing evidence only.

---

## 3. Klar — what it is and what is verifiable (primary, from thesis)

Klar is the master project artefact. In design-science terms it is an *instantiation*: a realised, running artefact that demonstrates feasibility — explicitly framed as a justified design proposal, not a finished product.

Verifiable technical facts (thesis + live site `klar-sigma.vercel.app`):

- **Responsive PWA** running in the browser across device types (PC, Chromebook, tablet, mobile). Platform independence was a deliberate design principle, not an accident.
- **Frontend**: React + Next.js. One shared codebase serving two distinct interfaces (teacher and student).
- **Backend / data**: Supabase with PostgreSQL — an open, standardised data layer rather than a closed proprietary store.
- **Auth + roles**: authentication with role-based access control (teacher vs student), each role having different needs and interface.
- **Architecture is argued, not incidental**: the thesis explicitly ties the tech choices (PWA, Supabase/PostgreSQL, single React/Next.js codebase) back to the design principles of platform independence and low adoption threshold. This is strong evidence of system-level reasoning, not just feature assembly.

Honest boundary (must keep): Klar is a robust prototype / fullstack proof, NOT an enterprise-scale production platform. The thesis itself frames it this way.

---

## 4. Smart Import — AI as a product decision (primary, from thesis)

This is the strongest single piece of "AI-first builder" evidence.

- **What it does**: an AI parses an ordinary weekly letter/plan (the kind teachers already write) and automatically creates and distributes timetable, tasks, classes and subjects to users.
- **Human-in-the-loop is built in**: everything the AI interprets is editable in a preview step *before* publishing. Nothing is published automatically. The teacher keeps full control and responsibility.
- **It was a designer-driven synthesis, not a requested feature**: no participant asked for "an AI that reads my weekly letter." It was the designer's technical answer to the strongest expressed need — time-saving / low threshold.
- **It was validated after the fact**: in the evaluation workshop, the AI parsing was the single strongest finding and the clearest adoption driver named by the teachers.
- **DNB relevance**: this is a clean, honest story of (a) identifying a real bottleneck, (b) choosing AI as the right tool, (c) wrapping it in a safety/preview gate, and (d) validating it with users. It maps almost directly onto "AI-first engineering with safe agent workflows."

Safety reading: the preview step doubles as a privacy and error-control gate — nothing sensitive or misinterpreted flows to students without human approval.

---

## 5. Method — participatory design and design science (primary, from thesis)

- **Method**: participatory design with teachers as co-designers, structured by an established design-science frame (build / evaluate / theorize / justify, with the artefact as an *instantiation*) and a generative design-research process (pre-design → generative → evaluative phases).
- **Concrete process** (real, named techniques): a precursor prototype used as a *probe*; Workshop 1 generative (empathy maps, personas); Workshop 2 generative/solution-oriented (Crazy Eights, dot-voting); building the prototype between workshops; Workshop 3 evaluative (scenario-based journey mapping).
- **Scale (honest)**: five-to-six teachers at one Norwegian primary school over two semesters. Small, non-representative by design. The value claim is *transferability of principles*, not statistical generalisation.
- **Knowledge contribution**: five design principles distilled from the workshop data — (1) universal accessibility / anti-stigma, (2) time-saving / low threshold for the teacher, (3) motivation via opt-in game elements, (4) platform independence, (5) autonomy support (scaffolding that can be withdrawn). The principles are the contribution; the app is the means.
- **DNB relevance**: demonstrates a disciplined, documented path from unclear needs → requirements → built system → evaluation. This is exactly the "turn unclear needs into buildable systems" angle, and it is formally examined work, not a self-claim.

---

## 6. Safety, privacy, and responsible AI (primary, from thesis)

- Project was assessed and approved by **Sikt** (Norwegian Agency for Shared Services in Education and Research). All participants gave signed informed consent.
- **Data minimisation in practice**: paraphrasing instead of direct quotes to protect identifiable colleagues; audio (not video) capture chosen deliberately.
- **AI use was declared**: use of AI in the thesis work is documented in a dedicated appendix per OsloMet guidelines.
- **Critical stance on AI is on record**: the candidate explicitly discusses that digital tools (incl. AI) are *not neutral* for executive function — they can shift load or responsibility the wrong way — and designs to *offload*, not to remove skill development.
- **Product-level safety**: Smart Import's human preview gate is an explicit control against AI misinterpretation and against uncontrolled data flow.
- **DNB relevance**: this is a genuine, examined record of responsible-AI thinking — consent, data minimisation, declared AI use, human-in-the-loop, and a documented awareness of AI's failure modes. It supports a *general* safety/privacy framing on the page. Avoid over-citing specifics (Sikt/GDPR clauses) on the public page unless the user explicitly approves naming them.

---

## 7. Learning velocity and work capacity (primary + strong project evidence)

- The thesis process required learning and shipping a working React / Next.js / Supabase PWA, including an AI parsing feature, between workshops — i.e. a genuine transition from a new technical domain to a functioning, evaluated prototype.
- The candidate's prior formal background is *not* primarily software engineering (music bachelor, then learning-design master). The fullstack build is therefore real evidence of fast cross-domain learning, honestly framed.
- Sustained output is further evidenced by the live repo documentation set (workflow docs, QA checklists, implementation logs, handoff protocols) — direct artefacts, not claims.
- **Honest wording**: prefer "vist rask overgang fra nytt teknisk domene til fungerende prototype" over "dokumentert overgang" unless we are pointing at a specific artefact. The evidence is strong but we should not imply a published case study that does not exist on the public site.

---

## 8. Limitations and boundaries (primary — protect these honestly)

The candidate's own examined limitations double as our claim guardrails:

- **No student user-testing.** The prototype was not tested with students. Evaluation was one workshop, four participants, one school. Not an effect study. Never claim Klar is proven to help students.
- **Evaluator bias acknowledged**: most evaluation-workshop participants had followed the project from the start; the candidate held a composite role (teacher/designer/developer/facilitator/colleague/researcher) and handled it through openness, voluntariness, and paraphrasing.
- **Partial implementation**: autonomy support (graded withdrawal of scaffolding) is only partially implemented — a digital tool cannot fully replicate a responsive human tutor; the teacher stays in the loop. This is an honest engineering boundary, not a hidden gap.
- **Theory constructs are not original**: executive function, UDL, self-determination theory, scaffolding, gamification are established literature. The contribution is the *model* (linking them to concrete design criteria for this context), not the constructs.

These boundaries are assets: they let the page demonstrate honest, self-critical engineering judgement, which is itself a positive DNB signal.

---

## 9. What changed versus the previous claim map

Previously, thesis and diploma text were *not* available on-branch, so Klar tech stack, Smart Import, workshop method, safety, and learning-velocity claims were rated "Partial — unverified in repo."

Now the primary sources are available locally (and the evidence is captured here in tracked, safe form). Those claims move from **Partial** to **Strong (primary-source-backed)** — see `DNB_CLAIM_SOURCE_MAP.md` for the updated per-claim ratings. The raw sources remain gitignored for privacy; this notes file is the tracked evidence of record.
