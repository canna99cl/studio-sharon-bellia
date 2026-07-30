# Pagina Competenze

Data: 28 luglio 2026

## Obiettivo

Trasformare la pagina “Competenze” da elenco simile a un curriculum a una mappa leggibile e verificabile delle credenziali professionali, distinguendo chiaramente:

- iscrizione professionale;
- formazione universitaria;
- specializzazione in psicoterapia ancora in corso;
- formazione giuridico-forense;
- future iscrizioni agli Albi giudiziari.

## Principi

- I titoli conseguiti saranno distinti dai percorsi ancora in corso.
- La Scuola ALETEIA sarà indicata come percorso di specializzazione in corso.
- Non verrà attribuita la qualifica di psicoterapeuta.
- Il Master universitario di II livello sarà presentato come conseguito nella versione destinata alla pubblicazione successiva alla discussione finale.
- L’iscrizione agli Albi CTU e Periti del Tribunale di Caltanissetta non verrà pubblicata finché non sarà effettiva e verificabile.
- Le descrizioni saranno sintetiche e orientate all’utente, senza riprodurre l’intero curriculum.

## Architettura della pagina

### 1. Hero

Il titolo continuerà a comunicare competenza e rigore documentabili.

Il testo introduttivo spiegherà che la pagina raccoglie titoli, iscrizioni e percorsi formativi rilevanti per l’attività professionale.

### 2. Credenziali essenziali

Subito dopo il hero verrà inserita una riga sintetica con:

- Psicologa;
- Ordine degli Psicologi della Regione Siciliana;
- Sezione A;
- numero 12014;
- area di intervento dichiarata: Psicologia clinica;
- collegamento alla consultazione dell’Albo OPRS.

Questa sezione dovrà essere immediatamente leggibile e non usare lo stile di un badge promozionale.

### 3. Identità professionale

Una card informativa chiarirà:

- iscrizione all’Ordine;
- numero e sezione;
- area dichiarata;
- collegamento alla fonte ufficiale;
- ambiti professionali presentati nel sito.

### 4. Formazione universitaria

Una card informativa conterrà:

- Laurea magistrale in Psicologia Clinica, LM-51;
- Università degli Studi di Urbino Carlo Bo;
- periodo 2018–2022;
- sintesi delle competenze: colloquio clinico, valutazione psicologica, psicodiagnostica e progettazione degli interventi;
- Laurea triennale in Scienze e Tecniche Psicologiche, L-24;
- Università degli Studi Niccolò Cusano;
- periodo 2015–2018;
- sintesi relativa a prevenzione, promozione del benessere e processi psicosociali.

Indirizzi postali e descrizioni curricolari estese non saranno mostrati.

### 5. Specializzazione in psicoterapia

Una card informativa conterrà:

- Scuola di Specializzazione in Psicoterapia Cognitiva ALETEIA;
- percorso iniziato nel 2025 e ancora in corso;
- orientamento cognitivista, costruttivista e complesso;
- approccio dinamico, multimodale, multicontestuale e integrato;
- collegamento al sito ufficiale della scuola.

Non verranno indicati:

- “secondo anno”, perché rapidamente superato;
- qualifica di psicoterapeuta;
- data di conclusione non confermata.

### 6. Psicologia giuridica e forense

Una card informativa conterrà:

- Master universitario di II livello in Criminologia – Psicologia Giuridica e Forense;
- Università eCampus;
- titolo presentato come conseguito nella versione destinata alla pubblicazione;
- collegamento alla pagina istituzionale del Master;
- collegamento interno alla pagina “Psicologia forense e giuridica”.

Non verranno mostrati:

- “in corso”;
- data futura della discussione;
- dichiarazioni quantitative di esperienza.

### 7. Albi giudiziari

La pagina non mostrerà ancora una card pubblica che dichiari l’iscrizione.

Verrà predisposto nel codice un punto chiaramente documentato per inserire successivamente:

- Albo dei CTU del Tribunale di Caltanissetta;
- Albo dei Periti del Tribunale di Caltanissetta;
- categoria o settore;
- eventuale data o numero pertinente;
- collegamento al portale nazionale o alla fonte verificabile.

La relativa attività sarà aggiunta alla checklist WordPress.

## Sistema visivo

La pagina utilizzerà le card informative già approvate:

- fondo e bordo comuni;
- titoli sans-serif oro;
- eventuali icone discrete;
- testo principale e metadati con livelli distinti;
- link alle fonti chiaramente riconoscibili.

La riga delle credenziali essenziali sarà un componente autonomo ma coerente, non una quarta famiglia di card.

Le informazioni saranno organizzate in quattro card principali:

1. Identità professionale
2. Formazione universitaria
3. Specializzazione in psicoterapia
4. Psicologia giuridica e forense

## Collegamenti

La pagina conterrà collegamenti a:

- Albo OPRS;
- Università di Urbino;
- Università Niccolò Cusano;
- Scuola ALETEIA;
- Master eCampus;
- pagina interna di psicologia forense.

I link esterni si apriranno in una nuova scheda con `rel="noopener"`.

## Checklist WordPress

La checklist dovrà comprendere:

- verificare il conseguimento effettivo del Master prima della pubblicazione;
- inserire data finale o denominazione ufficiale del titolo, se utile;
- verificare l’iscrizione all’Albo CTU del Tribunale di Caltanissetta;
- verificare l’iscrizione all’Albo Periti del Tribunale di Caltanissetta;
- inserire soltanto dati consultabili o documentabili;
- aggiornare i dati strutturati e le credenziali riportate nelle altre pagine.

## Verifica

L’implementazione sarà completata quando:

- le credenziali essenziali sono visibili subito dopo il hero;
- i quattro ambiti formativi sono distinti;
- ALETEIA è indicata correttamente come percorso in corso;
- non compare la qualifica di psicoterapeuta;
- il Master non contiene riferimenti temporanei alla discussione futura;
- gli Albi CTU e Periti non vengono dichiarati come già acquisiti;
- tutti i link istituzionali funzionano semanticamente;
- la pagina mantiene una gerarchia logica dei titoli;
- non vengono introdotti overflow o regressioni responsive;
- i test automatici risultano superati.

