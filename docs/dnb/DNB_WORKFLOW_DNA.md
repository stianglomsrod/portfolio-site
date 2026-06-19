# DNB Workflow DNA

## Purpose
This file is the source of truth for the DNB AI-First Engineering portfolio variant. It should be read before any DNB-related implementation work.

## Goal
Build a separate DNB-targeted version of Stian Glomsrød's existing portfolio site for the role **Software Engineer, AI-First Engineering** at DNB AI Tech.

The DNB version should be deployed as its own Vercel project from a separate branch while preserving the original VG X portfolio.

## Core positioning
Stian should be positioned as an:

> AI-first builder / software engineering candidate with strong system understanding, programming curiosity, practical fullstack framework awareness, documented agentic development discipline, and research-based prototype/design competence.

The core claim is not that Stian is already a senior distributed systems/platform engineer. The core claim is that he has an unusually relevant combination for AI-first engineering:
- technical curiosity and programming drive
- practical fullstack prototype-building experience
- understanding of frontend/backend/API/database/auth/frameworks/CSS libraries
- participatory/user-centered design competence
- digital learning design, innovation, prototyping, and project management background
- documented AI-assisted prototyping and development workflow
- ability to turn knowledge into context, runbooks, docs, test plans, and reusable working practices

## Why this branch exists
The existing portfolio was created for VG X and should be preserved. DNB needs a different candidate story:
- less UX/news/product as the primary identity
- more AI-first engineering, tooling, enablement, system understanding, and agentic workflow
- Klar as both a product prototype and evidence of AI-assisted development practice

## Tool/agent roles
- **User:** product owner, local tester, visual QA, screenshot provider, context bridge.
- **ChatGPT:** tech lead, prompt designer, positioning strategist, QA reviewer, continuity keeper.
- **GitHub Copilot Auto:** default implementation agent for cost-efficient coding and docs chunks.
- **Codex:** selective second opinion for hard debugging, architecture review, or if Copilot Auto gets stuck.

## Cost-control principle
Use better workflow before using more expensive models:
- small chunks
- discovery before implementation
- explicit acceptance criteria
- self-contained final reports
- screenshots and visual QA before further iteration
- Codex only when its additional reasoning is worth the usage cost

## Persistent rules
- Preserve VG X unless explicitly instructed.
- Do not invent claims or experience.
- Do not overclaim engineering seniority.
- Do not make the DNB page look like an official DNB page.
- Prefer concrete evidence over buzzwords.
- Keep documentation useful and compact.
- Do not include private medical/psychological framing.
- Any significant agent decision that deviates from the prompt must be documented.

## FILE_TREE rule
Any future agent that creates, deletes, moves, renames, or meaningfully reorganizes files must update `FILE_TREE.md` in the same session.

Every final summary must include a dedicated **File tree / path updates** section with full relative paths for created/modified/deleted/moved files and whether `FILE_TREE.md` was updated.

## Report delivery rule
At the end of every session:
1. Save the full report as `docs/reports/YYYY-MM-DD-<slug>-report.md` and update `FILE_TREE.md`.
2. Deliver the report **once**, as the detailed report itself inside a single fenced ` ```markdown ` code block. Do **not** present a prose version first and then a duplicate markdown block — the markdown block IS the report. Keep the same elaborated, narrative, detail-rich style inside the block. Detail is key.
3. The first section of the report must be **## 0. User prompt** containing the verbatim user request that triggered the session.
4. Inside the copyable block, do **not** use fenced code blocks (no triple backticks). Use plain indented text for directory trees and command output so the outer fence is never broken.
5. The recipient is an LLM (tech lead) that already knows this workflow. Include a short workflow refresher only inside the prompt itself when it materially helps that specific handoff — not otherwise. Always state the goal.
6. Assume both the agent and the recipient LLM can read context from screenshots and arbitrary documents (PDF, md, code, images).
