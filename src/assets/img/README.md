# assets/img — immagini del sito

Cartella pronta per il **drop-in delle foto reali**. Attualmente il sito usa
illustrazioni SVG come segnaposto; qui vanno le foto professionali.

## File attesi (nomi consigliati)

| File | Uso | Dimensioni consigliate |
|------|-----|------------------------|
| `ritratto.jpg` / `ritratto.webp` | Ritratto sezione "Chi sono" | 800×1000 (4:5), + `ritratto@2x` 1600×2000 |
| `studio-1.jpg` … | Foto studio (opzionali) | 1200×800 (3:2) |
| `articolo-1.jpg` … | Copertine articoli blog | 1200×800 (3:2) |
| `og-image.jpg` | Anteprima condivisione social | **1200×630** (obbligatoria per Open Graph) |

Esporta sempre in **WebP** (con fallback JPG), qualità ~80, e dichiara `width`/`height`.

## Come sostituire un segnaposto (esempio: ritratto)

In `index.html`, nella sezione `.about__frame`, sostituire l'`<svg>` con:

```html
<picture>
  <source
    type="image/webp"
    srcset="assets/img/ritratto.webp 1x, assets/img/ritratto@2x.webp 2x">
  <img
    src="assets/img/ritratto.jpg"
    srcset="assets/img/ritratto.jpg 1x, assets/img/ritratto@2x.jpg 2x"
    width="800" height="1000"
    alt="Ritratto della Dott.ssa Sharon Maria Bellia"
    loading="lazy" decoding="async">
</picture>
```

## Card articoli (blog)

Sostituire l'`<svg>` dentro `.card__img` con:

```html
<img src="assets/img/articolo-1.jpg" width="1200" height="800"
     alt="[descrizione articolo]" loading="lazy" decoding="async">
```

## og:image (anteprima social)

Una volta pronta `og-image.jpg` (1200×630), aggiungere in ogni `<head>`:

```html
<meta property="og:image" content="https://studiosharonbellia.example/assets/img/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://studiosharonbellia.example/assets/img/og-image.jpg">
```

> Le regole CSS (`.about__frame img`, `.card__img img { width:100%; height:100%; object-fit:cover }`)
> sono già compatibili: le foto riempiono i contenitori senza modifiche di layout.
