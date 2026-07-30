# Task 3 — Pagina-articolo modello

Read `docs/superpowers/specs/2026-07-28-archivio-articoli-design.md` first, then implement only Task 3 from `docs/superpowers/plans/2026-07-28-archivio-articoli.md`.

Create `articolo-modello.html` as a technical WordPress reference that is not linked by public pages. Modify:

- `tests/site-review.test.cjs`
- `articolo-modello.html`
- `assets/css/styles.css`

Follow TDD:

1. add the exact semantic structure test from Task 3;
2. run the suite and observe `ENOENT`;
3. create the page with the existing shared header/footer shell and the exact `<main>` structure specified in the plan;
4. add the specified responsive article-template styles;
5. run the complete suite and require green.

Required structure: one `h1`, visible “Pagina modello” identification, category, summary, author/publication/revision/reading-time metadata, internal index, introduction and development placeholders, sources, professional disclaimer, author signature, and return link to `articoli.html`.

The page must inherit the Task 2 no-JS visibility behavior, have correct heading hierarchy, no empty links or duplicate IDs, no real clinical claims, and no public link to itself.

Write the full report to `.superpowers/sdd/2026-07-28-archivio-articoli/task-3-report.md`, including the observed red failure, green output, structural checks and self-review. Return only status, one-line test summary and concerns.
