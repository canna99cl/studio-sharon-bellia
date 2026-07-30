# Task 1 — Contratto automatico dell’archivio pubblico

Read `docs/superpowers/specs/2026-07-28-archivio-articoli-design.md` for the approved design, then implement only Task 1 from `docs/superpowers/plans/2026-07-28-archivio-articoli.md`.

Modify only `tests/site-review.test.cjs`. Add the two tests specified in Task 1:

1. `article archive publishes only real-content states`
2. `article archive declares its editorial method and separates resources`

Follow TDD: run the complete test file and confirm the new tests fail because the archive still contains demo titles and lacks the new editorial structure. Do not modify production files. Preserve all existing tests.

Write the full work report to `.superpowers/sdd/2026-07-28-archivio-articoli/task-1-report.md`, including files changed, exact command, failure summary, and self-review. Return only status, one-line test summary, and concerns.
