document.addEventListener('DOMContentLoaded', () => {
    // Referencias a las bibliotecas de descarga
    const { jsPDF } = window.jspdf;

    const themes = {
        'dark': { '--bg-main': '#000613', '--color-primary': '#37d0ff', '--color-primary-light': '#ff80ee', '--color-accent': '#00a7ff', '--bg-card': 'rgba(20, 20, 35, 0.6)', '--bg-modal': 'rgba(10, 10, 40, 0.9)', '--bg-overlay': 'rgba(1, 1, 19, 0.75)', '--text-primary': '#f8f9fa', '--text-secondary': '#e0e0e0' },
        'light': { '--bg-main': '#FFFFFF', '--color-primary': '#007BFF', '--color-primary-light': '#2196F3', '--color-accent': '#0056b3', '--bg-card': 'rgba(240, 240, 240, 0.8)', '--bg-modal': 'rgba(250, 250, 250, 0.9)', '--bg-overlay': 'rgba(230, 230, 230, 0.75)', '--text-primary': '#333333', '--text-secondary': '#555555' },
        'soft': { '--bg-main': '#F5EFE6', '--color-primary': '#B4A7ED', '--color-primary-light': '#E0BBE4', '--color-accent': '#D797D7', '--bg-card': 'rgba(220, 215, 205, 0.8)', '--bg-modal': 'rgba(240, 235, 230, 0.9)', '--bg-overlay': 'rgba(220, 215, 205, 0.75)', '--text-primary': '#655D8A', '--text-secondary': '#8B81A7' },
        'gamer': { '--bg-main': '#1E1E2D', '--color-primary': '#FF1D58', '--color-primary-light': '#A40F27', '--color-accent': '#FF5A90', '--bg-card': 'rgba(30, 30, 45, 0.8)', '--bg-modal': 'rgba(25, 25, 40, 0.9)', '--bg-overlay': 'rgba(10, 10, 20, 0.75)', '--text-primary': '#D8D4F2', '--text-secondary': '#A098C2' },
        'futuristic': { '--bg-main': '#0A1828', '--color-primary': '#58C9B9', '--color-primary-light': '#C0FDFB', '--color-accent': '#3A8E7D', '--bg-card': 'rgba(20, 35, 45, 0.8)', '--bg-modal': 'rgba(15, 25, 35, 0.9)', '--bg-overlay': 'rgba(5, 10, 15, 0.75)', '--text-primary': '#C0FDFB', '--text-secondary': '#A0C0B8' }
    };

    const carteleraData = [
         { id: '1', title: 'Tron: Ares', poster: 'https://m.media-amazon.com/images/M/MV5BMmRlMzYzZDMtYTQ0Yy00YTJiLWFiMTItYWIzODdlZTc3ZTU4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', description: 'Un programa altamente sofisticado, Ares, es enviado desde el mundo digital al mundo real en una peligrosa misión para cambiar la humanidad.', genre: 'Ciencia ficción', duration: '1h 59m', rating: 'PG-13', releaseDate: '2025', cast: 'Jared Leto, Greta Lee, Evan Peters, Jeff Bridges', director: 'Joachim Rønning', trailer: 'https://imdb-video.media-imdb.com/vi2869938201/1434659607842-pgv4ql-1759428213800.mp4?Expires=1761607365&Signature=qEXOdJt9H-ccQ~kS-EMyjrBVZ139VTr1wz-vLJ9zsbXxNdqtM9uK24tlHkIv6hT-D14-OxAx0tNXcmlQyuorkx-qOmyc2pynsdfO7~ac1XPyVJoSvGtCZzhFAQs6Wk1RQeQ1mwAsPHEali3Q9NuzW0tNNRgAN3LZg-baA9-7E2z2qngJ539E10rvou8hvhrnoa-NhgxMTbRyoyBfSXHMiJkRfPWcOmLXZc3OMBFM5eDsOsnogyhyFCSIeOaRVMnIi2jQTBVOLKv3svo5auqrav0R3zF8yiOK0ecFvUgvYfQmzG~WOwVS9R1fn6cQmdyhbOoUz8SITFePXrs7sRYUcA__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA', imdb: 'https://www.imdb.com/es-es/title/tt6604188/' },
         { id: '2', title: 'Chainsaw Man - La película: El arco de Reze', poster: 'https://m.media-amazon.com/images/M/MV5BYmUzMTk5MGQtZDg5Yy00MWEzLWIzNjUtNWIyMjFjODhiYjcyXkEyXkFqcGc@._V1_.jpg', description: 'Denji conoce a una misteriosa chica llamada Reze, enfrentándose a su batalla más mortífera hasta ahora.', genre: 'Anime', duration: '1h 40m', rating: 'PG-13', releaseDate: '2025', cast: 'Kikunosuke Toya, Reina Ueda, Shiori Izawa', director: 'Tatsuya Yoshihara', trailer: 'https://imdb-video.media-imdb.com/vi2652293145/1434659607842-pgv4ql-1757514041086.mp4?Expires=1761606896&Signature=mCot~R~kt-NjfypwY5qagxEsd-7EhTW0YLM8J0H3QDXl1FTh43iyjU9kkWqIu~uzWGkbiGGbNR2jzhyBSEEjq0QS0LsjPmtY6HktmccHl~TwTtDeBbeEKEyWeO-DfRMU17ND4DsjLrjxBRhlK3DaDTEpZFqpYq-5zgjkSsmLZ2G09O2izrqOQM5Qa4Rlx2UGZebk7Zesc~UIp3w3OhemUD8HjtSxSrxWcznCGi~X7Jl7p2MHCa83o2MSm~i4qC6nTBeRh2xbnEd0fiif7oj-Z0tmb~3htJmgy0TSwYZeN4CU6bF4Ka5wQbCkoitr0KmJT3fWXymUfjwxLnF3rpZYZg__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA', imdb: 'https.imdb.com/es/title/tt30472557' },
         { id: '3', title: 'Black Phone 2', poster: 'https://m.media-amazon.com/images/M/MV5BMTVjMzNmZGYtOWU5NS00NDYzLThhZTktZGNlODIwYWVhMDRmXkEyXkFqcGc@._V1_.jpg', description: 'El Captor regresa desde la tumba para vengarse de Finney.', genre: 'Terror', duration: '1h 54m', rating: 'R', releaseDate: '2025', cast: 'Ethan Hawke, Mason Thames, Madeleine McGraw, Jeremy Davies', director: 'Scott Derrickson', trailer: 'https://imdb-video.media-imdb.com/vi823183385/1434659607842-pgv4ql-1757000452573.mp4?Expires=1761607447&Signature=jj-Iikb8n5E~SGfTkfXPXcssjS-stZe~fXK0V6RKX5oGXpBaYPt4wiAgMymSl1wQRieJEwVf5RF04J2Qi1xMycWC9v5-hQjjQopqRtyRrFZRsHnYqZ~pAiSmijnIZKvYfXhlMKgPc44Y8o~UhdwVIYQwPaTMhtgeQYGS-G6B3IVQdjJv-SJtzkUH1yYR8H8Ty2kzhc096nS2v2gq337tUiy39EP9UXSF2S26-~gTn-1gWtCqQ065~sgHYe2p9~fqP2A7z6ojCp82aMGYpZnUSEhXbIoSZg5dVwqTCQbSVZWRsSBc-XiEDPphrshxyVC6jrhwfJj7UYXCsMJRKXtIOw__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA', imdb: 'https.imdb.com/es/title/tt29644189/' },
         { id: '4', title: 'Tom y Jerry: Aventura en el tiempo', poster: 'https://es.web.img3.acsta.net/img/8b/a4/8ba47c502b2af6c7ba3af10e7bc70036.jpg', description: 'Tras una persecución en un museo, Tom y Jerry son transportados por un portal del tiempo.', genre: 'Animación', duration: '1h 44m', rating: 'PG', releaseDate: '2025', cast: 'Tom, Jerry', director: 'Zhang Gang', trailer: 'https://m.media-amazon.com/images/M/MV5BNDk1OTU5OWYtODdiZC00NzFiLWIxYjktMmZmZDJiYjczNDk5XkEyXkFqcGc@._V1_.jpg', imdb: 'https.imdb.com/es-es/title/tt37185884/' }
    ];

    const proximosEstrenos = [
         { id: '5', title: 'Wicked', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPlX77U00hM58AaNgkZon1n89artWhYcs60g&s', description: 'Una historia fantástica sobre el origen de las brujas de Oz.', imdb: 'https://www.imdb.com/title/tt12444318/' },
         { id: '6', title: 'Deadpool y Wolverine', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf-UjfzQy0U-HCtKzaok-1C36y_Q2oTsf1fg&s', description: 'El mercenario bocazas regresa en una nueva aventura con un viejo amigo.', imdb: 'https://www.imdb.com/title/tt6263592/' },
         { id: '7', title: 'Joker 2', poster: 'https://hips.hearstapps.com/hmg-prod/images/joker-2-poster-660d1344c56e8.jpeg', description: 'El regreso del Príncipe Payaso del Crimen en un musical psicológico.', imdb: 'https://www.imdb.com/title/tt11315808/' },
         { id: '8', title: 'Gladiator 2', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDpHj-sI_zQhfGsVIzVuxDtfZqooBuGI52dA&s', description: 'Una nueva epopeya en el Coliseo con la secuela del clásico de Ridley Scott.', imdb: 'https.imdb.com/title/tt6121404/' },
    ];


    const PRICE_PER_SEAT = 8000;
    let pendingReservationData = {}; // MODIFICADO: De vuelta a un objeto para una sola reserva
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
                    document.getElementById('messageTitle').textContent = title || 'Aviso';
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

    // ========== MODIFICADO: Lógica de Descarga ARREGLADA ==========
    async function handleDownload(format) {
        // 1. Apuntar al ticket real, no al contenedor
        const ticketElement = document.querySelector('#ticket-wrapper .ticket-container');
        if (!ticketElement) {
            console.error("No se encontró el elemento .ticket-container para descargar.");
            toggleModal('messageModal', true, 'Error al generar la descarga. Intente de nuevo.', 'Error');
            return;
        }

        const buttons = document.querySelectorAll('#confirmationModal .btn-primary');
        buttons.forEach(btn => btn.disabled = true); // Deshabilitar botones
        
        try {
            const canvas = await html2canvas(ticketElement, {
                scale: 2,
                // 2. Usar un color sólido. El ticket es blanco, así que esto es seguro.
                backgroundColor: '#ffffff', 
                useCORS: true 
            });

            const reservationId = pendingReservationData.id || 'ticket';

            if (format === 'png') {
                const imgData = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.download = `ticket-${reservationId}.png`;
                link.href = imgData;
                link.click();
            } else if (format === 'pdf') {
                const imgData = canvas.toDataURL('image/png');
                const { width, height } = canvas;
                const pdfWidth = 120; // Ancho ticket
                const pdfHeight = (height * pdfWidth) / width;
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: [pdfWidth, pdfHeight]
                });
                
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save(`ticket-${reservationId}.pdf`);
            }
        } catch (error) {
            console.error("Error al generar la descarga:", error);
            toggleModal('messageModal', true, 'Ocurrió un error al generar tu ticket. Revisa la consola.', 'Error');
        } finally {
            buttons.forEach(btn => btn.disabled = false); // Rehabilitar botones
        }
    }


    // ========== ELIMINADO: Funciones de "Mis Reservas" (Carrito) ==========
    
    // === EVENT LISTENERS PRINCIPALES ===

    // MODIFICADO: Formulario de Reserva (vuelve a pago directo)
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

        const totalAmount = selectedSeats.length * PRICE_PER_SEAT;

        pendingReservationData = {
            pelicula: currentMovie.title,
            poster: currentMovie.poster, 
            genre: currentMovie.genre,   
            duration: currentMovie.duration, 
            nombre: nombreInput.value,
            email: emailInput.value,
            fecha: document.getElementById('fecha').value,
            asientos: selectedSeats.join(', '),
            id: Math.random().toString(36).substring(2, 10).toUpperCase(),
            price: totalAmount
        };
        
        document.getElementById('paymentAmount').value = `ARS $${totalAmount.toLocaleString('es-AR')}`;
        
        toggleModal('reservationModal', false);
        toggleModal('paymentModal', true); // Va directo al pago
        
        document.getElementById('reservationForm').reset();
        generateSeatingChart();
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

        simulatePayment('Tarjeta de Crédito');
    });

    // MODIFICADO: Simulación de pago para UN ticket
    function simulatePayment(methodName) {
        const allPaymentButtons = document.querySelectorAll('#paymentModal .btn-primary');
        allPaymentButtons.forEach(btn => {
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
        });
        if(paymentErrors) paymentErrors.textContent = '';

        setTimeout(() => {
            const success = Math.random() > 0.12; // 88% success rate

            if (success) {
                const ticketWrapper = document.getElementById('ticket-wrapper');
                ticketWrapper.innerHTML = ''; // Limpiar ticket anterior

                // Generar el ticket "fachero"
                const item = pendingReservationData;
                const ticketHTML = `
                <div class="ticket-container">
                    <div class="ticket-header-new">
                        <img src="assets/img/logo.png" alt="Logo" class="ticket-logo">
                        <span class="ticket-title-new">TICKET DE ACCESO</span>
                    </div>
                    <div class="ticket-body-new">
                        <div class="ticket-movie-details">
                            <img src="${item.poster}" alt="Poster" class="ticket-poster">
                            <div class="ticket-movie-info">
                                <h3>${item.pelicula}</h3>
                                <p>${item.genre} | ${item.duration} | ${new Date(item.fecha + 'T00:00:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</p>
                            </div>
                        </div>
                        <div class="ticket-reservation-details">
                            <div class="ticket-qr-code">
                                <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${item.id}" alt="QR Code">
                            </div>
                            <div class="ticket-user-info">
                                <p><strong>Cliente:</strong> <span>${item.nombre}</span></p>
                                <p><strong>Asientos:</strong> <span>${item.asientos}</span></p>
                                <p><strong>ID:</strong> <span>${item.id}</span></p>
                            </div>
                        </div>
                    </div>
                    <div class="ticket-footer-new">
                        <span>Presenta este ticket en la entrada. ¡Disfruta la función!</span>
                    </div>
                </div>
                `;
                ticketWrapper.innerHTML = ticketHTML;
                
                toggleModal('paymentModal', false);
                toggleModal('confirmationModal', true);
                paymentForm.reset();

                // Asignar listeners a los botones de descarga (la data está en pendingReservationData)
                document.getElementById('downloadPNGBtn').onclick = () => handleDownload('png');
                document.getElementById('downloadPDFBtn').onclick = () => handleDownload('pdf');

            } else {
                if (methodName === 'Tarjeta de Crédito') {
                     paymentErrors.textContent = 'Pago rechazado. Verifique sus datos o intente con otra tarjeta.';
                } else {
                    toggleModal('messageModal', true, `El pago con ${methodName} fue rechazado. Por favor, intente de nuevo.`, 'Error de Pago');
                }
            }
            
            // Restaurar botones
            document.getElementById('payBtn').innerHTML = '<i class="fas fa-lock"></i> Pagar';
            document.getElementById('payWithMPBtn').innerHTML = '<i class="fas fa-check"></i> Ya realicé el pago';
            document.getElementById('payWithPaypalBtn').innerHTML = '<i class="fab fa-paypal"></i> Pagar con PayPal';
            document.getElementById('payWithPaypalGuestBtn').innerHTML = 'Pagar con Tarjeta';
            allPaymentButtons.forEach(btn => btn.disabled = false);

        }, 1500);
    }


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

    // ========== ELIMINADO: Listeners de "Mis Reservas" ==========

    // Listeners para Pestañas de Pago (se mantienen)
    document.querySelectorAll('.payment-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const method = e.currentTarget.dataset.paymentMethod;
            document.querySelectorAll('.payment-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.payment-method-content').forEach(c => c.classList.remove('active'));
            e.currentTarget.classList.add('active');
            document.getElementById(`payment-method-${method}`).classList.add('active');
        });
    });

    // Listeners para botones de pago (simulados)
    document.getElementById('payWithMPBtn').addEventListener('click', () => simulatePayment("Mercado Pago"));
    document.getElementById('payWithPaypalBtn').addEventListener('click', () => simulatePayment("PayPal"));
    document.getElementById('payWithPaypalGuestBtn').addEventListener('click', () => simulatePayment("PayPal (Tarjeta)"));
    // ======================================================================


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