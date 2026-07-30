# Revisione Task 4 — integrazione, documentazione e verifica responsive

## Verdetto

**Pronto per la chiusura del Task 4.** I due rilievi Important della prima revisione risultano risolti nel report aggiornato. Resta il solo suggerimento Minor sulla robustezza futura del test anti-link.

## Critical

Nessuno.

## Important

1. **[ADDRESSED — round 1] Matrice browser incompleta.** Le otto righe ora attestano, in ogni combinazione pagina/viewport/tema, overflow 0 e console 0. Per l'archivio includono due `ARTICLE.editorial-area` con `H3` e stesso genitore, stato, policy, CTA e footer; per il modello includono ritorno all'archivio, firma, footer, metadati, indice, fonti e disclaimer. La copertura richiesta è presente.

2. **[ADDRESSED — round 1] Distinzione delle suite pre/post-browser assente.** Il report separa ora la sezione `A. Pre-browser` (34/34 PASS) dalla `B. Post-browser`, che conserva l'output esatto della suite finale (34/34 PASS). La sequenza richiesta è documentata in modo sufficiente.

## Minor

1. **[OPEN] Il test anti-link è conforme al test prescritto, ma è sintatticamente stretto.** In `tests/site-review.test.cjs:245-248` intercetta solo `href="articolo-modello.html"` con doppi apici e percorso esatto. Un futuro link pubblico equivalente, ad esempio `href='./articolo-modello.html'`, con apici singoli o con query/fragment, non verrebbe rilevato. Per una protezione duratura, estrarre/controllare i valori `href` in modo più generale; l'implementazione attuale è comunque conforme al contratto letterale del piano e non esistono riferimenti pubblici nel contenuto corrente.

## Conformità verificata

- `README.md:126` contiene esattamente la responsabilità richiesta: `Modello tecnico non collegato per il template del singolo articolo WordPress`.
- Il test esclude correttamente `articolo-modello.html` dallo scan delle pagine pubbliche.
- La ricerca statica rileva riferimenti al modello solo nel README, nella pagina modello e nella documentazione di progetto; nessuna pagina HTML pubblica corrente lo collega.
- Rieseguita la suite corrente: `node --test tests/site-review.test.cjs` → **34 pass, 0 fail, 0 skipped**.

## Riesame round 1

- **Important 1 — ADDRESSED.** La matrice aggiornata include CTA, footer e pari gerarchia delle due aree in tutte le quattro configurazioni dell'archivio, più le evidenze corrispondenti del modello nelle sue quattro configurazioni.
- **Important 2 — ADDRESSED.** Le suite pre- e post-browser sono ora esplicitamente separate; l'output dettagliato post-browser è conservato.
- **Nuove rotture nel solo aggiornamento del report:** nessuna rilevata.
