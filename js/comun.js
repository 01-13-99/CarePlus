/**
 * CarePlus - Utilidades compartidas por todas las páginas.
 * El catálogo y el carrito viven aquí para mantener el estado al navegar.
 * No se guardan teléfonos, DNI ni direcciones en el almacenamiento local.
 */
(() => {
  'use strict';
  const CART_KEY = 'careplus_tienda_carrito_v2';
  const ORDERS_KEY = 'careplus_tienda_pedidos_demo_v2';
  const products = window.CarePlusProducts || [];
  const $ = id => document.getElementById(id);
  const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money = value => 'S/ ' + Number(value).toLocaleString('es-PE', {minimumFractionDigits:2, maximumFractionDigits:2});

  function read(key) {
    try { const val = JSON.parse(localStorage.getItem(key)); return Array.isArray(val) ? val : []; }
    catch { return []; }
  }
  function write(key, data) {
    try { localStorage.setItem(key, JSON.stringify(data)); return true; }
    catch { return false; }
  }
  function findProduct(id) { return products.find(p => p.id === Number(id)); }
  function getCart() {
    return read(CART_KEY).filter(item => {
      const p = findProduct(item.id);
      return p && Number.isInteger(item.qty) && item.qty > 0 && item.qty <= p.stock;
    });
  }
  function saveCart(cart) {
    write(CART_KEY, cart);
    document.dispatchEvent(new CustomEvent('careplus:cartchange'));
  }
  function cartCount() { return getCart().reduce((sum, i) => sum + i.qty, 0); }
  function cartSubtotal() { return getCart().reduce((sum, i) => sum + (findProduct(i.id)?.price || 0)*i.qty, 0); }
  function updateCartBadge() { if ($('cart-count')) $('cart-count').textContent = cartCount(); }
  function notify(message) {
    let toast = $('cp-global-notice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id='cp-global-notice'; toast.className='cp-global-notice';
      toast.setAttribute('role','status');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(notify.timer);
    notify.timer = setTimeout(() => toast.classList.remove('is-visible'), 3200);
  }
  function addToCart(id, qty=1) {
    const product=findProduct(id);
    if (!product || product.stock <= 0) return notify('Este producto no está disponible.');
    const cart=getCart();
    const existing=cart.find(item => item.id === product.id);
    if (existing) {
      if (existing.qty + qty > product.stock) return notify('Llegaste al máximo de unidades disponibles.');
      existing.qty += qty;
    } else { cart.push({id:product.id, qty:Math.min(qty,product.stock)}); }
    saveCart(cart);
    notify('¡Producto agregado al carrito!');
  }
  function changeQuantity(id, delta) {
    const cart=getCart(); const entry=cart.find(item => item.id===Number(id));
    if (!entry) return;
    const product=findProduct(id);
    entry.qty += delta;
    if (entry.qty > product.stock) { entry.qty=product.stock; notify('Llegaste al máximo disponible.'); }
    saveCart(cart.filter(item => item.qty>0));
  }
  function removeItem(id) { saveCart(getCart().filter(item => item.id!==Number(id))); }

  function productCard(p) {
    return `<article class="product">
      <div class="product-art"><img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}" loading="lazy"></div>
      <div class="product-category">${escapeHTML(p.category)}</div>
      <h3>${escapeHTML(p.name)}</h3><p>${escapeHTML(p.desc)}</p>
      <button type="button" class="product-details-link" data-detail-id="${p.id}">Ver detalles →</button>
      <div class="product-foot"><span class="price">${money(p.price)}</span><button type="button" class="add" data-add-id="${p.id}" aria-label="Agregar ${escapeHTML(p.name)} al carrito">+</button></div>
      <div class="stock-note">${p.stock ? '✓ Disponible' : 'Agotado'}</div>
    </article>`;
  }

  document.addEventListener('click', event => {
    const add=event.target.closest('[data-add-id]');
    if (add) addToCart(add.dataset.addId);
    const detail=event.target.closest('[data-detail-id]');
    if (detail && !window.location.pathname.endsWith('productos.html')) {
      window.location.href='productos.html?producto='+encodeURIComponent(detail.dataset.detailId);
    }
  });
  document.addEventListener('careplus:cartchange',updateCartBadge);
  window.addEventListener('storage',event => { if(event.key===CART_KEY) { updateCartBadge(); document.dispatchEvent(new CustomEvent('careplus:externalcartchange')); } });
  document.addEventListener('DOMContentLoaded',()=>{
    updateCartBadge();
    const globalForm=$('global-search-form');
    if(globalForm) globalForm.addEventListener('submit',event=>{
      event.preventDefault();
      if (window.location.pathname.endsWith('productos.html')) return; // Se ocupa productos.js
      const query=$('header-search').value.trim();
      window.location.href='productos.html'+(query?'?q='+encodeURIComponent(query):'');
    });
    const globalSearch=$('header-search');
    if(globalSearch && window.location.pathname.endsWith('productos.html')) {
      globalSearch.value = new URLSearchParams(window.location.search).get('q') || '';
    }
  });
  window.CarePlus={products,findProduct,money,escapeHTML,getCart,saveCart,cartCount,cartSubtotal,addToCart,changeQuantity,removeItem,productCard,read,write,ordersKey:ORDERS_KEY,notify,updateCartBadge};
})();
