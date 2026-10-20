# CarePlus — Tienda multipágina

Este proyecto desarrolla la **vista cliente** de CarePlus en **cinco archivos HTML independientes**, según el mapa del sitio entregado para Arquitectura de Entornos Web.

## 1. Estructura

```text
CarePlus/
├── index.html           # Inicio
├── categorias.html      # Rostro, cuerpo, cabello, higiene, perfumes, maquillaje
├── productos.html       # Catálogo, búsqueda, filtros, detalles
├── videos.html          # CarePlus TV, videos locales MP4
├── mi-pedido.html       # Carrito, pedido, seguimiento e historial de demostración
├── css/
│   ├── estilos.css      # Estilo compartido de CarePlus
│   ├── index.css
│   ├── categorias.css
│   ├── productos.css
│   ├── videos.css        # Galería y estilos específicos de videos.html
│   └── mi-pedido.css
├── js/
│   ├── comun.js         # Catálogo, carrito y acciones compartidas
│   ├── index.js
│   ├── categorias.js
│   ├── productos.js
│   ├── videos.js
│   ├── mi-pedido.js
│   └── data/
│       ├── productos.js # Fuente única de productos
│       └── videos.js    # Fuente única de videos y rutas de MP4
├── images/
└── videos/              # Los 6 MP4 originales del ZIP, conservados
```

**Nota:** el diseño compartido no se duplica en cinco CSS independientes: `estilos.css` contiene las bases visuales, mientras que cada página carga **además** su propio CSS y JavaScript. Esto evita diferencias de marca y facilita el trabajo colaborativo.

## 2. Abrir el proyecto

Recomendado: abrir la carpeta `CarePlus` con VS Code y usar Live Server, o desde una terminal:

```bash
cd CarePlus
python3 -m http.server 8000
```

Entra a `http://localhost:8000/`.

## 3. Funcionalidades

- **Inicio:** presentación de la marca, categorías, productos destacados y avance de CarePlus TV.
- **Categorías:** selección de Rostro, Cuerpo, Cabello, Higiene, Perfumes y Maquillaje. La última categoría se presenta como futura línea, ya que **no existe** un producto de maquillaje en las imágenes originales. Se añadió Perfumes para no ocultar el producto existente.
- **Productos:** búsqueda, filtrado, ordenamiento, modal de detalles y botón de agregar al carrito.
- **Videos:** los 6 videos reales del ZIP, con filtros y reproductor modal; se mantienen los estilos de la galería original.
- **Mi pedido:** gestión de cantidades, cálculo referencial del total, formulario, seguimiento e historial de **demostración**.

El carrito se guarda con `localStorage`, así que los artículos permanecen al navegar a otra página **en el mismo navegador y origen**. El historial de pedidos también es local y solo conserva identificador, fecha, artículos, cantidades y total: **no se almacena información de contacto ni direcciones**.

### Limitaciones intencionales

Esta es una demostración académica de frontend; no hay servidor, pasarela de pago, inventario real ni integración con el sistema administrativo. Los pedidos no se envían a ninguna empresa. El estado del pedido permanecerá «Pedido recibido» sin seguimiento logístico real. **No ingreses datos personales reales durante las pruebas.**

## 4. Trabajo en equipo

En GitHub, conviene conservar una sola fuente de datos compartida (`js/data/productos.js`), una base de CSS (`css/estilos.css`) y los archivos por página para asignar tareas sin alterar el diseño del resto.

## 5. Relación con el mapa del sitio

- Inicio → `index.html`.
- Categorías → `categorias.html` (subcategorías internas).
- Productos → `productos.html` (detalle modal y carrito).
- Videos → `videos.html` (tutoriales / consejos / novedades).
- Mi pedido → `mi-pedido.html` (carrito, confirmar, seguimiento, historial).

> En el ZIP original los productos pertenecen a «Facial, Cremas, Capilar, Higiene, Perfumes». Para respetar el wireframe, se muestran los nombres visibles «Rostro, Cuerpo, Cabello, Higiene, Maquillaje». Se conserva Perfumes como categoría extra para mantener íntegro el catálogo y se indica que Maquillaje todavía no tiene productos.

## 6. Documentación Cibertec

Para la entrega final, documenta el mapa, los wireframes que correspondan al resultado, la distribución de archivos, las pruebas y las limitaciones del prototipo. Revisa por separado la rúbrica y los requisitos de Bootstrap del curso, ya que esta refactorización no agrega Bootstrap para evitar introducir cambios visuales o dependencia externa sin antes aprobarlos con el equipo.
