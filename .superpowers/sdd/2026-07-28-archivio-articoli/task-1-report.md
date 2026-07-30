# Report Task 1 — Contratto automatico dell'archivio pubblico

## File modificati

- `tests/site-review.test.cjs`: aggiunti i test `article archive publishes only real-content states` e `article archive declares its editorial method and separates resources`.
- `.superpowers/sdd/2026-07-28-archivio-articoli/task-1-report.md`: questo report.

Non sono stati modificati file di produzione.

## Comando eseguito

```powershell
node --test tests/site-review.test.cjs
```

## Esito e riepilogo dei fallimenti

La prima esecuzione, dopo l'aggiunta del solo primo test, ha prodotto 29 test superati e 1 fallito: `article archive publishes only real-content states` ha rilevato correttamente il titolo dimostrativo `Quando l'ansia diventa una bussola` ancora presente in `articoli.html`.

La seconda esecuzione, dopo l'aggiunta del secondo test, ha prodotto 29 test superati e 2 falliti su 31:

1. `article archive publishes only real-content states` fallisce perché `articoli.html` contiene ancora i titoli dimostrativi (il primo rilevato è `Quando l'ansia diventa una bussola`), quindi non presenta ancora lo stato editoriale richiesto.
2. `article archive declares its editorial method and separates resources` fallisce perché manca il criterio editoriale `firma`; di conseguenza mancano ancora la dichiarazione completa del metodo e la separazione verificabile delle risorse richiesta dal contratto.

I fallimenti sono attesi per il Task 1 e costituiscono il contratto rosso che il Task 2 dovrà soddisfare.

## Auto-revisione

- I due test corrispondono ai valori e alle espressioni previste dal piano approvato.
- Il primo controlla l'assenza dei sei titoli dimostrativi, lo stato `Contenuti in preparazione`, le due aree editoriali e le rispettive denominazioni.
- Il secondo controlla i quattro criteri editoriali, la natura di lettura/approfondimento degli articoli, il collegamento a `risorse.html` e la dicitura `materiali scaricabili`.
- Gli altri 29 controlli preesistenti rimangono verdi.
- Nessun file di produzione è stato modificato.

## Fix round 1/5 — separazione dalle risorse nel contesto editoriale

Il test `article archive declares its editorial method and separates resources` ora individua prima una sezione identificabile con classe `editorial-policy` e limita a quella sezione le verifiche dei criteri editoriali, della descrizione degli articoli, del link `risorse.html` e della dicitura `materiali scaricabili`. Questo impedisce che il link del footer condiviso soddisfi il contratto senza che la relazione sia dichiarata nell'area editoriale.

### Comando eseguito

```powershell
node --test tests/site-review.test.cjs
```

### Output

```text
ℹ tests 31
ℹ suites 0
ℹ pass 29
ℹ fail 2
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 177.0023
```

Fallimenti confermati:

1. `article archive publishes only real-content states`: rileva ancora `Quando l'ansia diventa una bussola` in `articoli.html`.
2. `article archive declares its editorial method and separates resources`: fallisce con `article archive is missing its editorial policy section`.

Entrambi i fallimenti sono attesi: il secondo dimostra ora l'assenza dell'area editoriale richiesta, anziché essere soddisfatto dal footer.
