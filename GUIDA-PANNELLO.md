# Guida al pannello di gestione (Decap CMS)

Questo sito ora ha un **pannello no-code** per modificare testi, dati dello studio e
pubblicare articoli, **senza toccare il codice**. Il pannello si chiama **Decap CMS**
e si raggiunge all'indirizzo:

```
https://IL-TUO-SITO.netlify.app/admin/
```

---

## 1. Cosa si può modificare dal pannello

Entrando in `/admin/` la dottoressa trova tre sezioni:

| Sezione | Cosa permette di cambiare |
|---|---|
| **Impostazioni sito** | Nome, qualifica, tagline, descrizione SEO, email, telefono, numero WhatsApp e messaggio, indirizzo, link Google Maps, **orari**, **social** (Facebook/Instagram), Albo, P.IVA. Questi dati si aggiornano **su tutte le pagine** in automatico. |
| **Testi della Home** | Occhiello, titolo e sottotitolo della sezione iniziale (hero) e della presentazione "Chi sono". |
| **Articoli** | Crea, modifica e pubblica articoli del blog. Ogni articolo ha titolo, sommario, categoria, tempo di lettura, data, immagine di copertina (facoltativa) e contenuto. |

> Nel titolo della hero, per mettere una parola in *corsivo* si scrive `<em>parola</em>`.
> Tutto il resto è testo normale.

Ogni salvataggio nel pannello crea automaticamente una modifica nel sito e, dopo
circa un minuto, la pagina online si aggiorna da sola.

---

## 2. Come mettere il sito online (una volta sola, tecnica)

Il pannello ha bisogno che il sito sia **collegato a GitHub + Netlify** (non basta più
il trascinamento della cartella, perché il pannello deve poter salvare le modifiche).

### Passi

1. **Carica il progetto su GitHub**
   - Crea un account su [github.com](https://github.com) (gratuito).
   - Crea un nuovo repository (es. `sito-sharon`).
   - Carica tutta questa cartella nel repository.
     Da terminale, dentro la cartella del progetto:
     ```bash
     git init
     git add .
     git commit -m "Sito + pannello Decap"
     git branch -M main
     git remote add origin https://github.com/TUO-UTENTE/sito-sharon.git
     git push -u origin main
     ```

2. **Collega Netlify a GitHub**
   - Su [netlify.com](https://netlify.com) → **Add new site → Import an existing project → GitHub**.
   - Scegli il repository. Netlify legge già il file `netlify.toml`:
     - Build command: `npm run build`
     - Publish directory: `_site`
   - Premi **Deploy**. Il sito va online su un indirizzo `*.netlify.app`.

3. **Attiva il login del pannello (Netlify Identity)**
   - Nel sito su Netlify: **Site configuration → Identity → Enable Identity**.
   - In **Identity → Registration** imposta **Invite only** (così solo la dottoressa entra).
   - In **Identity → Services → Git Gateway → Enable Git Gateway**.

4. **Invita la dottoressa**
   - **Identity → Invite users** → inserisci la sua email.
   - Lei riceve una mail, imposta la password e da quel momento entra da `/admin/`.

Fatto: da lì in poi la dottoressa lavora **solo dal pannello**, senza codice.

---

## 3. Provare il pannello sul proprio computer (facoltativo)

Per vedere il pannello prima di pubblicare:

1. Nel file `admin/config.yml` togli il commento alla riga `# local_backend: true`.
2. In due terminali separati, dentro la cartella:
   ```bash
   npx decap-server
   ```
   ```bash
   npm start
   ```
3. Apri `http://localhost:8080/admin/`.

(Ricordati di rimettere il commento a `local_backend` prima di pubblicare.)

---

## 4. Dati ancora da inserire (reali)

Nel pannello, sezione **Impostazioni sito**, sostituisci i segnaposto con i dati veri:

- **Email** dello studio (ora: `studio@studiosharonbellia.example`)
- **Partita IVA** (ora: `00000000000`)
- **Dominio** definitivo (ora: `studiosharonbellia.example`)
- **Foto professionale**: va caricata nel codice al posto del segnaposto ritratto nella home
  (`src/index.njk`, blocco `about__frame`). Posso farlo io appena mi mandi la foto.

---

## 5. Comandi utili per lo sviluppo

```bash
npm install     # la prima volta
npm start       # anteprima locale su http://localhost:8080
npm run build   # genera il sito nella cartella _site
```
