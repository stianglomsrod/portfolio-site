# Report Format Hardening — Why, What, and How

## Why this rule was added
An earlier agent session delivered useful content but wrapped it in chatty prose status updates rather than a single copyable Markdown block. The user could not grab the full handoff in one click. This defeats the core purpose of the reporting protocol: enabling frictionless LLM-to-LLM continuity and giving the user a one-button copy action for pasting into ChatGPT, Codex, or another Copilot session.

The specific bad behavior observed:
- Section summaries as freeform prose above a code block.
- Separate action items listed as bullets outside the copyable block.
- Partial duplicate structure inside and outside the block.
- Report sections presented in plain chat text, breaking the single-click copy intent.

## What bad behavior this prevents
- Prose fragments before the fenced block (user must scroll and manually select).
- Prose fragments after the block (continuity breaks for the receiving LLM).
- Duplicate content: same summary shown twice, once as prose and once inside the block.
- Nested triple-backtick fences that break the outer block and split the copy action.
- Reports missing critical sections (git status, claim QA, session context, reasoning against rules).
- Auto-commits that the user did not request.
- ZIP and binary artifacts committed to the repo without explicit user request or justification.

## What future agents must do
1. The final response is exactly one fenced Markdown code block starting with a Markdown heading.
2. No prose before the block. No prose after the block.
3. Section 0 of the report must be the verbatim user prompt.
4. Sections 0 through 11 must all be present (see AGENTS.md and DNB_AGENT_HANDOFF_PROTOCOL.md for the full list).
5. No nested triple-backtick fences. Use indented plain text for trees, command output, and code examples.
6. Do not commit unless the user explicitly asked for a commit or unless committing is listed in the acceptance criteria.
7. Do not add ZIPs or binary artifacts to the repo without explicit request and written justification in the report.

## How this supports the DNB AI-first engineering workflow
The DNB portfolio variant is built through a multi-agent chain: Copilot Auto implements, ChatGPT reviews strategy and continuity, Codex handles hard problems. Each handoff depends on a complete, machine-readable session report. Chatty prose breaks this chain because:
- The receiving LLM cannot reliably extract structured state from free-form chat output.
- The user cannot confidently copy the full context with one action.
- Undocumented auto-commits and repo artifacts create unexpected state that agents in the next session must reconcile.

A strict single-block format with required sections makes every session result directly usable as the context input for the next session, which is what disciplined AI-first engineering workflow requires.
