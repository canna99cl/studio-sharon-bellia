# Conversione WordPress — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Creare un tema WordPress installabile e un plugin companion che riproducano il sito statico con contenuti modificabili, senza alterare gli originali.

**Architecture:** `sharon-core` registra dati, metadati, Risorse e importazione. `sharon-bellia` legge tali dati e controlla esclusivamente rendering, asset e fallback. Una copia statica e due manifest SHA-256 dimostrano l'integrità degli originali.

**Tech Stack:** WordPress 6.5+, PHP 8.0+, HTML5, CSS, JavaScript, Node test runner, PowerShell per packaging.

## Global Constraints

- Nessun file originale fuori da `wordpress/` può essere modificato durante la conversione.
- Nessuna dipendenza a pagamento, Composer o npm.
- Prefisso PHP `sharon_`; text domain `sharon-core` e `sharon-bellia`.
- Ogni output dinamico deve essere escaped e ogni salvataggio deve verificare capability e nonce.
- Importazione esplicita, idempotente e mai distruttiva.

---

### Task 1: Salvaguardia e copia statica

**Files:**
- Create: `wordpress/manifests/original-before.sha256`
- Create: `wordpress/static-reference/**`
- Create: `wordpress/tests/wordpress-review.test.cjs`

- [ ] Generare il manifest SHA-256 dei file pubblici originali.
- [ ] Copiare l'intero progetto in `wordpress/static-reference`, escludendo `wordpress`.
- [ ] Scrivere test che confrontino manifest, originali e copia.
- [ ] Eseguire il test e verificare integrità e completezza.

### Task 2: Scaffold del plugin

**Files:**
- Create: `wordpress/wp-content/plugins/sharon-core/sharon-core.php`
- Create: `wordpress/wp-content/plugins/sharon-core/includes/class-sharon-core.php`
- Create: `wordpress/wp-content/plugins/sharon-core/includes/helpers.php`
- Create: `wordpress/wp-content/plugins/sharon-core/uninstall.php`
- Create: `wordpress/wp-content/plugins/sharon-core/readme.txt`

- [ ] Scrivere test su header plugin, guard `ABSPATH`, prefissi e file richiesti.
- [ ] Verificare il fallimento.
- [ ] Creare bootstrap e loader senza side effect distruttivi.
- [ ] Verificare il passaggio.

### Task 3: Dati professionali globali

**Files:**
- Create: `wordpress/wp-content/plugins/sharon-core/includes/class-sharon-settings.php`
- Create: `wordpress/wp-content/plugins/sharon-core/admin/settings-page.php`
- Create: `wordpress/wp-content/plugins/sharon-core/assets/admin.js`
- Create: `wordpress/wp-content/plugins/sharon-core/assets/admin.css`

- [ ] Testare registrazione Settings API, capability, nonce implicito della Settings API e callback di sanificazione.
- [ ] Implementare un'unica opzione `sharon_professional_data`.
- [ ] Implementare tutti i campi della specifica e media selector nativo.
- [ ] Esporre `sharon_get_professional_data()` e `sharon_get_professional_value()`.

### Task 4: Campi strutturati delle pagine

**Files:**
- Create: `wordpress/wp-content/plugins/sharon-core/includes/field-schema.php`
- Create: `wordpress/wp-content/plugins/sharon-core/includes/class-sharon-page-meta.php`
- Create: `wordpress/wp-content/plugins/sharon-core/admin/page-meta-box.php`

- [ ] Testare schema per home, pagine professionali, FAQ, card e visibilità.
- [ ] Registrare post meta con tipi e `show_in_rest`.
- [ ] Creare metabox nativa con righe ripetibili.
- [ ] Salvare solo con nonce, capability e autosave/revision guard.
- [ ] Sanificare ricorsivamente array e URL.

### Task 5: Articoli e Risorse

**Files:**
- Create: `wordpress/wp-content/plugins/sharon-core/includes/class-sharon-content-types.php`
- Create: `wordpress/wp-content/plugins/sharon-core/admin/resource-meta-box.php`

- [ ] Testare CPT `sharon_resource`, REST, archivio e rewrite.
- [ ] Registrare fonti/data revisione per `post`.
- [ ] Registrare file, accesso, CTA, consenso e campi modulo per Risorse.
- [ ] Impedire al frontend di ottenere l'URL diretto di una risorsa protetta.

### Task 6: Importatore iniziale

**Files:**
- Create: `wordpress/wp-content/plugins/sharon-core/includes/default-content.php`
- Create: `wordpress/wp-content/plugins/sharon-core/includes/class-sharon-importer.php`
- Create: `wordpress/wp-content/plugins/sharon-core/admin/import-page.php`

- [ ] Testare la presenza di tutti gli slug e testi principali correnti.
- [ ] Implementare preview, capability, nonce e azione esplicita.
- [ ] Creare/riutilizzare pagine per slug, mai per ID fisso.
- [ ] Inserire solo dati mancanti e memorizzare versione/risultato.
- [ ] Creare menu, home statica e pagina articoli.

### Task 7: Scaffold del tema e asset

**Files:**
- Create: `wordpress/wp-content/themes/sharon-bellia/style.css`
- Create: `wordpress/wp-content/themes/sharon-bellia/functions.php`
- Create: `wordpress/wp-content/themes/sharon-bellia/theme.json`
- Create: `wordpress/wp-content/themes/sharon-bellia/header.php`
- Create: `wordpress/wp-content/themes/sharon-bellia/footer.php`
- Create: `wordpress/wp-content/themes/sharon-bellia/inc/template-functions.php`
- Create: `wordpress/wp-content/themes/sharon-bellia/assets/css/styles.css`
- Create: `wordpress/wp-content/themes/sharon-bellia/assets/js/main.js`
- Create: `wordpress/wp-content/themes/sharon-bellia/assets/img/**`

- [ ] Testare header tema, supporti, menu e asset versionati.
- [ ] Copiare CSS/JS senza modificare le sorgenti originali.
- [ ] Adattare URL e dati globali a funzioni WordPress.
- [ ] Implementare fallback quando il plugin è assente.

### Task 8: Template della home e pagine professionali

**Files:**
- Create: `wordpress/wp-content/themes/sharon-bellia/front-page.php`
- Create: `wordpress/wp-content/themes/sharon-bellia/page.php`
- Create: `wordpress/wp-content/themes/sharon-bellia/templates/page-professional.php`
- Create: `wordpress/wp-content/themes/sharon-bellia/template-parts/home/*.php`
- Create: `wordpress/wp-content/themes/sharon-bellia/template-parts/professional/*.php`

- [ ] Testare presenza e escaping di tutte le sezioni.
- [ ] Convertire home in template part ordinati e disattivabili.
- [ ] Convertire card, passaggi, FAQ, CTA e recapiti.
- [ ] Rendere modificabili testi, liste e immagini.
- [ ] Mantenere classi e struttura visuale statiche.

### Task 9: Articoli, Risorse e SEO

**Files:**
- Create: `wordpress/wp-content/themes/sharon-bellia/home.php`
- Create: `wordpress/wp-content/themes/sharon-bellia/single.php`
- Create: `wordpress/wp-content/themes/sharon-bellia/archive-sharon_resource.php`
- Create: `wordpress/wp-content/themes/sharon-bellia/single-sharon_resource.php`
- Create: `wordpress/wp-content/themes/sharon-bellia/404.php`
- Create: `wordpress/wp-content/themes/sharon-bellia/inc/structured-data.php`

- [ ] Testare loop, escaping, pagination e stati vuoti.
- [ ] Implementare articoli con fonti, revisione e tempo di lettura.
- [ ] Implementare Risorse pubbliche/protette senza raccolta dati attiva.
- [ ] Emettere JSON-LD solo con dati reali e completi.

### Task 10: Packaging, documentazione e regressione

**Files:**
- Create: `wordpress/INSTALLAZIONE.md`
- Create: `wordpress/packages/sharon-core.zip`
- Create: `wordpress/packages/sharon-bellia.zip`
- Create: `wordpress/manifests/original-after.sha256`

- [ ] Eseguire PHP lint su ogni file PHP disponibile.
- [ ] Eseguire controllo sintattico di ogni JavaScript.
- [ ] Eseguire test statici WordPress e suite originale.
- [ ] Rigenerare e confrontare il manifest finale.
- [ ] Creare ZIP con una sola directory radice.
- [ ] Verificare il contenuto degli ZIP e completare la guida.

Il progetto non è un repository Git; commit e worktree non sono applicabili.
