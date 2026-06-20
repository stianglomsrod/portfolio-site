# DNB QA Checklist

## Candidate narrative

- [ ] Positions Stian as AI-first builder / software engineering candidate.
- [ ] Does not overclaim senior distributed systems/platform expertise.
- [ ] Does not reduce him to pure UX or pure prompting.
- [ ] Mentions AI-assisted prototyping and development.
- [ ] Connects system understanding to frontend/backend/API/database/auth/frameworks/CSS libraries.
- [ ] Includes high sustained learning/work capacity through evidence, not hype.
- [ ] Keeps private health/psychological context out.

## Evidence

- [ ] Klar is presented as technical product evidence.
- [ ] Agentic workflow docs/QA/handover/tech debt are presented as engineering-practice evidence.
- [ ] CS50x/programming journey is used honestly.
- [ ] Portfolio/prototypes are described accurately.
- [ ] All claims are supported by CV, portfolio, project docs, or user-provided context.

## Source-grounded claims (2026-06-20)

- [ ] Every load-bearing claim traces to a primary/strong source (thesis, diploma, repo, live Klar), not to self-authored exam prep alone.
- [ ] Klar tech facts match `DNB_SOURCE_EVIDENCE_NOTES.md` (React/Next.js, Supabase/PostgreSQL, auth+RBAC, PWA, human-in-the-loop preview).
- [ ] No claim exceeds its rating in `DNB_CLAIM_SOURCE_MAP.md`.
- [ ] "Vist rask overgang" used, not "dokumentert overgang".
- [ ] No national ID, no diploma grades, no participant/school names on-page or in tracked docs.
- [ ] Safety framing is general (no Sikt/GDPR specifics) unless user approved.
- [ ] No student-outcome/effect claim for Klar.

## Workflow-as-evidence and posting fit

- [ ] The documented agentic workflow is presented as enablement evidence (force-multiplier), matching `DNB_JOB_POSTING.md`.
- [ ] Smart Import preview gate is framed as a small, honest agent-guardrail example, not enterprise-scale.
- [ ] Innersource/transparency/reuse language used where natural and honest.
- [ ] TypeScript named as the language match; distributed systems / platform / MCP kept as growth direction.

## DNB fit

- [ ] Focuses on AI-first engineering, tooling, enablement, runbooks, standards, and safe agent workflows.
- [ ] Does not invent DNB facts.
- [ ] Does not make the page look like an official DNB website.
- [ ] Avoids unauthorized DNB branding/logos unless explicitly approved.

## UX / visual

- [ ] Works on desktop and mobile.
- [ ] First screen clearly says what the page is.
- [ ] Navigation is understandable.
- [ ] Links work.
- [ ] Text is not too dense.
- [ ] Visual style supports engineering/lab positioning without becoming gimmicky.

## Technical

- [ ] Existing VG X version is preserved.
- [ ] No unrelated files changed.
- [ ] No secrets or env values committed.
- [ ] Build/lint/dev validation performed when code changes require it.
- [ ] `FILE_TREE.md` updated when structure changes.
- [ ] Agent report includes full relative paths.

## Agent report format

- [ ] Final response is exactly one fenced Markdown code block.
- [ ] No prose before or after the block.
- [ ] No nested triple-backtick fences inside the block.
- [ ] Section 0 contains the verbatim user prompt.
- [ ] Sections 0–11 all present (user prompt, session context, files read, reasoning, files changed, deliverables, claim QA, validation, file tree, git status, risks, next step).
- [ ] Report saved as `docs/reports/YYYY-MM-DD-<slug>-report.md`.
- [ ] Commit was not made automatically unless explicitly requested.
- [ ] No ZIP or binary artifact committed unless explicitly requested and justified.
