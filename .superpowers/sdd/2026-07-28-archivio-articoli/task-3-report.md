# Task 3 — Pagina-articolo modello: report

## Modifiche eseguite

- Creato `articolo-modello.html` come riferimento tecnico non collegato per il futuro template WordPress.
- Aggiunto il contratto automatico `article template exposes a complete semantic publishing structure` in `tests/site-review.test.cjs`.
- Aggiunti in `assets/css/styles.css` gli stili responsive per `.article-template`, metadati, indice, contenuto, fonti, disclaimer e firma.
- Esteso il selettore del titolo del footer per mantenere la gerarchia dei titoli senza salti nella nuova pagina.

## TDD

### Red osservato

Eseguito `node --test tests/site-review.test.cjs` subito dopo avere aggiunto il test e prima di creare il documento. Il nuovo test ha fallito come previsto con:

```text
Error: ENOENT: no such file or directory, open 'C:\\Users\\lpedi\\Documents\\Sito Sharon\\articolo-modello.html'
```

Esito: 32 pass, 1 fail.

### Green osservato

Dopo l’implementazione, l’esecuzione completa di `node --test tests/site-review.test.cjs` ha dato:

```text
tests 33
pass 33
fail 0
```

## Controlli strutturali

- Un solo `h1`; sequenza dei titoli: `h1, h2, h2, h2, h2, h2, h2`.
- Nessun ID duplicato.
- Nessun link con `href` vuoto.
- Presenza verificata di: identificazione “Pagina modello”, categoria, sommario, quattro metadati, indice interno, sezioni introduzione/approfondimento/fonti, disclaimer, firma e ritorno a `articoli.html`.
- I contenuti editoriali restano segnaposto dichiarati: nessuna affermazione clinica sostanziale o dato presentato come pubblicato.
- La pagina non aggiunge alcun collegamento pubblico verso se stessa.
- La visibilità senza JavaScript è ereditata dalla regola condivisa già protetta dalla suite (`reveal animations keep content visible without JavaScript`).

## Auto-revisione

La struttura nel `main` rispetta il modello funzionale richiesto e usa classi dedicate, mentre header, navigazione, footer, tema e script condivisi restano coerenti con il sito. La griglia dei metadati passa a una colonna sotto i 700px; larghezza e spaziatura del template impediscono un contenuto eccessivamente largo su desktop e mantengono margini laterali su telefono.

Nessuna criticità bloccante rilevata. Il controllo visuale in browser a viewport e temi differenti appartiene alla verifica esplicita del Task 4 e non è stato eseguito in questo Task 3.
