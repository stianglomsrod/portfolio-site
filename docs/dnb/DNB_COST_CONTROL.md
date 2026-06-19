# DNB Cost Control Workflow

## Goal
Optimize for high accuracy and low agent cost while building the DNB portfolio variant.

## Model/tool policy
- GitHub Copilot Auto is the default implementation agent.
- ChatGPT is used for strategy, prompts, QA review, and continuity.
- Codex is used selectively for harder debugging, architecture review, or second opinions.
- Avoid expensive models for broad, vague tasks.

## Cost-saving rules
1. One agent session = one small chunk.
2. Discovery before implementation for unfamiliar areas.
3. Keep prompts specific and acceptance criteria explicit.
4. Reuse existing components before building new ones.
5. Avoid broad rewrites.
6. Require final reports with full paths.
7. Use screenshots and human visual QA before iterating.
8. Escalate to Codex only when Copilot Auto is stuck, uncertain, or likely to cause rework.

## Recommended chunk sequence
1. Workflow/bootstrap docs.
2. Discovery-only architecture report.
3. Content model / DNB copy draft structure.
4. Root DNB page skeleton on DNB branch.
5. Klar evidence section.
6. Agentic workflow evidence section.
7. Schedule picker mini-case.
8. Learning trajectory / programming curiosity section.
9. Visual polish and responsive QA.
10. Final deploy and link verification.

## Avoid
- Large prompts that combine docs, routing, design, copy, CV, and deployment.
- Asking agents to be broadly creative without constraints.
- Letting implementation agents define the candidate narrative alone.
- Re-reading huge context repeatedly when a compact doc exists.
