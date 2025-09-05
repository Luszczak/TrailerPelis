/**
 * ESTRUCTURA DEL CÓDIGO:
 * 1. Espera a que el DOM esté completamente cargado.
 * 2. Selección de Elementos del DOM.
 * 3. Datos de la Aplicación (películas).
 * 4. Funciones Principales (Modales, Menús, Personalización).
 * 5. Lógica de Eventos (Asignación de listeners).
 */

document.addEventListener('DOMContentLoaded', () => {

    // 2. SELECCIÓN DE ELEMENTOS DEL DOM
    const DOMElements = {
        movieModal: document.getElementById('movieModal'),
        modalTitle: document.getElementById('modalTitle'),
        modalTrailer: document.getElementById('modalTrailer'),
        modalDetails: document.getElementById('modalDetails'),
        reservationModal: document.getElementById('reservationModal'),
        reservationForm: document.getElementById('reservationForm'),
        reservationTitle: document.getElementById('reservationTitle'),
        colorPickerModal: document.getElementById('colorPickerModal'),
        body: document.body,
        buttons: document.querySelectorAll('button, .btn-detalles, .btn-reservar, .btn-confirmar')
    };

    // 3. DATOS DE LA APLICACIÓN
    const movies = {
        1: {
            title: "Minecraft la película",
            genre: "Aventura",
            duration: "1h 45m",
            rating: "PG",
            releaseDate: "2025", // Corregido
            cast: "Steve, Alex, Creeper",
            director: "Jared Hess",
            trailer: "https://www.youtube.com/embed/W_l7bXqWZyY",
            imdb: "https://www.imdb.com/title/tt3566834/"
        },
        2: {
            title: "Thunderbolts*",
            genre: "Acción",
            duration: "2h 6min",
            rating: "PG-13",
            releaseDate: "2025",
            cast: "Florence Pugh, Sebastian Stan, David Harbour",
            director: "Jake Schreier",
            trailer: "https://www.youtube.com/embed/N1GAypxl3XE",
            imdb: "https://www.imdb.com/title/tt20969586/"
        },
        3: {
            title: "Pecadores",
            genre: "Acción",
            duration: "2h 17min",
            rating: "B15",
            releaseDate: "2025",
            cast: "Miles Caton, Saul Williams, Andrene Ward-Hammond",
            director: "Ryan Coogler",
            trailer: "https://www.youtube.com/embed/bAkWFyEEYSI",
            imdb: "https://www.imdb.com/title/tt31193180/"
        },
        4: {
            title: "Kaiju N°8",
            genre: "Acción",
            duration: "2h 10m",
            rating: "PG-13",
            releaseDate: "2025",
            cast: "Kafka Hibino, Mina Ashiro",
            director: "Shinji Higuchi",
            trailer: "https://www.youtube.com/embed/n99eH2dePnA",
            imdb: "https://www.imdb.com/title/tt35636950/"
        },
    };

    let currentMovieTitle = '';

    // 4. FUNCIONES PRINCIPALES

    /**
     * Gestión de Modales
     */
    const toggleModal = (modalElement, show = true) => {
        if (show) {
            modalElement.classList.add('active');
        } else {
            modalElement.classList.remove('active');
            // Detener video si es el modal de película
            if (modalElement === DOMElements.movieModal) {
                DOMElements.modalTrailer.src = "";
            }
        }
    };

    const openMovieModal = (movieId) => {
        const movie = movies[movieId];
        if (!movie) return;

        DOMElements.modalTitle.textContent = movie.title;
        DOMElements.modalTrailer.src = movie.trailer;
        DOMElements.modalDetails.innerHTML = `
            <div class="detail-item"><i class="fas fa-film"></i><span>${movie.genre}</span></div>
            <div class="detail-item"><i class="fas fa-clock"></i><span>${movie.duration}</span></div>
            <div class="detail-item"><i class="fas fa-star"></i><span>${movie.rating}</span></div>
            <div class="detail-item"><i class="fas fa-calendar-alt"></i><span>${movie.releaseDate}</span></div>
            <div class="detail-item"><i class="fas fa-users"></i><span>${movie.cast}</span></div>
            <div class="detail-item"><i class="fas fa-video"></i><span>${movie.director}</span></div>
            <div class="detail-item"><a href="${movie.imdb}" target="_blank"><i class="fas fa-link"></i><span>Más en IMDb</span></a></div>
        `;
        toggleModal(DOMElements.movieModal, true);
    };

    const openReservationModal = (movieTitle) => {
        currentMovieTitle = movieTitle;
        DOMElements.reservationTitle.textContent = `Reservar: ${movieTitle}`;
        toggleModal(DOMElements.reservationModal, true);
    };
    
    /**
     * Gestión de Menús Desplegables
     */
    const toggleMenu = (menuId) => {
        const menu = document.getElementById(menuId);
        const isActive = menu.classList.contains('active');
        // Cerrar todos los menús antes de abrir uno nuevo
        document.querySelectorAll('.menu-dropdown.active').forEach(m => m.classList.remove('active'));
        if (!isActive) {
            menu.classList.add('active');
        }
    };

    /**
     * Gestión de Personalización de Colores
     */
    const applyCustomColors = () => {
        const fondo = document.getElementById('colorFondo').value;
        const texto = document.getElementById('colorTexto').value;
        const boton = document.getElementById('colorBoton').value;

        DOMElements.body.style.backgroundColor = fondo;
        DOMElements.body.style.color = texto;
        DOMElements.buttons.forEach(b => b.style.backgroundColor = boton);
    };

    const setPresetColors = (colors) => {
        document.getElementById('colorFondo').value = colors.fondo;
        document.getElementById('colorTexto').value = colors.texto;
        document.getElementById('colorBoton').value = colors.boton;
        applyCustomColors();
    };


    // 5. LÓGICA DE EVENTOS (EVENT LISTENERS)

    document.body.addEventListener('click', (e) => {
        // --- Delegación de eventos para botones dinámicos y modales ---

        // Botones "Ver Detalles"
        if (e.target.matches('.btn-detalles')) {
            openMovieModal(e.target.dataset.movieId);
        }

        // Botón "Reservar" dentro del modal de película
        if (e.target.matches('.btn-reservar')) {
            const movieTitle = DOMElements.modalTitle.textContent;
            toggleModal(DOMElements.movieModal, false);
            openReservationModal(movieTitle);
        }
        
        // Botones para abrir modales de información (Privacidad, Términos)
        if (e.target.dataset.modalId) {
             const modal = document.getElementById(e.target.dataset.modalId);
             if(modal) toggleModal(modal, true);
        }

        // Botones de cierre de modales
        if (e.target.matches('[data-close-button]') || e.target.classList.contains('modal')) {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) toggleModal(activeModal, false);
        }
        
        // --- Lógica para menús desplegables ---
        
        const menuButton = e.target.closest('[data-menu-id]');
        if (menuButton) {
            e.stopPropagation(); // Evitar que el clic se propague al body y cierre el menú
            toggleMenu(menuButton.dataset.menuId);
        } else if (!e.target.closest('.menu-dropdown')) {
            // Si el clic es fuera de un menú, cerrar todos
             document.querySelectorAll('.menu-dropdown.active').forEach(m => m.classList.remove('active'));
        }

        // --- Lógica para personalización ---
        
        // Botón "Personalizar"
        if (e.target.matches('#personalizarBtn')) {
            toggleModal(DOMElements.colorPickerModal, true);
        }
        
        // Botón "Aplicar" colores
        if (e.target.matches('#applyColorsBtn')) {
            applyCustomColors();
            toggleModal(DOMElements.colorPickerModal, false);
        }
        
        // Botones de colores preestablecidos
        if (e.target.matches('.btn-color-preset')) {
            const colors = JSON.parse(e.target.dataset.colors);
            setPresetColors(colors);
        }
    });

    // Envío del formulario de reserva
    DOMElements.reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            pelicula: currentMovieTitle,
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            fecha: document.getElementById('fecha').value,
            asientos: document.getElementById('asientos').value
        };
        
        alert(`¡Reserva para "${formData.pelicula}" realizada con éxito! Te enviaremos un email con los detalles.`);
        
        toggleModal(DOMElements.reservationModal, false);
        DOMElements.reservationForm.reset();
    });

    // Cerrar modales con la tecla "Escape"
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                toggleModal(activeModal, false);
            }
        }
    });
});