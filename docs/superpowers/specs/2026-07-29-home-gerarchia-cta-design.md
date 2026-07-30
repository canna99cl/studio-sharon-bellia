# Home — gerarchia, credenziali e CTA mobile

## Obiettivo

Rendere la home più sintetica e coerente con le pagine interne, portare l’azione principale nella prima schermata e ridurre l’ingombro delle azioni persistenti su telefono.

## Ambito

Il lavoro comprende:

- revisione puntuale del hero;
- allineamento delle credenziali con `competenze.html`;
- nuova gerarchia percepita dei percorsi clinico e forense;
- riduzione della lunghezza della sezione Ambiti;
- unificazione delle azioni persistenti mobili;
- ampliamento dei test e verifica browser.

Non comprende:

- inserimento della fotografia professionale;
- attivazione del modulo;
- creazione delle pagine privacy e cookie;
- configurazione WordPress;
- modifica dei recapiti, del dominio o dei profili social;
- attribuzione anticipata del titolo di psicoterapeuta.

## Hero

Titolo, paesaggio e tono editoriale restano invariati. Il hero viene reso più compatto intervenendo sugli spazi verticali e, se necessario, sulla scala tipografica mobile.

Il testo introduttivo diventa:

> Uno studio a Caltanissetta dedicato all’ascolto e alla comprensione. Percorsi psicologici per la persona e consulenze per l’ambito giuridico.

La formula “percorsi di cura” viene eliminata. La CTA primaria `Richiedi un primo contatto` deve risultare interamente visibile a 1280×720 e 390×844 senza scorrimento. La CTA secondaria `Scopri gli ambiti` resta disponibile.

## Credenziali

La home assume lo stesso stato di pubblicazione futuro già adottato in `competenze.html`:

- Master universitario di II livello in Criminologia – Psicologia Giuridica e Forense;
- Università eCampus;
- titolo conseguito.

Vengono rimossi:

- “in corso” riferito al Master;
- “discussione finale prevista”;
- la data del 7 settembre 2026;
- la frase narrativa secondo cui il Master è ancora in fase di approfondimento.

La specializzazione ALETEIA resta descritta come percorso in corso dal 2025. Non vengono utilizzati “psicoterapeuta” o qualifiche equivalenti.

## Gerarchia dei percorsi

La home mantiene le tre destinazioni esistenti:

- `psicologia-clinica.html`;
- `psicoterapia.html`;
- `psicologia-forense.html`.

La presentazione distingue però due percorsi principali:

1. percorso psicologico;
2. ambito giuridico-forense.

Psicologia clinica e percorsi continuativi diventano due articolazioni coordinate del percorso psicologico. La seconda articolazione non viene presentata come terzo ambito equivalente né come psicoterapia già qualificata.

La soluzione conserva l’impianto visivo “terreno”, ma riduce l’altezza delle tre fasce e la quantità di spazio vuoto. Il percorso forense mantiene pari dignità e riconoscibilità.

## Barra mobile delle azioni

Sotto i 700 px, la CTA persistente e WhatsApp confluiscono in un solo contenitore fisso.

Il contenitore comprende:

- collegamento principale a `#prenota` con etichetta visibile `Primo contatto`;
- collegamento WhatsApp circolare con nome accessibile `Scrivici su WhatsApp`;
- CTA principale più larga del pulsante WhatsApp;
- altezza complessiva inferiore all’attuale combinazione di barra e pulsante flottante;
- supporto a `env(safe-area-inset-bottom)`.

WhatsApp non resta più come elemento flottante indipendente. La pagina riceve spazio inferiore sufficiente affinché barra, modulo e footer non si coprano.

Su desktop restano il pulsante WhatsApp flottante e le CTA esistenti; la barra unificata è esclusivamente mobile.

## Accessibilità e comportamento

- Un solo `h1`.
- Nessuna modifica alla gerarchia dei titoli.
- Entrambe le azioni mobili hanno destinazione reale e nome accessibile.
- Area tattile minima di 44×44 px.
- Nessun contenuto coperto dalla barra al termine della pagina.
- Nessun overflow orizzontale.
- Tema chiaro e scuro coerenti.
- Contenuti leggibili anche senza JavaScript.

## Verifica automatica

I test devono dimostrare che:

- home e Competenze presentano il Master nello stesso stato;
- la home non contiene più data e diciture temporanee del Master;
- “percorsi di cura” non è presente nel hero;
- il hero contiene il nuovo testo;
- la barra mobile contiene `Primo contatto` e WhatsApp;
- WhatsApp mobile non è più posizionato come elemento flottante indipendente;
- il breakpoint mobile garantisce aree tattili e safe area;
- ID, link, heading e classi riutilizzabili restano validi.

## Verifica browser

Controllare la home a:

- 1280×720, tema chiaro e scuro;
- 390×844, tema chiaro e scuro.

Per ogni configurazione verificare:

- overflow pari a zero;
- CTA primaria del hero interamente nella prima schermata;
- leggibilità di titolo e introduzione;
- corretta gerarchia dei percorsi;
- barra mobile compatta e non sovrapposta ai contenuti;
- footer raggiungibile;
- console senza errori.
