# Home gerarchia e CTA mobile Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Allineare la home allo stato professionale previsto alla pubblicazione, compattare hero e Ambiti e integrare Primo contatto e WhatsApp in una sola barra mobile.

**Architecture:** Test strutturali in `tests/site-review.test.cjs` proteggono testi, stato delle credenziali e contratto DOM/CSS della barra mobile. `index.html` conserva la struttura semantica esistente; `assets/css/styles.css` gestisce gerarchia e responsive, mentre `assets/js/main.js` crea un solo gruppo di azioni persistenti riutilizzabile in tutte le pagine.

**Tech Stack:** HTML5, CSS custom properties e media query, JavaScript ES5-compatible senza dipendenze, Node.js Test Runner.

## Global Constraints

- Non inserire fotografie, recapiti, privacy, cookie o integrazioni WordPress.
- Non attribuire il titolo di psicoterapeuta.
- Mantenere ALETEIA come percorso in corso dal 2025.
- Presentare il Master eCampus come titolo conseguito, coerentemente con `competenze.html`.
- Conservare le tre pagine di destinazione esistenti.
- Su desktop conservare WhatsApp flottante; su telefono usare un solo contenitore con Primo contatto e WhatsApp.
- Garantire touch target minimi 44×44 px, safe area, assenza di overflow e contenuti non coperti.

---

### Task 1: Allineare Master e testo professionale

**Files:**
- Modify: `tests/site-review.test.cjs`
- Modify: `index.html`
- Test: `tests/site-review.test.cjs`

**Interfaces:**
- Consumes: helper `read(name)`.
- Produces: contratto `home credentials match the publication-state competence page`.

- [ ] **Step 1: Scrivere il test in errore**

```js
test('home credentials match the publication-state competence page', () => {
  const home = read('index.html');
  assert.match(home, /Master universitario di II livello[\s\S]{0,350}Università eCampus[\s\S]{0,180}titolo conseguito/i);
  assert.match(home, /Scuola ALETEIA[\s\S]{0,220}Percorso in corso dal 2025/i);
  assert.doesNotMatch(home, /discussione finale prevista|7 settembre 2026|Master[^<]{0,120}in corso/i);
  assert.doesNotMatch(home, /psicoterapeuta/i);
});
```

- [ ] **Step 2: Verificare il rosso**

Run: `node --test tests/site-review.test.cjs`

Expected: FAIL sulle diciture correnti del Master e sulla descrizione ALETEIA priva di “Percorso in corso dal 2025”.

- [ ] **Step 3: Aggiornare i due testi della home**

Sostituire il secondo paragrafo in `.about__content` con:

```html
<p class="about__text reveal">Accanto all'area clinica, la formazione in psicologia giuridica e forense sostiene un lavoro fondato su rigore, imparzialità e un linguaggio comprensibile a chi deve decidere.</p>
```

Aggiornare le due credenziali con:

```html
<span class="txt">Formazione specialistica in Psicoterapia<small><a href="https://www.aleteia.it/wb/" target="_blank" rel="noopener">Scuola ALETEIA · percorso in corso dal 2025 · orientamento cognitivista, costruttivista e complesso</a></small></span>
```

```html
<span class="txt">Psicologia giuridica e forense<small><a href="https://www.uniecampus.it/master/master-primo-e-secondo-livello/criminologia-psicologia-giuridica-e-forense" target="_blank" rel="noopener">Master universitario di II livello · Università eCampus · titolo conseguito</a></small></span>
```

- [ ] **Step 4: Eseguire la suite**

Run: `node --test tests/site-review.test.cjs`

Expected: PASS, senza regressioni.

---

### Task 2: Compattare il hero e precisarne il testo

**Files:**
- Modify: `tests/site-review.test.cjs`
- Modify: `index.html`
- Modify: `assets/css/styles.css`
- Test: `tests/site-review.test.cjs`

**Interfaces:**
- Consumes: `.hero`, `.hero__content`, `.hero__title`, `.hero__lede`, `.hero__actions`.
- Produces: hero misurabile dentro 720/844 px.

- [ ] **Step 1: Scrivere il test del testo e dei token di layout**

```js
test('home hero uses precise copy and compact responsive spacing', () => {
  const html = read('index.html');
  const css = read('assets/css/styles.css');
  assert.match(html, /Uno studio a Caltanissetta dedicato all'ascolto e alla comprensione\. Percorsi psicologici per la persona e consulenze per l'ambito giuridico\./i);
  assert.doesNotMatch(html, /Percorsi di cura/i);
  assert.match(css, /\.hero__content\s*\{[^}]*padding-top:\s*clamp\([^}]*padding-bottom:\s*clamp\(/is);
  assert.match(css, /@media\s*\(max-width:\s*640px\)[\s\S]*?\.hero__lede\s*\{[^}]*margin-bottom:\s*var\(--sp-3\)/is);
});
```

- [ ] **Step 2: Verificare il rosso**

Run: `node --test tests/site-review.test.cjs`

Expected: FAIL su testo e spaziatura.

- [ ] **Step 3: Sostituire il testo del hero**

```html
<p class="hero__lede reveal">Uno studio a Caltanissetta dedicato all'ascolto e alla comprensione. Percorsi psicologici per la persona e consulenze per l'ambito giuridico.</p>
```

- [ ] **Step 4: Rendere il layout più compatto**

Usare come base:

```css
.hero__content {
  position: relative;
  z-index: var(--z-content);
  padding-top: clamp(6.5rem, 12vh, 7.5rem);
  padding-bottom: clamp(2.5rem, 6vh, 4rem);
}
```

Nel media query `max-width: 640px` impostare:

```css
.hero { min-height: 100svh; }
.hero__content { padding-top: 5.5rem; padding-bottom: 2rem; }
.hero__eyebrow { margin-bottom: var(--sp-2); }
.hero__title { font-size: clamp(2.75rem, 13vw, 3.65rem); margin-bottom: var(--sp-2); }
.hero__lede { font-size: 1.08rem; line-height: 1.55; margin-bottom: var(--sp-3); }
.hero__actions { gap: .65rem; }
.hero__actions .btn { padding-block: .72rem; }
.hero__availability { margin-top: var(--sp-2); }
```

- [ ] **Step 5: Eseguire la suite**

Run: `node --test tests/site-review.test.cjs`

Expected: PASS.

---

### Task 3: Rendere espliciti i due percorsi principali

**Files:**
- Modify: `tests/site-review.test.cjs`
- Modify: `index.html`
- Modify: `assets/css/styles.css`
- Test: `tests/site-review.test.cjs`

**Interfaces:**
- Consumes: `.ambiti`, tre `.ambito`, link esistenti.
- Produces: `.ambiti__intro`, `.ambito--clinical`, `.ambito--continuing`, `.ambito--forensic`.

- [ ] **Step 1: Scrivere il contratto in errore**

```js
test('home presents two principal paths while preserving three destinations', () => {
  const html = read('index.html');
  assert.match(html, /<header class="ambiti__intro"[\s\S]*?<h2[^>]*>Due percorsi, un orientamento chiaro<\/h2>/i);
  assert.equal((html.match(/class="[^"]*\bambito\b[^"]*"/g) || []).length, 3);
  assert.match(html, /class="[^"]*ambito--clinical[^"]*"/i);
  assert.match(html, /class="[^"]*ambito--continuing[^"]*"/i);
  assert.match(html, /class="[^"]*ambito--forensic[^"]*"/i);
  for (const href of ['psicologia-clinica.html', 'psicoterapia.html', 'psicologia-forense.html']) {
    assert.match(html, new RegExp(`href="${href.replace('.', '\\.')}"`, 'i'));
  }
});
```

- [ ] **Step 2: Verificare il rosso**

Run: `node --test tests/site-review.test.cjs`

Expected: FAIL per introduzione e classi mancanti.

- [ ] **Step 3: Inserire l’introduzione semantica**

Subito dentro `section.ambiti`:

```html
<header class="ambiti__intro container reveal">
  <p class="eyebrow">Ambiti di intervento</p>
  <h2 class="display">Due percorsi, un orientamento chiaro</h2>
  <p>Il percorso psicologico comprende sostegno e lavoro continuativo; l'ambito giuridico-forense risponde a quesiti e incarichi con finalità differenti.</p>
</header>
```

Modificare soltanto gli attributi `class` dei tre tag di apertura esistenti:

- prima sezione: `class="ambito ambito--clinical"`;
- seconda sezione: `class="ambito ambito--dark ambito--continuing"`;
- terza sezione: `class="ambito ambito--forensic"`.

Cambiare l’eyebrow della seconda sezione in `Percorso psicologico · approfondimento` e mantenere la formulazione prudente della formazione in corso.

- [ ] **Step 4: Ridurre la lunghezza della sezione**

```css
.ambiti__intro { padding-block: var(--sp-6); max-width: var(--container); }
.ambiti__intro h2 { font-size: var(--step-3); margin: var(--sp-2) 0; }
.ambiti__intro p:last-child { max-width: var(--measure); color: var(--text-soft); }
.ambito { padding: var(--sp-7) 0; }
.ambito--continuing { padding-block: var(--sp-6); }
@media (max-width: 640px) {
  .ambiti__intro { padding-block: var(--sp-5); }
  .ambito, .ambito--continuing { padding-block: var(--sp-6); }
}
```

- [ ] **Step 5: Eseguire la suite**

Run: `node --test tests/site-review.test.cjs`

Expected: PASS.

---

### Task 4: Unificare Primo contatto e WhatsApp su telefono

**Files:**
- Modify: `tests/site-review.test.cjs`
- Modify: `assets/js/main.js`
- Modify: `assets/css/styles.css`
- Test: `tests/site-review.test.cjs`

**Interfaces:**
- Consumes: `bookingHref`, `WHATSAPP_NUMBER`, `WHATSAPP_MSG`.
- Produces: `.mobile-cta`, `.mobile-cta__primary`, `.mobile-cta__whatsapp`, `.whatsapp-float`.

- [ ] **Step 1: Scrivere i test in errore**

```js
test('mobile actions share one compact safe-area bar', () => {
  const js = read('assets/js/main.js');
  const css = read('assets/css/styles.css');
  assert.match(js, /a\.textContent\s*=\s*'Primo contatto'/i);
  assert.match(js, /className\s*=\s*'mobile-cta__whatsapp'/i);
  assert.match(js, /bar\.appendChild\(whatsapp\)/i);
  assert.match(css, /@media\s*\(max-width:\s*700px\)[\s\S]*?\.mobile-cta\s*\{[^}]*display:\s*grid/is);
  assert.match(css, /grid-template-columns:\s*minmax\(0,\s*1fr\)\s+3rem/i);
  assert.match(css, /env\(safe-area-inset-bottom\)/i);
  assert.match(css, /\.mobile-cta__primary[^}]*min-height:\s*44px/is);
  assert.match(css, /\.mobile-cta__whatsapp[^}]*width:\s*48px[^}]*height:\s*48px/is);
  assert.match(css, /@media\s*\(max-width:\s*700px\)[\s\S]*?\.whatsapp-float\s*\{[^}]*display:\s*none/is);
});
```

- [ ] **Step 2: Verificare il rosso**

Run: `node --test tests/site-review.test.cjs`

Expected: FAIL perché WhatsApp è ancora indipendente e la CTA è estesa.

- [ ] **Step 3: Costruire entrambe le azioni nella barra**

Nel blocco che crea `.mobile-cta`:

```js
var primary = document.createElement('a');
primary.className = 'btn btn--amber mobile-cta__primary';
primary.href = bookingHref;
primary.textContent = 'Primo contatto';

var whatsapp = document.createElement('a');
whatsapp.className = 'mobile-cta__whatsapp';
whatsapp.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(WHATSAPP_MSG);
whatsapp.target = '_blank';
whatsapp.rel = 'noopener';
whatsapp.setAttribute('aria-label', 'Scrivici su WhatsApp');
whatsapp.innerHTML = WHATSAPP_ICON;

bar.appendChild(primary);
bar.appendChild(whatsapp);
```

Conservare la creazione di `.whatsapp-float` per desktop.

Prima dei due blocchi, estrarre l’icona già presente in una costante condivisa e usarla per entrambe le azioni:

```js
var WHATSAPP_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2.1-.4 0-.5l-.9-2.1c-.2-.5-.4-.4-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s1 2.5 1.1 2.7c.1.2 1.9 2.9 4.6 4 .6.3 1.1.5 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.4z"/><path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3c1.4.8 3.1 1.2 4.9 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3C4.4 15.1 4 13.6 4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8z"/></svg>';
```

- [ ] **Step 4: Stilizzare il gruppo mobile**

```css
@media (max-width: 700px) {
  .mobile-cta {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 3rem;
    align-items: center;
    gap: .65rem;
    padding: .55rem 1rem calc(.55rem + env(safe-area-inset-bottom));
  }
  .mobile-cta__primary { width: 100%; min-height: 44px; padding-block: .65rem; }
  .mobile-cta__whatsapp {
    width: 48px; height: 48px; border-radius: 50%;
    display: grid; place-items: center;
    background: #25D366; color: #fff;
  }
  .mobile-cta__whatsapp svg { width: 26px; height: 26px; }
  .whatsapp-float { display: none; }
  body.has-mobile-cta { padding-bottom: calc(4.5rem + env(safe-area-inset-bottom)); }
}
```

- [ ] **Step 5: Eseguire test e controllo sintattico**

Run: `node --test tests/site-review.test.cjs`

Expected: PASS.

Run: `node --check assets/js/main.js`

Expected: exit 0.

---

### Task 5: Verifica integrata e responsive

**Files:**
- Modify only if a regression test first demonstrates a defect: `tests/site-review.test.cjs`, `index.html`, `assets/css/styles.css`, `assets/js/main.js`

**Interfaces:**
- Consumes: tutti i risultati dei Task 1–4.
- Produces: home verificata e pronta per il prossimo punto.

- [ ] **Step 1: Eseguire la suite completa**

Run: `node --test tests/site-review.test.cjs`

Expected: tutti i test PASS.

- [ ] **Step 2: Verificare la sintassi**

Run: `node --check assets/js/main.js`

Expected: exit 0.

- [ ] **Step 3: Controllare nel browser**

Aprire `index.html` a 1280×720 e 390×844, tema chiaro e scuro. Per ogni configurazione registrare:

- `scrollWidth - clientWidth === 0`;
- `hero__actions.bottom <= innerHeight`;
- Master senza diciture temporanee;
- tre destinazioni dentro due percorsi esplicitati;
- su mobile `.mobile-cta` visibile, due figli univoci e `.whatsapp-float` non visibile;
- su desktop `.mobile-cta` non visibile e `.whatsapp-float` visibile;
- footer raggiungibile senza sovrapposizione;
- zero errori console.

- [ ] **Step 4: Rileggere i testi**

Escludere “percorsi di cura”, “discussione finale prevista”, “7 settembre 2026”, Master in corso e qualifica di psicoterapeuta. Confermare ALETEIA in corso dal 2025.

- [ ] **Step 5: Eseguire un’ultima suite**

Run: `node --test tests/site-review.test.cjs`

Expected: tutti i test PASS.
