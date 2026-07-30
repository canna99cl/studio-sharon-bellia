# Sistema card, menu, percorso e pagina forense

Data: 28 luglio 2026

## Obiettivo

Rendere il tema più ordinato e leggibile attraverso tre famiglie di card chiaramente riconoscibili, una navigazione principale più essenziale, un accesso rapido alle informazioni della pagina “Percorso e modalità” e una pagina forense professionale priva di riferimenti transitori destinati a risultare superati alla pubblicazione.

## Ambito dell’intervento

L’intervento riguarda:

- sistema visivo delle card;
- menu principale e collegamenti secondari;
- navigazione interna di “Percorso e modalità”;
- testi transitori della pagina forense e delle FAQ collegate;
- aggiornamento della checklist delle attività rinviate a WordPress.

Non riguarda:

- funzionamento reale del form;
- privacy policy, cookie policy e note legali;
- inserimento di dati di contatto definitivi;
- creazione delle pagine complete degli articoli;
- download e raccolta dati delle risorse;
- inserimento delle fotografie;
- collegamento a servizi o plugin WordPress.

## Sistema delle card

Il tema utilizzerà tre famiglie visive, ciascuna associata a una funzione precisa.

### 1. Card editoriali

Destinate agli articoli e ai contenuti di approfondimento.

Caratteristiche:

- immagine o illustrazione nella parte superiore;
- categoria e tempo di lettura come metadati;
- titolo in Fraunces, più grande e nel colore principale del testo;
- estratto sintetico;
- contenitore, bordo, raggio e comportamento interattivo coerenti con il resto del sito.

Le card manterranno l’aspetto editoriale della versione precedente e non useranno il piccolo titolo maiuscolo oro delle card informative.

### 2. Card di processo

Destinate esclusivamente alle sequenze operative:

- percorso dalla richiesta alla prosecuzione;
- fasi iniziali del percorso clinico;
- eventuali processi professionali descritti in sequenza.

Caratteristiche:

- numerazione romana;
- progressione visiva chiara;
- titolo compatto;
- testo breve;
- struttura uniforme tra tutte le pagine che descrivono passaggi consecutivi.

### 3. Card informative

Destinate a:

- competenze;
- destinatari;
- situazioni cliniche;
- modalità operative;
- risorse;
- altri gruppi di informazioni non sequenziali.

Caratteristiche:

- stile derivato dalle card della pagina “Competenze”;
- titolo sans-serif oro;
- bordo e superficie comuni;
- padding coerente;
- eventuale icona discreta;
- testo descrittivo con gerarchia costante.

## Navigazione principale

Il menu desktop e mobile conterrà:

1. Chi sono
2. Ambiti
3. Percorso
4. Competenze
5. Articoli
6. Contatti

“FAQ” e “Risorse” non occuperanno una voce nel menu principale. Rimarranno raggiungibili:

- dal footer;
- dai collegamenti contestuali nelle pagine;
- dalle sezioni pertinenti della home.

Non verrà introdotto un menu a discesa.

La voce “Contatti” condurrà alla sezione contatti della home o alla destinazione equivalente dalle pagine interne.

## Pagina “Percorso e modalità”

Dopo l’introduzione verrà aggiunto un indice interno breve e accessibile.

Le destinazioni principali saranno:

- Come funziona
- Destinatari
- Incontri
- Online
- Adolescenti
- Spostamenti
- Urgenze

L’indice userà collegamenti ad ancore esistenti o consolidate nella pagina. Dovrà:

- essere leggibile su desktop e mobile;
- non imitare il menu principale;
- consentire una rapida scansione della pagina;
- rispettare il sistema tipografico e cromatico esistente;
- mantenere visibile il titolo della sezione dopo il salto, considerando l’header fisso.

## Pagina forense e FAQ

La pagina manterrà una presentazione professionale dell’ambito forense e dei servizi proposti.

Verranno eliminati i riferimenti transitori a:

- Master o formazione ancora in corso;
- assenza di incarichi CTP già svolti;
- futura abilitazione o futura disponibilità.

I testi descriveranno:

- ambiti di intervento;
- ruolo della consulenza;
- destinatari;
- modalità generali del lavoro;
- rapporto con avvocati e parti;
- confini tra CTU e CTP.

Non verranno inseriti:

- numeri di incarichi;
- casi seguiti;
- collaborazioni specifiche;
- esperienza pregressa non documentata;
- titoli o qualifiche non ancora presenti nei dati definitivi forniti.

La FAQ sulla differenza tra CTU e CTP resterà informativa, senza la frase transitoria relativa alla formazione e agli incarichi.

## Checklist WordPress

La checklist dovrà conservare come attività successive:

- collegamento del form a un’app o plugin;
- privacy policy;
- cookie policy;
- note legali;
- consenso e gestione dei dati del form;
- dati professionali e di contatto definitivi;
- mappa e profili social reali;
- pagine complete e collegamenti degli articoli;
- sistema di download delle risorse;
- raccolta dati e consegna automatica di ebook o materiali;
- fotografie professionali;
- canonical, Open Graph, sitemap e configurazione SEO finale;
- verifica conclusiva dei contenuti forensi rispetto ai titoli effettivamente conseguiti al momento della pubblicazione.

## Accessibilità e responsive

Le modifiche dovranno preservare:

- assenza di overflow orizzontale;
- focus da tastiera visibile;
- target tattili adeguati;
- gerarchia logica dei titoli;
- contrasto conforme;
- supporto a `prefers-reduced-motion`;
- funzionamento del menu mobile;
- ancore non nascoste dall’header fisso.

## Verifica

L’implementazione sarà considerata completata quando:

- le tre famiglie di card risultano visivamente e semanticamente distinte;
- gli articoli recuperano una gerarchia editoriale più forte;
- le sequenze conservano la numerazione romana;
- le card informative mantengono lo stile “Competenze”;
- il menu principale contiene esattamente sei destinazioni;
- FAQ e Risorse restano raggiungibili;
- la pagina “Percorso e modalità” presenta l’indice interno funzionante;
- la pagina forense e le FAQ non contengono riferimenti transitori;
- tutte le pagine restano prive di overflow su desktop e mobile;
- i test automatici esistenti e quelli aggiunti risultano superati.

