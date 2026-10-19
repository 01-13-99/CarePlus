# Nueva sección **CarePlus TV** (versión de una sola página)

Este proyecto mantiene la estructura original de CarePlus: **únicamente `index.html`**. La sección `#videos` se añadió entre el catálogo y el formulario de pedido, con un enlace en la navegación superior y en el pie de página.

## Archivos nuevos

- `css/videos.css` — todos los estilos de la sección, usando las variables de colores de `css/estilos.css`.
- `js/data/videos.js` — la lista editable de los seis videos y sus portadas.
- `js/videos.js` — crea las tarjetas, permite filtrar categorías y abre/cierra el reproductor.
- `videos/LEEME.md` — instrucciones para agregar MP4.

## Archivos existentes modificados

- `index.html` — enlace a la hoja de estilos, sección `#videos`, modal y scripts nuevos. **No se cambiaron** el carrito, formulario, catálogo ni el archivo `js/index.js`.

## Publicar un video en tres pasos

1. Coloca el archivo en `CarePlus/videos/`, por ejemplo `protector-solar.mp4`.
2. Abre `js/data/videos.js`, busca `id: 'protector-solar'` y cambia `src: ''` por `src: './videos/protector-solar.mp4'`.
3. Guarda y actualiza la página. La etiqueta **Próximamente** se sustituirá por un botón de reproducción.

Para cambiar la portada, modifica `poster`. Todas las rutas se escriben **respecto a `index.html`**, no al archivo JavaScript. Respeta las mayúsculas y minúsculas de los nombres al subir a GitHub Pages.

## Navegación

- `index.html#videos` abre la sección de videos sin cambiar de página.
- Los filtros muestran Productos, Rutinas o Consejos.
- El video principal es `featured: true`.
- El reproductor usa `<dialog>` y `<video>` nativos, con cierre desde la X, clic sobre el fondo o tecla Escape. Detiene la reproducción al cerrar.

## Material no incluido

No recibimos MP4 en el ZIP original. Las seis tarjetas muestran fotografías reales incluidas en el proyecto y el estado **Próximamente**, sin enlaces rotos ni videos inventados.

Este es un sitio de demostración académica. El formulario de pedidos sigue funcionando como simulación local; no se alteró su comportamiento.
