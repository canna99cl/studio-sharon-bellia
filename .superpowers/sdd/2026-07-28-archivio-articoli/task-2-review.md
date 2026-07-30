# Revisione Task 2 — Ricostruire `articoli.html`

## Perimetro ed evidenze

Revisione statica di `task-2-brief.md`, `task-2-report.md`, `articoli.html`, degli stili editoriali in `assets/css/styles.css` e dei contratti pertinenti in `tests/site-review.test.cjs`. Non sono state apportate modifiche al prodotto.

La suite non è stata rieseguita: il report del Task 2 documenta l'esecuzione di `node --test tests/site-review.test.cjs` con **31 test passati su 31**, exit code 0, e l'ispezione dei contratti correnti è coerente con tale esito.

## Verdetto di conformità alla specifica

**Non conforme in modo puntuale (Important).**

Il contenuto implementa gli obiettivi funzionali: elimina i sei demo, presenta l'introduzione, lo stato testuale «Contenuti in preparazione», due aree non cliccabili, la policy con i quattro criteri, il rimando a `risorse.html` e la CTA sobria. Ha un solo `h1`; nel `main` la progressione è `h1 → h2 → h3` senza salti e non emergono link vuoti.

Tuttavia il contratto HTML esplicito del Task 2 prescrive il wrapper `.editorial-areas`, mentre l'implementazione espone `.editorial-grid`. La sostituzione è dichiarata intenzionalmente nel self-review e non è un semplice adattamento di classe: è una deviazione dall'interfaccia prodotta dal task.

## Verdetto qualità, robustezza e accessibilità

**Da correggere prima dell'accettazione (Important).**

Il layout CSS è responsive, le due aree restano sorelle nello stesso grid e diventano a colonna sotto 700 px; le card non contengono link e lo stato non dipende dal solo colore. Restano però un difetto di progressive enhancement introdotto nei nuovi contenuti e una piccola incoerenza di manutenzione.

## Rilievi

### Critical

Nessuno.

### Important

1. **Wrapper `.editorial-grid` non conforme al contratto e aggiramento del test fragile.**  
   Riferimenti: `articoli.html:91`, `assets/css/styles.css:874`, piano Task 2 (interfaccia/Step 1), `tests/site-review.test.cjs:201`.

   Il piano richiede `.editorial-areas`; il report ammette di averlo rinominato per evitare che il matcher `/class="[^"]*editorial-area[^"]*"/g` conti anche `editorial-areas` come una terza card. La conseguenza è doppia: qualsiasi CSS o integrazione futura che usi la classe contrattuale non troverà il wrapper, e il test continua a dare un falso senso di copertura perché conta sottostringhe anziché token di classe né verifica che le due aree siano sorelle/non cliccabili. Correggere il contratto con un controllo token-aware (o un parsing HTML), poi ripristinare `.editorial-areas` nel markup e negli stili.

2. **L'archivio nuovo è invisibile se JavaScript non viene eseguito o fallisce.**  
   Riferimenti: `articoli.html:82-116`, `assets/css/styles.css:123-131`.

   Tutti i contenuti essenziali aggiunti (introduzione, stato, card e policy) hanno `.reveal`; la regola base assegna `opacity: 0` e solo JavaScript aggiunge `.is-visible`. `prefers-reduced-motion` copre un caso specifico, non la mancata esecuzione di JavaScript. Ciò degrada l'accesso ai contenuti proprio nella pagina di stato dell'archivio. Rendere il contenuto visibile di default e applicare le animazioni soltanto dopo una classe di capacità JavaScript (ad esempio `.js`) sul documento.

### Minor

1. **Classe `.info-card` priva di definizione nel foglio di stile.**  
   Riferimenti: `articoli.html:92,97`; ricerca nel CSS editoriale.

   Le card sono correttamente stilizzate da `.editorial-area`, quindi non è un difetto visivo immediato. Tuttavia `.info-card` non è un componente effettivamente definito in `assets/css/styles.css`: resta un'etichetta inattiva e la famiglia di stili viene duplicata localmente. Definire/ripristinare il componente condiviso oppure rimuovere la classe se non fa parte del design system, per evitare un contratto fuorviante.

---

## Re-review — Fix round 1

### Evidenze fresche

- Letta l'appendice **Fix round 1** di `task-2-report.md` e riesaminati `articoli.html`, `assets/css/styles.css`, `assets/js/main.js` e `tests/site-review.test.cjs`.
- Eseguiti `node --check assets/js/main.js` e `node --test tests/site-review.test.cjs`.
- Risultato: **32 test passati su 32**, 0 falliti; controllo sintattico JavaScript riuscito.

### Stato dei rilievi precedenti

1. **ADDRESSED — Wrapper e test token-aware.**  
   Riferimenti: `articoli.html:91`, `assets/css/styles.css:876`, `tests/site-review.test.cjs:201-204`.

   Il wrapper contrattuale `.editorial-areas` è stato ripristinato e mantiene il grid responsive. Il test ora richiede esplicitamente il wrapper ed estrae gli attributi `class`, contando soltanto il token esatto `editorial-area`; `.editorial-areas` non può più essere contato come card. Le due card restano sorelle e non contengono collegamenti.

2. **ADDRESSED — Contenuti disponibili senza JavaScript e animazioni mantenute con JavaScript.**  
   Riferimenti: `assets/css/styles.css:124-133`, `assets/js/main.js:8,89-126`, `tests/site-review.test.cjs:209-216`.

   `.reveal` e `.blur-in` sono visibili per default. La condizione di nascondimento e transizione è limitata a `html.motion-ready`, classe aggiunta dallo script; con JavaScript attivo l'`IntersectionObserver` continua ad applicare `.is-visible`, mentre `prefers-reduced-motion` forza correttamente la visibilità. Il nuovo contratto automatico verifica entrambi i lati dell'invariante.

3. **ADDRESSED — `.info-card` ha una base visiva effettiva.**  
   Riferimenti: `assets/css/styles.css:877-880`, `articoli.html:92,97`.

   La classe condivisa ora fornisce superficie, bordo e raggio; `.editorial-area` conserva responsabilmente soltanto padding e regole editoriali specifiche. La composizione in markup è quindi effettiva e non più un'etichetta inattiva.

### Nuove rotture introdotte dal fix

**Nessuna rilevata.** Il test completo e il controllo sintattico JavaScript sono passati; la nuova selettorizzazione conserva tema chiaro/scuro, riduzione del movimento e layout responsive.

### Verdetti aggiornati

- **Spec:** conforme.
- **Qualità/robustezza/accessibilità:** accettabile; nessun rilievo Critical, Important o Minor residuo nel perimetro del Task 2.
