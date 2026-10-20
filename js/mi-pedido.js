/** Mi pedido: un carrito compartido, un formulario y seguimiento local de ejemplo. */
document.addEventListener('DOMContentLoaded', () => {
  const {getCart,findProduct,money,escapeHTML,changeQuantity,removeItem,cartSubtotal,saveCart,read,write,ordersKey}=CarePlus;
  const cartItems=document.getElementById('cart-items');
  const form=document.getElementById('checkout-form');
  const notice=document.getElementById('notice');
  const latest=document.getElementById('latest-order');
  const historyBox=document.getElementById('order-history');
  const dateString=timestamp=>new Intl.DateTimeFormat('es-PE',{dateStyle:'medium',timeStyle:'short'}).format(new Date(timestamp));
  const orderStatus='Pedido recibido';

  function renderCart(){
    const cart=getCart();
    cartItems.innerHTML=cart.length?cart.map(item=>{
      const p=findProduct(item.id);
      return `<div class="cart-line"><img class="cart-thumb" src="${escapeHTML(p.image)}" alt=""><div class="cart-info"><strong>${escapeHTML(p.name)}</strong><small>${money(p.price)} por unidad</small><div class="cart-qty"><button type="button" data-qty="-1" data-id="${p.id}" aria-label="Quitar una unidad">−</button><span>${item.qty}</span><button type="button" data-qty="1" data-id="${p.id}" aria-label="Añadir una unidad">+</button></div></div><div class="cart-price"><strong>${money(p.price*item.qty)}</strong><button type="button" class="remove-button" data-remove="${p.id}">Quitar</button></div></div>`;
    }).join(''):'<div class="empty">Tu carrito está vacío. <a href="productos.html">Explorar productos →</a></div>';
    const subtotal=cartSubtotal(); const shipping=cart.length?7:0;
    document.getElementById('subtotal').textContent=money(subtotal);
    document.getElementById('shipping').textContent=money(shipping);
    document.getElementById('total').textContent=money(subtotal+shipping);
  }
  function showNotice(msg){notice.textContent=msg;notice.classList.add('show');setTimeout(()=>notice.classList.remove('show'),6000);}
  cartItems.addEventListener('click',e=>{
    const q=e.target.closest('[data-qty]');if(q){changeQuantity(q.dataset.id,Number(q.dataset.qty));return;}
    const remove=e.target.closest('[data-remove]');if(remove)removeItem(remove.dataset.remove);
  });
  document.addEventListener('careplus:cartchange',renderCart);
  document.addEventListener('careplus:externalcartchange',renderCart);
  function getOrders(){return read(ordersKey).filter(o=>o && Array.isArray(o.items) && o.id && o.timestamp);}
  function renderOrders(){
    const orders=getOrders();
    if(!orders.length){
      latest.innerHTML='<div class="empty">Aún no has confirmado pedidos de demostración. <a href="#carrito">Revisa tu carrito.</a></div>';
      historyBox.innerHTML='<div class="empty">Todavía no tienes pedidos registrados en este navegador.</div>';
      return;
    }
    const recent=orders[0];
    latest.innerHTML=`<div class="order-head"><div><span class="status-pill">✓ ${orderStatus}</span><h3>Pedido ${escapeHTML(recent.id)}</h3><p class="muted">${dateString(recent.timestamp)} · Total ${money(recent.total)}</p></div><strong>${recent.items.reduce((s,item)=>s+item.qty,0)} artículos</strong></div><div class="status-steps" aria-label="Estado de entrega ilustrativo"><div class="step done"><span>✓</span><strong>Pedido recibido</strong></div><div class="step"><span>2</span><strong>En preparación</strong></div><div class="step"><span>3</span><strong>En camino</strong></div><div class="step"><span>4</span><strong>Entregado</strong></div></div><p class="note">Seguimiento de demostración: el estado no se actualiza automáticamente porque no existe conexión con un servicio de entregas.</p>`;
    historyBox.innerHTML=orders.map(o=>`<article class="history-card"><div><span class="status-pill">✓ ${orderStatus}</span><h3>Pedido ${escapeHTML(o.id)}</h3><p class="muted">${dateString(o.timestamp)}</p><small>${o.items.map(item=>`${item.qty} × ${escapeHTML(item.name)}`).join(' · ')}</small></div><strong>${money(o.total)}</strong></article>`).join('');
  }
  form.addEventListener('submit',e=>{
    e.preventDefault();
    if(!form.reportValidity())return;
    const cart=getCart();
    if(!cart.length){showNotice('Tu carrito está vacío. Agrega un producto antes de confirmar.');return;}
    const order={id:'CP-'+Date.now().toString(36).toUpperCase(),timestamp:Date.now(),items:cart.map(item=>({id:item.id,name:findProduct(item.id).name,qty:item.qty,price:findProduct(item.id).price})),total:cartSubtotal()+7,status:'recibido'};
    const orders=getOrders();orders.unshift(order);
    // Historial deliberadamente anónimo: NO guarda el DNI, teléfono, email o domicilio ingresados.
    if(!write(ordersKey,orders.slice(0,25))){showNotice('No se pudo guardar el pedido en este navegador. Comprueba la configuración de almacenamiento.');return;}
    saveCart([]);form.reset();renderOrders();
    showNotice(`¡Pedido de demostración ${order.id} confirmado! No se ha enviado ninguna compra real.`);
    document.getElementById('seguimiento').scrollIntoView({behavior:'smooth',block:'start'});
  });
  renderCart();renderOrders();
});
