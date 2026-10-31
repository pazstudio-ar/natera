# Natera · tienda online (catálogo + pedido por WhatsApp)

Sitio estático: HTML, CSS y JavaScript, sin frameworks ni instalación.

## Cómo editar
- **Productos, precios, WhatsApp y redes:** `assets/js/products.js` (es el único lugar).
- **Fotos de productos:** `img/products/<nombre-del-producto>.webp` (el nombre debe coincidir con el `slug`). Si no hay foto, se muestra una hojita.
- **Textos de la página:** `index.html`.
- **Colores y animaciones:** `assets/css/styles.css` (colores arriba de todo, en `:root`).
- **Efectos de fondo (luciérnagas, hojas que caen, cinta de nombres):** `assets/js/fx.js`.

## Probar en tu compu
Abrí `index.html` en el navegador, o corré `python3 -m http.server` en esta carpeta y entrá a http://localhost:8000.

## Publicar
1. Probar en GitHub Pages con la línea `<meta name="robots" content="noindex">` puesta.
2. Al publicar en Netlify (cuenta a nombre de la clienta), sacar esa línea del `index.html`.

Diseño web: [Paz Studio](https://pazstudio.com.ar)
