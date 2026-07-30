# Footer mobile, recapiti e ritmo delle pagine interne

## Obiettivo

Migliorare la navigazione mobile e rendere più coerenti le pagine interne, senza appesantire la home e senza introdurre dati professionali non ancora definitivi.

## Percorso e modalità

L’indice orizzontale “In questa pagina” resta disponibile su desktop, dove agevola l’accesso alle sezioni, ma viene completamente nascosto sotto i 700 px. Su mobile l’utente prosegue con lo scorrimento naturale della pagina, senza sostituti fissi o menu aggiuntivi.

## Footer

Su desktop il footer conserva l’attuale disposizione a colonne. Sotto i 700 px, i gruppi “Esplora” e “Ambiti” diventano pannelli espandibili nativi basati su `details` e `summary`.

- Entrambi partono chiusi per mantenere il footer compatto.
- Possono essere aperti indipendentemente.
- Il riepilogo mantiene un’area tattile di almeno 44 px.
- Un indicatore visivo segnala lo stato aperto o chiuso.
- I link e la loro destinazione non cambiano.
- La struttura viene applicata in modo uniforme a tutte le pagine pubbliche.

## Recapiti nella home

Subito dopo il modulo di contatto viene aggiunta una fascia discreta con:

- email: `[email professionale]`;
- telefono e WhatsApp: `[numero professionale]`;
- sede: `Caltanissetta · [indirizzo dello studio]`;
- disponibilità online: `Online in tutta Italia`.

I dati restano segnaposto visibili e non vengono trasformati in link fittizi. La fascia usa tipografia, bordi e colori già presenti nel sito, senza card prominenti e senza una nuova call to action. Un testo breve chiarisce che i recapiti definitivi verranno inseriti prima della pubblicazione.

## Ritmo verticale delle pagine interne

Tutte le pagine diverse dalla home adottano un ritmo condiviso:

- sezioni principali: `var(--sp-7)` sopra e sotto su desktop;
- sezioni compatte o introduttive: `var(--sp-6)` sopra e sotto;
- mobile: riduzione coerente di un livello, evitando spazi inferiori a `var(--sp-5)`;
- titoli, testi introduttivi e griglie mantengono distanze interne basate sui token esistenti;
- CTA finali conservano una separazione più ampia dal contenuto precedente;
- nessuna modifica alla spaziatura specifica della home.

Le eccezioni necessarie per composizioni grafiche o sezioni scure vengono mantenute solo quando migliorano realmente la leggibilità.

## Accessibilità e responsive

- Nessun contenuto essenziale viene rimosso su mobile, salvo l’indice duplicativo della pagina Percorso e modalità.
- `details` e `summary` garantiscono funzionamento senza JavaScript.
- Focus, contrasto e aree tattili seguono gli stili già esistenti.
- La barra mobile persistente non deve coprire gli ultimi contenuti del footer.

## Verifica

I test controlleranno:

1. indice della pagina nascosto solo su mobile;
2. footer espandibile presente e coerente in tutte le pagine;
3. recapiti segnaposto collocati dopo il form;
4. uso dei token condivisi per le spaziature interne;
5. destinazioni dei link, ID univoci e sintassi JavaScript invariati;
6. rendering visivo su desktop e mobile, tema chiaro e scuro.
