// Carrusel de imágenes SIEMPRE visible
const imagenes = [
  { src: "recursos/Aventura.jpg", texto: "Aventura al aire libre: Explora la naturaleza", link: "https://es.wikipedia.org/wiki/Aventura" },
  { src: "recursos/Playa.jpg", texto: "Playas paradisíacas: Relájate bajo el sol", link: "https://es.wikipedia.org/wiki/Playa" },
  { src: "recursos/Hotel.jpg", texto: "Hoteles únicos: Estancias inolvidables", link: "https://es.wikipedia.org/wiki/Hotel" },
  { src: "recursos/Diversion.jpg", texto: "Diversión en familia: Parques temáticos y atracciones", link: "https://es.wikipedia.org/wiki/Parque_tem%C3%A1tico" }
];

let indice = 0;
const img = document.getElementById('carrusel-img');
const caption = document.getElementById('carrusel-caption');
document.getElementById('prevBtn').onclick = () => cambiar(-1);
document.getElementById('nextBtn').onclick = () => cambiar(1);

// Inicializa el caption al cargar
window.addEventListener('DOMContentLoaded', () => mostrarImagen());

function cambiar(dir) {
  indice = (indice + dir + imagenes.length) % imagenes.length;
  mostrarImagen();
}

function mostrarImagen() {
  img.src = imagenes[indice].src;
  img.alt = imagenes[indice].texto;
  caption.innerHTML = `<a href="${imagenes[indice].link}" target="_blank" style="color: #e0f7fa; text-decoration: underline;">${imagenes[indice].texto}</a>`;
}

// --- Resto del código para el menú y acordeón (igual que antes) ---

// Contenidos de cada sección (sin carrusel)
const acordeonContents = [
  `<div class="acordeon-contenido">
    <h2>Bienvenido a Inicio</h2>
    <p>Somos mucho más que una agencia de viajes: Es una puerta a lo desconocido. Nos especializamos en experiencias únicas, alejadas del turismo convencional, llevando a nuestros viajeros por caminos escondidos, paisajes inexplorados y culturas auténticas. ¡Descubrí el mundo como nunca antes con RUTAS SECRETAS!</p>
  </div>`,
  `<div class="acordeon-contenido">
    <h2>Excursiones</h2>
    <p>Explora lugares únicos con nuestras excursiones, desde locos parques hasta una caminata tranquila por la montaña.</p>
  </div>`,
  `<div class="acordeon-contenido">
    <h2>Destinos</h2>
    <p>Descubre nuestros destinos más populares, desde playas paradisíacas hasta montañas majestuosas.</p>
    <a href="paquetes.html">ver más</a>
  </div>`,
  `<div class="acordeon-contenido">
    <h2>Contacto</h2>
    <p>¿Tienes preguntas? Contáctanos a través de nuestras redes sociales.</p>
    <p>Teléfono: +123 456 7890</p>
    <p>Email: RutaSecreta@gmail.com</p>
    <p>Dirección: AV. SiempreViva 742, Springfield</p>
  </div>`
];

const navbar = document.getElementById('navbar');
const links = navbar.querySelectorAll('.nav-link');
const acordeonContainer = document.getElementById('acordeon-container');

let currentAcordeon = null;

document.querySelectorAll('.nav-links .nav-link').forEach((link, idx) => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    // Quitar activo de todos los links
    links.forEach(l => l.classList.remove('activo'));

    // Si ya está abierto para este link, ciérralo
    if (currentAcordeon && currentAcordeon.idx === idx) {
      acordeonContainer.innerHTML = '';
      currentAcordeon = null;
      return;
    }

    // Marcar link activo
    link.classList.add('activo');

    // Obtener posición y ancho del link
    const rect = link.getBoundingClientRect();
    const navbarRect = navbar.getBoundingClientRect();
    const left = rect.left - navbarRect.left;
    const width = rect.width;

    // Mostrar acordeón alineado debajo del link seleccionado
    acordeonContainer.innerHTML = `
      <div class="acordeon-item activo" style="left:${left}px; width:${Math.max(width,220)}px">
        ${acordeonContents[idx]}
      </div>
    `;
    currentAcordeon = {idx};
  });
});

// Cierra el acordeón si haces clic fuera del navbar/acordeón
document.addEventListener('click', function(e) {
  if (
    currentAcordeon &&
    !navbar.contains(e.target) &&
    !document.getElementById('acordeon-container').contains(e.target)
  ) {
    acordeonContainer.innerHTML = '';
    links.forEach(l => l.classList.remove('activo'));
    currentAcordeon = null;
  }
});