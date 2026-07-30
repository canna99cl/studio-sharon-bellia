# Accessibilità delle interazioni

## Obiettivo

Correggere le criticità confermate di tastiera, focus e validazione senza modificare
layout, testi visibili, colori di base o comportamento del sito con il puntatore.

## Menu mobile e tablet

- Quando il menu viene aperto, il focus passa al primo collegamento.
- `Tab` e `Shift+Tab` restano ciclicamente tra collegamenti del menu e pulsante di chiusura.
- `Escape`, attivazione del pulsante o scelta di un collegamento chiudono il menu.
- Alla chiusura tramite pulsante o `Escape`, il focus torna al pulsante hamburger.
- L'apertura mantiene la dissolvenza; la chiusura è immediata, così il ripristino del
  `backdrop-filter` dell'header non può intrappolare l'overlay ancora visibile.
- Il contenimento del focus si applica soltanto entro il breakpoint mobile/tablet
  già esistente di 1200 px.
- Tutti i pulsanti hamburger usano `type="button"`.

## Indicatore di focus

- L'indicatore ambra corrente rimane sui fondi chiari.
- Nelle sezioni con fondo scuro (`ambito--dark`, `quote`, `detail--dark`, `cta-band`,
  `footer`) il focus usa `#F3F4EF`, con contrasto superiore a 3:1.
- Forma, spessore e offset dell'indicatore non cambiano.

## Form

- Il suggerimento del messaggio riceve `id="messaggio-hint"` e il campo usa
  `aria-describedby="messaggio-hint"`.
- Al tentativo di invio non valido, ogni controllo non valido riceve
  `aria-invalid="true"` e il primo mantiene il focus.
- Al successivo evento `input` o `change` di un controllo valido, `aria-invalid`
  viene rimosso.
- Il messaggio generale con `role="status"` e `aria-live="polite"` resta invariato.

## Verifica

- Test statici coprono struttura HTML, selettore di focus scuro e gestione ARIA.
- Test statici verificano focus iniziale, ciclo `Tab`/`Shift+Tab`, chiusura con
  `Escape` e ripristino sul pulsante.
- La sintassi JavaScript e l'intera suite del sito devono passare.
