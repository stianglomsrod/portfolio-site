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
