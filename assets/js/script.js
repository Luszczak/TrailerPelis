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
                { id: '5', title: 'Wicked', poster: 'https://www.impawards.com/2024/posters/wicked_ver2.jpg', description: 'Una historia fantástica sobre el origen de las brujas de Oz.', imdb: 'https://www.imdb.com/title/tt12444318/' },
                        { id: '6', title: 'Deadpool y Wolverine', poster: 'https://www.impawards.com/2024/posters/deadpool_and_wolverine.jpg', description: 'El mercenario bocazas regresa en una nueva aventura con un viejo amigo.', imdb: 'https://www.imdb.com/title/tt6263592/' },
                                { id: '7', title: 'Joker 2', poster: 'https://www.impawards.com/2024/posters/joker_folie_a_deux.jpg', description: 'El regreso del Príncipe Payaso del Crimen en un musical psicológico.', imdb: 'https://www.imdb.com/title/tt11315808/' },
                                        { id: '8', title: 'Gladiator 2', poster: 'https://www.impawards.com/2024/posters/gladiator_ii.jpg', description: 'Una nueva epopeya en el Coliseo con la secuela del clásico de Ridley Scott.', imdb: 'https://www.imdb.com/title/tt6121404/' },
                                            ];


    const PRICE_PER_SEAT = 8000;
    let pendingReservationData = {};
    let currentMovie;
    let selectedSeats = [];

    // === INICIO DE FUNCIONES DE PAGO ===
    const digits = s => s.replace(/\D/g, '');

    function luhnValid(number) {
        const arr = digits(number).split('').reverse().map(n => parseInt(n, 10));
        if (!arr.length) return false;
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            let val = arr[i];
            if (i % 2 === 1) {
                val *= 2;
                if (val > 9) val -= 9;
            }
            sum += val;
        }
        return sum % 10 === 0;
    }

    function expValid(value) {
        if (!/^\d{2}\/\d{2}$/.test(value)) return false;
        const [mm, yy] = value.split('/').map(v => parseInt(v, 10));
        if (mm < 1 || mm > 12) return false;
        const now = new Date();
        const year = now.getFullYear() % 100;
        const month = now.getMonth() + 1;
        if (yy < year) return false;
        if (yy === year && mm < month) return false;
        return true;
    }
    // === FIN DE FUNCIONES DE PAGO ===


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

    // Lógica del carrusel
    let currentSlide = 0;
    function updateCarousel() {
        const slides = document.querySelectorAll('.movie-slide');
        const indicators = document.querySelectorAll('.indicator');
        const carouselTrack = document.getElementById('carouselTrack');
        if (!slides || !carouselTrack || slides.length === 0) return;

        const offset = -currentSlide * 100;
        carouselTrack.style.transform = `translateX(${offset}%)`;
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
        const currentMovieData = carteleraData[currentSlide];
        document.getElementById('main-backdrop').style.backgroundImage = `url('${currentMovieData.poster}')`;
    }

    function setupCarousel() {
        const slides = document.querySelectorAll('.movie-slide');
        const indicators = document.querySelectorAll('.indicator');

        document.getElementById('nextBtn').addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateCarousel();
        });

        document.getElementById('prevBtn').addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateCarousel();
        });

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                updateCarousel();
            });
        });

        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateCarousel();
        }, 5000);
        
        updateCarousel();
    }

    function generateReservationDates() {
        const reservationDateSelect = document.getElementById('fecha');
        reservationDateSelect.innerHTML = '';
        const today = new Date();
        const options = { weekday: 'long', month: 'short', day: 'numeric' };

        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const formattedDate = date.toLocaleDateString('es-ES', options).replace(/^\w/, c => c.toUpperCase());
            const option = document.createElement('option');
            option.value = date.toISOString().split('T')[0];
            option.textContent = formattedDate;
            reservationDateSelect.appendChild(option);
        }
    }

    function generateSeatingChart() {
        const seatingChart = document.getElementById('seatingChart');
        const selectedSeatsCountInput = document.getElementById('selectedSeatsCount');
        seatingChart.innerHTML = '';
        selectedSeats = [];
        selectedSeatsCountInput.value = 0;

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
                const seatId = String.fromCharCode(65 + rowIndex) + (seatIndex + 1);
                seat.textContent = seatId;

                if (seatStatus === 0 || Math.random() < 0.2) { // Some random unavailable seats
                    seat.classList.add('unavailable');
                } else {
                    seat.classList.add('available');
                    seat.addEventListener('click', () => {
                        if (seat.classList.contains('selected')) {
                            seat.classList.remove('selected');
                            selectedSeats = selectedSeats.filter(s => s !== seatId);
                        } else if (selectedSeats.length < 10) {
                            seat.classList.add('selected');
                            selectedSeats.push(seatId);
                        } else {
                            toggleModal('messageModal', true, 'Puedes seleccionar un máximo de 10 asientos por reserva.', 'Límite alcanzado');
                        }
                        selectedSeatsCountInput.value = selectedSeats.length;
                    });
                }
                rowDiv.appendChild(seat);
            });
            seatingChart.appendChild(rowDiv);
        });
    }

    // Lógica de personalización
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
        applyTheme(savedTheme || 'dark');
    }

    function handlePrint() {
        const ticketHTML = document.getElementById('ticket').innerHTML;
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Ticket de Reserva</title>');
        printWindow.document.write('<link rel="stylesheet" href="assets/css/styles.css">'); // Use existing styles
        printWindow.document.write('<style>body { background: #fff; } .ticket-professional { color: #000 !important; border-color: #000 !important; } .ticket-professional * { color: #000 !important; } </style>');
        printWindow.document.write('</head><body onload="window.print(); window.close();">');
        printWindow.document.write(`<div class="ticket ticket-professional">${ticketHTML}</div>`);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
    }


    // === EVENT LISTENERS PRINCIPALES ===

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

        pendingReservationData = {
            pelicula: currentMovie.title,
            nombre: nombreInput.value,
            email: emailInput.value,
            fecha: document.getElementById('fecha').value,
            asientos: selectedSeats.join(', '),
            id: Math.random().toString(36).substring(2, 10).toUpperCase()
        };

        const totalAmount = selectedSeats.length * PRICE_PER_SEAT;
        document.getElementById('paymentAmount').value = `ARS $${totalAmount.toLocaleString('es-AR')}`;

        toggleModal('reservationModal', false);
        toggleModal('paymentModal', true);
    });

    // --- Lógica del formulario de pago ---
    const paymentForm = document.getElementById('paymentForm');
    const payBtn = document.getElementById('payBtn');
    const paymentErrors = document.getElementById('paymentErrors');

    document.getElementById('cardNumber').addEventListener('input', (e) => {
        const val = digits(e.target.value).slice(0, 16);
        const groups = val.match(/.{1,4}/g);
        e.target.value = groups ? groups.join(' ') : '';
    });

    document.getElementById('exp').addEventListener('input', (e) => {
        const v = digits(e.target.value).slice(0, 4);
        e.target.value = v.length >= 3 ? `${v.slice(0, 2)}/${v.slice(2)}` : v;
    });

    paymentForm.addEventListener('submit', (ev) => {
        ev.preventDefault();
        paymentErrors.textContent = '';
        const name = document.getElementById('cardName').value.trim();
        const card = document.getElementById('cardNumber').value;
        const exp = document.getElementById('exp').value;
        const cvv = document.getElementById('cvv').value.trim();

        const problems = [];
        if (!name) problems.push('Nombre en la tarjeta requerido.');
        if (!luhnValid(card)) problems.push('Número de tarjeta inválido.');
        if (!expValid(exp)) problems.push('Fecha de expiración inválida o ya vencida.');
        if (!/^\d{3,4}$/.test(cvv)) problems.push('CVV inválido.');

        if (problems.length) {
            paymentErrors.textContent = problems.join(' ');
            return;
        }

        payBtn.disabled = true;
        payBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';

        setTimeout(() => {
            const success = Math.random() > 0.12; // 88% success rate

            if (success) {
                document.getElementById('ticketInfo').innerHTML = `
                    <div class="ticket-header">
                        <h4>Ticket de Reserva</h4>
                        <span>ID: ${pendingReservationData.id}</span>
                    </div>
                    <div class="ticket-body">
                        <p><b>Película:</b> ${pendingReservationData.pelicula}</p>
                        <p><b>Nombre:</b> ${pendingReservationData.nombre}</p>
                        <p><b>Asientos:</b> ${pendingReservationData.asientos}</p>
                        <p><b>Fecha:</b> ${new Date(pendingReservationData.fecha + 'T00:00:00').toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div class="ticket-footer">
                        <p>Este ticket es intransferible. Presenta este ticket en la entrada.</p>
                    </div>
                `;
                toggleModal('paymentModal', false);
                toggleModal('confirmationModal', true);
                paymentForm.reset();
            } else {
                paymentErrors.textContent = 'Pago rechazado. Verifique sus datos o intente con otra tarjeta.';
            }

            payBtn.disabled = false;
            payBtn.innerHTML = '<i class="fas fa-credit-card"></i> Pagar';
        }, 1500);
    });

    // --- Otros Listeners ---
    document.querySelector('.btn-reservar').addEventListener('click', () => {
        if (currentMovie) {
            document.getElementById('reservationTitle').textContent = `Reservar: ${currentMovie.title}`;
            generateSeatingChart();
            generateReservationDates();
            toggleModal('movieModal', false);
            toggleModal('reservationModal', true);
        }
    });

    document.getElementById('hamburger').addEventListener('click', (e) => {
        e.currentTarget.classList.toggle('active');
        document.getElementById('mobileMenu').classList.toggle('active');
    });

    document.getElementById('downloadTicketBtn').addEventListener('click', () => {
        const ticketData = document.getElementById('ticketInfo').innerText;
        const blob = new Blob([ticketData], { type: 'text/plain' });
        const a = document.createElement('a');
        a.download = 'ticket-reserva.txt';
        a.href = window.URL.createObjectURL(blob);
        a.click();
        window.URL.revokeObjectURL(a.href);
    });

    document.getElementById('printTicketBtn').addEventListener('click', handlePrint);

    document.body.addEventListener('click', (e) => {
        if (e.target.matches('[data-modal-id]') || e.target.closest('[data-modal-id]')) {
            const modalId = e.target.dataset.modalId || e.target.closest('[data-modal-id]').dataset.modalId;
            toggleModal(modalId, true);
        } else if (e.target.matches('[data-close-button]')) {
            const modal = e.target.closest('.modal');
            if (modal) toggleModal(modal.id, false);
        } else if (e.target.matches('#personalizarBtn, #personalizarBtnMobile')) {
            document.getElementById('hamburger').classList.remove('active');
            document.getElementById('mobileMenu').classList.remove('active');
            toggleModal('personalizeModal', true);
        } else if (e.target.matches('.btn-theme-preset')) {
            applyTheme(e.target.dataset.theme);
        } else {
            const movieElement = e.target.closest('.movie-slide, .btn-primary[data-movie-id]');
            if (movieElement) {
                const movieId = movieElement.dataset.movieId;
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
            }
        }
    });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) toggleModal(modal.id, false);
        });
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) toggleModal(activeModal.id, false);
        }
    });

    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        header.style.transform = (scrollTop > lastScrollTop && scrollTop > 100) ? 'translateY(-100%)' : 'translateY(0)';
        lastScrollTop = scrollTop;
    });

    // Función de inicialización
    function init() {
        generateCarousel();
        generateUpcomingMovies();
        loadThemeFromLocalStorage();
        setupCarousel();
    }

    init();
});