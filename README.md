# Sito Dott.ssa Sharon — "Il paesaggio interiore"

Sito professionale per una psicologa clinica / psicoterapeuta in formazione / psicologa
forense a Caltanissetta (Sicilia). Prototipo front-end ad alta fedeltà, pronto per
essere convertito in tema WordPress.

## Concept di design

**"Il paesaggio interiore"** — la psiche come paesaggio da attraversare (l'idea alla base
del sito di riferimento *davidwhyte.com/experience*), ancorata alla Sicilia interna di
Caltanissetta: colline di gesso, grano, luce ocra. I tre ambiti professionali sono
presentati come tre "terreni" che si attraversano scorrendo.

- **Palette:** inchiostro `#1C2321`, carta salvia `#EEF0EA`, pino `#3A4A42`, salvia `#7C8B7E`, ocra `#C0873E` (accento).
- **Tipografia:** display **Fraunces** (serif letterario) + testo **Hanken Grotesk** (sans umanista).
- **Firma:** colline stratificate con parallax scroll + strofe di testo in dissolvenza.
- **Tono:** narrativo ma clinico e rassicurante. Animazioni sobrie, mai decorative.

## Struttura dei file

```
Sito Sharon/
├── index.html            # Home (one-page narrativa: hero, chi sono, 3 ambiti,
│                         #   percorso, citazione, articoli, contatti, footer)
├── assets/
│   ├── css/styles.css    # Design system completo (token, componenti, responsive)
│   └── js/main.js        # Preloader, nav mobile, header scroll, reveal, parallax,
│                         #   validazione form. Vanilla JS, nessuna dipendenza.
├── serve.cjs             # Server statico SOLO per anteprima locale (eliminabile)
└── README.md
```

## Anteprima locale

Serve Node.js (già presente sul sistema):

```bash
node serve.cjs
# poi apri http://127.0.0.1:8823
```

In alternativa apri direttamente `index.html` nel browser.

## Sezioni e funzionalità

- **Hero** con titolo editoriale e colline stratificate (parallax).
- **Intro narrativa** + **Chi sono** esteso (ritratto, bio, credenziali).
- **Tre ambiti** (clinico, psicoterapia, forense) come "terreni".
- **Percorso** di prenotazione, **citazione**, **FAQ** (accordion), **articoli**,
  **form contatti**, footer.
- **FAQ** con accordion accessibile (`<details>` nativi, apertura esclusiva) e
  sottili *floating paths* decorativi.
- **Micro-effetti sobri** (ispirati a 21st.dev, re-implementati in vanilla):
  *blur-in* sui titoli, bagliore hero che "respira", *shimmer* discreto sul CTA "Prenota".
- **Movimento ambientale** (transform-only, `prefers-reduced-motion` rispettato):
  parallax fluida delle colline hero (loop rAF con smoothing + deriva), colline degli
  ambiti con deriva lenta e sfalsata (`hillsway`), floating paths FAQ a movimento 2D.
- **Tre pagine di dettaglio** degli ambiti: `psicologia-clinica.html`,
  `psicoterapia.html`, `psicologia-forense.html` (stesso header/footer e design system).

## Tipografia e responsive

- Scala tipografica generosa per desktop: corpo **20px**, titoli di sezione **uniformi**
  in tutto il sito (stessa dimensione e stesse distanze occhiello→titolo→sottotitolo).
- Header responsive: **menu a comparsa (hamburger) fino a 1080px** (tablet + mobile),
  barra su una sola riga a tutte le larghezze, marchio compresso su mobile piccolo.
- **Tema chiaro/scuro** con toggle nell'header (salva la preferenza; rispetta
  `prefers-color-scheme` al primo accesso).
- **Animazione testo scroll-driven** (stile David Whyte): le parole delle strofe si
  "accendono" passando al centro dello schermo (classe `.js-words`).

## Performance, SEO e mobile ("$10K checklist")

- **Font ottimizzati**: caricati via `<link>` con `preconnect` + `display=swap`
  (niente più `@import` render-blocking nel CSS).
- **Favicon** SVG on-brand (`favicon.svg`), `theme-color` per tema chiaro e scuro.
- **Open Graph + Twitter card** su tutte le pagine (titolo/descrizione dedicati).
  → manca solo `og:image` (immagine di condivisione 1200×630): da creare con le foto reali.
- **Mobile progettato, non ristretto**: ritmo verticale ridotto su telefono,
  hero più compatto, ritratto meno alto, **barra "Prenota" fissa in fondo** (con
  safe-area per iPhone), che sparisce su desktop e col menu aperto.

## Accessibilità e qualità (già implementate)

- Contrasto testo ≥ 4.5:1 in entrambi i temi, focus visibile su tutti gli interattivi.
- `prefers-reduced-motion` rispettato (disattiva parallax, preloader, reveal, animazione parole).
- Navigazione da tastiera, skip-link, label esplicite su ogni campo del form.
- Target touch ≥ 44px, menu mobile, layout responsive (mobile-first).
- Nessuna emoji come icona: solo SVG inline.

---

## Dati da completare prima della pubblicazione

I valori facsimile seguenti vanno sostituiti prima della messa online:

| Segnaposto | Dove | Cosa inserire |
|---|---|---|
| `Dott.ssa Sharon` | ovunque | Nome e **cognome** completi |
| `Via Esempio 00` | contatti, footer | Indirizzo dello studio |
| `studio@studiosharonbellia.example` | contatti, footer | Email reale |
| `+39 000 000 0000` | contatti, footer | Telefono |
| `Albo Psicologi Regione Siciliana, Sez. A n. 12014` | footer | Regione e numero di iscrizione all'Albo |
| `P.IVA 00000000000` | footer | Partita IVA |
| Testi/bio | intro, ambiti, articoli | Copy definitivo (le bozze attuali sono professionali ma vanno riviste dalla professionista) |
| Foto | (da inserire) | Foto professionali reali (ritratto, studio) — vedi sotto |
| `WHATSAPP_NUMBER` | `assets/js/main.js` | Numero WhatsApp (solo cifre, es. `393331234567`) |
| `https://facebook.com/` ecc. | footer (tutte le pagine) + JSON-LD `sameAs` | Profili social reali (FB/IG/LinkedIn) |
| Blocco autorevolezza `[...]` | `competenze.html` | Formazione, esperienza, incarichi CTU/CTP, pubblicazioni reali |
| PDF risorse | `assets/files/` | I materiali scaricabili (vedi `assets/files/README.md`) |
| Link Google Maps | `dove-trovarmi.html` (2 punti: mappa + pulsante) + JSON-LD `hasMap` | URL reale della posizione dello studio su Google Maps (sostituire la ricerca facsimile di Via Esempio) |
| JSON-LD con dominio `.example`, Via Esempio e numero zero | `<head>` di ogni pagina | Dati reali per la SEO locale |

> **Nota deontologica:** i contenuti dell'ambito forense, le tariffe, la modulistica e
> il "primo colloquio gratuito" vanno verificati dalla professionista per conformità al
> Codice Deontologico degli Psicologi.

## Dati facsimile del prototipo

I recapiti temporanei sono uniformati in tutte le pagine:

- dominio: `https://studiosharonbellia.example`
- email: `studio@studiosharonbellia.example`
- telefono: `+39 000 000 0000`
- WhatsApp: `390000000000`
- studio: `Via Esempio 00, 93100 Caltanissetta (CL)`
- P.IVA: `00000000000`

Il dominio `.example`, i numeri composti da zeri e `Via Esempio` indicano volutamente
dati non reali. In WordPress andranno gestiti come campi globali del tema, così da
aggiornare insieme footer, recapiti, pulsanti e dati strutturati. È obbligatorio
sostituirli prima della pubblicazione. Anche la posizione Google Maps e i profili
social devono essere collegati soltanto quando saranno disponibili quelli reali.

## Struttura delle pagine

| Pagina | Contenuto |
|--------|-----------|
| `index.html` | Home snella: hero, Chi sono, ambiti, percorso, FAQ, contatti/prenota |
| `psicologia-clinica.html` · `psicoterapia.html` · `psicologia-forense.html` | Le tre pagine di ambito |
| `competenze.html` | Formazione, esperienza, incarichi (CTU/CTP), pubblicazioni |
| `articoli.html` | Archivio editoriale in preparazione, senza articoli dimostrativi |
| `articolo-modello.html` | Modello tecnico non collegato per il template del singolo articolo WordPress |
| `risorse.html` | Pagina distinta per futuri ebook e materiali pratici; consegna e download rinviati a WordPress |
| `dove-trovarmi.html` | Sede + contatti unificati: mappa cliccabile, **recapiti** (indirizzo/email/telefono) e **orari di ricevimento** |

Le pagine **Competenze, Articoli, Risorse, Sede (Dove trovarmi)** sono raggiungibili da
**menu** e **footer** di ogni pagina (spostate dalla home per alleggerirla). Il menu
orizzontale (9 voci) compare da ≥1201px; sotto, menu hamburger.

**Contatti de-duplicati:** la home ha *solo il form* (sezione "Prenota"); indirizzo,
email, telefono e orari vivono su `dove-trovarmi.html`. Il footer non ha più la colonna
"Studio" (P.IVA e n. Albo restano nella riga legale in fondo).

## Conversione & autorevolezza

- **WhatsApp flottante** — iniettato via JS su tutte le pagine (numero segnaposto).
- **Hub prenotazione** (`#prenota`, in fondo alla home) — "primo colloquio conoscitivo
  gratuito" + form. Tutte le CTA "Prenota" puntano qui. *(Google Calendar rimosso: la
  gestione dell'agenda sarà decisa con la professionista.)*
- **JSON-LD** `LocalBusiness`/`Psychologist` + `Person` su ogni pagina (SEO locale / Google Maps).
- **Social** nel footer di tutte le pagine.

## Immagini

Il design usa attualmente illustrazioni SVG (colline) come texture. Per il mix
"foto reali + elementi illustrati" concordato servono:
- 1 ritratto professionale (per una futura sezione "Chi sono" estesa)
- 1–2 foto dello studio
- Foto/immagini di copertina per gli articoli del blog

Le foto vanno esportate in **WebP** (con fallback JPG) e con `width`/`height` dichiarati.

---

## Percorso di messa online (WordPress su hosting cPanel)

Questo prototipo è la **base grafica**. Per ottenere il sito gestibile in autonomia,
con prenotazioni + pagamenti + blog, il percorso è:

### Checklist prima della pubblicazione WordPress

- [ ] Collegare **form e recapiti** reali tramite il plugin o l'app scelta.
- [ ] Creare le pagine **privacy**, **cookie** e note legali.
- [ ] Configurare consenso, conservazione e gestione dei dati ricevuti dal form.
- [ ] Sostituire dominio, indirizzo, telefono, WhatsApp, mappa e profili social.
- [ ] Creare le pagine complete degli **articoli** e collegare le card dell'archivio.
- [ ] Configurare raccolta dati, consegna automatica e **download** di ebook e materiali informativi.
- [ ] Inserire ed ottimizzare le **fotografie** professionali reali.
- [ ] Completare canonical, Open Graph, sitemap e configurazione **SEO** finale.
- [ ] Verificare titoli, qualifiche e **contenuti forensi** alla data effettiva di pubblicazione.
- [ ] Verificare e documentare il **Master conseguito** prima di pubblicarlo come titolo definitivo.
- [ ] Inserire l'**Albo CTU del Tribunale di Caltanissetta** soltanto dopo l'effettiva iscrizione.
- [ ] Inserire l'**Albo Periti del Tribunale di Caltanissetta** soltanto dopo l'effettiva iscrizione.
- [ ] Aggiornare i **dati strutturati** e le credenziali replicate nelle altre pagine.

1. **Installazione WordPress** sull'hosting cPanel esistente.
2. **Conversione in tema:** ogni `<section>` di `index.html` diventa una *template part*;
   `styles.css` e `main.js` entrano nel tema. Le sezioni di testo diventano campi
   modificabili (ACF o blocchi Gutenberg) così la professionista aggiorna i contenuti
   senza toccare il codice.
3. **Blog:** nativo di WordPress (già previsto in struttura e stile con le card).
4. **Prenotazioni + pagamento online:** plugin **Amelia** (o alternativa) con
   integrazione **Stripe** per il pagamento della seduta alla prenotazione.
   → richiede: account Stripe della professionista (dati bancari) — da configurare **da lei**.
5. **Form di contatto:** Contact Form 7 / WPForms, collegato all'email reale.
6. **Materiali scaricabili "protetti da email":** plugin leggero che invia il link di
   download dopo l'inserimento dell'email (nessun sistema di login/account).
7. **Legale/GDPR:** informativa privacy, cookie banner, note legali — testi da redigere
   (consigliato un consulente per la parte deontologica + privacy).

### Cosa serve da te / dalla professionista per procedere online
- Credenziali dell'hosting cPanel + nome del dominio.
- Account **Stripe** (per i pagamenti) — va creato dalla professionista.
- Contenuti definitivi (testi, foto) e dati anagrafici/professionali reali.
- Testi legali (privacy, cookie, note legali).

> Questi passaggi coinvolgono credenziali e account personali/bancari: vanno eseguiti
> dalla professionista o sotto sua diretta autorizzazione, non automaticamente.
