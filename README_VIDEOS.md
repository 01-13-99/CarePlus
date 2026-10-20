# CarePlus TV — Galería en videos.html

La versión actual de CarePlus es **multipágina**. Para ver CarePlus TV, abre `videos.html` desde el menú principal.

## Archivos

- `videos.html`: contenido de la página y el reproductor.
- `css/videos.css`: estilos de la galería y ajustes exclusivos de la página de videos.
- `js/data/videos.js`: información y rutas de los seis videos.
- `js/videos.js`: filtros y apertura/cierre del reproductor.
- `videos/`: seis archivos MP4 incluidos en el ZIP entregado.

Los seis videos del ZIP original están presentes y conectados. Para reemplazar uno en el futuro, copia el MP4 en `videos/` y modifica la propiedad `src` del video correspondiente en `js/data/videos.js`.

Todas las rutas se calculan respecto a **`videos.html`**, que se encuentra en la raíz del proyecto (no respecto al archivo `.js`).

El reproductor utiliza `<dialog>` y `<video>` nativos. El video se detiene cuando se cierra el cuadro de diálogo. La galería está integrada en la navegación multipágina, no como una sección de `index.html`.
