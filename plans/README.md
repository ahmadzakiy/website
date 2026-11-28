# Animation implementation plans

Created from the animation audit of `/Users/mekari/Desktop/project/website` at HEAD `40e3814`, including its uncommitted portfolio redesign. Both plans are specifications; implementation and browser verification remain TODO.

| Order | Plan | Severity | Status | Dependencies |
| --- | --- | --- | --- | --- |
| 1 | [001 — Fix reduced-motion CSS](001-fix-reduced-motion-cascade.md) | MEDIUM | TODO | None |
| 2 | [002 — Respect reduced motion in scrolling](002-respect-reduced-motion-in-scroll.md) | MEDIUM | TODO | None; verify together with 001 afterward |

## Execution order

Implement 001 first because it is a contained CSS change affecting all primary controls. Then implement 002 for global scrolling. The changes touch different files and have no code dependency, but the combined reduced-motion experience must be checked after both are applied.

## Working-tree prerequisite

The redesign is not committed. A clean worktree at HEAD alone will not contain the audited CSS and component structure. Before using an isolated executor, carry over the relevant current source and verify the exact snapshots in each plan. Do not commit, stage, discard, or reset user changes to manufacture that baseline. If the code does not match, report drift.

## Remaining audit items

- Project-card press duration (220ms versus the 100–160ms press budget): not selected for this planning pass.
- Health-page text scrambling without reduced-motion support: not selected for this planning pass.
- A pointer-only theme color transition was an optional opportunity, not a required correction.

## Running a plan

Use `improve-animations execute <plan-path>` for the skill's isolated executor workflow, or provide a plan to another implementation agent. Source edits are outside the audit/planning phase. No commit or push is authorized.
