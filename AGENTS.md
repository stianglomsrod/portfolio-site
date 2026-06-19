<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md — Shared Agent Rules

## Project goal
Build a separate DNB-targeted version of the existing portfolio site for the role **Software Engineer, AI-First Engineering** at DNB AI Tech, while preserving the original VG X application portfolio.

The DNB version should position Stian as an AI-first builder / software engineering candidate with system understanding, programming curiosity, practical fullstack framework awareness, documented agentic development discipline, and research-based competence in participatory design, prototyping, digital learning design, innovation, and project management.

## Role split
- **User / product owner:** runs local environment, provides screenshots, evaluates tone and visual feel, bridges context between agents.
- **ChatGPT:** tech lead, positioning strategist, prompt designer, QA reviewer, continuity keeper.
- **GitHub Copilot Auto:** default implementation agent for cost-efficient small chunks.
- **Codex:** selective second opinion for harder debugging, architecture review, or when Copilot Auto gets stuck.

## Persistent positioning rules
- Do not present Stian as a senior distributed systems engineer.
- Do not present Stian as a pure UX designer.
- Do not present Stian as merely a prompt user.
- Present him as an AI-first builder / software engineering candidate with strong system understanding.
- Emphasize practical understanding of frontend, backend, APIs, databases, auth, frameworks, CSS libraries, and how these parts fit together in real products.
- Emphasize research-based competence in participatory design, user-centered design, innovation, prototyping, digital learning design, and project management.
- Emphasize high sustained learning/work capacity through evidence: master project, portfolio, working prototypes, documented agentic workflows, QA docs, code audit, tech debt tracking, and iterative delivery.
- Emphasize AI-assisted prototyping and development, not only prototyping.
- Keep tone concrete, human, technically curious, and honest.
- Do not mention private health context, psychology, diagnosis, or medical framing.

## Implementation rules
- Work in small, reviewable chunks.
- Prefer discovery before implementation.
- Reuse existing components and architecture unless there is a clear reason not to.
- Do not rewrite VG X content or structure unless explicitly requested.
- Do not use DNB branding in a way that could make the site look official.
- Do not add dependencies without explicit justification and approval.
- Do not include secrets, tokens, private environment values, or local machine-specific paths.

## FILE_TREE maintenance rule
Any future agent that creates, deletes, moves, renames, or meaningfully reorganizes files must update `FILE_TREE.md` in the same session.

Every final summary must include a dedicated **File tree / path updates** section listing full relative paths for:
- files created
- files modified
- files deleted
- files moved/renamed
- whether `FILE_TREE.md` was updated

If no tree update was needed, say exactly:

> No FILE_TREE.md update required because no files were created, moved, deleted, or structurally reorganized.

## Required final report format
Return one concise Markdown report with:
1. Files read
2. Files created/changed/deleted/moved
3. Key decisions
4. Validation performed
5. Risks or uncertainties
6. File tree / path updates
7. Recommended next step

The report must be self-contained so it can be pasted into ChatGPT and Codex for continuity.

## Report delivery rule
At the end of every session:
1. Save the full report as `docs/reports/YYYY-MM-DD-<slug>-report.md` and update `FILE_TREE.md`.
2. Deliver the report **once**, as the detailed report itself inside a single fenced ` ```markdown ` code block. Do **not** present a prose version first and then a duplicate markdown block — the markdown block IS the report. Keep the same elaborated, narrative, detail-rich style inside the block. Detail is key.
3. The first section of the report must be **## 0. User prompt** containing the verbatim user request that triggered the session.
4. Inside the copyable block, do **not** use fenced code blocks (no triple backticks). Use plain indented text for directory trees and command output so the outer fence is never broken.
5. The recipient is an LLM (tech lead) that already knows this workflow. Include a short workflow refresher only inside the prompt itself when it materially helps that specific handoff — not otherwise. Always state the goal.
6. Assume both the agent and the recipient LLM can read context from screenshots and arbitrary documents (PDF, md, code, images).
