# Pagina Competenze Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convertire la pagina Competenze in una mappa sintetica, verificabile e responsive delle credenziali professionali.

**Architecture:** La pagina manterrà hero, CTA e footer esistenti. Il corpo verrà organizzato in una fascia di credenziali essenziali e quattro card informative, riutilizzando il sistema visivo esistente; i dati giudiziari non ancora verificabili resteranno fuori dall’HTML pubblico e saranno registrati nella checklist WordPress.

**Tech Stack:** HTML5, CSS responsive esistente, JavaScript vanilla esistente, test runner nativo Node.js.

## Global Constraints

- ALETEIA deve risultare un percorso in corso.
- Non usare la qualifica di psicoterapeuta.
- Il Master non deve contenere riferimenti alla futura discussione.
- Non dichiarare ancora iscrizioni agli Albi CTU o Periti.
- Non aggiungere una nuova famiglia di card.
- Preservare font, colori, contrasto, touch target e responsive.

---

### Task 1: Inserire le credenziali essenziali

**Files:**
- Modify: `tests/site-review.test.cjs`
- Modify: `competenze.html`
- Modify: `assets/css/styles.css`

**Interfaces:**
- Consumes: hero della pagina e token CSS esistenti.
- Produces: `.credentials-strip` immediatamente successiva al hero.

- [ ] Scrivere un test che verifichi Psicologa, OPRS Sicilia, Sezione A, n. 12014, Psicologia clinica e il link `https://www.oprs.it/albo/`.
- [ ] Eseguire `node --test tests/site-review.test.cjs` e osservare il fallimento.
- [ ] Inserire una fascia semantica con `aria-label="Credenziali essenziali"` subito dopo il subhero.
- [ ] Stilizzare la fascia come componente sintetico, con wrapping desktop e disposizione verticale su telefono, senza aspetto promozionale.
- [ ] Eseguire la suite e verificare il passaggio del test.

### Task 2: Riorganizzare le quattro card principali

**Files:**
- Modify: `tests/site-review.test.cjs`
- Modify: `competenze.html`

**Interfaces:**
- Consumes: `.authority__grid` e `.auth-card`.
- Produces: quattro card con ruoli univoci.

- [ ] Scrivere un test che verifichi esattamente quattro card intitolate Identità professionale, Formazione universitaria, Specializzazione in psicoterapia, Psicologia giuridica e forense.
- [ ] Eseguire la suite e osservare il fallimento sui titoli attuali.
- [ ] Sostituire il contenuto delle card mantenendo la gerarchia `h2` nascosto della sezione e `h3` per ogni card.
- [ ] Eseguire la suite e verificare il passaggio del test.

### Task 3: Rendere stabili e corrette le credenziali formative

**Files:**
- Modify: `tests/site-review.test.cjs`
- Modify: `competenze.html`

**Interfaces:**
- Consumes: testi delle quattro card.
- Produces: descrizioni sintetiche senza informazioni rapidamente obsolete.

- [ ] Scrivere test che richiedano LM-51 Urbino 2018–2022, L-24 Niccolò Cusano 2015–2018, ALETEIA dal 2025 “in corso”, orientamento cognitivista/costruttivista/complesso e Master eCampus presentato come conseguito.
- [ ] Nel medesimo test escludere “secondo anno”, “discussione finale prevista”, “Master in corso”, “psicoterapeuta” e dichiarazioni di iscrizione CTU/Periti.
- [ ] Eseguire la suite e osservare il fallimento.
- [ ] Riscrivere le descrizioni in forma sintetica, eliminando indirizzi postali e dettagli curricolari estesi.
- [ ] Eseguire la suite e verificare il passaggio del test.

### Task 4: Verificare i collegamenti istituzionali

**Files:**
- Modify: `tests/site-review.test.cjs`
- Modify: `competenze.html`

**Interfaces:**
- Consumes: link istituzionali già presenti.
- Produces: sei destinazioni riconoscibili e sicure.

- [ ] Scrivere un test che verifichi i link a OPRS, Uniurb, Unicusano, ALETEIA, eCampus e `psicologia-forense.html`.
- [ ] Verificare che i cinque collegamenti esterni abbiano `target="_blank"` e `rel="noopener"`.
- [ ] Eseguire la suite e osservare eventuali fallimenti.
- [ ] Correggere etichette, URL e attributi senza modificare le destinazioni ufficiali concordate.
- [ ] Eseguire la suite e verificare il passaggio del test.

### Task 5: Aggiornare la checklist WordPress

**Files:**
- Modify: `tests/site-review.test.cjs`
- Modify: `README.md`

**Interfaces:**
- Consumes: checklist WordPress esistente.
- Produces: attività di verifica finale per Master e Albi giudiziari.

- [ ] Scrivere un test che richieda nella checklist Master conseguito, Albo CTU Caltanissetta, Albo Periti Caltanissetta e aggiornamento dei dati strutturati.
- [ ] Eseguire la suite e osservare il fallimento.
- [ ] Aggiungere le quattro verifiche come caselle non selezionate.
- [ ] Eseguire la suite e verificare il passaggio del test.

### Task 6: Verifica integrata

**Files:**
- Verify: `competenze.html`
- Verify: `assets/css/styles.css`
- Verify: `README.md`
- Verify: `tests/site-review.test.cjs`

**Interfaces:**
- Consumes: pagina completata.
- Produces: pagina verificata.

- [ ] Eseguire `node --test tests/site-review.test.cjs`.
- [ ] Verificare un solo `h1`, nessun salto di heading, nessun ID duplicato e nessun link vuoto.
- [ ] Controllare nel browser a 1280×720 e 390×844, nei temi chiaro e scuro.
- [ ] Verificare assenza di overflow, leggibilità della fascia credenziali, quattro card, CTA e nessun errore console.
- [ ] Rileggere la pagina per escludere qualifica di psicoterapeuta e iscrizioni giudiziarie anticipate.

