const products = [
    { id: 1, name: 'Crema facial hidratante', category: 'Facial', price: 29.90, stock: 25, icon: '🧴', desc: 'Hidratación diaria para una piel suave.' },
    { id: 2, name: 'Shampoo anticaspa', category: 'Capilar', price: 22.50, stock: 10, icon: '🫧', desc: 'Limpieza y cuidado para tu cabello.' },
    { id: 3, name: 'Desodorante roll-on', category: 'Higiene', price: 12.90, stock: 50, icon: '🧼', desc: 'Frescura y protección para cada día.' },
    { id: 4, name: 'Perfume floral', category: 'Perfumes', price: 69.90, stock: 8, icon: '🌸', desc: 'Una fragancia delicada para tu rutina.' },
    { id: 5, name: 'Crema corporal', category: 'Cremas', price: 24.90, stock: 18, icon: '🌿', desc: 'Nutrición e hidratación corporal.' },
    { id: 6, name: 'Protector solar FPS 50', category: 'Facial', price: 39.90, stock: 27, icon: '☀️', desc: 'Protección solar para el cuidado diario.' },
    { id: 7, name: 'Acondicionador nutritivo', category: 'Capilar', price: 21.90, stock: 16, icon: '🧴', desc: 'Ayuda a suavizar y desenredar el cabello.' },
    { id: 8, name: 'Jabón líquido suave', category: 'Higiene', price: 15.50, stock: 32, icon: '🫧', desc: 'Limpieza suave para uso diario.' }
];


let cart = [];
const money = n => 'S/ ' + Number(n).toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function renderProducts() {
    const q = $('product-search').value.toLowerCase().trim(), cat = $('category-filter').value, sort = $('sort-filter').value;
    let list = products.filter(p => (p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)) && (!cat || p.category === cat));
    if (sort === 'price-up') list.sort((a, b) => a.price - b.price); if (sort === 'price-down') list.sort((a, b) => b.price - a.price);
    $('products').innerHTML = list.map(p => `<article class="product"><div class="product-art">${p.icon}</div><div class="product-category">${esc(p.category)}</div><h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p><div class="product-foot"><span class="price">${money(p.price)}</span><button class="add" aria-label="Agregar ${esc(p.name)} al carrito" onclick="addToCart(${p.id})">+</button></div><div class="stock-note">${p.stock > 0 ? '✓ Disponible' : 'Agotado'}</div></article>`).join('') || '<div class="empty">No encontramos productos con esos filtros.</div>';
}

function addToCart(id) { const p = products.find(p => p.id === id); if (!p || p.stock < 1) return showNotice('Este producto no está disponible.'); const item = cart.find(i => i.id === id); if (item) { if (item.qty >= p.stock) return showNotice('No quedan más unidades disponibles.'); item.qty++; } else cart.push({ id, qty: 1 }); renderCart(); showNotice('Producto agregado a tu carrito.'); }

function changeQty(id, delta) { const item = cart.find(i => i.id === id), p = products.find(p => p.id === id); if (!item) return; item.qty += delta; if (item.qty < 1) cart = cart.filter(i => i.id !== id); else if (item.qty > p.stock) { item.qty = p.stock; showNotice('Llegaste al máximo de unidades disponibles.'); } renderCart(); }

function removeItem(id) { cart = cart.filter(i => i.id !== id); renderCart(); }

function renderCart() {
    const count = cart.reduce((s, i) => s + i.qty, 0), subtotal = cart.reduce((s, i) => s + products.find(p => p.id === i.id).price * i.qty, 0), shipping = count ? 7 : 0;
    $('cart-count').textContent = count; $('subtotal').textContent = money(subtotal); $('shipping').textContent = money(shipping); $('total').textContent = money(subtotal + shipping); $('cart-items').innerHTML = cart.map(i => { const p = products.find(p => p.id === i.id); return `<div class="cart-line"><div><strong>${esc(p.name)}</strong><small>${money(p.price)} · Cantidad: ${i.qty}</small><div style="display:flex;gap:6px;margin-top:7px"><button type="button" onclick="changeQty(${p.id},-1)">−</button><button type="button" onclick="changeQty(${p.id},1)">+</button></div></div><div style="text-align:right"><strong>${money(p.price * i.qty)}</strong><br><button type="button" style="margin-top:7px" onclick="removeItem(${p.id})">Quitar</button></div></div>` }).join('') || '<div class="empty">Tu carrito está vacío. Agrega productos del catálogo.</div>';
}

function showNotice(msg) { const n = $('notice'); n.textContent = msg; n.classList.add('show'); n.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); setTimeout(() => n.classList.remove('show'), 4000); }

$('product-search').addEventListener('input', renderProducts); $('category-filter').addEventListener('change', renderProducts);
$('sort-filter').addEventListener('change', renderProducts); $('header-search').addEventListener('input', () => { $('product-search').value = $('header-search').value; renderProducts(); });

document.querySelectorAll('[data-cat]').forEach(b => b.addEventListener('click', () => { $('category-filter').value = b.dataset.cat; document.querySelectorAll('[data-cat]').forEach(x => x.classList.toggle('selected', x === b)); renderProducts(); $('catalogo').scrollIntoView({ behavior: 'smooth' }); }));

$('checkout-form').addEventListener('submit', e => {
    e.preventDefault(); if (!cart.length) return showNotice('Tu carrito está vacío. Agrega al menos un producto antes de confirmar.'); for (const i of cart) { const p = products.find(p => p.id === i.id); if (!p || p.stock < i.qty) return showNotice('Uno de los productos ya no tiene suficiente stock.'); }
    const customer = { nombre: $('first-name').value.trim(), apellidos: $('last-name').value.trim(), telefono: $('phone').value.trim(), direccion: $('address').value.trim(), distrito: $('district').value.trim(), pago: $('payment').value };
    const total = cart.reduce((s, i) => s + products.find(p => p.id === i.id).price * i.qty, 0) + 7;
    const summary = cart.map(i => `${i.qty} × ${products.find(p => p.id === i.id).name}`).join('\n');
    alert(`¡Gracias, ${customer.nombre}!\n\nTu pedido de demostración fue registrado en esta pantalla.\n\n${summary}\n\nTotal referencial: ${money(total)}\nEntrega: ${customer.direccion}, ${customer.distrito}\nPago: ${customer.pago}\n\nEsta versión no envía el pedido a un servidor.`);
    cart.forEach(i => products.find(p => p.id === i.id).stock -= i.qty); cart = []; renderCart(); renderProducts(); e.target.reset(); showNotice('Pedido de demostración completado. ¡Gracias por elegir CarePlus!');
});

renderProducts(); renderCart();