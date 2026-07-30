# Ottimizzazione prestazionale delle animazioni

## Obiettivo

Conservare integralmente l'identità animata del sito riducendo attesa percepita,
consumo di CPU e lavoro grafico non visibile, soprattutto su tablet e mobile.

## Preloader

- Il preloader della home rimane parte dell'esperienza.
- Rimane visibile per almeno 250 ms, evitando un lampo troppo breve.
- Dopo il caricamento della pagina scompare appena è trascorso il tempo minimo.
- Un fallback massimo di 2500 ms impedisce che blocchi il contenuto.
- Con `prefers-reduced-motion: reduce` viene disattivato immediatamente.
- La sua uscita non deve dipendere dal caricamento asincrono dei font Google.

## Paesaggio animato

- Movimento e parallasse restano visivamente invariati sul desktop.
- Il ciclo grafico lavora soltanto quando la hero è nel viewport e la scheda è visibile.
- Quando la hero esce dal viewport o la scheda passa in secondo piano, il ciclo si ferma.
- Al rientro riparte senza salti visivi e senza avviare più cicli concorrenti.
- Su viewport fino a 1200 px viene eseguito al massimo un aggiornamento ogni 33 ms;
  sopra 1200 px resta fluida fino alla frequenza del display.
- Con movimento ridotto il ciclo non viene avviato.

## Altre animazioni

- Reveal, blur, animazione delle parole, shimmer e decorazioni restano presenti.
- Gli aggiornamenti delle parole continuano a essere sincronizzati con
  `requestAnimationFrame`.
- Le animazioni CSS vengono messe in pausa quando la scheda non è visibile tramite
  una classe di stato applicata alla radice del documento.
- I contenuti restano leggibili quando JavaScript non è disponibile.

## Compatibilità e fallback

- `IntersectionObserver` viene usato quando disponibile.
- Nei browser senza `IntersectionObserver`, il paesaggio resta attivo mentre la pagina
  è visibile, senza perdere la funzione decorativa.
- `visibilitychange` governa la sospensione della scheda.
- Nessuna modifica a testi, layout, colori, spaziature o navigazione.

## Verifica

- Test statici verificano le soglie del preloader e l'assenza del precedente ritardo
  fisso di 500 ms.
- Test statici verificano controllo di viewport, visibilità della scheda, limite tablet
  e protezione contro cicli concorrenti.
- La suite completa del sito e il controllo sintattico JavaScript devono passare.
- Vanno controllate home e navigazione alle larghezze 390, 768, 1200 e 1280 px quando
  il browser locale è disponibile.
