# Task 4 — Integrazione, documentazione e verifica responsive

## Modifiche apportate

- Aggiunto il test `public pages do not link the article template` in `tests/site-review.test.cjs`. Scansiona tutte le pagine HTML pubbliche ed esclude esplicitamente `articolo-modello.html`.
- Inserita nella mappa delle pagine del `README.md` la voce richiesta: `Modello tecnico non collegato per il template del singolo articolo WordPress`.

## Suite automatiche

### A. Pre-browser

Eseguita prima della matrice browser:

```text
node --test tests/site-review.test.cjs
tests 34 | pass 34 | fail 0 | cancelled 0 | skipped 0 | todo 0
```

Esito: **34/34 PASS**.

### B. Post-browser

Eseguita nuovamente dopo la matrice browser:

```text
node --test tests/site-review.test.cjs
```

Output esatto dell'esecuzione finale:

```text
✔ public pages describe professional areas without unearned specialist titles (23.7843ms)
✔ the preliminary contact is presented as information rather than a promotion (12.0001ms)
✔ light-theme secondary colors meet WCAG AA contrast on their backgrounds (5.7579ms)
✔ competence page preserves a logical heading hierarchy (2.5493ms)
✔ competence page places verifiable essentials directly after the hero (3.1086ms)
✔ competence cards keep breathing room below the credentials strip (4.5348ms)
✔ competence page uses four user-oriented credential cards (5.925ms)
✔ small navigation links receive a minimum touch area (3.9588ms)
✔ contact form controls can shrink inside a phone viewport (1.3804ms)
✔ verified professional credentials are consistent across public pages (7.5035ms)
✔ competence credentials distinguish completed titles from ongoing specialization (3.0293ms)
✔ competence credentials link to their institutional sources (1.4779ms)
✔ operational information is cautious and includes an emergency boundary (5.9734ms)
✔ operations cards reuse the established competence-card title hierarchy (4.2051ms)
✔ card families share surfaces while preserving their distinct roles (0.9642ms)
✔ article cards preserve an editorial title hierarchy (0.7723ms)
✔ article archive publishes only real-content states (1.3849ms)
✔ reveal animations keep content visible without JavaScript (1.2169ms)
✔ article archive declares its editorial method and separates resources (1.8892ms)
✔ article template exposes a complete semantic publishing structure (2.8446ms)
✔ public pages do not link the article template (1.7302ms)
✔ process cards preserve roman numerals and display titles (0.7387ms)
✔ informational cards share the competence-card title treatment (1.284ms)
✔ primary navigation stays focused while secondary destinations remain available (1.8842ms)
✔ the journey page offers a working internal index (0.9016ms)
✔ forensic pages use stable professional language without temporary notices (0.8329ms)
✔ the forensic page distinguishes audiences and professional roles (0.7512ms)
✔ civil, criminal, and family forensic areas receive equal structure (1.0931ms)
✔ the forensic workflow presents six ordered phases (1.1318ms)
✔ the forensic page states the boundaries of the professional role (0.9988ms)
✔ the forensic FAQ and CTA guide only appropriate direct requests (3.1997ms)
✔ the WordPress handoff checklist covers every deferred publication task (1.3991ms)
✔ the WordPress checklist defers judicial credentials until verification (0.5832ms)
✔ public HTML uses reusable classes instead of inline styles (1.9132ms)
ℹ tests 34
ℹ suites 0
ℹ pass 34
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 652.948
```

Esito: **34/34 PASS**.

## Matrice browser integrato

| Pagina | Viewport | Tema | Evidenze |
|---|---:|---|---|
| `articoli.html` | 1280×720 | Chiaro | Overflow 0; esattamente 2 elementi `ARTICLE.editorial-area`, entrambi con `H3` e con stesso genitore `.editorial-areas`; `.content-state`, `.editorial-policy`, `.cta-band` e `.footer` presenti, `display: block`, `visibility: visible`; errori console 0. |
| `articoli.html` | 1280×720 | Scuro | Overflow 0; esattamente 2 elementi `ARTICLE.editorial-area`, entrambi con `H3` e con stesso genitore `.editorial-areas`; `.content-state`, `.editorial-policy`, `.cta-band` e `.footer` presenti, `display: block`, `visibility: visible`; errori console 0. |
| `articoli.html` | 390×844 | Chiaro | Overflow 0; esattamente 2 elementi `ARTICLE.editorial-area`, entrambi con `H3` e con stesso genitore `.editorial-areas`; `.content-state`, `.editorial-policy`, `.cta-band` e `.footer` presenti, `display: block`, `visibility: visible`; errori console 0. |
| `articoli.html` | 390×844 | Scuro | Overflow 0; esattamente 2 elementi `ARTICLE.editorial-area`, entrambi con `H3` e con stesso genitore `.editorial-areas`; `.content-state`, `.editorial-policy`, `.cta-band` e `.footer` presenti, `display: block`, `visibility: visible`; errori console 0. |
| `articolo-modello.html` | 1280×720 | Chiaro | Overflow 0; link di ritorno a `articoli.html`, `.article-author` e `.footer` esistenti con `visibility: visible`; `.article-meta` presente, `display: grid`, `visibility: visible`; `.article-index`, `.article-sources` e `.article-disclaimer` presenti, `display: block`, `visibility: visible`; errori console 0. |
| `articolo-modello.html` | 1280×720 | Scuro | Overflow 0; link di ritorno a `articoli.html`, `.article-author` e `.footer` esistenti con `visibility: visible`; `.article-meta` presente, `display: grid`, `visibility: visible`; `.article-index`, `.article-sources` e `.article-disclaimer` presenti, `display: block`, `visibility: visible`; errori console 0. |
| `articolo-modello.html` | 390×844 | Chiaro | Overflow 0; link di ritorno a `articoli.html`, `.article-author` e `.footer` esistenti con `visibility: visible`; `.article-meta` presente, `display: grid`, `visibility: visible`; `.article-index`, `.article-sources` e `.article-disclaimer` presenti, `display: block`, `visibility: visible`; errori console 0. |
| `articolo-modello.html` | 390×844 | Scuro | Overflow 0; link di ritorno a `articoli.html`, `.article-author` e `.footer` esistenti con `visibility: visible`; `.article-meta` presente, `display: grid`, `visibility: visible`; `.article-index`, `.article-sources` e `.article-disclaimer` presenti, `display: block`, `visibility: visible`; errori console 0. |

Viewport ripristinato e scheda di test finalizzata al termine delle verifiche.

## Criticità

Nessuna criticità rilevata.
