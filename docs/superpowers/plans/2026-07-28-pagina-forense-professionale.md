# Pagina forense professionale Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ricostruire la pagina forense distinguendo correttamente destinatari, ruoli giudiziari e di parte, ambiti, processo, confini professionali, FAQ e CTA.

**Architecture:** La pagina continuerà a usare i componenti HTML e CSS condivisi del tema. Le card informative rappresenteranno destinatari, ruoli e ambiti; le card con numerazione romana rappresenteranno il processo; l’accordion esistente conterrà le FAQ. I contratti contenutistici e strutturali saranno protetti da test statici Node e verificati nel browser.

**Tech Stack:** HTML5, CSS responsive esistente, JavaScript vanilla esistente, test runner nativo Node.js.

## Global Constraints

- Dare pari rilievo a civile, penale e famiglia/minori.
- Distinguere CTU civile, perito penale, CTP e attività extragiudiziali.
- Non presentare CTU o perito come incarichi prenotabili.
- Non dichiarare iscrizioni, numeri di albo giudiziario o esperienze non ancora verificabili.
- Non promettere risultati, accettazione automatica o tempi standard.
- Non modificare form, privacy, download, fotografie o integrazioni WordPress.
- Riutilizzare soltanto le tre famiglie di card approvate.

---

### Task 1: Definire destinatari e ruoli professionali

**Files:**
- Modify: `tests/site-review.test.cjs`
- Modify: `psicologia-forense.html`

**Interfaces:**
- Consumes: `.detail`, `.situations`, `.situation`.
- Produces: sezioni `#destinatari-forense` e `#ruoli-forense`.

- [ ] **Step 1: Scrivere il test strutturale**

Aggiungere un test che verifichi nella pagina forense:

```text
Privati e famiglie
Avvocati
Autorità giudiziaria
CTU in ambito civile
Perito in ambito penale
Consulenza Tecnica di Parte (CTP)
Valutazioni e relazioni extragiudiziali
```

Il test deve verificare che “CTU” compaia vicino a “nomina dell’autorità giudiziaria” e “Perito” vicino alla stessa distinzione.

- [ ] **Step 2: Eseguire il test e osservare il fallimento**

Run: `node --test tests/site-review.test.cjs`

Expected: FAIL perché destinatari e perito penale non sono ancora presenti.

- [ ] **Step 3: Aggiornare il hero**

Usare:

```html
<p class="subhero__lede reveal">Consulenze, valutazioni e incarichi psicologici in ambito civile, penale e famiglia e minori, con attenzione al quesito, al ruolo professionale e alla documentazione tecnica.</p>
```

Impostare la CTA:

```html
<a class="btn btn--primary" href="index.html#prenota">Richiedi una valutazione preliminare del quesito</a>
```

- [ ] **Step 4: Inserire “A chi mi rivolgo”**

Creare tre card informative per privati e famiglie, avvocati e autorità giudiziaria.

- [ ] **Step 5: Inserire “Ruoli e incarichi”**

Creare quattro card informative:

- CTU in ambito civile;
- Perito in ambito penale;
- CTP;
- Valutazioni e relazioni extragiudiziali.

Le prime due devono specificare che l’incarico deriva dalla nomina dell’autorità giudiziaria.

- [ ] **Step 6: Eseguire i test**

Run: `node --test tests/site-review.test.cjs`

Expected: PASS.

### Task 2: Organizzare i tre ambiti sullo stesso livello

**Files:**
- Modify: `tests/site-review.test.cjs`
- Modify: `psicologia-forense.html`
- Modify: `assets/css/styles.css`

**Interfaces:**
- Consumes: card informative esistenti.
- Produces: `.forensic-areas` con tre blocchi paritari.

- [ ] **Step 1: Scrivere il test degli ambiti**

Verificare una sezione `id="ambiti-forensi"` con esattamente tre card principali:

```text
Ambito civile
Ambito penale
Famiglia e minori
```

Verificare la presenza di capacità genitoriali, consulenza tecnica di parte, valutazioni psicologiche pertinenti al quesito e tutela del minore.

- [ ] **Step 2: Eseguire il test e osservare il fallimento**

Run: `node --test tests/site-review.test.cjs`

Expected: FAIL perché gli ambiti attuali sono sei card eterogenee.

- [ ] **Step 3: Sostituire la sezione degli ambiti**

Creare tre `article` con la stessa struttura e liste sintetiche. Non usare badge che possano suggerire priorità diverse.

- [ ] **Step 4: Aggiungere il layout CSS**

Creare una griglia:

```css
.forensic-areas {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--sp-4);
}
```

Portarla a una colonna sotto il breakpoint tablet e applicare alle card lo stesso trattamento delle card informative.

- [ ] **Step 5: Eseguire i test**

Run: `node --test tests/site-review.test.cjs`

Expected: PASS.

### Task 3: Estendere il processo di lavoro

**Files:**
- Modify: `tests/site-review.test.cjs`
- Modify: `psicologia-forense.html`
- Modify: `assets/css/styles.css`

**Interfaces:**
- Consumes: `.steps`, `.step`, `.step__num`, `.step__title`.
- Produces: processo forense in sei fasi.

- [ ] **Step 1: Scrivere il test del processo**

Verificare la presenza, nell’ordine, di:

```text
Analisi preliminare
Mandato e quesito
Documentazione e attività valutative
Elaborazione tecnica
Relazione e restituzione
Attività processuali
```

Verificare sei `.step` e numerazione romana da `i` a `vi`.

- [ ] **Step 2: Eseguire il test e osservare il fallimento**

Run: `node --test tests/site-review.test.cjs`

Expected: FAIL perché il processo ha quattro fasi.

- [ ] **Step 3: Sostituire il processo**

Inserire le sei fasi previste e una nota che distingua nomina giudiziaria, incarico di parte e verifica preliminare di pertinenza, compatibilità e disponibilità.

- [ ] **Step 4: Adattare la griglia**

Per la sola pagina forense usare una classe `.steps--six`:

- tre colonne su desktop;
- due su tablet;
- una su telefono.

- [ ] **Step 5: Eseguire i test**

Run: `node --test tests/site-review.test.cjs`

Expected: PASS.

### Task 4: Rendere espliciti i confini professionali

**Files:**
- Modify: `tests/site-review.test.cjs`
- Modify: `psicologia-forense.html`

**Interfaces:**
- Consumes: `.detail--alt`, `.method-list`.
- Produces: sezione `#confini-forensi`.

- [ ] **Step 1: Scrivere il test dei confini**

Verificare la presenza di:

```text
mandato
quesito
non coincide con un percorso clinico
chiarezza del ruolo
dati disponibili
riservatezza
non accettazione dell'incarico
```

- [ ] **Step 2: Eseguire il test e osservare il fallimento**

Run: `node --test tests/site-review.test.cjs`

Expected: FAIL perché i confini non sono espressi in modo completo.

- [ ] **Step 3: Sostituire la sezione metodo**

Usare un’introduzione e una `method-list` per:

- mandato e quesito;
- distinzione dal percorso clinico;
- strumenti pertinenti;
- conclusioni motivate e limitate;
- riservatezza nel contesto giuridico;
- verifica di incompatibilità e possibilità di non accettare l’incarico.

- [ ] **Step 4: Eseguire i test**

Run: `node --test tests/site-review.test.cjs`

Expected: PASS.

### Task 5: Sostituire le FAQ e la CTA conclusiva

**Files:**
- Modify: `tests/site-review.test.cjs`
- Modify: `psicologia-forense.html`

**Interfaces:**
- Consumes: accordion `.faq__item` e `.cta-band`.
- Produces: otto FAQ tecniche e CTA preliminare coerente.

- [ ] **Step 1: Scrivere il test delle FAQ e CTA**

Verificare esattamente otto `details` nel gruppo `faq-forense` e le domande:

```text
Qual è la differenza tra CTU, perito e CTP?
Un privato può richiedere direttamente una CTU o una perizia?
Quando può essere utile una consulenza tecnica di parte?
Quali documenti servono per il primo confronto?
Una valutazione forense è un percorso clinico?
È possibile richiedere una relazione psicologica?
L’attività può svolgersi interamente online?
Come vengono definiti tempi e compenso?
```

Verificare che la CTA conclusiva contenga “valutazione preliminare del quesito” e che la pagina non contenga “prenota una CTU” o “prenota una perizia”.

- [ ] **Step 2: Eseguire il test e osservare il fallimento**

Run: `node --test tests/site-review.test.cjs`

Expected: FAIL perché sono presenti tre FAQ e una CTA generica.

- [ ] **Step 3: Inserire le otto FAQ**

Scrivere risposte concise che:

- distinguano i ruoli;
- chiariscano che CTU e perito derivano dalla nomina;
- indichino documentazione, pertinenza e verifica preliminare;
- distinguano valutazione forense e percorso clinico;
- non garantiscano la produzione di una relazione;
- chiariscano che alcune attività richiedono presenza;
- rimandino tempi e compenso alla complessità del quesito.

- [ ] **Step 4: Aggiornare la CTA**

Usare:

```html
<h2 id="cta-title">Vuoi sottoporre un quesito?</h2>
<p>Il primo contatto serve a comprendere la richiesta, verificare la pertinenza dell'intervento e chiarire ruolo, documentazione e modalità dell'eventuale incarico.</p>
<a class="btn btn--light" href="index.html#prenota">Richiedi una valutazione preliminare del quesito</a>
```

- [ ] **Step 5: Eseguire i test**

Run: `node --test tests/site-review.test.cjs`

Expected: PASS.

### Task 6: Verifica integrata

**Files:**
- Verify: `psicologia-forense.html`
- Verify: `assets/css/styles.css`
- Verify: `tests/site-review.test.cjs`

**Interfaces:**
- Consumes: pagina completa.
- Produces: pagina verificata e pronta per il prossimo punto.

- [ ] **Step 1: Eseguire la suite completa**

Run: `node --test tests/site-review.test.cjs`

Expected: tutti i test PASS.

- [ ] **Step 2: Controllare struttura e link**

Verificare:

- un solo `h1`;
- nessun salto irregolare nella gerarchia dei titoli;
- nessun ID duplicato;
- nessun link vuoto;
- CTA indirizzata a `index.html#prenota`.

- [ ] **Step 3: Verificare nel browser**

Controllare tema chiaro e scuro, desktop e responsive:

- nessun overflow;
- tre destinatari leggibili;
- quattro ruoli distinguibili;
- tre ambiti con pari rilievo;
- sei fasi ordinabili;
- otto FAQ utilizzabili;
- nessun errore console.

- [ ] **Step 4: Rilettura professionale**

Confermare l’assenza di:

- iscrizione futura all’Albo CTU o Periti;
- esperienza numerica non documentata;
- promessa di risultato;
- CTU o perizia presentate come prenotabili;
- confusione tra valutazione forense e percorso clinico.

