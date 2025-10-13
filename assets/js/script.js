document.addEventListener('DOMContentLoaded', () => {
    const themes = {
        'dark': { '--bg-main': '#000613', '--color-primary': '#37d0ff', '--color-primary-light': '#ff80ee', '--color-accent': '#00a7ff', '--bg-card': 'rgba(20, 20, 35, 0.6)', '--bg-modal': 'rgba(10, 10, 40, 0.9)', '--bg-overlay': 'rgba(1, 1, 19, 0.75)', '--text-primary': '#f8f9fa', '--text-secondary': '#e0e0e0' },
        'light': { '--bg-main': '#FFFFFF', '--color-primary': '#007BFF', '--color-primary-light': '#2196F3', '--color-accent': '#0056b3', '--bg-card': 'rgba(240, 240, 240, 0.8)', '--bg-modal': 'rgba(250, 250, 250, 0.9)', '--bg-overlay': 'rgba(230, 230, 230, 0.75)', '--text-primary': '#333333', '--text-secondary': '#555555' },
        'soft': { '--bg-main': '#F5EFE6', '--color-primary': '#B4A7ED', '--color-primary-light': '#E0BBE4', '--color-accent': '#D797D7', '--bg-card': 'rgba(220, 215, 205, 0.8)', '--bg-modal': 'rgba(240, 235, 230, 0.9)', '--bg-overlay': 'rgba(220, 215, 205, 0.75)', '--text-primary': '#655D8A', '--text-secondary': '#8B81A7' },
        'gamer': { '--bg-main': '#1E1E2D', '--color-primary': '#FF1D58', '--color-primary-light': '#A40F27', '--color-accent': '#FF5A90', '--bg-card': 'rgba(30, 30, 45, 0.8)', '--bg-modal': 'rgba(25, 25, 40, 0.9)', '--bg-overlay': 'rgba(10, 10, 20, 0.75)', '--text-primary': '#D8D4F2', '--text-secondary': '#A098C2' },
        'futuristic': { '--bg-main': '#0A1828', '--color-primary': '#58C9B9', '--color-primary-light': '#C0FDFB', '--color-accent': '#3A8E7D', '--bg-card': 'rgba(20, 35, 45, 0.8)', '--bg-modal': 'rgba(15, 25, 35, 0.9)', '--bg-overlay': 'rgba(5, 10, 15, 0.75)', '--text-primary': '#C0FDFB', '--text-secondary': '#A0C0B8' }
    };

    const carteleraData = [
        { id: '1', title: 'Minecraft', poster: 'https://es.web.img3.acsta.net/img/6d/7e/6d7ebaf55a56605c074747f74824fb99.jpg', description: 'Bienvenido al mundo de Minecraft, donde todo es posible. Una aventura épica llena de bloques, creatividad y diversión sin límites.', genre: 'Aventura', duration: '1h 45m', rating: 'PG', releaseDate: '2025', cast: 'Steve, Alex, Creeper', director: 'Jared Hess', trailer: 'https://www.youtube.com/embed/W_l7bXqWZyY', imdb: 'https://www.imdb.com/title/tt3566834/' },
        { id: '2', title: 'Thunderbolts*', poster: 'https://hips.hearstapps.com/hmg-prod/images/thunderbolts-poster-66f184dbe403e.jpg', description: 'Un grupo de supervillanos son reclutados para realizar misiones para el gobierno en esta explosiva aventura del MCU.', genre: 'Acción', duration: '2h 6min', rating: 'PG-13', releaseDate: '2025', cast: 'Florence Pugh, Sebastian Stan, David Harbour', director: 'Jake Schreier', trailer: 'https://www.youtube.com/embed/N1GAypxl3XE', imdb: 'https://www.imdb.com/title/tt20969586/' },
        { id: '3', title: 'Pecadores', poster: 'https://m.media-amazon.com/images/M/MV5BMWY3MzM1Y2YtZWIzOS00ZWJiLWI1YzYtZDY5MzFkY2I4ZjY5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', description: 'Dos hermanos enfrentan un mal sobrenatural al regresar a su ciudad natal en este thriller lleno de suspense.', genre: 'Acción', duration: '2h 17min', rating: 'B15', releaseDate: '2025', cast: 'Miles Caton, Saul Williams, Andrene Ward-Hammond', director: 'Ryan Coogler', trailer: 'https://www.youtube.com/embed/bAkWFyEEYSI', imdb: 'https://www.imdb.com/title/tt31193180/' },
        { id: '4', title: 'Kaiju Nº8', poster: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQpCnhGo3oDx9spX1TDLgOI17xVOUVzFifqfymnHZLwr_q-0OEU', description: 'Un hombre convertido en monstruo decide perseguir su sueño de infancia contra todo pronóstico en esta épica historia.', genre: 'Acción', duration: '2h 10m', rating: 'PG-13', releaseDate: '2025', cast: 'Kafka Hibino, Mina Ashiro', director: 'Shinji Higuchi', trailer: 'https://www.youtube.com/embed/n99eH2dePnA', imdb: 'https://www.imdb.com/title/tt35636950/' }
    ];

    const proximosEstrenos = [
        { id: '5', title: 'Wicked', poster: 'https://es.web.img3.acsta.net/pictures/24/05/15/15/30/1458992.jpg', description: 'Una historia fantástica sobre el origen de las brujas de Oz.', imdb: 'https://www.imdb.com/title/tt12444318/' },
        { id: '6', title: 'Deadpool y Wolverine', poster: 'https://hips.hearstapps.com/hmg-prod/images/deadpool-3-poster-65b169b165243.jpg', description: 'El mercenario bocazas regresa en una nueva aventura con un viejo amigo.', imdb: 'https://www.imdb.com/title/tt6263592/' },
        { id: '7', title: 'Joker 2', poster: 'https://hips.hearstapps.com/hmg-prod/images/joker-folie-a-deux-poster-65d1dd3244243.jpg', description: 'El regreso del Príncipe Payaso del Crimen en un musical psicológico.', imdb: 'https://www.imdb.com/title/tt11315808/' },
        { id: '8', title: 'Gladiator 2', poster: 'https://m.media-amazon.com/images/M/MV5BN2EyNDQ2MTEtYjAyOS00NjI0LTgxMTYtZDcxOTUyNDQ3Y2I2XkEyXkFqcGdeQXVyMjQ4MTk2Mzk@._V1_.jpg', description: 'Una nueva epopeya en el Coliseo con la secuela del clásico de Ridley Scott.', imdb: 'https://www.imdb.com/title/tt6121404/' },
    ];

    const movieModal = document.getElementById('movieModal');
    const reservationModal = document.getElementById('reservationModal');
    const confirmationModal = document.getElementById('confirmationModal');
    const personalizeModal = document.getElementById('personalizeModal');
    const messageModal = document.getElementById('messageModal');
    const seatingChart = document.getElementById('seatingChart');
    const confirmReservationBtn = document.getElementById('confirmReservationBtn');
    const downloadTicketBtn = document.getElementById('downloadTicketBtn');
    const printTicketBtn = document.getElementById('printTicketBtn');
    const selectedSeatsCountInput = document.getElementById('selectedSeatsCount');
    const reservationDateSelect = document.getElementById('fecha');
    const modals = document.querySelectorAll('.modal');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    let currentMovie;
    let selectedSeats = [];

    function toggleModal(modalId, show = true, message = '', title = '') {
        const modal = document.getElementById(modalId);
        if (modal) {
            if (show) {
                if (modalId === 'messageModal') {
                    document.getElementById('messageTitle').textContent = title || 'Advertencia';
                    document.getElementById('messageText').textContent = message;
                }
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
                if (modalId === 'movieModal') {
                    document.getElementById('modalTrailer').src = "";
                }
            }
        }
    }

    function generateCarousel() {
        const carouselTrack = document.getElementById('carouselTrack');
        const indicatorsContainer = document.getElementById('indicators');
        carouselTrack.innerHTML = '';
        indicatorsContainer.innerHTML = '';

        carteleraData.forEach((movie, index) => {
            const slide = document.createElement('div');
            slide.classList.add('movie-slide');
            slide.dataset.movieId = movie.id;
            slide.innerHTML = `
                        <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
                        <div class="movie-info">
                            <h2 class="movie-title">${movie.title}</h2>
                            <p class="movie-description">${movie.description}</p>
                            <div class="movie-meta">
                                <div class="meta-item"><i class="fas fa-film"></i><span>${movie.genre}</span></div>
                                <div class="meta-item"><i class="fas fa-clock"></i><span>${movie.duration}</span></div>
                                <div class="meta-item"><i class="fas fa-star"></i><span>${movie.rating}</span></div>
                            </div>
                            <button class="btn-primary" data-movie-id="${movie.id}">
                                <i class="fas fa-play"></i>
                                Ver Detalles
                            </button>
                        </div>
                    `;
            carouselTrack.appendChild(slide);

            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            indicator.dataset.slide = index;
            if (index === 0) indicator.classList.add('active');
            indicatorsContainer.appendChild(indicator);
        });
    }

    function generateUpcomingMovies() {
        const grid = document.getElementById('upcoming-movies-grid');
        grid.innerHTML = '';

        proximosEstrenos.forEach(movie => {
            const card = document.createElement('a');
            card.classList.add('movie-card');
            card.href = movie.imdb;
            card.target = "_blank";
            card.innerHTML = `
                        <img src="${movie.poster}" alt="${movie.title}">
                        <div class="movie-card-info">
                            <h3>${movie.title}</h3>
                            <p>${movie.description}</p>
                        </div>
                    `;
            grid.appendChild(card);
        });
    }

    // Carrusel logic
    let currentSlide = 0;
    let slides, indicators, carouselTrack;

    function updateCarousel() {
        if (!slides || !carouselTrack) return;
        const offset = -currentSlide * 100;
        carouselTrack.style.transform = `translateX(${offset}%)`;
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
        const currentMovieData = carteleraData[currentSlide];
        document.getElementById('main-backdrop').style.backgroundImage = `url('${currentMovieData.backdrop}')`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateCarousel();
    }

    function generateReservationDates() {
        reservationDateSelect.innerHTML = '';
        const today = new Date();
        const options = { weekday: 'long', month: 'short', day: 'numeric' };
        const daysOfWeek = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const formattedDate = daysOfWeek[date.getDay()] + ', ' + date.toLocaleDateString('es-ES', options);
            const option = document.createElement('option');
            option.value = date.toISOString().split('T')[0];
            option.textContent = formattedDate;
            reservationDateSelect.appendChild(option);
        }
    }

    // Seat selection
    function generateSeatingChart() {
        seatingChart.innerHTML = '';
        selectedSeats = [];
        updateSelectedSeatsDisplay();
        const seatsLayout = [
            [1, 1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 1, 1, 1, 1, 1, 0, 0]
        ];
        seatsLayout.forEach((row, rowIndex) => {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('seating-chart-row');
            row.forEach((seatStatus, seatIndex) => {
                const seat = document.createElement('div');
                seat.classList.add('seat');
                seat.textContent = String.fromCharCode(65 + rowIndex) + (seatIndex + 1);
                if (seatStatus === 0) {
                    seat.classList.add('unavailable');
                } else {
                    seat.classList.add('available');
                    seat.addEventListener('click', () => {
                        if (seat.classList.contains('selected')) {
                            seat.classList.remove('selected');
                            selectedSeats = selectedSeats.filter(s => s !== seat.textContent);
                        } else if (selectedSeats.length < 10) { // Max 10 seats
                            seat.classList.add('selected');
                            selectedSeats.push(seat.textContent);
                        }
                        updateSelectedSeatsDisplay();
                    });
                }
                rowDiv.appendChild(seat);
            });
            seatingChart.appendChild(rowDiv);
        });
    }

    function updateSelectedSeatsDisplay() {
        selectedSeatsCountInput.value = selectedSeats.length;
    }

    // Theme personalization
    function applyTheme(themeName) {
        if (themeName === 'random') {
            const themeNames = Object.keys(themes);
            themeName = themeNames[Math.floor(Math.random() * themeNames.length)];
        }
        const theme = themes[themeName];
        for (const [key, value] of Object.entries(theme)) {
            document.documentElement.style.setProperty(key, value);
        }
        document.body.className = `theme-${themeName}`;
        localStorage.setItem('selectedTheme', themeName);
    }

    function loadThemeFromLocalStorage() {
        const savedTheme = localStorage.getItem('selectedTheme');
        if (savedTheme) {
            applyTheme(savedTheme);
        } else {
            applyTheme('dark');
        }
    }

    // Main logic
    function init() {
        generateCarousel();
        generateUpcomingMovies();
        loadThemeFromLocalStorage();

        slides = document.querySelectorAll('.movie-slide');
        indicators = document.querySelectorAll('.indicator');
        carouselTrack = document.getElementById('carouselTrack');
        if (slides.length > 0) {
            const firstMovieId = slides[0].dataset.movieId;
            const firstMovieData = carteleraData.find(m => m.id === firstMovieId);
            document.getElementById('main-backdrop').style.backgroundImage = `url('${firstMovieData.backdrop}')`;
        }

        document.getElementById('nextBtn').addEventListener('click', nextSlide);
        document.getElementById('prevBtn').addEventListener('click', prevSlide);
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => goToSlide(index));
        });
        setInterval(nextSlide, 5000);
    }

    function handlePrint() {
        const ticketHTML = document.getElementById('ticket').outerHTML;
        const printWindow = window.open('', '', 'height=600,width=800');

        printWindow.document.write('<html><head><title>Ticket de Reserva</title>');
        printWindow.document.write('<link rel="preconnect" href="https://fonts.googleapis.com">');
        printWindow.document.write('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>');
        printWindow.document.write('<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">');
        printWindow.document.write('<style>');
        printWindow.document.write(`
                    body { font-family: 'Inter', sans-serif; margin: 2rem; }
                    .ticket-professional { border: 2px dashed #000; padding: 3rem; width: 100%; max-width: 50rem; margin: 0 auto; background: #fff; color: #000; }
                    .ticket-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 1rem; border-bottom: 1px solid #ccc; }
                    .ticket-header h4 { font-size: 2rem; color: #007BFF; }
                    .ticket-header span { font-size: 1.2rem; font-weight: bold; color: #555; }
                    .ticket-body { padding-top: 1rem; text-align: left; }
                    .ticket-body p { margin: 0.5rem 0; font-size: 1.6rem; }
                    .ticket-body b { font-weight: 700; color: #000; }
                    .ticket-footer { margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #ccc; text-align: center; font-style: italic; font-size: 1.2rem; color: #888; }
                `);
        printWindow.document.write('</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(ticketHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    }


    // Event listeners
    document.body.addEventListener('click', (e) => {
        // Abrir modales generales
        if (e.target.matches('[data-modal-id]') || e.target.closest('[data-modal-id]')) {
            const modalId = e.target.dataset.modalId || e.target.closest('[data-modal-id]').dataset.modalId;
            toggleModal(modalId, true);
            return;
        }

        // Cerrar modales
        if (e.target.matches('[data-close-button]')) {
            const modal = e.target.closest('.modal');
            if (modal) {
                toggleModal(modal.id, false);
            }
            return;
        }

        // Abrir modal de personalización
        if (e.target.matches('#personalizarBtn') || e.target.matches('#personalizarBtnMobile')) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            toggleModal('personalizeModal', true);
            return;
        }

        // Aplicar tema
        if (e.target.matches('.btn-theme-preset')) {
            applyTheme(e.target.dataset.theme);
            return;
        }

        // Abrir modal de película
        const movieElement = e.target.closest('.movie-slide');
        const movieDetailBtn = e.target.closest('.btn-primary[data-movie-id]');
        if (movieElement || movieDetailBtn) {
            const movieId = movieElement ? movieElement.dataset.movieId : movieDetailBtn.dataset.movieId;
            currentMovie = carteleraData.find(m => m.id === movieId);
            if (currentMovie) {
                document.getElementById('modalTitle').textContent = currentMovie.title;
                document.getElementById('modalTrailer').src = currentMovie.trailer;
                document.getElementById('modalDetails').innerHTML = `
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr)); gap: 2rem; margin-top: 2rem;">
                                <div class="meta-item"><i class="fas fa-film"></i><span>${currentMovie.genre}</span></div>
                                <div class="meta-item"><i class="fas fa-clock"></i><span>${currentMovie.duration}</span></div>
                                <div class="meta-item"><i class="fas fa-star"></i><span>${currentMovie.rating}</span></div>
                                <div class="meta-item"><i class="fas fa-calendar-alt"></i><span>${currentMovie.releaseDate}</span></div>
                                <div class="meta-item"><i class="fas fa-users"></i><span>${currentMovie.cast}</span></div>
                                <div class="meta-item"><i class="fas fa-video"></i><span>${currentMovie.director}</span></div>
                                <div class="meta-item"><a href="${currentMovie.imdb}" target="_blank" style="display: flex; align-items: center; gap: 1rem; color: var(--color-primary); text-decoration: none;"><i class="fas fa-link"></i><span>Más en IMDb</span></a></div>
                            </div>
                        `;
                toggleModal('movieModal', true);
            }
            return;
        }
    });

    // Lógica para el botón de reservar dentro del modal de película
    document.querySelector('.btn-reservar').addEventListener('click', () => {
        if (currentMovie) {
            document.getElementById('reservationTitle').textContent = `Reservar: ${currentMovie.title}`;
            generateSeatingChart();
            generateReservationDates();
            toggleModal('movieModal', false);
            toggleModal('reservationModal', true);
        }
    });

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    document.getElementById('reservationForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const nombreInput = document.getElementById('nombre');
        const emailInput = document.getElementById('email');

        if (selectedSeats.length === 0) {
            toggleModal('messageModal', true, 'Por favor, selecciona al menos un asiento.', 'Error de Reserva');
            return;
        }

        if (!nombreInput.checkValidity() || !emailInput.checkValidity()) {
            toggleModal('messageModal', true, 'Por favor, rellena todos los campos del formulario correctamente.', 'Error de Formulario');
            return;
        }

        const reservationId = Math.random().toString(36).substring(2, 10).toUpperCase();

        const formData = {
            pelicula: currentMovie.title,
            nombre: nombreInput.value,
            email: emailInput.value,
            fecha: document.getElementById('fecha').value,
            asientos: selectedSeats.join(', '),
            id: reservationId
        };

        // Lógica de ticket mejorada
        document.getElementById('ticketInfo').innerHTML = `
                    <div class="ticket-header">
                        <h4>Ticket de Reserva</h4>
                        <span>ID: ${formData.id}</span>
                    </div>
                    <div class="ticket-body">
                        <p><b>Película:</b> ${formData.pelicula}</p>
                        <p><b>Nombre:</b> ${formData.nombre}</p>
                        <p><b>Asientos:</b> ${formData.asientos}</p>
                        <p><b>Fecha:</b> ${new Date(formData.fecha).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div class="ticket-footer">
                        <p>Este ticket es intransferible y no reembolsable. Por favor, presenta este ticket en la entrada.</p>
                    </div>
                `;

        toggleModal('reservationModal', false);
        toggleModal('confirmationModal', true);
    });

    downloadTicketBtn.addEventListener('click', () => {
        const ticketData = document.getElementById('ticketInfo').textContent + '\n\n¡Gracias por tu compra! Disfruta la función.';
        const blob = new Blob([ticketData], { type: 'text/plain' });
        const a = document.createElement('a');
        a.download = 'ticket-reserva.txt';
        a.href = window.URL.createObjectURL(blob);
        a.click();
        window.URL.revokeObjectURL(a.href);
    });

    printTicketBtn.addEventListener('click', handlePrint);

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                toggleModal(modal.id, false);
            }
        });
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                toggleModal(activeModal.id, false);
            }
        }
    });
    
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });

    init();
});