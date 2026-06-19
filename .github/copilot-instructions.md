# Copilot Repository Instructions — Portfolio Site

## Purpose
This repository contains Stian Glomsrød's portfolio site. The original site was built for a VG X application and must be preserved. A separate DNB-targeted variant will be developed on a separate branch and deployed as a separate Vercel project.

## Operating model
- GitHub Copilot Auto is the default implementation agent for cost efficiency.
- Work in small, reviewable chunks.
- Prefer discovery and planning before implementation.
- Do not perform broad rewrites unless explicitly requested.
- Do not invent candidate claims, technologies, employers, links, or external facts.
- Preserve the VG X version unless the task explicitly says otherwise.

## Expected repo discovery
Before making non-trivial changes, inspect:
- `package.json` for scripts and dependencies.
- App/routes/source structure.
- Existing content and component patterns.
- Existing docs before creating new docs.

## Validation expectations
- Documentation-only changes do not require a build unless config or code changed.
- If code changes are made, run the relevant available commands from `package.json` when practical, normally lint/build/dev verification depending on the change.
- If visual changes are made, run the app locally if possible and inspect the relevant route.
- Always report validation performed and any validation not performed.

## Reporting requirements
Every final response must include:
1. Files read, with full relative paths.
2. Files created/modified/deleted/moved, with full relative paths.
3. Key decisions.
4. Validation performed.
5. Risks or uncertainties.
6. File tree / path updates.
7. Recommended next step.

## FILE_TREE rule
- If files are created, deleted, moved, renamed, or structurally reorganized, update `FILE_TREE.md` in the same session.
- If no tree update is needed, explicitly say why in the final report.
