document.addEventListener('DOMContentLoaded', () => {
    // ==================== BIBLIOTECAS EXTERNAS ====================
    // jsPDF se usa para generar PDFs de los tickets
    const { jsPDF } = window.jspdf;

    // ==================== CONFIGURACIÓN DE LA API DE TMDB ====================
    // Tu clave de API de TMDB (The Movie Database)
    // Documentación: https://developers.themoviedb.org/3/getting-started/introduction
    const TMDB_API_KEY = '0d0c52073354469c5c364de21bef6331';

    // URL base de la API de TMDB para todas las peticiones
    const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

    // URLs base para las imágenes con diferentes tamaños:
    // - w342: Tamaño mediano para posters (más rápido de cargar)
    // - w185: Tamaño pequeño para miniaturas en búsqueda
    // - w1280: Tamaño grande para fondos/backdrops
    const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w342';
    const TMDB_IMAGE_THUMB = 'https://image.tmdb.org/t/p/w185';
    const TMDB_BACKDROP_BASE = 'https://image.tmdb.org/t/p/w1280';

    // Cache de géneros: mapea IDs de género a sus nombres
    // Se llena con fetchGenres() al inicio
    let genreMap = {};

    // ==================== FUNCIONES DE LA API DE TMDB ====================

    /**
     * Obtiene la lista de géneros de películas de TMDB
     * Esto nos permite convertir IDs de género (ej: 28) a nombres (ej: "Acción")
     * Endpoint: /genre/movie/list
     */
    async function fetchGenres() {
        try {
            const response = await fetch(`${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}&language=es-ES`);
            const data = await response.json();
            // Guardamos cada género en el cache como: genreMap[id] = nombre
            data.genres.forEach(g => genreMap[g.id] = g.name);
        } catch (error) {
            console.error('Error al obtener géneros:', error);
        }
    }

    /**
     * Obtiene las películas actualmente en cartelera
     * Endpoint: /movie/now_playing
     * @returns {Array} Lista de películas en cartelera (máximo 6)
     */
    async function fetchNowPlaying() {
        try {
            const response = await fetch(`${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=es-ES&region=US&page=1`);
            const data = await response.json();
            return data.results.slice(0, 6); // Limitamos a 6 películas
        } catch (error) {
            console.error('Error al obtener cartelera:', error);
            return [];
        }
    }

    /**
     * Obtiene las próximas películas a estrenarse
     * Endpoint: /movie/upcoming
     * @returns {Array} Lista de próximos estrenos (máximo 8)
     */
    async function fetchUpcoming() {
        try {
            const response = await fetch(`${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&language=es-ES&region=US&page=1`);
            const data = await response.json();
            return data.results.slice(0, 16); // Limitamos a 16 películas
        } catch (error) {
            console.error('Error al obtener próximos estrenos:', error);
            return [];
        }
    }

    /**
     * Busca películas por título
     * Endpoint: /search/movie
     * @param {string} query - Término de búsqueda
     * @returns {Array} Resultados de búsqueda (máximo 8)
     */
    async function searchMovies(query) {
        if (!query || query.trim().length < 2) return [];
        try {
            const response = await fetch(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=es-ES&query=${encodeURIComponent(query)}&page=1`);
            const data = await response.json();
            return data.results.slice(0, 8);
        } catch (error) {
            console.error('Error en búsqueda:', error);
            return [];
        }
    }

    /**
     * Obtiene los detalles completos de una película
     * Endpoint: /movie/{movie_id}
     * @param {number} movieId - ID de la película en TMDB
     * @returns {Object} Detalles de la película (título, duración, puntuación, etc.)
     */
    async function getMovieDetails(movieId) {
        try {
            const response = await fetch(`${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=es-ES`);
            return await response.json();
        } catch (error) {
            console.error('Error al obtener detalles:', error);
            return null;
        }
    }

    /**
     * Obtiene el reparto y equipo de una película
     * Endpoint: /movie/{movie_id}/credits
     * @param {number} movieId - ID de la película
     * @returns {Object} Objeto con cast (actores) y crew (equipo técnico)
     */
    async function getMovieCredits(movieId) {
        try {
            const response = await fetch(`${TMDB_BASE_URL}/movie/${movieId}/credits?api_key=${TMDB_API_KEY}&language=es-ES`);
            return await response.json();
        } catch (error) {
            console.error('Error al obtener créditos:', error);
            return { cast: [], crew: [] };
        }
    }

    /**
     * Obtiene los videos (trailers, teasers) de una película
     * Endpoint: /movie/{movie_id}/videos
     * Primero intenta en español, si no hay, busca en inglés
     * @param {number} movieId - ID de la película
     * @returns {Array} Lista de videos disponibles
     */
    async function getMovieVideos(movieId) {
        try {
            // Intentar obtener videos en español
            const response = await fetch(`${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}&language=es-ES`);
            let data = await response.json();

            // Si no hay videos en español, buscar en inglés
            if (!data.results || data.results.length === 0) {
                const responseEn = await fetch(`${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}&language=en-US`);
                data = await responseEn.json();
            }
            return data.results || [];
        } catch (error) {
            console.error('Error al obtener videos:', error);
            return [];
        }
    }

    // ==================== FUNCIONES AUXILIARES ====================

    /**
     * Convierte IDs de género a nombres legibles
     * @param {Array} genreIds - Array de IDs de género
     * @returns {string} Nombres de género separados por coma
     */
    function getGenreNames(genreIds) {
        if (!genreIds) return 'N/A';
        return genreIds.map(id => genreMap[id] || 'Desconocido').slice(0, 2).join(', ');
    }

    /**
     * Formatea minutos a formato legible (ej: "2h 15m")
     * @param {number} minutes - Duración en minutos
     * @returns {string} Duración formateada
     */
    function formatRuntime(minutes) {
        if (!minutes) return 'N/A';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    }

    /**
     * Trunca texto a un máximo de caracteres
     * @param {string} text - Texto a truncar
     * @param {number} maxLength - Longitud máxima
     * @returns {string} Texto truncado con "..." si es necesario
     */
    function truncateText(text, maxLength) {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    }

    // ==================== ALMACENAMIENTO DE DATOS DE PELÍCULAS ====================
    // Arrays que guardan las películas cargadas desde la API
    let carteleraData = [];      // Películas actualmente en cartelera (se muestran en el carrusel)
    let proximosEstrenos = [];   // Próximos estrenos (se muestran en la grilla inferior)

    // ==================== CONFIGURACIÓN DE TEMAS ====================
    // Cada tema define los colores CSS que se aplicarán a toda la página
    // El usuario puede cambiar de tema desde el menú "Personalizar"
    const themes = {
        'dark': { '--bg-main': '#000613', '--color-primary': '#37d0ff', '--color-primary-light': '#ff80ee', '--color-accent': '#00a7ff', '--bg-card': 'rgba(20, 20, 35, 0.6)', '--bg-modal': 'rgba(10, 10, 40, 0.9)', '--bg-overlay': 'rgba(1, 1, 19, 0.75)', '--text-primary': '#f8f9fa', '--text-secondary': '#e0e0e0' },
        'light': { '--bg-main': '#FFFFFF', '--color-primary': '#007BFF', '--color-primary-light': '#2196F3', '--color-accent': '#0056b3', '--bg-card': 'rgba(240, 240, 240, 0.8)', '--bg-modal': 'rgba(250, 250, 250, 0.9)', '--bg-overlay': 'rgba(230, 230, 230, 0.75)', '--text-primary': '#333333', '--text-secondary': '#555555' },
        'soft': { '--bg-main': '#F5EFE6', '--color-primary': '#B4A7ED', '--color-primary-light': '#E0BBE4', '--color-accent': '#D797D7', '--bg-card': 'rgba(220, 215, 205, 0.8)', '--bg-modal': 'rgba(240, 235, 230, 0.9)', '--bg-overlay': 'rgba(220, 215, 205, 0.75)', '--text-primary': '#655D8A', '--text-secondary': '#8B81A7' },
        'gamer': { '--bg-main': '#1E1E2D', '--color-primary': '#FF1D58', '--color-primary-light': '#A40F27', '--color-accent': '#FF5A90', '--bg-card': 'rgba(30, 30, 45, 0.8)', '--bg-modal': 'rgba(25, 25, 40, 0.9)', '--bg-overlay': 'rgba(10, 10, 20, 0.75)', '--text-primary': '#D8D4F2', '--text-secondary': '#A098C2' },
        'futuristic': { '--bg-main': '#0A1828', '--color-primary': '#58C9B9', '--color-primary-light': '#C0FDFB', '--color-accent': '#3A8E7D', '--bg-card': 'rgba(20, 35, 45, 0.8)', '--bg-modal': 'rgba(15, 25, 35, 0.9)', '--bg-overlay': 'rgba(5, 10, 15, 0.75)', '--text-primary': '#C0FDFB', '--text-secondary': '#A0C0B8' }
    };

    // ==================== VARIABLES DE ESTADO ====================
    const PRICE_PER_SEAT = 8000;        // Precio por asiento en pesos argentinos
    let pendingReservationData = {};     // Datos de la reserva en proceso
    let currentMovie;                    // Película actualmente seleccionada
    let selectedSeats = [];              // Asientos seleccionados por el usuario

    // ==================== FUNCIONES DE VALIDACIÓN DE PAGO ====================
    // NOTA: Estas funciones son para SIMULAR el pago, no procesan pagos reales

    /**
     * Extrae solo los dígitos de una cadena de texto
     * Ejemplo: "1234 5678 9012 3456" → "1234567890123456"
     */
    const digits = s => s.replace(/\D/g, '');

    /**
     * Valida un número de tarjeta usando el Algoritmo de Luhn
     * Este algoritmo verifica si el número de tarjeta tiene un formato válido
     * @param {string} number - Número de tarjeta
     * @returns {boolean} true si el número es válido
     */
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

    // ==================== CAROUSEL GENERATION ====================
    function generateCarousel() {
        const carouselTrack = document.getElementById('carouselTrack');
        const indicatorsContainer = document.getElementById('indicators');
        carouselTrack.innerHTML = '';
        indicatorsContainer.innerHTML = '';

        if (carteleraData.length === 0) {
            carouselTrack.innerHTML = '<div class="loading-message"><i class="fas fa-spinner fa-spin"></i> Cargando películas...</div>';
            return;
        }

        carteleraData.forEach((movie, index) => {
            const slide = document.createElement('div');
            slide.classList.add('movie-slide');
            slide.dataset.movieId = movie.id;
            slide.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title}" class="movie-poster" loading="lazy" onerror="this.src='https://via.placeholder.com/250x375?text=Sin+Imagen'">
                <div class="movie-info">
                    <h2 class="movie-title">${movie.title}</h2>
                    <p class="movie-description">${truncateText(movie.description, 120)}</p>
                    <div class="movie-meta">
                        <div class="meta-item"><i class="fas fa-film"></i><span>${movie.genre}</span></div>
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

    // ==================== UPCOMING MOVIES GENERATION ====================
    function generateUpcomingMovies() {
        const grid = document.getElementById('upcoming-movies-grid');
        grid.innerHTML = '';

        if (proximosEstrenos.length === 0) {
            grid.innerHTML = '<div class="loading-message"><i class="fas fa-spinner fa-spin"></i> Cargando próximos estrenos...</div>';
            return;
        }

        proximosEstrenos.forEach(movie => {
            const card = document.createElement('div');
            card.classList.add('movie-card');
            card.dataset.movieId = movie.id;
            card.style.cursor = 'pointer';
            card.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title}" loading="lazy" onerror="this.src='https://via.placeholder.com/250x375?text=Sin+Imagen'">
                <div class="movie-card-info">
                    <h3>${truncateText(movie.title, 30)}</h3>
                    <p>${truncateText(movie.description, 60)}</p>
                    <div class="movie-card-meta">
                        <span><i class="fas fa-calendar"></i> ${movie.releaseDate}</span>
                        <span><i class="fas fa-star"></i> ${movie.rating}</span>
                    </div>
                </div>
            `;
            card.addEventListener('click', () => openMovieModal(movie.id));
            grid.appendChild(card);
        });
    }

    // ==================== SEARCH FUNCTIONALITY ====================
    let searchTimeout;
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    if (searchInput && searchResults) {
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value;

            if (query.length < 2) {
                searchResults.classList.remove('active');
                searchResults.innerHTML = '';
                return;
            }

            searchTimeout = setTimeout(async () => {
                const results = await searchMovies(query);
                displaySearchResults(results);
            }, 300);
        });

        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.remove('active');
            }
        });
    }

    function displaySearchResults(results) {
        if (!searchResults) return;

        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item no-results">No se encontraron resultados</div>';
            searchResults.classList.add('active');
            return;
        }

        searchResults.innerHTML = results.map(movie => `
            <div class="search-result-item" data-movie-id="${movie.id}">
                <img src="${movie.poster_path ? TMDB_IMAGE_THUMB + movie.poster_path : 'https://via.placeholder.com/50x75?text=N/A'}" alt="${movie.title}" loading="lazy">
                <div class="search-result-info">
                    <span class="search-result-title">${truncateText(movie.title, 35)}</span>
                    <span class="search-result-year">${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</span>
                </div>
                <span class="search-result-rating"><i class="fas fa-star"></i> ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
            </div>
        `).join('');

        searchResults.classList.add('active');

        // Add click handlers to results
        searchResults.querySelectorAll('.search-result-item[data-movie-id]').forEach(item => {
            item.addEventListener('click', () => {
                const movieId = item.dataset.movieId;
                searchResults.classList.remove('active');
                searchInput.value = '';
                openMovieModal(parseInt(movieId));
            });
        });
    }

    // ==================== MOVIE MODAL ====================
    async function openMovieModal(movieId) {
        // Mostrar estado de carga
        document.getElementById('modalTitle').textContent = 'Cargando...';

        // Recrear el contenedor del trailer como loading
        const trailerContainer = document.getElementById('modalTrailer');
        if (trailerContainer) {
            trailerContainer.outerHTML = `
                <div class="trailer-thumbnail loading" id="modalTrailer">
                    <i class="fas fa-spinner fa-spin"></i>
                    <span>Cargando trailer...</span>
                </div>
            `;
        }

        document.getElementById('modalDetails').innerHTML = '<div class="loading-message"><i class="fas fa-spinner fa-spin"></i> Cargando detalles...</div>';
        toggleModal('movieModal', true);

        try {
            // Fetch all movie data in parallel
            const [details, credits, videos] = await Promise.all([
                getMovieDetails(movieId),
                getMovieCredits(movieId),
                getMovieVideos(movieId)
            ]);

            if (!details) {
                document.getElementById('modalDetails').innerHTML = '<p>Error al cargar los detalles de la película.</p>';
                return;
            }

            // Extract director
            const director = credits.crew?.find(c => c.job === 'Director')?.name || 'N/A';

            // Extract top 5 cast members
            const cast = credits.cast?.slice(0, 5).map(c => c.name).join(', ') || 'N/A';

            // Obtener trailer - SOLO usar videos de YouTube para evitar Error 153
            // Usamos youtube-nocookie.com para mejor compatibilidad con embeds
            const youtubeVideos = videos.filter(v => v.site === 'YouTube');
            const trailer = youtubeVideos.find(v => v.type === 'Trailer' && v.official) ||
                youtubeVideos.find(v => v.type === 'Trailer') ||
                youtubeVideos.find(v => v.type === 'Teaser') ||
                youtubeVideos[0];

            // youtube-nocookie.com es más permisivo con las políticas de referrer
            const trailerUrl = trailer?.key ? `https://www.youtube-nocookie.com/embed/${trailer.key}?rel=0&modestbranding=1` : '';

            // Get genres
            const genres = details.genres?.map(g => g.name).slice(0, 3).join(', ') || 'N/A';

            // Build current movie object for reservation
            currentMovie = {
                id: details.id,
                title: details.title,
                poster: details.poster_path ? TMDB_IMAGE_BASE + details.poster_path : 'https://via.placeholder.com/250x375?text=Sin+Imagen',
                description: details.overview || 'Sin descripción disponible.',
                genre: genres,
                duration: formatRuntime(details.runtime),
                rating: details.vote_average ? details.vote_average.toFixed(1) : 'N/A',
                releaseDate: details.release_date || 'N/A',
                cast: cast,
                director: director,
                trailerKey: trailer?.key || null,
                tmdbUrl: `https://www.themoviedb.org/movie/${details.id}`
            };

            // Actualizar modal
            document.getElementById('modalTitle').textContent = currentMovie.title;

            // En lugar de embed (que causa Error 153), usamos miniatura con enlace a YouTube
            const trailerContainer = document.getElementById('modalTrailer');
            if (currentMovie.trailerKey) {
                // Mostrar miniatura de YouTube con botón de play
                const thumbnailUrl = `https://img.youtube.com/vi/${currentMovie.trailerKey}/hqdefault.jpg`;
                const youtubeUrl = `https://www.youtube.com/watch?v=${currentMovie.trailerKey}`;
                trailerContainer.outerHTML = `
                    <a href="${youtubeUrl}" target="_blank" class="trailer-thumbnail" id="modalTrailer">
                        <img src="${thumbnailUrl}" alt="Trailer de ${currentMovie.title}">
                        <div class="trailer-play-btn">
                            <i class="fab fa-youtube"></i>
                        </div>
                        <span class="trailer-label">Ver Trailer en YouTube</span>
                    </a>
                `;
            } else {
                trailerContainer.outerHTML = `
                    <div class="trailer-thumbnail no-trailer" id="modalTrailer">
                        <i class="fas fa-video-slash"></i>
                        <span>Trailer no disponible</span>
                    </div>
                `;
            }

            // Truncar descripción para el modal
            const shortDescription = truncateText(currentMovie.description, 200);

            document.getElementById('modalDetails').innerHTML = `
                <div class="modal-info-layout">
                    <div class="modal-main-info">
                        <p class="modal-overview">${shortDescription}</p>
                        <div class="modal-stats">
                            <div class="stat-item"><i class="fas fa-star"></i><span class="stat-value">${currentMovie.rating}</span><span class="stat-label">Puntuación</span></div>
                            <div class="stat-item"><i class="fas fa-clock"></i><span class="stat-value">${currentMovie.duration}</span><span class="stat-label">Duración</span></div>
                            <div class="stat-item"><i class="fas fa-calendar"></i><span class="stat-value">${currentMovie.releaseDate}</span><span class="stat-label">Estreno</span></div>
                        </div>
                    </div>
                    <div class="modal-credits">
                        <div class="credit-item"><span class="credit-label">Género</span><span class="credit-value">${currentMovie.genre}</span></div>
                        <div class="credit-item"><span class="credit-label">Director</span><span class="credit-value">${currentMovie.director}</span></div>
                        <div class="credit-item"><span class="credit-label">Reparto</span><span class="credit-value">${currentMovie.cast}</span></div>
                    </div>
                    <a href="${currentMovie.tmdbUrl}" target="_blank" class="tmdb-link"><i class="fas fa-external-link-alt"></i> Más información en TMDB</a>
                </div>
            `;

        } catch (error) {
            console.error('Error opening movie modal:', error);
            document.getElementById('modalDetails').innerHTML = '<p>Error al cargar los detalles de la película.</p>';
        }
    }

    // ==================== LÓGICA DEL CARRUSEL ====================
    // Variable que indica el slide actual
    let currentSlide = 0;
    let carouselInterval = null; // Guardamos el intervalo para poder pausarlo

    /**
     * Actualiza la posición del carrusel y el fondo
     * Se encarga de mover el carrusel al slide actual
     */
    function updateCarousel() {
        const slides = document.querySelectorAll('.movie-slide');
        const indicators = document.querySelectorAll('.indicator');
        const carouselTrack = document.getElementById('carouselTrack');
        if (!slides || !carouselTrack || slides.length === 0) return;

        // Calculamos el desplazamiento (100% por cada slide)
        const offset = -currentSlide * 100;
        carouselTrack.style.transform = `translateX(${offset}%)`;

        // Actualizamos los indicadores (puntos)
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });

        // Actualizamos el fondo con la imagen de la película actual
        if (carteleraData[currentSlide]) {
            const currentMovieData = carteleraData[currentSlide];
            const backdrop = document.getElementById('main-backdrop');
            // Usamos un fade suave para el cambio de fondo
            backdrop.style.opacity = '0.7';
            setTimeout(() => {
                backdrop.style.backgroundImage = `url('${currentMovieData.backdrop || currentMovieData.poster}')`;
                backdrop.style.opacity = '1';
            }, 200);
        }
    }

    /**
     * Configura los controles del carrusel (botones, indicadores, autoplay)
     */
    function setupCarousel() {
        const slides = document.querySelectorAll('.movie-slide');
        const indicators = document.querySelectorAll('.indicator');
        const carouselContainer = document.querySelector('.carousel-container');

        // Botón siguiente
        document.getElementById('nextBtn').addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateCarousel();
            resetCarouselInterval(); // Reiniciar el autoplay
        });

        // Botón anterior
        document.getElementById('prevBtn').addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateCarousel();
            resetCarouselInterval();
        });

        // Click en indicadores
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                updateCarousel();
                resetCarouselInterval();
            });
        });

        // Pausar el autoplay cuando el mouse está sobre el carrusel
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => {
                clearInterval(carouselInterval);
            });
            carouselContainer.addEventListener('mouseleave', () => {
                resetCarouselInterval();
            });
        }

        // Autoplay cada 6 segundos (un poco más lento para mejor UX)
        resetCarouselInterval();
        updateCarousel();
    }

    /**
     * Reinicia el intervalo del carrusel automático
     */
    function resetCarouselInterval() {
        clearInterval(carouselInterval);
        carouselInterval = setInterval(() => {
            const slides = document.querySelectorAll('.movie-slide');
            if (slides.length > 0) {
                currentSlide = (currentSlide + 1) % slides.length;
                updateCarousel();
            }
        }, 6000); // 6 segundos para una experiencia más relajada
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

                if (seatStatus === 0 || Math.random() < 0.2) {
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

    // Theme functions
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

    // Download functions
    async function handleDownload(format) {
        const ticketElement = document.querySelector('#ticket-wrapper .ticket-container');
        if (!ticketElement) {
            console.error("No se encontró el elemento .ticket-container para descargar.");
            toggleModal('messageModal', true, 'Error al generar la descarga. Intente de nuevo.', 'Error');
            return;
        }

        const buttons = document.querySelectorAll('#confirmationModal .btn-primary');
        buttons.forEach(btn => btn.disabled = true);

        try {
            const canvas = await html2canvas(ticketElement, {
                scale: 2,
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
                const pdfWidth = 120;
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
            buttons.forEach(btn => btn.disabled = false);
        }
    }

    // === EVENT LISTENERS ===

    // Reservation form
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
        toggleModal('paymentModal', true);

        document.getElementById('reservationForm').reset();
        generateSeatingChart();
    });

    // Payment form
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

    function simulatePayment(methodName) {
        const allPaymentButtons = document.querySelectorAll('#paymentModal .btn-primary');
        allPaymentButtons.forEach(btn => {
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
        });
        if (paymentErrors) paymentErrors.textContent = '';

        setTimeout(() => {
            const success = Math.random() > 0.12;

            if (success) {
                const ticketWrapper = document.getElementById('ticket-wrapper');
                ticketWrapper.innerHTML = '';

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

                document.getElementById('downloadPNGBtn').onclick = () => handleDownload('png');
                document.getElementById('downloadPDFBtn').onclick = () => handleDownload('pdf');

            } else {
                if (methodName === 'Tarjeta de Crédito') {
                    paymentErrors.textContent = 'Pago rechazado. Verifique sus datos o intente con otra tarjeta.';
                } else {
                    toggleModal('messageModal', true, `El pago con ${methodName} fue rechazado. Por favor, intente de nuevo.`, 'Error de Pago');
                }
            }

            document.getElementById('payBtn').innerHTML = '<i class="fas fa-lock"></i> Pagar';
            document.getElementById('payWithMPBtn').innerHTML = '<i class="fas fa-check"></i> Ya realicé el pago';
            document.getElementById('payWithPaypalBtn').innerHTML = '<i class="fab fa-paypal"></i> Pagar con PayPal';
            document.getElementById('payWithPaypalGuestBtn').innerHTML = 'Pagar con Tarjeta';
            allPaymentButtons.forEach(btn => btn.disabled = false);

        }, 1500);
    }

    // Other Listeners
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

    // Payment tabs
    document.querySelectorAll('.payment-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const method = e.currentTarget.dataset.paymentMethod;
            document.querySelectorAll('.payment-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.payment-method-content').forEach(c => c.classList.remove('active'));
            e.currentTarget.classList.add('active');
            document.getElementById(`payment-method-${method}`).classList.add('active');
        });
    });

    // Payment buttons
    document.getElementById('payWithMPBtn').addEventListener('click', () => simulatePayment("Mercado Pago"));
    document.getElementById('payWithPaypalBtn').addEventListener('click', () => simulatePayment("PayPal"));
    document.getElementById('payWithPaypalGuestBtn').addEventListener('click', () => simulatePayment("PayPal (Tarjeta)"));

    // Event delegation for clicks
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
            // Check if clicked on a movie slide or button with movie ID
            const movieElement = e.target.closest('.movie-slide, .btn-primary[data-movie-id]');
            if (movieElement && movieElement.dataset.movieId) {
                const movieId = parseInt(movieElement.dataset.movieId);
                openMovieModal(movieId);
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

    // ==================== INITIALIZATION ====================
    async function init() {
        loadThemeFromLocalStorage();

        // Show loading state
        generateCarousel();
        generateUpcomingMovies();

        // Fetch genres first
        await fetchGenres();

        // Fetch movies from TMDB
        const [nowPlaying, upcoming] = await Promise.all([
            fetchNowPlaying(),
            fetchUpcoming()
        ]);

        // Transform now playing data
        carteleraData = nowPlaying.map(movie => ({
            id: movie.id,
            title: movie.title,
            poster: movie.poster_path ? TMDB_IMAGE_BASE + movie.poster_path : 'https://via.placeholder.com/250x375?text=Sin+Imagen',
            backdrop: movie.backdrop_path ? TMDB_BACKDROP_BASE + movie.backdrop_path : null,
            description: movie.overview || 'Sin descripción disponible.',
            genre: getGenreNames(movie.genre_ids),
            rating: movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A',
            releaseDate: movie.release_date || 'N/A'
        }));

        // Transform upcoming data
        proximosEstrenos = upcoming.map(movie => ({
            id: movie.id,
            title: movie.title,
            poster: movie.poster_path ? TMDB_IMAGE_BASE + movie.poster_path : 'https://via.placeholder.com/250x375?text=Sin+Imagen',
            description: movie.overview ? (movie.overview.length > 100 ? movie.overview.substring(0, 100) + '...' : movie.overview) : 'Sin descripción disponible.',
            rating: movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A',
            releaseDate: movie.release_date || 'N/A'
        }));

        // Regenerate UI with real data
        generateCarousel();
        generateUpcomingMovies();
        setupCarousel();
    }

    init();
});