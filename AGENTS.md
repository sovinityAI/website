# Sovinity Website human-and-AI working agreement

## GitHub task contract

- GitHub Issues are the source of truth for planned work. The organization project is [Sovinity Product](https://github.com/orgs/sovinityAI/projects/1).
- Implementation work requires an open issue in `sovinityAI/website` or an explicitly linked cross-repository issue. Analysis and read-only investigation do not require an issue.
- Before editing, read the complete issue, comments, labels, dependencies, linked pull requests, and acceptance criteria.
- Keep the change within the issue scope. Record newly discovered work as a separate linked issue instead of silently expanding scope.
- Do not mark an issue complete until every acceptance criterion has been checked against concrete evidence.
- Chat messages, local notes, and an agent's memory are not durable task state. Record decisions, blockers, handoffs, and completion evidence in the GitHub Issue or linked pull request.

## Mandatory Project synchronization

Humans and AI agents follow the lifecycle documented in [`sovinityAI/.github/WORKFLOW.md`](https://github.com/sovinityAI/.github/blob/main/WORKFLOW.md):

- **Backlog**: valid work that is not yet ready or selected.
- **Ready**: specified, unblocked, prioritized, unassigned, and available for a suitable contributor to pull.
- **In progress**: a human or AI contributor has pulled and claimed the issue and is actively working on it.
- **Needs input**: work is paused for a named decision, dependency, sensitive input, or external authority.
- **In review**: output exists and is waiting for human, legal, visual, or technical verification.
- **Done**: the acceptance criteria are verified and the issue is closed.

Keep the Project's **Work type** field current: `Any contributor`, `AI-suitable`, `Human judgment`, `Pairing`, or `External`. It describes the work and never assigns it.

- Pull work only from **Ready** after confirming that it is unassigned and unclaimed; assign the accountable GitHub user, add an AI claim comment where needed, and move it to **In progress** before editing.
- Limit work in progress to one implementation issue per contributor or AI session unless a documented exception is necessary.
- When work pauses, record the exact missing input or dependency, clear the active assignment, and move the issue to **Needs input**.
- When implementation is complete, record verification evidence, clear the implementation assignment, and move the issue to **In review**.
- Never leave an issue **In progress** when work has stopped or an agent turn ends without an active continuation.

## Selecting the next task

- When asked what to do next, inspect open issues across `sovinityAI/cloud`, `sovinityAI/SovinityDesktop`, `sovinityAI/website`, and `sovinityAI/.github`.
- Exclude epics, **Needs input** work, and issues already covered by an open pull request.
- Pull from **Ready**, not from another contributor's assigned work. Prefer `priority:p0`, then `priority:p1`, then `priority:p2`; within a priority, follow dependency order and then the Project's top-to-bottom order.
- Skip work whose **Work type** is unsuitable for the available contributor. `AI-suitable` means AI may perform it; it does not exclude a human contributor.
- Recommend exactly one next issue and identify up to three follow-ups separately.

## Git and pull requests

- Use a branch named `<actor>/<issue-number>-<short-slug>` for implementation work, for example `codex/12-fix-import` or `ludwig/12-fix-import`.
- Reference the issue in commits and pull requests. Use `Closes #<number>` for same-repository issues or `Closes owner/repository#<number>` for cross-repository issues.
- Pull requests must summarize the change, list verification performed, and disclose remaining risks or unfinished acceptance criteria.
- Do not merge or close an issue merely because files were changed; verification decides completion.

## Website verification and publication safety

- Run `python3 scripts/validate_site.py` for every functional or content change and inspect affected German and English pages visually at desktop and mobile sizes.
- Keep legal, naming, domain, and indexing gates explicit. Do not remove draft warnings, enable indexing, or configure a production domain until the corresponding issues are complete.
- Never publish private addresses, identity documents, credentials, or unapproved legal assertions.

