# Conversione WordPress del sito Sharon

## Obiettivo

Convertire il sito statico in un tema WordPress personalizzato e in un plugin gratuito
di supporto, conservando integralmente i file HTML originali e precaricando tutti i
contenuti attuali come dati modificabili.

## Vincoli di sicurezza

- Nessun file HTML originale può essere modificato, rinominato o eliminato.
- Prima di ogni operazione vengono registrati hash SHA-256 degli HTML e degli asset
  pubblici; gli stessi hash vengono verificati al termine.
- Tutto il nuovo lavoro vive sotto `wordpress/`.
- `wordpress/static-reference/` contiene una copia del progetto esistente precedente
  alla conversione, escludendo soltanto `wordpress/` per evitare ricorsione.
- La copia include HTML, asset, test, documentazione e cartelle nascoste presenti.
- La conversione non richiede una installazione WordPress locale per produrre i
  pacchetti; dove WordPress non è disponibile si usano controlli statici e PHP lint.

## Struttura

```text
wordpress/
├── static-reference/
├── wp-content/
│   ├── plugins/
│   │   └── sharon-core/
│   └── themes/
│       └── sharon-bellia/
├── packages/
│   ├── sharon-core.zip
│   └── sharon-bellia.zip
└── INSTALLAZIONE.md
```

## Separazione delle responsabilità

### Plugin `sharon-core`

Il plugin conserva funzionalità e dati indipendenti dal tema:

- pagina amministrativa “Dati professionali”;
- campi strutturati delle pagine;
- tipo di contenuto `sharon_resource`;
- metadati di articoli e risorse;
- importazione iniziale di pagine, contenuti e menu;
- stato e versione dell'importazione;
- funzioni pubbliche di lettura dei dati usate dal tema;
- sanificazione, autorizzazioni e nonce dei pannelli amministrativi.

### Tema `sharon-bellia`

Il tema controlla esclusivamente la presentazione:

- header, footer e navigazione;
- home e template delle pagine professionali;
- archivi e singoli di articoli e risorse;
- CSS, JavaScript, animazioni e responsive;
- immagini responsive;
- fallback leggibili quando il plugin non è attivo.

## Dati professionali globali

Un'unica opzione WordPress contiene:

- nome e cognome;
- qualifica e area di intervento;
- Ordine, sezione e numero Albo;
- URL di verifica Albo;
- P.IVA;
- email, telefono e numero WhatsApp;
- indirizzo, CAP, città, provincia e URL mappa;
- giorni e orari;
- disponibilità online;
- URL Facebook, Instagram e LinkedIn;
- tempo indicativo di risposta;
- preavviso richiesto.

Ogni valore viene sanificato secondo il tipo: testo, email, URL, telefono o contenuto
multilinea. Il frontend mostra soltanto valori non vuoti.

## Modello delle pagine

Le pagine usano metadati registrati dal plugin e pannelli nativi WordPress.

### Home

- hero: occhiello, titolo, testo, CTA e immagine;
- introduzione;
- presentazione e ritratto;
- credenziali essenziali;
- tre ambiti professionali;
- citazione;
- FAQ;
- blocco primo contatto;
- recapiti;
- interruttore mostra/nascondi per ogni sezione.

L'ordine è fisso e non modificabile.

### Pagine professionali

Clinica, psicoterapia, forense, percorso/modalità e competenze espongono:

- hero;
- introduzione;
- destinatari;
- gruppi di card;
- passaggi ordinati;
- modalità operative;
- FAQ;
- CTA finale;
- visibilità delle sezioni.

Le pagine mantengono campi specifici quando il contenuto lo richiede: ruoli e confini
forensi, credenziali verificabili, formazione e modalità per adolescenti.

### Articoli

Gli articoli usano il tipo `post` nativo:

- titolo, contenuto e immagine in evidenza;
- autore e data nativi;
- tempo di lettura calcolato;
- fonti;
- data di revisione;
- nota editoriale facoltativa.

### Risorse

Il tipo `sharon_resource` usa:

- titolo, descrizione, estratto e immagine in evidenza;
- file della Libreria Media;
- modalità `public` oppure `gated`;
- testo e CTA del download;
- campi del modulo richiesti;
- messaggio di consenso;
- stato pubblicato/bozza.

La modalità protetta prepara il markup e gli hook per un servizio form successivo. Fino
al collegamento del servizio, non raccoglie né trasmette dati e non espone direttamente
il file protetto.

## Editor e protezione del design

- Nessun page builder.
- I pannelli strutturati usano API native WordPress.
- Header e footer sono modificabili nei contenuti, non ricostruibili.
- Il menu usa le API native di navigazione.
- L'editor standard rimane disponibile per articoli e descrizioni estese.
- Campi ripetibili come FAQ, credenziali e passaggi usano righe amministrative
  aggiungibili/rimuovibili senza dipendenze esterne.

## Importazione iniziale

L'importazione viene avviata esplicitamente da Strumenti > Importa sito Sharon.

- mostra un riepilogo prima di scrivere;
- richiede autorizzazione `manage_options` e nonce;
- crea o riutilizza pagine mediante slug stabile;
- inserisce tutti i testi attuali;
- assegna i template corretti;
- crea il menu principale e quello del footer;
- imposta home statica e pagina articoli;
- inserisce i dati facsimile globali;
- non sovrascrive contenuti esistenti;
- può essere eseguita nuovamente in modalità “solo elementi mancanti”;
- registra versione, data e risultato dell'ultima importazione.

## Immagini

- Le immagini sono salvate come attachment ID.
- Il tema usa `wp_get_attachment_image()` e le dimensioni registrate per ottenere
  automaticamente `srcset`, `sizes`, `loading` e `decoding`.
- L'immagine principale può usare priorità alta; le immagini successive sono lazy.
- Se un'immagine non è presente viene mostrato il segnaposto grafico già previsto.
- Nessuna fotografia facsimile viene inclusa nel pacchetto.

## Dati strutturati e SEO

- JSON-LD usa esclusivamente dati globali sanificati.
- Se dominio, contatto o indirizzo sono ancora facsimile, il JSON-LD locale non viene
  emesso sul sito pubblico.
- Titolo e descrizione restano compatibili con plugin SEO futuri senza dipendenza.
- URL canonici usano funzioni WordPress, mai stringhe statiche.

## Accessibilità e prestazioni

- Si preservano skip-link, landmark, gerarchie, focus, menu da tastiera e ARIA.
- Si preservano movimento ridotto e sospensione delle animazioni invisibili.
- CSS e JavaScript vengono caricati con versioni derivate dal file.
- Font e immagini non bloccano gli stili responsivi.
- Stringhe frontend e amministrative sono traducibili.

## Fallback senza plugin

Se `sharon-core` non è attivo:

- il tema non genera errori fatali;
- mostra titolo, contenuto e immagine in evidenza nativi;
- header, footer, articoli e pagine restano utilizzabili;
- le sezioni strutturate mancanti vengono semplicemente omesse;
- in amministrazione viene mostrato un avviso con istruzioni per attivare il plugin.

## Pacchetti e installazione

La consegna include:

- ZIP installabile del plugin;
- ZIP installabile del tema;
- sorgenti non compressi;
- `INSTALLAZIONE.md` con ordine plugin → tema → importazione;
- procedura per sostituire dati facsimile;
- verifica menu, homepage, permalink e immagini;
- procedura di rollback senza cancellazione dei contenuti.

## Verifica

- hash originali invariati;
- copia statica completa;
- PHP lint su ogni file PHP;
- controllo sintattico JavaScript;
- test statici su escaping, nonce, capability e prefissi;
- test sulla presenza dei template WordPress;
- test sull'importazione idempotente;
- ZIP con una sola directory radice corretta;
- suite statica originale interamente verde.

## Compatibilità

- WordPress 6.5 o successivo;
- PHP 8.0 o successivo;
- nessuna dipendenza Composer, npm o plugin a pagamento;
- supporto ai browser moderni già previsto dal sito statico.
