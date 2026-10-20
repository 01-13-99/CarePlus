/** Página Productos: búsqueda, filtros, ordenamiento y detalle en modal. */
document.addEventListener('DOMContentLoaded', () => {
  const {products,productCard,money,escapeHTML,findProduct}=CarePlus;
  const search=document.getElementById('product-search');
  const category=document.getElementById('category-filter');
  const sort=document.getElementById('sort-filter');
  const grid=document.getElementById('products');
  const count=document.getElementById('catalog-count');
  const dialog=document.getElementById('product-dialog');
  const detail=document.getElementById('product-detail');
  const query=new URLSearchParams(location.search);
  search.value=query.get('q')||'';
  if ([...category.options].some(option=>option.value===query.get('categoria'))) category.value=query.get('categoria');
  function render(){
    const term=search.value.toLowerCase().trim();
    let visible=products.filter(p=>(p.name+' '+p.desc+' '+p.category).toLowerCase().includes(term) && (!category.value || p.category===category.value));
    if(sort.value==='price-up') visible.sort((a,b)=>a.price-b.price);
    if(sort.value==='price-down') visible.sort((a,b)=>b.price-a.price);
    if(sort.value==='name') visible.sort((a,b)=>a.name.localeCompare(b.name,'es'));
    count.textContent=`${visible.length} producto${visible.length===1?'':'s'}`;
    grid.innerHTML=visible.length ? visible.map(productCard).join('') : '<div class="empty">No encontramos productos con esos filtros. <a href="productos.html">Ver todos</a></div>';
  }
  for(const item of [search,category,sort]) item.addEventListener(item===search?'input':'change',()=>{render(); const params=new URLSearchParams(); if(search.value.trim()) params.set('q',search.value.trim()); if(category.value) params.set('categoria',category.value); history.replaceState(null,'',location.pathname+(params.size?'?'+params:''));});
  document.getElementById('global-search-form').addEventListener('submit',event=>{event.preventDefault();search.value=document.getElementById('header-search').value;category.value='';render();search.scrollIntoView({behavior:'smooth',block:'center'});});
  grid.addEventListener('click',e=>{const btn=e.target.closest('[data-detail-id]');if(btn) openDetail(Number(btn.dataset.detailId));});
  function openDetail(id){
    const p=findProduct(id); if(!p)return;
    detail.innerHTML=`<div class="detail-photo"><img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}"></div><div class="detail-content"><span class="product-category">${escapeHTML(p.category)}</span><h2 id="detail-title">${escapeHTML(p.name)}</h2><p>${escapeHTML(p.desc)}</p><p class="detail-stock">✓ ${p.stock} unidades disponibles en catálogo de demostración</p><div class="detail-price">${money(p.price)}</div><button type="button" class="btn btn-primary" data-add-id="${p.id}">Agregar al carrito +</button><a class="mini-link" href="mi-pedido.html">Ir a mi pedido →</a></div>`;
    if(!dialog.open)dialog.showModal();
  }
  document.getElementById('detail-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  const id=query.get('producto');
  if(id)openDetail(Number(id));
  render();
});
