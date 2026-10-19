/* CAREPLUS TV — Presentación, filtros y reproducción sin salir de index.html. */
(() => {
    'use strict';

    const videos = window.careplusVideos || [];
    const featuredContainer = document.getElementById('cpv-featured');
    const grid = document.getElementById('cpv-grid');
    const emptyMessage = document.getElementById('cpv-empty');
    const filterButtons = [...document.querySelectorAll('[data-video-filter]')];
    const dialog = document.getElementById('cpv-dialog');
    const player = document.getElementById('cpv-player');
    const dialogTitle = document.getElementById('cpv-dialog-title');
    const dialogDescription = document.getElementById('cpv-dialog-description');
    const dialogError = document.getElementById('cpv-dialog-error');

    if (!featuredContainer || !grid || !dialog) return;

    const categoryNames = {
        marca: 'Nuestra marca',
        productos: 'Productos',
        rutinas: 'Rutinas',
        consejos: 'Consejos'
    };

    // Protege los textos cuando se insertan con innerHTML.
    const safe = text => String(text).replace(/[&<>"']/g, character => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[character]));

    // Devuelve true si asignaste la ruta de un MP4 en js/data/videos.js.
    const isAvailable = video => Boolean(video.src && video.src.trim());

    // Video principal, separado de la galería.
    function renderFeatured() {
        const video = videos.find(item => item.featured);
        if (!video) return;

        const available = isAvailable(video);
        featuredContainer.innerHTML = `
            <article class="cpv-feature">
                <div class="cpv-feature__media">
                    <img src="${safe(video.poster)}" alt="Portada de ${safe(video.title)}" loading="lazy">
                    <span class="cpv-feature__pill">✦ VIDEO DESTACADO</span>
                    ${available
                        ? `<button type="button" class="cpv-feature__play cpv-watch" data-video-id="${safe(video.id)}" aria-label="Reproducir ${safe(video.title)}">▶</button>`
                        : `<span class="cpv-feature__play cpv-feature__play--soon" aria-hidden="true">✦</span>`}
                </div>
                <div class="cpv-feature__copy">
                    <span class="cpv-feature__label">${safe(categoryNames[video.category] || video.category)}</span>
                    <h3>${safe(video.title)}</h3>
                    <p>${safe(video.description)}</p>
                    <div class="cpv-feature__actions">
                        <button type="button" class="btn btn-primary cpv-watch" data-video-id="${safe(video.id)}" ${available ? '' : 'disabled'}>
                            ${available ? '▶ Ver video' : 'Próximamente'}
                        </button>
                        <a class="btn btn-light" href="#catalogo" style="text-decoration:none">Ver productos →</a>
                    </div>
                    <span class="cpv-feature__note">${available ? 'Disfruta el contenido sin salir de CarePlus.' : 'Estamos preparando este contenido para ti.'}</span>
                </div>
            </article>`;
    }

    // Se muestran tarjetas únicamente para los videos que no son el destacado.
    function renderCards(category = 'todos') {
        const collection = videos.filter(video => !video.featured && (category === 'todos' || video.category === category));
        grid.innerHTML = collection.map(video => {
            const available = isAvailable(video);
            return `
                <article class="cpv-card">
                    <div class="cpv-card__visual">
                        <img src="${safe(video.poster)}" alt="Portada de ${safe(video.title)}" loading="lazy">
                        <span class="cpv-card__chip">${available ? '▶ Disponible' : 'Próximamente'}</span>
                        ${available
                            ? `<button type="button" class="cpv-card__play cpv-watch" data-video-id="${safe(video.id)}" aria-label="Reproducir ${safe(video.title)}">▶</button>`
                            : `<span class="cpv-card__play cpv-card__play--soon" aria-hidden="true">✦</span>`}
                    </div>
                    <div class="cpv-card__body">
                        <span class="cpv-card__category">${safe(categoryNames[video.category] || video.category)}</span>
                        <h4 class="cpv-card__title">${safe(video.title)}</h4>
                        <p class="cpv-card__description">${safe(video.description)}</p>
                        <div class="cpv-card__footer">
                            <button class="cpv-card__action cpv-watch" type="button" data-video-id="${safe(video.id)}" ${available ? '' : 'disabled'}>
                                ${available ? '▶ Reproducir video' : 'Disponible próximamente'}
                            </button>
                            <span class="cpv-card__status">CarePlus TV</span>
                        </div>
                    </div>
                </article>`;
        }).join('');
        emptyMessage.hidden = collection.length > 0;
    }

    function openVideo(id) {
        const video = videos.find(item => item.id === id);
        if (!video || !isAvailable(video)) return;

        dialogTitle.textContent = video.title;
        dialogDescription.textContent = video.description;
        dialogError.hidden = true;
        player.poster = video.poster;
        player.src = video.src;
        player.load();
        dialog.showModal(); // Dialog mantiene al usuario en la misma página.

        // Se inicia después de hacer clic. Si el navegador lo impide, quedan los controles.
        player.play().catch(() => {});
    }

    function stopVideo() {
        player.pause();
        player.removeAttribute('src');
        player.load(); // Libera el recurso; al reabrirlo volverá a cargar.
        dialogError.hidden = true;
    }

    // Un solo listener funciona para todos los botones, incluso después de filtrar.
    document.getElementById('videos').addEventListener('click', event => {
        const button = event.target.closest('[data-video-id]');
        if (button && !button.disabled) openVideo(button.dataset.videoId);
    });

    // Los filtros solo afectan a las tarjetas, no al video principal.
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(item => {
                const active = item === button;
                item.classList.toggle('is-active', active);
                item.setAttribute('aria-pressed', String(active));
            });
            renderCards(button.dataset.videoFilter);
        });
    });

    document.getElementById('cpv-dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', stopVideo);
    dialog.addEventListener('click', event => {
        if (event.target === dialog) dialog.close(); // Clic fuera del contenido.
    });
    player.addEventListener('error', () => {
        if (player.getAttribute('src')) dialogError.hidden = false;
    });

    renderFeatured();
    renderCards();
})();
