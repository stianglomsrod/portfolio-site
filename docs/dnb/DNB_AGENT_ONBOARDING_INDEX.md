# DNB Agent Onboarding Index

## Purpose

Single entry point for onboarding a new agent with minimal prior context.

Read this file first, then follow the reading order below.

## Immediate objective

Build the DNB-targeted portfolio variant as an AI-first engineering narrative while preserving the original VG X portfolio.

## Candidate positioning (must hold)

- AI-first builder / software engineering candidate with strong system understanding.
- Practical fullstack orientation: frontend, backend, APIs, database, auth, frameworks, CSS libraries, deployment structure.
- AI-assisted prototyping and development with disciplined review, correction, QA, and documentation.
- High sustained learning/work capacity shown through evidence.

## Claims boundaries (must not break)

- No senior distributed systems/platform claim.
- No established lower-level expertise claim (frame as growth direction).
- No pure UX framing.
- No prompt-user-only framing.
- No private/medical framing.
- No unsupported claims.
- No official DNB branding impression.

## Reading order for new agents

Strategic and source layer (read to understand *what to argue* and *why it is safe*):

1. `AGENTS.md`
2. `.github/copilot-instructions.md`
3. `docs/dnb/DNB_JOB_POSTING.md` (exact role — source of record)
4. `docs/dnb/DNB_WORKFLOW_DNA.md`
5. `docs/dnb/DNB_POSITIONING.md`
6. `docs/dnb/DNB_SOURCE_EVIDENCE_NOTES.md` (safe distilled primary evidence)
7. `docs/dnb/DNB_INSIGHT_SYNTHESIS.md` (strategy — what got stronger, role-fit)
8. `docs/dnb/DNB_CLAIM_SOURCE_MAP.md` (claim-by-claim ratings and guardrails)

Execution layer (read when implementing):

9. `docs/dnb/DNB_PORTFOLIO_STRATEGY.md` (page structure, evidence hierarchy, visual direction)
10. `docs/dnb/DNB_IMPLEMENTATION_BRIEF_FOR_AUTO.md` (Copilot-Auto-ready chunks)
11. `docs/dnb/DNB_CONTENT_OUTLINE.md`
12. `docs/dnb/DNB_SECTION_COPY_V1.md`
13. `docs/dnb/DNB_QA_CHECKLIST.md`
14. `docs/dnb/DNB_AGENT_HANDOFF_PROTOCOL.md`
15. `docs/dnb/DNB_COST_CONTROL.md`
16. `docs/dnb/DNB_IMPLEMENTATION_LOG.md`
17. `FILE_TREE.md`

Doc roles at a glance: posting = the target; evidence notes = safe facts; synthesis = strategy; claim map = what you may say; strategy = how the page is shaped; brief = how to build it in small chunks.

## Job posting source note

The exact DNB job posting is now stored at `docs/dnb/DNB_JOB_POSTING.md` (public, tracked). It is the canonical role-fit reference and supersedes the earlier proxy-only approach. Key reframing: the role centres on **enablement / AI-first tooling**, **safe agent guardrails**, and **working in the open / innersource**; distributed-systems depth is a senior/staff plus only, which keeps the candidate's guardrails valid.

## Raw source material (local-only, never commit)

Primary sources live in `docs/dnb/sources/` and are gitignored:

- `sources/thesis.pdf` — master's thesis (participant-sensitive).
- `sources/Results_from_Diploma_registry (3).pdf` — diploma; **contains a national ID number** — must never be committed or surfaced.
- `sources/Eksamensmanus_ord_for_ord.md`, `sources/QA_bank_samtale.md` — self-authored exam prep (uses a placeholder name "Vetle"; the real candidate is Stian).

Distilled, safe evidence is in `docs/dnb/DNB_SOURCE_EVIDENCE_NOTES.md`. Use that for any on-page claim; do not quote the raw sources.

## Context pack for quick upload

Upload-ready pack:

- `docs/context/2026-06-19-agent-context-pack.zip`

Pack contents include:

- concise goal and guardrails
- skills and evidence matrix
- agentic UX field note (real-world reliability signal)
- starter prompt for new agents

## Agentic UX principle to carry forward

Polished UI is not enough. Solutions must survive real workflow conditions.

Field signal captured from user context:

- Taxi voice interaction in Halden (2026-06-17) showed misrecognition and wrong destination acceptance.
- Use this as a design warning: confirmation loops, error recovery, and operational reliability are first-class requirements.

## Recommended first action for a new agent

Return a 3-5 chunk plan with acceptance criteria, then execute one chunk at a time with explicit claims QA.
