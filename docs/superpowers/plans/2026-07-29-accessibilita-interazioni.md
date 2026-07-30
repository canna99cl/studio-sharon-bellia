# Accessibilità interazioni — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rendere menu mobile, focus e form pienamente utilizzabili con tastiera e tecnologie assistive senza cambiare la UI.

**Architecture:** Il comportamento rimane in `assets/js/main.js`; una funzione unica apre/chiude il menu e un gestore `keydown` contiene il focus. Il form espone lo stato nativo attraverso ARIA. HTML e CSS ricevono soltanto attributi e selettori accessibili.

**Tech Stack:** HTML5, CSS, JavaScript ES5-compatible, Node test runner.

## Global Constraints

- Nessuna modifica a layout, testi visibili, colori di base o navigazione.
- Focus intrappolato soltanto entro 1200 px e mentre `body.nav-open` è attivo.
- Focus scuro `#F3F4EF`.
- Nessuna nuova dipendenza.

---

### Task 1: Semantica HTML e contrasto del focus

**Files:**
- Modify: `tests/site-review.test.cjs`
- Modify: `index.html`
- Modify: tutti i file HTML con `.nav__toggle`
- Modify: `assets/css/styles.css`

- [ ] Scrivere un test che richieda `type="button"` su ogni `.nav__toggle`,
  `aria-describedby="messaggio-hint"`, l'ID del suggerimento e il selettore di focus
  chiaro per tutte le cinque superfici scure.
- [ ] Eseguire il test e verificare che fallisca sui file attuali.
- [ ] Applicare gli attributi HTML e il selettore CSS minimo.
- [ ] Rieseguire il test e verificarne il passaggio.

### Task 2: Gestione del focus nel menu

**Files:**
- Modify: `tests/site-review.test.cjs`
- Modify: `assets/js/main.js`

- [ ] Scrivere un test che richieda `setNavOpen`, focus sul primo link, breakpoint
  `max-width: 1200px`, gestione `Tab`/`Shift+Tab`, `preventDefault` e ripristino sul toggle.
- [ ] Eseguire il test e verificare che fallisca.
- [ ] Centralizzare apertura e chiusura in `setNavOpen(open, restoreFocus)`.
- [ ] Aggiungere il ciclo del focus tra primo link e toggle soltanto con menu aperto.
- [ ] Rieseguire il test e verificarne il passaggio.

### Task 3: Stato accessibile del form

**Files:**
- Modify: `tests/site-review.test.cjs`
- Modify: `assets/js/main.js`

- [ ] Scrivere un test che richieda l'impostazione di `aria-invalid` su tutti i controlli
  `:invalid` e la rimozione su `input`/`change` quando `checkValidity()` torna vero.
- [ ] Eseguire il test e verificare che fallisca.
- [ ] Implementare due funzioni: `markInvalidFields()` e `clearFieldError(event)`.
- [ ] Rieseguire il test e verificarne il passaggio.

### Task 4: Regressione

**Files:**
- Verify: tutti i file modificati.

- [ ] Eseguire `node --check assets/js/main.js`.
- [ ] Eseguire `node --test tests/site-review.test.cjs`.
- [ ] Cercare attributi mancanti e riferimenti ARIA non risolti.
- [ ] Confermare che la suite sia interamente verde.

### Task 5: Chiusura stabile dell'overlay tablet

**Files:**
- Modify: `tests/site-review.test.cjs`
- Modify: `assets/css/styles.css`

- [ ] Scrivere un test che richieda nessuna transizione nello stato chiuso e la sola
  transizione di opacità nello stato `body.nav-open`.
- [ ] Verificare il fallimento con le regole attuali che animano anche la chiusura.
- [ ] Spostare la transizione dalla regola base alla regola aperta.
- [ ] Eseguire test mirato, sintassi JavaScript e suite completa.

Il progetto non è un repository Git; commit e worktree non sono applicabili.
