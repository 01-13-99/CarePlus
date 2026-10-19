# Videos de CarePlus TV

Coloca aquí tus archivos `.mp4`. Se recomienda video H.264 con audio AAC para una amplia compatibilidad.

**Para que aparezca el botón de reproducción**, abre `js/data/videos.js` y escribe el nombre del archivo en `src`.

Por ejemplo, después de guardar `videos/rutina-facial.mp4`:

```js
src: './videos/rutina-facial.mp4'
```

No hace falta agregar ningún `<video>` a `index.html`: `js/videos.js` se ocupa de ello.

Las miniaturas se definen en el campo `poster`; puedes cambiarlas por tus imágenes propias dentro de `images/`.

Recomendación: comprime los archivos de video antes de subirlos a GitHub Pages para reducir el tiempo de carga y evitar límites del repositorio. Los videos no se reproducen automáticamente al abrir la página.
