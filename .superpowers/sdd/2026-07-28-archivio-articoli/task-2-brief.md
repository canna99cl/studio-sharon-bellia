# Task 2 — Ricostruire `articoli.html`

Read `docs/superpowers/specs/2026-07-28-archivio-articoli-design.md` first, then implement only Task 2 from `docs/superpowers/plans/2026-07-28-archivio-articoli.md`.

The two red contracts already exist in `tests/site-review.test.cjs`. Modify only:

- `articoli.html`
- `assets/css/styles.css`

Replace the six demo article cards with the approved public archive:

- introduction;
- explicit `Contenuti in preparazione` state;
- exactly two same-level non-clickable `.editorial-area` informational cards;
- `section.editorial-policy` containing the four editorial criteria and the contextual link to `risorse.html`;
- distinction between reading articles and downloadable materials;
- existing sober CTA, header, footer and navigation preserved.

Use the exact HTML and CSS contract in Task 2 of the plan, adapting only class composition to the established `.info-card` component where needed. Do not create the article template yet and do not add real article claims.

Run `node --test tests/site-review.test.cjs` and require all tests to pass. Check the changed HTML for one `h1`, correct heading order and no empty links.

Write the full report to `.superpowers/sdd/2026-07-28-archivio-articoli/task-2-report.md`, including files changed, command and output, structural checks, and self-review. Return only status, one-line test summary, and concerns.
