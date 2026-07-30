# Archivio articoli — Specifica di progetto

## Obiettivo

Trasformare l’attuale archivio di contenuti dimostrativi in una pagina editoriale trasparente e credibile, pronta per accogliere articoli reali dopo la conversione a WordPress. Il sito non deve presentare come pubblicati articoli che non esistono ancora.

## Ambito

Il lavoro comprende:

- revisione di `articoli.html`;
- creazione di una pagina-articolo modello non collegata dalla navigazione pubblica;
- ampliamento dei controlli automatici;
- stili strettamente necessari per l’archivio vuoto e per il modello editoriale.

Non comprende:

- scrittura di articoli clinici o forensi definitivi;
- fotografie o illustrazioni editoriali reali;
- raccolta email e consegna di download;
- configurazione WordPress, privacy, cookie o SEO sul dominio definitivo.

## Archivio pubblico

La pagina `articoli.html` conserva hero, breadcrumb, menu, footer e CTA coerenti con il resto del sito. Le sei card dimostrative vengono eliminate.

Il corpo presenta:

1. un’introduzione che spiega lo scopo divulgativo dell’archivio;
2. due aree tematiche sullo stesso livello:
   - Psicologia clinica;
   - Psicologia giuridica e forense;
3. uno stato editoriale sobrio, “Contenuti in preparazione”;
4. una nota di metodo che anticipa i criteri dei futuri contenuti:
   - firma dell’autrice;
   - data di pubblicazione;
   - fonti consultabili;
   - data dell’ultima revisione;
5. una distinzione esplicita fra articoli divulgativi e materiali scaricabili della pagina `risorse.html`;
6. una CTA finale non promozionale verso il contatto informativo.

Le aree tematiche usano lo stile delle card informative già adottato nel sito. Non devono sembrare card di articoli cliccabili né contenitori vuoti.

## Pagina-articolo modello

Viene creata `articolo-modello.html` come riferimento tecnico per la futura conversione WordPress. Nessun menu, card o CTA pubblica la collega: sarà raggiungibile soltanto conoscendone direttamente l’indirizzo.

La pagina include:

- breadcrumb;
- categoria;
- titolo editoriale chiaramente identificato come modello;
- sommario introduttivo;
- metadati per autrice, pubblicazione, ultima revisione e tempo di lettura;
- indice interno;
- sezioni dimostrative prive di affermazioni cliniche sostanziali;
- blocco fonti;
- nota secondo cui il contenuto è divulgativo e non sostituisce una valutazione professionale;
- firma dell’autrice;
- collegamento di ritorno all’archivio.

I segnaposto sono intenzionali e riconoscibili come campi del modello, non come dati reali. La pagina usa HTML semantico compatibile con una futura mappatura a template WordPress.

## Risorse scaricabili

`risorse.html` resta una destinazione distinta. L’archivio spiega che gli articoli sono contenuti di lettura, mentre le risorse saranno materiali pratici o ebook. La futura raccolta dati per il download rimane nella checklist WordPress e non viene simulata.

## Accessibilità e struttura

- Un solo `h1` per pagina.
- Gerarchia dei titoli senza salti.
- Testo dello stato comprensibile senza dipendere dal colore.
- Nessuna card vuota o link privo di destinazione.
- Nessun controllo filtro inattivo.
- Layout senza overflow a 1280×720 e 390×844.
- Coerenza nei temi chiaro e scuro.

## Verifica

I test automatici devono dimostrare che:

- i sei titoli dimostrativi non sono più pubblicati;
- le due aree tematiche sono presenti sullo stesso livello;
- lo stato “Contenuti in preparazione” è visibile;
- i quattro criteri editoriali sono dichiarati;
- articoli e risorse sono distinti;
- `articolo-modello.html` possiede la struttura editoriale prevista;
- nessuna pagina pubblica collega il modello;
- non sono presenti link vuoti o ID duplicati.

Segue una verifica nel browser, desktop e telefono, comprendente temi, overflow, leggibilità e console.
