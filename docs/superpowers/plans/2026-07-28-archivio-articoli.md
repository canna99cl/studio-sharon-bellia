# Archivio articoli Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sostituire gli articoli dimostrativi con un archivio trasparente in preparazione e creare un modello semantico pronto per WordPress.

**Architecture:** `articoli.html` resta l’unico archivio pubblico e usa componenti informativi non cliccabili. `articolo-modello.html` definisce separatamente la struttura di un singolo articolo senza essere collegato dal sito; gli stili condivisi restano in `assets/css/styles.css` e i requisiti sono protetti da `tests/site-review.test.cjs`.

**Tech Stack:** HTML5 semantico, CSS custom properties e responsive CSS, Node.js Test Runner.

## Global Constraints

- Non pubblicare titoli o testi clinici fittizi.
- Mantenere Psicologia clinica e Psicologia giuridica e forense sullo stesso livello.
- Mantenere `risorse.html` separata e non simulare raccolta dati o download.
- Non collegare pubblicamente `articolo-modello.html`.
- Conservare menu, footer, CTA sobrie, temi chiaro/scuro e design system esistente.
- Garantire un solo `h1`, titoli senza salti, link validi e assenza di overflow a 1280×720 e 390×844.

---

### Task 1: Contratto automatico dell’archivio pubblico

**Files:**
- Modify: `tests/site-review.test.cjs`
- Test: `tests/site-review.test.cjs`

**Interfaces:**
- Consumes: helper `read(name)` e file `articoli.html`.
- Produces: test `article archive publishes only real-content states`.

- [ ] **Step 1: Scrivere il test in errore**

```js
test('article archive publishes only real-content states', () => {
  const html = read('articoli.html');
  for (const demoTitle of [
    "Quando l'ansia diventa una bussola",
    "L'ascolto del minore nei percorsi giudiziari",
    'Iniziare una terapia: cosa aspettarsi davvero',
    'Dipendenza affettiva: riconoscerla, uscirne',
    'CTP: a cosa serve il consulente di parte',
    'Il lutto: attraversarlo senza fretta',
  ]) {
    assert.doesNotMatch(html, new RegExp(demoTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
  }
  assert.match(html, /Contenuti in preparazione/i);
  assert.equal((html.match(/class="[^"]*editorial-area[^"]*"/g) || []).length, 2);
  assert.match(html, /Psicologia clinica/i);
  assert.match(html, /Psicologia giuridica e forense/i);
});
```

- [ ] **Step 2: Eseguire il test e verificare il fallimento**

Run: `node --test tests/site-review.test.cjs`

Expected: FAIL perché i sei titoli dimostrativi sono ancora presenti e le due aree editoriali non esistono.

- [ ] **Step 3: Aggiungere il contratto editoriale**

```js
test('article archive declares its editorial method and separates resources', () => {
  const html = read('articoli.html');
  for (const criterion of ['firma', 'data di pubblicazione', 'fonti', 'ultima revisione']) {
    assert.match(html, new RegExp(criterion, 'i'));
  }
  assert.match(html, /articoli[^<]*(?:lettura|approfondimenti)/i);
  assert.match(html, /href="risorse\.html"/i);
  assert.match(html, /materiali scaricabili/i);
});
```

- [ ] **Step 4: Eseguire nuovamente per confermare entrambi i fallimenti**

Run: `node --test tests/site-review.test.cjs`

Expected: FAIL sui nuovi requisiti dell’archivio.

---

### Task 2: Ricostruire `articoli.html`

**Files:**
- Modify: `articoli.html`
- Modify: `assets/css/styles.css`
- Test: `tests/site-review.test.cjs`

**Interfaces:**
- Consumes: classi condivise `.info-card`, `.eyebrow`, `.display`, `.cta-band`.
- Produces: `.editorial-intro`, `.editorial-areas`, `.editorial-area`, `.editorial-policy`, `.content-state`.

- [ ] **Step 1: Sostituire le sei card con la struttura dell’archivio**

```html
<section class="editorial-hub section--flush-top" aria-labelledby="editorial-intro-title">
  <div class="container">
    <div class="editorial-intro">
      <p class="eyebrow reveal">Uno spazio divulgativo</p>
      <h2 class="display reveal" id="editorial-intro-title">Comprendere con parole chiare</h2>
      <p class="reveal">Questo archivio raccoglierà articoli di lettura e approfondimento dedicati alla psicologia e ai suoi contesti applicativi.</p>
    </div>
    <div class="content-state reveal" role="status">
      <span>Archivio editoriale</span>
      <strong>Contenuti in preparazione</strong>
      <p>I primi approfondimenti saranno pubblicati dopo una revisione accurata delle fonti.</p>
    </div>
    <div class="editorial-areas">
      <article class="info-card editorial-area reveal">
        <p class="eyebrow">Area tematica</p>
        <h3>Psicologia clinica</h3>
        <p>Approfondimenti su benessere psicologico, relazioni, genitorialità e percorsi di sostegno.</p>
      </article>
      <article class="info-card editorial-area reveal">
        <p class="eyebrow">Area tematica</p>
        <h3>Psicologia giuridica e forense</h3>
        <p>Contenuti informativi su ruoli, procedure e confini dell’attività psicologica nei contesti giudiziari.</p>
      </article>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Inserire metodo editoriale e distinzione dalle risorse**

```html
<section class="editorial-policy" aria-labelledby="editorial-policy-title">
  <div class="container">
    <p class="eyebrow reveal">Criteri editoriali</p>
    <h2 class="display reveal" id="editorial-policy-title">Contenuti verificabili e aggiornati</h2>
    <ul class="editorial-policy__list reveal">
      <li>Firma dell’autrice</li>
      <li>Data di pubblicazione</li>
      <li>Fonti consultabili</li>
      <li>Data dell’ultima revisione</li>
    </ul>
    <p class="reveal">Gli articoli saranno contenuti di lettura e approfondimento. I materiali scaricabili e gli ebook resteranno nella pagina <a class="text-link" href="risorse.html">Risorse</a>.</p>
  </div>
</section>
```

- [ ] **Step 3: Aggiungere gli stili minimi responsive**

```css
.editorial-hub { padding: var(--sp-6) 0 var(--sp-7); }
.editorial-intro { max-width: var(--measure); }
.content-state { margin: var(--sp-5) 0; padding: var(--sp-4); border-block: 1px solid var(--border); }
.content-state span { color: var(--eyebrow-c); font-size: var(--step--1); letter-spacing: .16em; text-transform: uppercase; }
.content-state strong { display: block; margin-top: var(--sp-1); font-family: var(--font-display); font-size: var(--step-2); font-weight: 400; }
.editorial-areas { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--sp-4); }
.editorial-policy { padding: var(--sp-7) 0; background: var(--bg-alt); border-block: 1px solid var(--border); }
.editorial-policy__list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--sp-2) var(--sp-5); margin: var(--sp-4) 0; padding-left: 1.25rem; }
@media (max-width: 700px) {
  .editorial-areas,
  .editorial-policy__list { grid-template-columns: 1fr; }
}
```

- [ ] **Step 4: Eseguire i test**

Run: `node --test tests/site-review.test.cjs`

Expected: PASS per i test dell’archivio; nessuna regressione.

---

### Task 3: Creare la pagina-articolo modello non pubblica

**Files:**
- Create: `articolo-modello.html`
- Modify: `assets/css/styles.css`
- Modify: `tests/site-review.test.cjs`

**Interfaces:**
- Consumes: header, footer, breadcrumb e token grafici delle altre pagine.
- Produces: `.article-template`, `.article-meta`, `.article-index`, `.article-copy`, `.article-sources`, `.article-disclaimer`, `.article-author`.

- [ ] **Step 1: Scrivere il test in errore della pagina modello**

```js
test('article template exposes a complete semantic publishing structure', () => {
  const html = read('articolo-modello.html');
  assert.equal((html.match(/<h1\b/gi) || []).length, 1);
  assert.match(html, /Pagina modello/i);
  for (const field of ['Autrice', 'Pubblicazione', 'Ultima revisione', 'Tempo di lettura']) {
    assert.match(html, new RegExp(field, 'i'));
  }
  assert.match(html, /aria-label="Indice dell'articolo"/i);
  assert.match(html, /id="fonti"/i);
  assert.match(html, /non sostituisce una valutazione professionale/i);
  assert.match(html, /Dott\.ssa Sharon Maria Bellia/i);
  assert.match(html, /href="articoli\.html"/i);
});
```

- [ ] **Step 2: Verificare il fallimento**

Run: `node --test tests/site-review.test.cjs`

Expected: FAIL con `ENOENT` perché `articolo-modello.html` non esiste.

- [ ] **Step 3: Creare il documento semantico**

Il `<main>` deve contenere esattamente questa struttura funzionale:

```html
<article class="article-template">
  <header class="article-template__header">
    <nav class="breadcrumb" aria-label="Percorso di navigazione"><a href="index.html">Home</a><span>/</span><a href="articoli.html">Articoli</a><span>/</span>Pagina modello</nav>
    <p class="eyebrow">Categoria editoriale</p>
    <h1 class="display">Titolo dell’articolo — pagina modello</h1>
    <p class="article-template__summary">Sommario introduttivo: presenta con chiarezza la domanda affrontata e ciò che la persona troverà nell’articolo.</p>
    <dl class="article-meta">
      <div><dt>Autrice</dt><dd>Dott.ssa Sharon Maria Bellia</dd></div>
      <div><dt>Pubblicazione</dt><dd>[giorno mese anno]</dd></div>
      <div><dt>Ultima revisione</dt><dd>[giorno mese anno]</dd></div>
      <div><dt>Tempo di lettura</dt><dd>[n] minuti</dd></div>
    </dl>
  </header>
  <nav class="article-index" aria-label="Indice dell'articolo">
    <h2>In questa pagina</h2>
    <ol><li><a href="#introduzione">Introduzione</a></li><li><a href="#approfondimento">Approfondimento</a></li><li><a href="#fonti">Fonti</a></li></ol>
  </nav>
  <div class="article-copy">
    <section id="introduzione"><h2>Introduzione</h2><p>[Testo introduttivo dell’articolo.]</p></section>
    <section id="approfondimento"><h2>Approfondimento</h2><p>[Sviluppo del contenuto, con linguaggio accessibile e riferimenti verificabili.]</p></section>
    <section class="article-sources" id="fonti"><h2>Fonti</h2><ol><li>[Riferimento bibliografico o fonte istituzionale.]</li></ol></section>
  </div>
  <aside class="article-disclaimer"><p>Questo contenuto ha finalità divulgative e non sostituisce una valutazione professionale.</p></aside>
  <footer class="article-author"><p>Scritto e revisionato dalla Dott.ssa Sharon Maria Bellia.</p><a class="text-link" href="articoli.html">Torna agli articoli</a></footer>
</article>
```

- [ ] **Step 4: Aggiungere gli stili del modello**

```css
.article-template { width: min(100% - 2.5rem, 52rem); margin-inline: auto; padding: var(--sp-7) 0; }
.article-template__header { padding-bottom: var(--sp-5); border-bottom: 1px solid var(--border); }
.article-template__summary { margin-top: var(--sp-3); font-size: var(--step-1); color: var(--text-soft); }
.article-meta { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--sp-3); margin-top: var(--sp-4); }
.article-meta dt { color: var(--eyebrow-c); font-size: var(--step--1); font-weight: 600; }
.article-index, .article-disclaimer, .article-author { margin-top: var(--sp-5); padding: var(--sp-4); border: 1px solid var(--border); background: var(--surface); }
.article-copy section { padding-top: var(--sp-5); }
.article-copy h2, .article-index h2 { font-family: var(--font-display); font-weight: 400; }
@media (max-width: 700px) {
  .article-meta { grid-template-columns: 1fr; }
}
```

- [ ] **Step 5: Eseguire i test**

Run: `node --test tests/site-review.test.cjs`

Expected: PASS per struttura, metadati, indice, fonti, disclaimer e firma.

---

### Task 4: Impedire la pubblicazione involontaria e verificare il risultato

**Files:**
- Modify: `tests/site-review.test.cjs`
- Modify: `README.md`
- Test: `tests/site-review.test.cjs`

**Interfaces:**
- Consumes: elenco `htmlFiles`.
- Produces: protezione da link pubblici al modello e nota di consegna WordPress.

- [ ] **Step 1: Scrivere il test in errore sull’assenza di collegamenti**

```js
test('public pages do not link the article template', () => {
  for (const file of htmlFiles.filter((name) => name !== 'articolo-modello.html')) {
    assert.doesNotMatch(read(file), /href="articolo-modello\.html"/i, `${file} publishes the template`);
  }
});
```

- [ ] **Step 2: Eseguire il test**

Run: `node --test tests/site-review.test.cjs`

Expected: PASS immediato, perché verifica un vincolo già rispettato; se fallisce, rimuovere esclusivamente il collegamento trovato. Questo è un test di conservazione, non introduce produzione nuova.

- [ ] **Step 3: Documentare il modello nella mappa WordPress**

Aggiungere alla tabella delle pagine in `README.md`:

```markdown
| `articolo-modello.html` | Modello tecnico non collegato per il template del singolo articolo WordPress |
```

- [ ] **Step 4: Eseguire la suite completa**

Run: `node --test tests/site-review.test.cjs`

Expected: tutti i test PASS, senza errori o avvisi.

- [ ] **Step 5: Verificare nel browser**

Controllare `articoli.html` e `articolo-modello.html` a 1280×720 e 390×844, in tema chiaro e scuro. Misurare `document.documentElement.scrollWidth - document.documentElement.clientWidth` e richiedere valore `0`. Verificare visivamente stato editoriale, pari gerarchia delle due aree, metadati del modello, indice, fonti, CTA e footer. Controllare la console e richiedere zero errori.

- [ ] **Step 6: Eseguire un’ultima suite dopo il controllo visuale**

Run: `node --test tests/site-review.test.cjs`

Expected: tutti i test PASS.
