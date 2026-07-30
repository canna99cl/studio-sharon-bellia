# Revisione finale complessiva — Archivio Articoli

Data: 28 luglio 2026

## Verdetto

**APPROVATO CON UN RILIEVO IMPORTANT DI CHIUSURA.**

L’implementazione della feature è sostanzialmente conforme: l’archivio pubblico non presenta articoli fittizi, comunica correttamente lo stato editoriale, mantiene le due aree sullo stesso livello, distingue gli articoli dalle Risorse, conserva il contenuto con JavaScript disattivato e offre un modello semantico non collegato, adatto come base per WordPress.

Non è però possibile dichiarare soddisfatto l’intero contratto automatico della specifica: la suite non contiene i controlli richiesti per link senza destinazione e ID duplicati. Una scansione fresca dell’intero insieme pubblico trova inoltre un caso reale, `href="#"` in `index.html:407`, mentre i 34 test continuano a passare. Il problema non è stato introdotto dalla feature e la pagina privacy è fuori dall’ambito di implementazione, ma l’accettazione globale «nessun link privo di destinazione» e la relativa copertura automatica non sono attualmente dimostrate.

## Perimetro esaminato

Sono stati letti integralmente:

- `docs/superpowers/specs/2026-07-28-archivio-articoli-design.md`;
- `docs/superpowers/plans/2026-07-28-archivio-articoli.md`;
- `.superpowers/sdd/2026-07-28-archivio-articoli/progress.md`;
- tutti i file `task-*-report.md` e `task-*-review.md`;
- `articoli.html`;
- `articolo-modello.html`;
- `assets/css/styles.css`;
- `assets/js/main.js`;
- `tests/site-review.test.cjs`;
- `README.md`.

Il progetto non è un repository Git; la valutazione si basa quindi sul contenuto corrente, sui report SDD e su verifiche riprodotte direttamente.

## Esito end-to-end

### Requisiti e scope

- Le sei card e i sei titoli dimostrativi non compaiono più in alcun file HTML pubblico.
- `articoli.html` conserva hero, breadcrumb, header, menu, CTA e footer condivisi.
- L’archivio contiene introduzione, stato «Contenuti in preparazione», metodo editoriale e CTA informativa non promozionale.
- Non sono stati aggiunti articoli clinici/forensi, fotografie editoriali, download, raccolta email o configurazioni WordPress.

### Archivio, Risorse e assenza di contenuti fittizi

- Le due aree sono due elementi fratelli `article.editorial-area` dentro lo stesso wrapper `.editorial-areas`.
- Ogni area contiene il proprio `h3`; i titoli correnti sono esattamente «Psicologia clinica» e «Psicologia giuridica e forense».
- Le card non contengono link e non simulano articoli pubblicati o contenitori vuoti.
- La sezione `.editorial-policy` contiene firma, data di pubblicazione, fonti e ultima revisione.
- Nella stessa sezione è dichiarata la distinzione fra contenuti di lettura e materiali scaricabili, con link contestuale a `risorse.html`.

### Semantica e accessibilità

- Entrambe le pagine della feature hanno un solo `h1`.
- Nei rispettivi `<main>` non sono presenti salti di livello:
  - `articoli.html`: `h1 > h2 > h3 > h3 > h2 > h2`;
  - `articolo-modello.html`: `h1 > h2 > h2 > h2 > h2`.
- `articolo-modello.html` usa `article`, `header`, breadcrumb in `nav`, `dl` per i metadati, indice interno in `nav`, sezioni con destinazioni reali, `aside` per il disclaimer e `footer` per la firma.
- Lo stato dell’archivio è espresso testualmente e non dipende dal colore.
- La scansione focalizzata sulle due pagine rileva zero ID duplicati e zero `href` vuoti o `#`.
- Resta un salto `h2 -> h4` nel documento completo di `articoli.html`, dovuto ai titoli del footer; è riportato come Minor.

### No-JS fallback e design system

- `.reveal` e `.blur-in` sono visibili per impostazione predefinita.
- Il nascondimento animato è attivato solo sotto `html.motion-ready`, classe aggiunta da `main.js`.
- In assenza di JavaScript i contenuti editoriali restano quindi leggibili.
- `.info-card` usa superficie, bordo e raggio condivisi; `.editorial-area` aggiunge soltanto spaziatura e tipografia specifiche.
- Gli stili editoriali usano i token semantici esistenti e includono il reflow a una colonna sotto 700 px.
- Controllo statico dei contrasti principali della feature:
  - tema chiaro, testo secondario su `--bg-alt`: 5.00:1;
  - tema chiaro, link `--amber-deep` su superficie: 7.35:1;
  - tema scuro, testo secondario su `--bg-alt`: 6.93:1;
  - tema scuro, eyebrow/link su superficie: 5.77:1.

### Modello non pubblicato e WordPress readiness

- Una scansione URL-normalizzata di tutti gli `href` nelle pagine pubbliche rileva zero collegamenti a `articolo-modello.html`.
- Il modello è raggiungibile soltanto conoscendone l’indirizzo, come richiesto.
- Titolo, sommario, metadati, indice, sezioni, fonti, disclaimer e firma sono campi/strutture riconoscibili e non simulano dati editoriali reali.
- La semantica è adatta alla futura mappatura in template part/campi WordPress.
- `README.md` registra il modello come «tecnico non collegato» e la checklist rinvia correttamente la pubblicazione degli articoli, i download, privacy/cookie, fotografie e SEO.
- La tabella delle pagine nel README conserva però descrizioni obsolete per archivio e Risorse; il punto è riportato come Minor.

## Verifiche riprodotte

### Suite automatica

Comando:

```text
node --test tests/site-review.test.cjs
```

Esito fresco:

```text
tests 34
pass 34
fail 0
cancelled 0
skipped 0
todo 0
duration_ms 243.9597
```

### Sintassi JavaScript

Comando:

```text
node --check assets/js/main.js
```

Esito: exit code 0, nessun errore.

### Controlli statici focalizzati

- `articoli.html`: 10 ID, 0 duplicati, 0 link vuoti, 1 `h1`, 0 salti nei titoli del `<main>`.
- `articolo-modello.html`: 9 ID, 0 duplicati, 0 link vuoti, 1 `h1`, 0 salti nei titoli del `<main>`.
- Due aree editoriali sorelle, entrambe con il proprio `h3`.
- Zero collegamenti pubblici al modello dopo normalizzazione dei percorsi.
- Regole no-JS ed enhancement `motion-ready` presenti.
- Scansione globale dei file HTML: un link senza destinazione effettiva in `index.html:407`.

### Evidenza browser

Il browser integrato non era disponibile durante questa revisione finale, quindi la matrice visuale non è stata rieseguita. Il report del Task 4 documenta comunque otto combinazioni pagina/viewport/tema (1280×720 e 390×844, chiaro e scuro) con overflow 0, console 0 e componenti visibili. Questa è evidenza preesistente del Task 4, non una nuova esecuzione della revisione finale.

## Rilievi

### Critical

Nessuno.

### Important

1. **Il contratto automatico richiesto per link senza destinazione e ID duplicati è assente, e la suite lascia passare un caso reale.**  
   Riferimenti: specifica, sezione «Verifica»; `tests/site-review.test.cjs`; `index.html:407`.

   La suite enumera tutti i file HTML ma non contiene un test generico per ID duplicati o `href` vuoti/inerti. La scansione fresca trova `<a ... href="#">informativa sulla privacy</a>` nella home, mentre `node --test` restituisce 34/34 PASS. Le due pagine della feature sono pulite, ma il requisito automatico globale non è dimostrato e il risultato verde è incompleto rispetto alla specifica. Occorre aggiungere il controllo richiesto e decidere esplicitamente come rappresentare il riferimento privacy finché la pagina, fuori scope, non esiste.

### Minor

1. **[OPEN — ledger Task 1] Le etichette tematiche sono verificate globalmente anziché dentro ciascuna area.**  
   Riferimenti: `tests/site-review.test.cjs:202-206`.

   Il markup corrente è corretto: la verifica statica focalizzata trova due aree e i due `h3` attesi, uno per area. Il test potrebbe però passare con aree prive di titolo e le etichette collocate altrove. Il Minor resta aperto come debolezza di regressione, non come difetto corrente del DOM.

2. **[OPEN — ledger Task 4] Il test anti-link riconosce soltanto la sintassi letterale con doppi apici e percorso esatto.**  
   Riferimenti: `tests/site-review.test.cjs:245-248`.

   La scansione URL-normalizzata corrente conferma zero link pubblici al modello. Il matcher non intercetta tuttavia apici singoli, `./articolo-modello.html`, query o fragment; quattro varianti equivalenti provate in memoria risultano tutte non riconosciute. Il Minor resta aperto come protezione futura insufficiente, non come pubblicazione corrente del modello.

3. **Il footer di `articoli.html` introduce un salto di titoli `h2 -> h4`.**  
   Riferimenti: `articoli.html:120-124`, `articoli.html:142`, `articoli.html:154`.

   Il `<main>` è gerarchicamente corretto, ma nel documento completo i titoli «Esplora» e «Ambiti» sono `h4` dopo il `h2` della CTA. `articolo-modello.html` usa già `h2.footer__heading` per gli stessi blocchi. La differenza è semanticamente incoerente e non è coperta dalla suite.

4. **La mappa delle pagine nel README non descrive lo stato editoriale corrente.**  
   Riferimenti: `README.md:125-127`.

   `articoli.html` è ancora descritto come «Archivio completo articoli ("Tutti gli articoli")» e `risorse.html` come «download via email», mentre la feature espone un archivio in preparazione e rinvia la consegna/download alla fase WordPress. La checklist successiva è corretta, ma la tabella può confondere il passaggio di consegne.

## Conclusione

La feature realizza correttamente il comportamento editoriale richiesto e non presenta difetti Critical. Prima della chiusura pienamente conforme va risolto o formalmente riscopato il rilievo Important sul contratto automatico link/ID e sul link `#` già presente nella home. I due Minor del ledger restano entrambi aperti come debolezze concrete dei test; non corrispondono a errori attuali nel markup.

## Re-review finale dei fix

Data: 28 luglio 2026

### Verdetto conclusivo

**APPROVATO — PRONTO PER LA CHIUSURA.**

Questa re-review sostituisce il verdetto condizionato precedente. È stata limitata ai cinque rilievi di questa revisione finale e ai cambi descritti in `final-fix-report.md`.

### Stato dei rilievi

1. **ADDRESSED — contratto automatico per ID e link senza destinazione.**

   `tests/site-review.test.cjs` include ora il test globale `public HTML has unique IDs and links with real destinations`, che verifica unicità degli ID, presenza di `href` e rifiuta valori vuoti, `#` e `javascript:`. In `index.html` il precedente anchor privacy con `href="#"` è stato sostituito da testo non interattivo che dichiara correttamente il rinvio alla fase WordPress. Il nuovo contratto è verde.

2. **ADDRESSED — scope delle etichette editoriali.**

   Il test estrae le due `article.editorial-area`, richiede un `h3` dentro ciascuna area e confronta i due titoli nell’ordine atteso. Le etichette collocate altrove non possono più soddisfare il contratto.

3. **ADDRESSED — normalizzazione del test anti-link.**

   Gli `href` sono estratti con doppi apici, apici singoli o senza virgolette e normalizzati tramite `URL` rispetto alla pagina sorgente. La verifica intercetta il pathname `/articolo-modello.html` anche in presenza di `./`, query o fragment. Il controllo mirato fresco conferma che tutte e quattro le varianti esaminate normalizzano allo stesso pathname.

4. **ADDRESSED — gerarchia del footer di `articoli.html`.**

   I titoli «Esplora» e «Ambiti» sono ora `h2.footer__heading`. Il nuovo test sull’intero documento protegge la sequenza senza salti; lo stile condiviso conserva la resa visiva.

5. **ADDRESSED — descrizioni WordPress nel README.**

   La tabella descrive ora `articoli.html` come archivio editoriale in preparazione senza articoli dimostrativi e `risorse.html` come destinazione distinta per materiali futuri, con consegna e download rinviati a WordPress.

### Verifica fresca

```text
node --test tests/site-review.test.cjs
tests 36
pass 36
fail 0
cancelled 0
skipped 0
todo 0
duration_ms 334.4229
```

```text
node --check assets/js/main.js
exit code 0
```

### Nuove rotture introdotte dai fix

- **Critical:** nessuna.
- **Important:** nessuna.
