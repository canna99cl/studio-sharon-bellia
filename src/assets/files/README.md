# assets/files — materiali scaricabili (PDF)

Qui vanno i PDF della sezione **Risorse** (`index.html#risorse`).

## File attesi (segnaposto attuali nel sito)

| File consigliato | Risorsa |
|------------------|---------|
| `primo-colloquio.pdf` | "Cosa aspettarsi dal primo colloquio" |
| `cosa-fa-una-ctp.pdf` | "Cosa fa una CTP" (per avvocati e famiglie) |
| `modulistica-consenso.pdf` | Modulistica + consenso informato |

## Flusso di download (via email)

Nel prototipo, i pulsanti "Scarica (via email)" puntano al form contatti.
In produzione (WordPress) si collega un plugin di **email-gating**: l'utente lascia
l'email e riceve il link al PDF. In alternativa, per download liberi, sostituire
l'`href` del pulsante con il percorso diretto, es. `assets/files/primo-colloquio.pdf`.

> Nota deontologica: i contenuti (soprattutto ambito forense e modulistica/consenso)
> vanno validati dalla professionista prima della pubblicazione.
