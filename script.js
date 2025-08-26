/**
 * ESTRUCTURA DEL CÓDIGO:
 * 1. Configuración Global
 * 2. Utilidades
 * 3. Gestión de Películas
 * 4. Sistema de Modal
 * 5. Sistema de Menú
 * 6. Sistema de Reservas
 * 
 * CONCEPTOS CLAVE:
 * - Event Delegation
 * - DOM Manipulation
 * - State Management
 * - Module Pattern
 */

// 1. CONFIGURACIÓN GLOBAL
// Define constantes principales para animaciones y clases
const CONFIG = {
    animationDuration: 300,
    modalClass: 'active'
};

// 2. UTILIDADES
// Funciones helper para manipulación del DOM
const utils = {
    $: (selector) => document.querySelector(selector),
    $$: (selector) => document.querySelectorAll(selector),
    
    addEventListeners(element, events, handler) {
        events.forEach(event => element.addEventListener(event, handler));
    }
};

function init() {
    /**
     * SECCIÓN DE PELÍCULAS
     * - Estructura de datos: Objeto movies con información detallada
     * - Cada película tiene: título, género, duración, rating, etc.
     * - Los trailers se cargan desde YouTube
     * - Enlaces a IMDb para más información
     */
    const movies = {
        1: {
            title: "Minecraft la película",
            genre: "Aventura",
            duration: "1h 45m",
            rating: "PG",
            releaseDate: "20235",
            cast: "Steve, Alex, Creeper",
            director: "Markus Persson",
            trailer: "https://www.youtube.com/embed/W_l7bXqWZyY",
            imdb: "https://www.imdb.com/es/title/tt3566834/" // IMDb link
        },

        2: {
            title: "Thunderbolts*",
            genre: "Accion",
            duration: "2h 6min",
            rating: "PG-13",
            releaseDate: "2025",
            cast: "Florence PughLewis, PullmanSebastian Stan",
            director: "Jake Schreier",
            trailer: "https://www.youtube.com/embed/N1GAypxl3XE",
            imdb: "https://www.imdb.com/es/title/tt20969586/" // IMDb link
        },

        3: {
            title: "Pecadores",
            genre: "Accion",
            duration: "2h 17min",
            rating: "B15",
            releaseDate: "2025",
            cast: "Miles CatonSaul, WilliamsAndrene, Ward-Hammond",
            director: "Ryan Coogler",
            trailer: "https://www.youtube.com/embed/bAkWFyEEYSI",
            imdb: "https://www.imdb.com/es/title/tt31193180/" // IMDb link
        },

        4: {
            title: "Kaiju N°8",
            genre: "Accion",
            duration: "2h 10m",
            rating: "PG-13",
            releaseDate: "2025",
            cast: "Kafka Hibino, Mina Ashiro",
            director: "Shinji Higuchi",
            trailer: "https://www.youtube.com/embed/n99eH2dePnA",
            imdb: "https://www.imdb.com/es/title/tt35636950/" // IMDb link
        },
    };

    /**
     * SISTEMA DE MODAL (DOM)
     * Funcionalidad:
     * - Apertura/cierre con animaciones
     * - Carga dinámica de contenido
     * - Responsive design
     * - Cierre con botón, overlay y tecla ESC
     */
    const modal = utils.$("#movieModal");
    const modalTitle = utils.$("#modalTitle");
    const modalTrailer = utils.$("#modalTrailer");
    const modalDetails = utils.$("#modalDetails");
    const closeModal = utils.$("#closeModal");

    // Gestión del Modal
    function openModal(movieId) {
        const movie = movies[movieId];
        if (!movie) {
            console.error(`No se encontró la película con ID: ${movieId}`);
            return;
        }

        modalTitle.textContent = movie.title;
        modalTrailer.src = movie.trailer;
        modalDetails.innerHTML = `
            <div class="detail-item"><i class="fas fa-film"></i><span>${movie.genre}</span></div>
            <div class="detail-item"><i class="fas fa-clock"></i><span>${movie.duration}</span></div>
            <div class="detail-item"><i class="fas fa-star"></i><span>${movie.rating}</span></div>
            <div class="detail-item"><i class="fas fa-calendar-alt"></i><span>${movie.releaseDate}</span></div>
            <div class="detail-item"><i class="fas fa-users"></i><span>${movie.cast}</span></div>
            <div class="detail-item"><i class="fas fa-video"></i><span>${movie.director}</span></div>
            <div class="detail-item imdb-link">
                <i class="fas fa-link"></i>
                <a id="modalIMBd" href="${movie.imdb}" target="_blank" rel="noopener noreferrer">Más información en IMDb</a>
            </div>
        `;
        modal.classList.add(CONFIG.modalClass);
    }

    // Event Listeners
    const closeModalHandler = () => {
        modal.classList.remove(CONFIG.modalClass);
        modalTrailer.src = ""; // Detener el video
    };

    // Delegación de eventos para botones
    document.addEventListener('click', (e) => {
        if (e.target.matches('.btn-detalles')) {
            openModal(e.target.dataset.movie);
        } else if (e.target === modal || e.target.matches('.modal-close')) {
            closeModalHandler();
        }
    });

    // Cerrar con Escape
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains(CONFIG.modalClass)) {
            closeModalHandler();
        }
    });

    /**
     * SISTEMA DE MENÚ
     * Características:
     * - Menús desplegables
     * - Cierre automático al click fuera
     * - Animaciones suaves
     * - Gestión de estados
     */
    function closeAllMenus() {
        utils.$$('.menu-item ul').forEach(menu => {
            menu.style.display = 'none';
        });
    }

    // Función para alternar un menú desplegable
    function toggleMenu(menuId) {
        const menu = utils.$(`#${menuId}`);
        if (menu.style.display === 'block') {
            menu.style.display = 'none';
        } else {
            closeAllMenus(); // Cierra otros menús antes de abrir el seleccionado
            menu.style.display = 'block';
        }
    }

    // Asignar eventos a los botones del menú
    utils.$$('.menu-item button').forEach(button => {
        const menuId = button.getAttribute('onclick').match(/toggleMenu\('(.+)'\)/)[1];
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que el clic cierre el menú
            toggleMenu(menuId);
        });
    });

    // Cerrar todos los menús si se hace clic fuera de ellos
    document.addEventListener('click', () => {
        closeAllMenus();
    });

    /**
     * SISTEMA DE RESERVAS
     * Funcionalidad:
     * - Apertura/cierre del modal de reservas
     * - Gestión de formulario de reservas
     * - Validación y confirmación de reservas
     */
    const reservationModal = utils.$("#reservationModal");
    const closeReservation = utils.$("#closeReservation");
    const reservationForm = utils.$("#reservationForm");
    let currentMovieTitle = '';

    function openReservationModal(movieTitle) {
        currentMovieTitle = movieTitle;
        utils.$("#reservationTitle").textContent = `Reservar: ${movieTitle}`;
        reservationModal.classList.add(CONFIG.modalClass);
    }

    // Evento para el botón de reservar en el modal de película
    utils.$(".btn-reservar").addEventListener('click', () => {
        const movieTitle = utils.$("#modalTitle").textContent;
        closeModalHandler(); // Cerrar modal de película
        openReservationModal(movieTitle);
    });

    // Manejar el envío del formulario
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            pelicula: currentMovieTitle,
            nombre: utils.$("#nombre").value,
            email: utils.$("#email").value,
            fecha: utils.$("#fecha").value,
            asientos: utils.$("#asientos").value
        };
        
        // Aquí puedes agregar la lógica para procesar la reserva
        console.log('Reserva realizada:', formData);
        
        // Mostrar confirmación
        alert('¡Reserva realizada con éxito! Te enviaremos un email con los detalles.');
        
        // Cerrar modal y limpiar formulario
        reservationModal.classList.remove(CONFIG.modalClass);
        reservationForm.reset();
    });

    // Cerrar modal de reserva
    closeReservation.addEventListener('click', () => {
        reservationModal.classList.remove(CONFIG.modalClass);
    });

    // Cerrar con Escape
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            reservationModal.classList.remove(CONFIG.modalClass);
        }
    });
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', init);

/**
 * GUÍA DE ESTUDIO:
 * 
 * 1. Arquitectura:
 *    - Patrón módulo para encapsulamiento
 *    - Separación de responsabilidades
 *    - Sistema de eventos centralizado
 * 
 * 2. Patrones de Diseño:
 *    - Singleton para configuración
 *    - Observer para eventos
 *    - Factory para creación de elementos
 * 
 * 3. Buenas Prácticas:
 *    - Código modular y reutilizable
 *    - Manejo de errores
 *    - Optimización de rendimiento
 *    - Código comentado y mantenible
 * 
 * 4. Puntos para Presentación:
 *    - Demostrar la interactividad
 *    - Explicar el flujo de datos
 *    - Mostrar la responsividad
 *    - Destacar características de UX
 */
