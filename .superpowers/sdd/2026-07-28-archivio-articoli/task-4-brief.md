# Task 4 — Integrazione, documentazione e verifica responsive

Read `docs/superpowers/specs/2026-07-28-archivio-articoli-design.md` first, then implement only Task 4 from `docs/superpowers/plans/2026-07-28-archivio-articoli.md`.

Modify:

- `tests/site-review.test.cjs`
- `README.md`

Do not redesign or rewrite the approved archive or article model unless a verification exposes a real defect; if it does, first add a failing regression test, then apply the minimal fix.

Required work:

1. Add `public pages do not link the article template`, excluding `articolo-modello.html` itself from the scan.
2. Add the model to the README page map with this exact responsibility: `Modello tecnico non collegato per il template del singolo articolo WordPress`.
3. Run the complete Node test suite.
4. Verify `articoli.html` and `articolo-modello.html` in the in-app browser at 1280×720 and 390×844, light and dark themes.
5. For every page/viewport/theme combination verify overflow equals 0, the relevant editorial structures are visible, and console errors equal 0.
6. Reset any temporary browser viewport and clean up test tabs.
7. Run the complete suite again after visual verification.

Use the Browser skill and follow its documentation before browser control. Do not publish, upload or transmit anything.

Write the full report to `.superpowers/sdd/2026-07-28-archivio-articoli/task-4-report.md`, including exact test output and a compact matrix of browser results. Return only status, one-line test/browser summary and concerns.
