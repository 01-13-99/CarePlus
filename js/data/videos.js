/*
 * CAREPLUS — CATÁLOGO DE VIDEOS
 *
 * PARA PUBLICAR UN VIDEO:
 * 1. Copia el archivo MP4 dentro de la carpeta videos/ (en la raíz del proyecto).
 * 2. En el video correspondiente, escribe su ruta en "src":
 *       src: './videos/conoce-careplus.mp4',
 * 3. Guarda los cambios. La tarjeta se habilita de forma automática.
 *
 * Los seis MP4 originales ya tienen una ruta src y están incluidos en la entrega.
 * Si borras src (texto vacío), se mostrará "Próximamente".
 * "poster" es la fotografía que aparece como portada del video.
 * Las rutas son relativas a videos.html, ubicada en la raíz del proyecto.
 */
window.careplusVideos = [
    {
        id: 'conoce-careplus',
        title: 'Conoce CarePlus: tu rutina, tu momento',
        category: 'marca',
        description: 'Descubre la esencia de CarePlus y los productos que acompañan tu día.',
        poster: './images/crema facial hidratante.jpg',
        src: './videos/CarePlus_video_principal.mp4', // Ejemplo: './videos/conoce-careplus.mp4'
        featured: true
    },
    {
        id: 'protector-solar',
        title: 'Protector solar FPS 50: conoce el producto',
        category: 'productos',
        description: 'Conoce nuestro protector solar y su lugar en una rutina de cuidado.',
        poster: './images/protector.jpg',
        src: './videos/protector_solar_video.mp4' // Ejemplo: './videos/protector-solar.mp4'
    },
    {
        id: 'rutina-facial',
        title: 'Una rutina facial sencilla para cada día',
        category: 'rutinas',
        description: 'Tres pasos cotidianos: limpieza, hidratación y protección.',
        poster: './images/crema facial hidratante.jpg',
        src: './videos/rutina_video.mp4' // Ejemplo: './videos/rutina-facial.mp4'
    },
    {
        id: 'cuidado-capilar',
        title: 'Conoce nuestra línea de cuidado capilar',
        category: 'productos',
        description: 'Una mirada a nuestro shampoo y acondicionador.',
        poster: './images/Shampoo.jpg',
        src: './videos/video_shampoo.mp4' // Ejemplo: './videos/cuidado-capilar.mp4'
    },
    {
        id: 'perfume-floral',
        title: 'Perfume floral: descubre su esencia',
        category: 'productos',
        description: 'Un detalle floral para acompañar tus momentos.',
        poster: './images/Perfume floral.jpg',
        src: './videos/video_perfume.mp4' // Ejemplo: './videos/perfume-floral.mp4'
    },
    {
        id: 'habitos-cotidianos',
        title: 'Pequeños hábitos de cuidado cotidiano',
        category: 'consejos',
        description: 'Ideas simples para dedicarte unos minutos cada día.',
        poster: './images/crema corporal.jpg',
        src: './videos/hidratante_video.mp4' // Ejemplo: './videos/habitos-cotidianos.mp4'
    }
];
