# DNB Workflow Bootstrap — Copy Instructions

Copy the contents of this ZIP into the root of the `portfolio-site` repository while on branch:

```bash
feature/dnb-workflow-bootstrap
```

Expected resulting files:

```text
.github/copilot-instructions.md
AGENTS.md
FILE_TREE.md
docs/dnb/DNB_WORKFLOW_DNA.md
docs/dnb/DNB_POSITIONING.md
docs/dnb/DNB_AGENT_HANDOFF_PROTOCOL.md
docs/dnb/DNB_COST_CONTROL.md
docs/dnb/DNB_QA_CHECKLIST.md
docs/dnb/DNB_IMPLEMENTATION_LOG.md
```

After copying, run:

```bash
git status
```

Then either:

1. Commit the bootstrap docs, or
2. Ask Copilot Auto to inspect and expand `FILE_TREE.md` based on the real repo structure before committing.

Recommended next Copilot prompt after copying:

```markdown
You are on branch `feature/dnb-workflow-bootstrap`. The DNB workflow bootstrap docs have been copied into the repo. Inspect the actual repository structure and update `FILE_TREE.md` so it reflects the real project structure while excluding generated/cache folders. Do not change UI or code. Return the required AGENTS.md report format.
```
