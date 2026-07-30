# Revisione Task 1 — Contratto automatico dell'archivio pubblico

## Ambito della revisione

Esaminati il brief del Task 1, il report di esecuzione, il piano e la specifica approvati, `tests/site-review.test.cjs` e lo stato corrente di `articoli.html`. Il progetto non contiene metadati Git utilizzabili: la revisione valuta quindi direttamente contenuto e comportamento, non una diff storica.

## Verdetto di conformità alla specifica: APPROVATO

I due test aggiunti coincidono con i due frammenti di codice prescritti dal piano del Task 1, inclusi nome, elenco dei sei titoli dimostrativi, criteri editoriali e asserzioni sulla pagina `risorse.html`.

Il primo contratto copre l'eliminazione dei sei contenuti demo, lo stato visibile `Contenuti in preparazione`, la presenza di due aree `.editorial-area` e le due denominazioni tematiche. Il secondo copre i quattro criteri del metodo editoriale, la natura di lettura/approfondimento degli articoli e la distinzione dai materiali scaricabili in `risorse.html`.

Lo stato corrente dell'archivio conferma che la suite è intenzionalmente rossa per il Task 1: sono ancora presenti tutti e sei i titoli demo, non esistono elementi `.editorial-area`, manca `Contenuti in preparazione` e mancano tutti e quattro i criteri. Non sono state individuate modifiche di produzione attribuibili al Task 1; l'assenza di Git impedisce tuttavia una verifica indipendente della cronologia dei file modificati.

## Verdetto qualità dei test: APPROVATO CON RILIEVO

Esecuzione indipendente:

```powershell
node --test tests/site-review.test.cjs
```

Esito: 31 test, 29 superati, 2 falliti, 0 annullati/skipped. I soli fallimenti sono i due nuovi contratti. Il primo si interrompe correttamente sul primo titolo demo ancora pubblicato (`Quando l'ansia diventa una bussola`); il secondo sulla prima voce del metodo assente (`firma`). Sono fallimenti deterministici, pertinenti e coerenti con il TDD atteso. I test non dipendono da rete, orari, browser o ordine di esecuzione e non sono fuori ambito rispetto al Task 1.

## Rilievi

### Important

- **Separazione da Risorse non legata semanticamente all'archivio.** Il controllo `href="risorse.html"` cerca nell'intero documento; nello stato corrente è già soddisfatto dal link nel footer. Anche `materiali scaricabili` è cercato separatamente nell'intero HTML. Di conseguenza il test può passare senza dimostrare che la pagina archivio espliciti davvero la distinzione richiesta fra articoli e risorse, per esempio se la dicitura fosse collocata in una zona non correlata. Per rendere il contratto robusto, una futura revisione del test dovrebbe estrarre o individuare la sezione del metodo editoriale e verificare nella stessa sezione il testo di distinzione e il link a `risorse.html`.

### Minor

- **Associazione debole fra aree e titoli.** Il primo test conta due classi `.editorial-area`, ma cerca `Psicologia clinica` e `Psicologia giuridica e forense` globalmente. Un markup scorretto potrebbe quindi superarlo avendo due aree senza titolo e le due etichette altrove nella pagina. Il test è conforme al frammento esatto prescritto dal piano; il miglioramento è facoltativo e non blocca il Task 1.

### Critical

- Nessuno.

## Valutazione del report Task 1

Il report dichiara correttamente il comando, la progressione TDD (prima un solo test rosso, poi due), il riepilogo dei fallimenti e l'assenza di modifiche di produzione. L'esecuzione finale è stata riprodotta: 29 verdi e 2 rossi. La sequenza intermedia con un solo test rosso non è ricostruibile indipendentemente senza una cronologia/versionamento, ma è coerente con l'implementazione e con il risultato osservato.

## Re-review — Fix round 1/5: rilievo Important sulla separazione da Risorse

**Stato: ADDRESSED.** Il test individua ora esplicitamente `<section class="editorial-policy">` e applica al solo contenuto catturato le asserzioni sui criteri editoriali, sulla natura degli articoli, sul link a `risorse.html` e su `materiali scaricabili`. Il link del footer non può più soddisfare il contratto.

Esecuzione indipendente: `node --test tests/site-review.test.cjs` restituisce ancora 31 test, 29 passati e 2 falliti. Il secondo fallimento è ora `article archive is missing its editorial policy section`, quindi dimostra direttamente l'assenza del contesto editoriale richiesto; il primo resta il fallimento TDD atteso sui titoli dimostrativi.

**Nuove rotture introdotte dal fix: nessuna.** Il selettore è coerente con la struttura `editorial-policy` prevista per il Task 2 e non modifica né amplia lo scope degli altri test. Il solo effetto osservabile è il messaggio di fallimento più preciso e pertinente.
