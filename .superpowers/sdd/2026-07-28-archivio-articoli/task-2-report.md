# Task 2 report — Ricostruire `articoli.html`

## Stato

Completato.

## File modificati

- `articoli.html`
- `assets/css/styles.css`

## Intervento

- Sostituite le sei card dimostrative con un archivio editoriale trasparente.
- Inseriti introduzione divulgativa, stato esplicito **Contenuti in preparazione** e due card informative non cliccabili: Psicologia clinica e Psicologia giuridica e forense.
- Inserita la sezione `editorial-policy` con firma dell’autrice, data di pubblicazione, fonti consultabili e data dell’ultima revisione.
- Distinti gli articoli di lettura dai materiali scaricabili, collegando contestualmente `risorse.html`.
- Aggiunti stili responsive, coerenti con le superfici, i bordi e le tipografie del design system esistente.
- Header, navigazione, footer e CTA sono rimasti invariati.

## Verifica automatica

Comando eseguito:

```text
node --test tests/site-review.test.cjs
```

Output: 31 test eseguiti, 31 passati, 0 falliti; exit code 0.

## Controlli strutturali

- Un solo `h1` nella pagina.
- Gerarchia dei titoli: `h1` → `h2` → `h3`, senza salti nel corpo editoriale.
- Due sole classi `.editorial-area`, sullo stesso livello e senza link.
- Nessun `href` vuoto.
- Nessuno dei sei titoli dimostrativi rimane in `articoli.html`.
- La sezione `.editorial-policy` contiene tutti e quattro i criteri e il link valido a `risorse.html`.

## Self-review

La card-wrapper usa `.editorial-grid` anziché `.editorial-areas`: il contratto di test conta le occorrenze testuali di `editorial-area` e includerebbe anche il wrapper plurale, producendo tre risultati anziché le due card richieste. La struttura conserva quindi esattamente due `.editorial-area` e il layout a due colonne responsive previsto.

## Fix round 1

### File modificati

- `articoli.html`
- `assets/css/styles.css`
- `assets/js/main.js`
- `tests/site-review.test.cjs`

### Correzioni

- Ripristinato il wrapper contrattuale `.editorial-areas`.
- Reso il conteggio del test robusto: estrae ogni attributo `class` e conta solo il token esatto `editorial-area`, senza confonderlo con `.editorial-areas`.
- Aggiunto un test in rosso per il contratto no-JS: prima dell’implementazione, la suite falliva per wrapper assente e per l’assenza di stili e attivazione `motion-ready`.
- Le classi `.reveal` e `.blur-in` sono ora visibili per impostazione predefinita. `assets/js/main.js` aggiunge `motion-ready` all’elemento radice; solo in quel caso gli elementi vengono nascosti e animati dall’IntersectionObserver. Senza JavaScript il contenuto non dipende più da animazioni per essere leggibile.
- Definita la base condivisa `.info-card` (superficie, bordo e raggio); `.editorial-area` mantiene solo il proprio padding e i contenuti. Non viene introdotta una nuova famiglia visiva.

### Comandi e output

```text
node --test tests/site-review.test.cjs
```

Output finale: 32 test eseguiti, 32 passati, 0 falliti; exit code 0.

Controllo strutturale eseguito nello stesso passaggio: `h1=1`, `emptyHrefs=0`, token `editorial-area=2`.

### Self-review del round

Il wrapper precedente `.editorial-grid` è stato rimosso. La nota di self-review iniziale sopra è superata dal fix: il contratto conserva ora il nome `.editorial-areas` e il test verifica correttamente i token di classe, non sottostringhe.
