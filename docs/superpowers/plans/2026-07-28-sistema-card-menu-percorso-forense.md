# Sistema card, menu, percorso e pagina forense Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Distinguere tre famiglie di card, alleggerire il menu, aggiungere un indice alla pagina del percorso e rimuovere dalla comunicazione forense i riferimenti transitori.

**Architecture:** Il sito rimane statico e senza nuove dipendenze. HTML e CSS esistenti vengono aggiornati mantenendo le classi condivise, ma separando la tipografia editoriale, di processo e informativa; i comportamenti richiesti vengono protetti da test statici Node e verificati nel browser locale.

**Tech Stack:** HTML5, CSS custom properties e responsive CSS, JavaScript vanilla esistente, test runner nativo Node.js.

## Global Constraints

- Non modificare il funzionamento demo del form.
- Non creare privacy policy, cookie policy, articoli, download o integrazioni WordPress.
- Non introdurre dropdown nel menu.
- Conservare FAQ e Risorse nel footer e nei collegamenti contestuali.
- Non dichiarare incarichi, casi, collaborazioni o esperienza pregressa non documentata.
- Preservare contrasto, focus, touch target, responsive e `prefers-reduced-motion`.

---

### Task 1: Proteggere le tre famiglie di card

**Files:**
- Modify: `tests/site-review.test.cjs`
- Modify: `assets/css/styles.css`

**Interfaces:**
- Consumes: classi esistenti `.card`, `.card__h`, `.step`, `.step__num`, `.step__title`, `.situation`, `.res-card`, `.auth-card`, `.operation-card`.
- Produces: tre trattamenti visivi verificabili: editoriale, processo e informativo.

- [ ] **Step 1: Sostituire il test di uniformità totale con tre test di ruolo**

Nel file `tests/site-review.test.cjs` rimuovere le asserzioni che impongono lo stesso titolo a tutte le famiglie e aggiungere test che verifichino:

```js
test('article cards preserve an editorial title hierarchy', () => {
  assert.match(css, /\.card__h\s*\{[^}]*font-family:\s*var\(--font-display\)[^}]*font-size:\s*var\(--step-1\)[^}]*color:\s*var\(--text\)/is);
  assert.doesNotMatch(css, /\.card__h\s*\{[^}]*text-transform:\s*uppercase/is);
});

test('process cards preserve roman numerals and display titles', () => {
  assert.match(css, /\.step__num\s*\{[^}]*font-family:\s*var\(--font-display\)[^}]*font-style:\s*italic/is);
  assert.match(css, /\.step__title\s*\{[^}]*font-family:\s*var\(--font-display\)[^}]*font-size:\s*var\(--step-1\)/is);
});

test('informational cards share the competence-card title treatment', () => {
  assert.match(css, /\.situation h3,\s*\.res-card \.card__h,\s*\.auth-card h3,\s*\.operation-card h2\s*\{[^}]*font-size:\s*var\(--step--1\)[^}]*text-transform:\s*uppercase[^}]*color:\s*var\(--amber-deep\)/is);
});
```

- [ ] **Step 2: Eseguire i test e verificare il fallimento**

Run: `node --test tests/site-review.test.cjs`

Expected: FAIL perché `.card__h` e `.step__title` sono ancora inclusi nel trattamento informativo globale.

- [ ] **Step 3: Separare le regole CSS**

In `assets/css/styles.css`:

- mantenere bordo, superficie e raggio condivisi;
- ripristinare `.card__h` come titolo editoriale Fraunces, `var(--step-1)`, peso 400, colore `var(--text)`, senza maiuscolo;
- ripristinare `.step__title` come Fraunces, `var(--step-1)`, peso 400, senza maiuscolo;
- applicare il trattamento oro maiuscolo a `.situation h3`, `.res-card .card__h`, `.auth-card h3` e `.operation-card h2`;
- conservare `.step__num` in numeri romani, corsivo e colore oro;
- mantenere le varianti dark con contrasto adeguato.

- [ ] **Step 4: Eseguire i test**

Run: `node --test tests/site-review.test.cjs`

Expected: PASS per i tre nuovi test e per tutti i test esistenti.

### Task 2: Snellire la navigazione principale

**Files:**
- Modify: `index.html`
- Modify: `competenze.html`
- Modify: `articoli.html`
- Modify: `risorse.html`
- Modify: `dove-trovarmi.html`
- Modify: `psicologia-clinica.html`
- Modify: `psicoterapia.html`
- Modify: `psicologia-forense.html`
- Modify: `percorso-modalita.html`
- Modify: `tests/site-review.test.cjs`

**Interfaces:**
- Consumes: `.nav__list`, ancore della home e pagine esistenti.
- Produces: menu principale di sei destinazioni; footer invariato per FAQ e Risorse.

- [ ] **Step 1: Scrivere il test del menu**

Aggiungere un test che per ciascun file HTML estragga il primo `.nav__list` e verifichi esattamente le etichette:

```js
['Chi sono', 'Ambiti', 'Percorso', 'Competenze', 'Articoli', 'Contatti']
```

Il test deve inoltre verificare che ogni pagina contenga ancora nel footer collegamenti a `risorse.html` e `index.html#faq`.

- [ ] **Step 2: Eseguire il test e verificare il fallimento**

Run: `node --test tests/site-review.test.cjs`

Expected: FAIL perché i menu contengono ancora “Risorse”, “FAQ” e “Sede e contatti”.

- [ ] **Step 3: Aggiornare i nove menu**

Usare le destinazioni:

```html
<li><a href="index.html#chi-sono">Chi sono</a></li>
<li><a href="index.html#ambiti">Ambiti</a></li>
<li><a href="percorso-modalita.html">Percorso</a></li>
<li><a href="competenze.html">Competenze</a></li>
<li><a href="articoli.html">Articoli</a></li>
<li><a href="index.html#prenota">Contatti</a></li>
```

Su `index.html` usare le ancore locali `#chi-sono`, `#ambiti` e `#prenota`. Conservare `aria-current="page"` sulla destinazione corrispondente nelle pagine Percorso, Competenze e Articoli.

- [ ] **Step 4: Eseguire i test**

Run: `node --test tests/site-review.test.cjs`

Expected: PASS.

### Task 3: Aggiungere l’indice interno a “Percorso e modalità”

**Files:**
- Modify: `percorso-modalita.html`
- Modify: `assets/css/styles.css`
- Modify: `tests/site-review.test.cjs`

**Interfaces:**
- Consumes: ID `percorso`, `destinatari`, `incontri`, `online`, `adolescenti`, `spostamenti`, `urgenze`.
- Produces: `.page-index` con sette collegamenti interni.

- [ ] **Step 1: Scrivere il test delle ancore**

Aggiungere un test che verifichi l’esistenza di:

```html
<nav class="page-index" aria-label="In questa pagina">
```

e dei collegamenti:

```text
#percorso
#destinatari
#incontri
#online
#adolescenti
#spostamenti
#urgenze
```

Verificare che ogni destinazione esista una sola volta.

- [ ] **Step 2: Eseguire il test e verificare il fallimento**

Run: `node --test tests/site-review.test.cjs`

Expected: FAIL perché `.page-index` non esiste.

- [ ] **Step 3: Inserire l’indice**

Subito dopo il subhero aggiungere:

```html
<nav class="page-index" aria-label="In questa pagina">
  <div class="container page-index__inner">
    <span class="page-index__label">In questa pagina</span>
    <a href="#percorso">Come funziona</a>
    <a href="#destinatari">Destinatari</a>
    <a href="#incontri">Incontri</a>
    <a href="#online">Online</a>
    <a href="#adolescenti">Adolescenti</a>
    <a href="#spostamenti">Spostamenti</a>
    <a href="#urgenze">Urgenze</a>
  </div>
</nav>
```

- [ ] **Step 4: Stilizzare l’indice**

Creare regole responsive che:

- usino una superficie discreta e un bordo;
- consentano il wrapping su desktop;
- permettano scorrimento orizzontale controllato su telefono senza overflow della pagina;
- garantiscano target tattili di almeno 44 px;
- usino `scroll-margin-top` per gli elementi con ID.

- [ ] **Step 5: Eseguire i test**

Run: `node --test tests/site-review.test.cjs`

Expected: PASS.

### Task 4: Rendere stabile la comunicazione forense

**Files:**
- Modify: `psicologia-forense.html`
- Modify: `index.html`
- Modify: `tests/site-review.test.cjs`

**Interfaces:**
- Consumes: testi della pagina forense e FAQ forensi.
- Produces: comunicazione professionale senza frasi transitorie e senza dichiarazioni di esperienza numerica o specifica.

- [ ] **Step 1: Scrivere il test dei riferimenti transitori**

Aggiungere un test che verifichi l’assenza, nelle sezioni forensi di `index.html` e nell’intera `psicologia-forense.html`, delle espressioni:

```text
formazione in quest'area è in corso
non dichiaro incarichi CTP
sto completando un Master
informazioni preliminari
```

Il test deve continuare a richiedere la spiegazione della differenza tra CTU e CTP.

- [ ] **Step 2: Eseguire il test e verificare il fallimento**

Run: `node --test tests/site-review.test.cjs`

Expected: FAIL sulle FAQ attuali.

- [ ] **Step 3: Aggiornare i testi**

In `psicologia-forense.html`, riscrivere la FAQ CTU/CTP come:

```html
Il CTU è nominato dal giudice e opera come ausiliario dell’autorità giudiziaria; il CTP è scelto dalla parte e svolge il proprio ruolo tecnico in raccordo con l’avvocato, nel rispetto del mandato e dei confini professionali.
```

In `index.html`, sostituire la risposta transitoria con una spiegazione stabile:

```html
La consulenza tecnica di parte affianca la parte e il suo legale nelle questioni psicologiche rilevanti per il procedimento. Il primo contatto serve a comprendere il quesito, verificare la pertinenza della richiesta e chiarire ruolo, confini e modalità dell’eventuale incarico.
```

Non modificare in questo task la pagina generale “Competenze” né i riferimenti alla scuola di psicoterapia.

- [ ] **Step 4: Eseguire i test**

Run: `node --test tests/site-review.test.cjs`

Expected: PASS.

### Task 5: Aggiornare la checklist WordPress

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: attività differite elencate nella specifica.
- Produces: sezione “Checklist prima della pubblicazione WordPress”.

- [ ] **Step 1: Scrivere il test della checklist**

Aggiungere un test che verifichi in `README.md` la presenza delle voci:

```text
form e recapito
privacy
cookie
articoli
download
fotografie
SEO
contenuti forensi
```

- [ ] **Step 2: Eseguire il test e verificare il fallimento**

Run: `node --test tests/site-review.test.cjs`

Expected: FAIL perché la checklist completa non esiste.

- [ ] **Step 3: Aggiungere la checklist**

Inserire in `README.md` una sezione con caselle non selezionate per:

- collegare form e recapiti;
- creare privacy, cookie e note legali;
- configurare consenso e conservazione dati;
- sostituire dominio, indirizzo, mappa e social;
- creare pagine e collegamenti degli articoli;
- configurare download e raccolta dati;
- inserire fotografie professionali;
- completare canonical, Open Graph, sitemap e SEO;
- verificare titoli e contenuti forensi alla data di pubblicazione.

- [ ] **Step 4: Eseguire i test**

Run: `node --test tests/site-review.test.cjs`

Expected: PASS.

### Task 6: Verifica integrata

**Files:**
- Verify: tutti i file HTML pubblici
- Verify: `assets/css/styles.css`
- Verify: `assets/js/main.js`

**Interfaces:**
- Consumes: output dei task precedenti.
- Produces: tema verificato desktop/mobile e pronto per il prossimo punto della checklist.

- [ ] **Step 1: Eseguire l’intera suite**

Run: `node --test tests/site-review.test.cjs`

Expected: tutti i test PASS, nessun warning o errore.

- [ ] **Step 2: Avviare il server locale**

Run: `node serve.cjs`

Expected: sito disponibile su `http://127.0.0.1:8823/`.

- [ ] **Step 3: Verificare nel browser**

Controllare almeno:

- `index.html`;
- `articoli.html`;
- `psicologia-clinica.html`;
- `psicologia-forense.html`;
- `percorso-modalita.html`.

Eseguire il controllo a larghezza desktop e telefono, in tema chiaro e scuro. Verificare:

- nessun overflow;
- menu di sei voci;
- FAQ e Risorse raggiungibili dal footer;
- tre famiglie di card distinguibili;
- indice del percorso utilizzabile;
- ancore non coperte dall’header;
- assenza di errori console.

- [ ] **Step 4: Rileggere i testi forensi**

Confermare che non compaiano riferimenti transitori e che non siano state introdotte dichiarazioni non documentate.

