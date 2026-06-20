# DNB Agent Handoff Protocol

## Purpose
Every agent session must end with a compact report that can be pasted into ChatGPT, Codex, or another agent without losing context.

## Required final report
Use this structure:

```markdown
# Agent Report — <short task name>

## 1. Files read
- `path/to/file`
- `path/to/other-file`

## 2. Files created/changed/deleted/moved
### Created
- `path/to/new-file`

### Modified
- `path/to/changed-file`

### Deleted
- None

### Moved/Renamed
- None

## 3. Key decisions
- Decision and reason.

## 4. Validation performed
- Commands run.
- Visual checks performed.
- Validation not run and why.

## 5. Risks or uncertainties
- Risk/uncertainty.

## 6. File tree / path updates
- `FILE_TREE.md` updated: yes/no.
- Reason.
- Full relative paths affected.

## 7. Recommended next step
- One small next step.
```

## Report delivery rule
At the end of every session:
1. Save the full report as `docs/reports/YYYY-MM-DD-<slug>-report.md` and update `FILE_TREE.md`.
2. Deliver the report **once**, as the detailed report itself inside a single fenced ` ```markdown ` code block. Do **not** present a prose version first and then a duplicate markdown block — the markdown block IS the report. Keep the same elaborated, narrative, detail-rich style inside the block. Detail is key.
3. The first section of the report must be **## 0. User prompt** containing the verbatim user request that triggered the session.
4. Inside the copyable block, do **not** use fenced code blocks (no triple backticks). Use plain indented text for directory trees and command output so the outer fence is never broken.
5. The recipient is an LLM (tech lead) that already knows this workflow. Include a short workflow refresher only inside the prompt itself when it materially helps that specific handoff — not otherwise. Always state the goal.
6. Assume both the agent and the recipient LLM can read context from screenshots and arbitrary documents (PDF, md, code, images).
7. There must be no explanatory prose before the block and no explanatory prose after the block. The fenced block is the entire final response.

## Required report sections
  0. User prompt — verbatim or as close as possible
  1. Session context — branch, task type (docs/code/UI/QA/arch), VG X protected
  2. Files and sources read — full relative paths + why each mattered
  3. Reasoning against project rules — positioning, claim boundaries, cost-control, agent roles
  4. Files created, modified, moved, deleted — full relative paths + exact purpose
  5. What was delivered — substance not just filenames
  6. Claim and risk QA — unsupported DNB claims, seniority overclaims, UX/prompt-user framing, student testing, private/medical, official branding
  7. Validation performed — commands, git status, why build/lint skipped if skipped
  8. File tree / path updates — FILE_TREE.md updated yes/no, paths
  9. Git / commit status — committed, hash, ahead/behind remote, push needed
  10. Risks, uncertainties, and follow-up
  11. Recommended next step

## Commit and binary artifact policy
- Agents must not commit automatically unless the user explicitly requested a commit, or unless committing is part of the task acceptance criteria.
- Agents must not add ZIP archives or binary context packs to the repo unless explicitly requested. Prefer tracked Markdown source documents.
- If a ZIP or binary artifact is committed, the report must justify why it belongs in the repo.

## Path rules
- Always use full repo-relative paths.
- Do not use local machine-specific absolute paths.
- Do not omit paths for created/modified files.

## FILE_TREE rule
If files were created, deleted, moved, renamed, or structurally reorganized, update `FILE_TREE.md` in the same session.

If no update is needed, include:

> No FILE_TREE.md update required because no files were created, moved, deleted, or structurally reorganized.

## Content truthfulness
- Do not invent facts about DNB.
- Do not invent candidate experience.
- Do not overclaim skill level.
- Distinguish implemented, planned, and aspirational features.
