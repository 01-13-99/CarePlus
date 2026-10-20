/** Página Categorías. Cada selección modifica el listado en esta misma página. */
document.addEventListener('DOMContentLoaded', () => {
  const { products, productCard, escapeHTML } = CarePlus;
  const categories = [
    { key: 'Facial', label: 'Rostro', icon: '🧖', desc: 'Hidratación y protección facial.', image: 'images/crema facial hidratante.jpg' },
    { key: 'Cremas', label: 'Cuerpo', icon: '🧴', desc: 'Cuidado y suavidad para tu piel.', image: 'images/crema corporal.jpg' },
    { key: 'Capilar', label: 'Cabello', icon: '🌿', desc: 'Limpieza y nutrición para tu cabello.', image: 'images/Shampoo.jpg' },
    { key: 'Higiene', label: 'Higiene', icon: '🫧', desc: 'Bienestar en tu rutina diaria.', image: 'images/jabon liquido suave.jpg' },
    { key: 'Perfumes', label: 'Perfumes', icon: '🌸', desc: 'Fragancias para cada ocasión.', image: 'images/Perfume floral.jpg' },
    { key: 'Maquillaje', label: 'Maquillaje', icon: '💄', desc: 'Una línea que estamos preparando.', image: 'images/crema facial hidratante.jpg' }
  ];
  const menu = document.getElementById('category-menu');
  const grid = document.getElementById('category-products');
  const tiles = document.getElementById('category-tiles');
  const heading = document.getElementById('category-heading');
  const description = document.getElementById('category-description');
  const more = document.getElementById('category-view-all');
  function setCategory(key) {
    const cat = categories.find(c => c.key === key) || categories[0];
    const found = products.filter(p => p.category === cat.key);
    heading.textContent = 'Productos de ' + cat.label.toLowerCase();
    description.textContent = cat.desc;
    more.href = 'productos.html?categoria=' + encodeURIComponent(cat.key);
    grid.innerHTML = found.length ? found.map(productCard).join('') : '<div class="empty">Todavía no hay productos de esta línea. <a href="productos.html">Conoce el catálogo completo.</a></div>';
    menu.querySelectorAll('button').forEach(button => {
      const selected = button.dataset.cat === cat.key;
      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    tiles.querySelectorAll('[data-category-tile]').forEach(tile => tile.classList.toggle('selected', tile.dataset.categoryTile === cat.key));
    history.replaceState(null, '', '#' + encodeURIComponent(cat.key));
  }
  tiles.innerHTML = categories.map(cat => `<button type="button" class="category-tile" data-category-tile="${cat.key}"><img src="${escapeHTML(cat.image)}" alt="" loading="lazy"><span>${cat.icon} ${cat.label}</span><small>${escapeHTML(cat.desc)}</small></button>`).join('');
  menu.addEventListener('click', e => { const btn = e.target.closest('[data-cat]'); if (btn) setCategory(btn.dataset.cat); });
  tiles.addEventListener('click', e => { const btn = e.target.closest('[data-category-tile]'); if (btn) { setCategory(btn.dataset.categoryTile); document.querySelector('.category-layout').scrollIntoView({ behavior: 'smooth' }); } });
  let initial;
  try { initial = decodeURIComponent(location.hash.substring(1)); } catch { initial = 'Facial'; }
  setCategory(initial || 'Facial');
});
