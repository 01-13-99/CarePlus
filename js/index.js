/** Portada. Las tarjetas reutilizan la misma fuente de datos que Productos. */
document.addEventListener('DOMContentLoaded', () => {
  const target = document.getElementById('home-products');
  if (target) target.innerHTML = CarePlus.products.slice(0, 4).map(CarePlus.productCard).join('');
});
