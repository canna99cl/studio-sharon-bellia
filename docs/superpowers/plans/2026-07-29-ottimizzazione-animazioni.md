# Ottimizzazione animazioni — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Conservare l'identità animata del sito riducendo attesa percepita e lavoro grafico non visibile.

**Architecture:** `assets/js/main.js` mantiene le interazioni esistenti e aggiunge due controlli isolati: un preloader basato sul tempo trascorso e uno scheduler del paesaggio governato da viewport e visibilità della scheda. `assets/css/styles.css` usa una classe di stato sulla radice per sospendere le animazioni CSS quando la scheda è nascosta.

**Tech Stack:** HTML5, CSS, JavaScript ES5-compatible, Node test runner.

## Global Constraints

- Preloader minimo 250 ms e fallback massimo 2500 ms.
- Tablet fino a 1200 px: massimo un aggiornamento del paesaggio ogni 33 ms.
- Nessuna modifica a testi, layout, colori, spaziature o navigazione.
- Nessuna nuova dipendenza.
- `prefers-reduced-motion` continua a disattivare il movimento.

---

### Task 1: Preloader temporizzato sul caricamento reale

**Files:**
- Modify: `tests/site-review.test.cjs`
- Modify: `assets/js/main.js`

**Interfaces:**
- Consumes: `performance.now()`, evento `window.load`, `reduceMotion`.
- Produces: `hidePreloader()` e soglie `PRELOADER_MIN_MS = 250`, `PRELOADER_MAX_MS = 2500`.

- [ ] **Step 1: scrivere il test fallente**

```js
test('preloader preserves its identity without adding a fixed post-load delay', () => {
  const js = read('assets/js/main.js');
  assert.match(js, /PRELOADER_MIN_MS\s*=\s*250/);
  assert.match(js, /PRELOADER_MAX_MS\s*=\s*2500/);
  assert.match(js, /Math\.max\(0,\s*PRELOADER_MIN_MS\s*-\s*elapsed\)/);
  assert.doesNotMatch(js, /setTimeout\(hidePreloader,\s*500\)/);
});
```

- [ ] **Step 2: verificare il fallimento**

Run: `node --test --test-name-pattern "preloader preserves" tests/site-review.test.cjs`

Expected: FAIL perché le costanti non esistono e rimane il ritardo fisso di 500 ms.

- [ ] **Step 3: implementare il tempo minimo dal primo avvio**

```js
var preloaderStartedAt = performance.now();
var PRELOADER_MIN_MS = 250;
var PRELOADER_MAX_MS = 2500;

window.addEventListener('load', function () {
  var elapsed = performance.now() - preloaderStartedAt;
  setTimeout(hidePreloader, Math.max(0, PRELOADER_MIN_MS - elapsed));
});
setTimeout(hidePreloader, PRELOADER_MAX_MS);
```

- [ ] **Step 4: verificare il passaggio**

Run: `node --test --test-name-pattern "preloader preserves" tests/site-review.test.cjs`

Expected: PASS.

### Task 2: Scheduler visibile del paesaggio

**Files:**
- Modify: `tests/site-review.test.cjs`
- Modify: `assets/js/main.js`
- Modify: `assets/css/styles.css`

**Interfaces:**
- Consumes: `.hero`, `.landscape__layer`, `document.hidden`, `visibilitychange`, `IntersectionObserver`.
- Produces: `startLandscapeLoop()`, `stopLandscapeLoop()`, `landscapeInView`, `landscapeFrameId`, classe `page-hidden`.

- [ ] **Step 1: scrivere il test fallente**

```js
test('landscape animation runs only while useful', () => {
  const js = read('assets/js/main.js');
  const css = read('assets/css/styles.css');
  assert.match(js, /var landscapeFrameId = null/);
  assert.match(js, /cancelAnimationFrame\(landscapeFrameId\)/);
  assert.match(js, /document\.addEventListener\('visibilitychange'/);
  assert.match(js, /new IntersectionObserver/);
  assert.match(js, /innerWidth <= 1200 \? 33 : 0/);
  assert.match(css, /html\.page-hidden [^{]+\{[^}]*animation-play-state:\s*paused/is);
});
```

- [ ] **Step 2: verificare il fallimento**

Run: `node --test --test-name-pattern "landscape animation runs" tests/site-review.test.cjs`

Expected: FAIL perché il ciclo attuale è permanente.

- [ ] **Step 3: implementare lo scheduler**

Creare un solo `requestAnimationFrame`, cancellarlo quando la hero non è visibile o
`document.hidden` è vero, riavviarlo al rientro e saltare i frame tablet trascorsi da
meno di 33 ms. Usare un `IntersectionObserver` sulla `.hero`; in sua assenza mantenere
`landscapeInView = true`.

- [ ] **Step 4: sospendere le animazioni CSS in background**

Su `visibilitychange`, applicare `page-hidden` a `document.documentElement`. In CSS
mettere in pausa gli elementi con animazioni continue:

```css
html.page-hidden .preloader__path,
html.page-hidden .hero::before,
html.page-hidden .ambito__bg svg,
html.page-hidden .faq__paths path,
html.page-hidden .btn--amber::after,
html.page-hidden .map-pin__pulse {
  animation-play-state: paused;
}
```

- [ ] **Step 5: verificare il passaggio**

Run: `node --test --test-name-pattern "landscape animation runs" tests/site-review.test.cjs`

Expected: PASS.

### Task 3: Regressione completa

**Files:**
- Verify: `assets/js/main.js`
- Verify: `assets/css/styles.css`
- Verify: `tests/site-review.test.cjs`

- [ ] **Step 1: controllare la sintassi**

Run: `node --check assets/js/main.js`

Expected: exit code 0.

- [ ] **Step 2: eseguire tutta la suite**

Run: `node --test tests/site-review.test.cjs`

Expected: tutti i test superati.

- [ ] **Step 3: controllare che l'ambito sia rimasto limitato**

Run: `rg -n "PRELOADER_|landscapeFrameId|page-hidden" assets/js/main.js assets/css/styles.css tests/site-review.test.cjs`

Expected: modifiche limitate ai controlli prestazionali previsti.

Il progetto non è un repository Git: i passaggi di commit sono intenzionalmente omessi.
