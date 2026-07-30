# Correzioni finali — Archivio Articoli

Data: 28 luglio 2026

## Stato

Tutti i rilievi Important e Minor della revisione finale sono stati affrontati. Il progetto non è un repository Git e non sono state eseguite operazioni Git.

## Analisi delle cause

1. La suite enumerava tutti i file HTML, ma non applicava un contratto globale agli ID e agli anchor. Per questo `index.html` poteva contenere `href="#"` senza rendere rossa la suite.
2. Il test delle aree editoriali contava le classi `.editorial-area`, ma cercava i due titoli nell’intera pagina: i titoli non erano associati alle rispettive aree.
3. Il test che impediva la pubblicazione del modello cercava soltanto la stringa letterale `href="articolo-modello.html"`. Non interpretava apici singoli, percorsi relativi, query o fragment equivalenti.
4. Il footer di `articoli.html` usava `h4` dopo l’ultimo `h2` del contenuto, mentre `articolo-modello.html` usava già il pattern corretto `h2.footer__heading`.
5. La tabella delle pagine nel README conservava le descrizioni antecedenti alla nuova feature.

## TDD — baseline e RED

Baseline prima dei nuovi test:

```text
node --test tests/site-review.test.cjs
tests 34
pass 34
fail 0
```

Questa baseline confermava il difetto del contratto: la suite era verde pur in presenza del link `href="#"`.

Sono stati quindi introdotti:

- estrazione degli `href` compatibile con doppi apici, apici singoli e valori non quotati;
- normalizzazione URL per il test che protegge `articolo-modello.html`;
- controllo globale su ID duplicati e anchor senza destinazione reale;
- associazione di ciascun `h3` alla propria `article.editorial-area`;
- controllo della gerarchia dei titoli sull’intero documento `articoli.html`.

Prima dei fix di produzione, la suite ha prodotto il RED atteso:

```text
node --test tests/site-review.test.cjs
tests 36
pass 34
fail 2
```

Fallimenti osservati:

```text
index.html contains a link without a real destination:
<a class="inline-underline" href="#">

heading jumps from h2 to h4
```

Il controllo degli ID e le protezioni più precise sulle aree e sul modello sono risultati verdi già in RED, perché il markup corrente non conteneva ID duplicati, i due titoli erano già correttamente collocati e nessuna pagina pubblica collegava il modello. Sono test di regressione richiesti dalla specifica, non fix a difetti correnti.

## Fix minimi applicati

### `tests/site-review.test.cjs`

- aggiunti gli helper `attributeValue`, `anchorHrefs` e `normalizedLocalPath`;
- il test delle aree ora estrae le due `article.editorial-area` e richiede il rispettivo `h3`;
- il test anti-pubblicazione normalizza gli URL e intercetta anche `./articolo-modello.html`, query, fragment e apici singoli;
- aggiunto il contratto globale per unicità degli ID e anchor con destinazione reale;
- aggiunto il controllo gerarchico dei titoli dell’intero `articoli.html`.

### `index.html`

Il riferimento privacy non usa più un anchor fittizio. È ora testo non interattivo e dichiara esplicitamente che l’informativa deve essere predisposta e collegata prima dell’attivazione del modulo su WordPress. Non è stata inventata alcuna pagina legale.

### `articoli.html`

I titoli footer “Esplora” e “Ambiti” sono passati da `h4` a `h2.footer__heading`. L’aspetto resta invariato perché `assets/css/styles.css` applica già lo stesso blocco di stile a `.footer h4, .footer__heading`.

### `README.md`

- `articoli.html` è descritto come archivio editoriale in preparazione, senza articoli dimostrativi;
- `risorse.html` è descritta come pagina distinta per futuri materiali, con consegna e download rinviati a WordPress.

## GREEN e verifiche

Prima esecuzione GREEN:

```text
node --test tests/site-review.test.cjs
tests 36
pass 36
fail 0
```

Audit statico indipendente sull’intero insieme pubblico:

```text
HTML files: 10
IDs: 133
links: 273
audit errors: 0
```

L’audit ha verificato:

- zero ID duplicati;
- zero anchor senza `href`, con `href` vuoto, `#` o `javascript:`;
- zero destinazioni HTML locali mancanti;
- zero fragment locali senza ID di destinazione;
- zero salti nella gerarchia di `articoli.html` e `articolo-modello.html`.

Sequenze rilevate:

```text
articoli.html:
h1 > h2 > h3 > h3 > h2 > h2 > h2 > h2

articolo-modello.html:
h1 > h2 > h2 > h2 > h2 > h2 > h2
```

Prova delle varianti equivalenti del link al modello:

```text
articolo-modello.html
./articolo-modello.html
articolo-modello.html?preview=1
./articolo-modello.html#fonti
```

Tutte normalizzano a `/articolo-modello.html` e vengono quindi riconosciute dal controllo anti-link.

## Criticità residue

Nessuna criticità Critical, Important o Minor nota relativa ai rilievi di questa ondata. La pagina privacy e l’attivazione reale del modulo restano correttamente rinviate alla checklist WordPress; non sono state create destinazioni legali fittizie.

## Verifica finale fresca

```text
node --test tests/site-review.test.cjs
tests 36
pass 36
fail 0
cancelled 0
skipped 0
todo 0
```

```text
node --check assets/js/main.js
exit code 0
```

Un controllo mirato conclusivo su `index.html`, `articoli.html` e `README.md` non rileva più `href="#"`, i due `h4` del footer dell’archivio o le descrizioni obsolete “Archivio completo articoli” e “download via email”.
