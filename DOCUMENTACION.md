# 📚 Documentación del Proyecto TrailerPelis++

## 🎯 Descripción General
TrailerPelis++ es una aplicación web para explorar películas usando la API de TMDB (The Movie Database). Permite ver cartelera, próximos estrenos, buscar películas y simular reservas de entradas.

---

## 📁 Estructura de Archivos

```
TrailerPelis/
├── index.html          → Página principal con toda la estructura HTML
├── assets/
│   ├── css/
│   │   └── styles.css  → Todos los estilos visuales de la página
│   ├── js/
│   │   └── script.js   → Toda la lógica y funcionalidad JavaScript
│   └── img/
│       └── logo.png    → Logo de la aplicación
└── README.md           → Información del proyecto
```

---

## 🔧 Tecnologías Utilizadas

| Tecnología | Uso |
|------------|-----|
| **HTML5** | Estructura de la página |
| **CSS3** | Estilos y diseño visual |
| **JavaScript (ES6+)** | Lógica y funcionalidad |
| **TMDB API** | Obtener datos de películas |
| **Font Awesome** | Iconos |
| **Google Fonts** | Tipografía (Inter) |
| **jsPDF** | Generar tickets en PDF |
| **html2canvas** | Capturar tickets como imagen |

---
```

### Endpoints:

| Endpoint | Función | Descripción |
|----------|---------|-------------|
| `/genre/movie/list` | `fetchGenres()` | Obtiene lista de géneros (Acción, Comedia, etc.) |
| `/movie/now_playing` | `fetchNowPlaying()` | Películas actualmente en cartelera |
| `/movie/upcoming` | `fetchUpcoming()` | Próximos estrenos |
| `/search/movie` | `searchMovies()` | Buscar películas por título |
| `/movie/{id}` | `getMovieDetails()` | Detalles de una película específica |
| `/movie/{id}/credits` | `getMovieCredits()` | Reparto y equipo técnico |
| `/movie/{id}/videos` | `getMovieVideos()` | Trailers y videos |

---

## 🧩 Funciones Principales (script.js)

### Funciones de API
| Función | Qué hace |
|---------|----------|
| `fetchGenres()` | Carga los géneros y los guarda en `genreMap` |
| `fetchNowPlaying()` | Obtiene 6 películas en cartelera |
| `fetchUpcoming()` | Obtiene 16 próximos estrenos |
| `searchMovies(query)` | Busca películas por nombre |
| `getMovieDetails(movieId)` | Obtiene info completa de una película |
| `getMovieCredits(movieId)` | Obtiene actores y director |
| `getMovieVideos(movieId)` | Obtiene trailers de YouTube |

### Funciones de Interfaz
| Función | Qué hace |
|---------|----------|
| `generateCarousel()` | Crea el carrusel de películas en cartelera |
| `generateUpcomingMovies()` | Crea la grilla de próximos estrenos |
| `openMovieModal(movieId)` | Abre el modal con detalles de película |
| `updateCarousel()` | Mueve el carrusel al slide actual |
| `displaySearchResults()` | Muestra resultados de búsqueda |

### Funciones de Reserva
| Función | Qué hace |
|---------|----------|
| `generateSeatingChart()` | Crea el mapa de asientos |
| `generateReservationDates()` | Genera opciones de fechas |
| `simulatePayment()` | Simula el proceso de pago |
| `handleDownload()` | Descarga el ticket como PNG o PDF |

### Funciones Auxiliares
| Función | Qué hace |
|---------|----------|
| `getGenreNames(ids)` | Convierte IDs de género a nombres |
| `formatRuntime(min)` | Convierte minutos a "2h 15m" |
| `truncateText(text, max)` | Acorta texto largo con "..." |
| `toggleModal(id, show)` | Abre o cierra un modal |
| `applyTheme(theme)` | Cambia el tema de colores |

---

## 🎨 Estilos CSS - Secciones

| Sección | Líneas aprox. | Descripción |
|---------|---------------|-------------|
| Variables CSS | 1-20 | Colores y valores reutilizables |
| Temas | 22-77 | Estilos para cada tema (claro, oscuro, etc.) |
| Header | 114-150 | Barra de navegación superior |
| Carrusel | 622-750 | Slider de películas |
| Grid de Películas | 751-800 | Tarjetas de películas |
| Modales | 800+ | Ventanas emergentes |

---

## 🔄 Flujo de la Aplicación

```
1. Usuario abre la página
   ↓
2. init() se ejecuta:
   - Carga el tema guardado
   - Obtiene géneros de TMDB
   - Obtiene películas en cartelera
   - Obtiene próximos estrenos
   ↓
3. Se genera la interfaz:
   - Carrusel con películas
   - Grid de próximos estrenos
   ↓
4. Usuario interactúa:
   - Clic en película → openMovieModal()
   - Buscar → searchMovies()
   - Reservar → formulario de reserva
   - Pagar → simulatePayment()
   - Descargar ticket → handleDownload()
```

---

## 💳 Sistema de Pago (Simulado)

El sistema de pago es **simulado** para demostración:
- Valida número de tarjeta con algoritmo de Luhn
- Valida fecha de expiración
- 88% de probabilidad de éxito
- Genera un ticket con código QR

---

## 🎭 Temas Disponibles

| Tema | Descripción |
|------|-------------|
| `dark` | Oscuro (por defecto) |
| `light` | Claro |
| `soft` | Suave/pastel |
| `gamer` | Rojo neón |
| `futuristic` | Verde/turquesa |

---

## 📱 Diseño Responsive

La página se adapta a diferentes pantallas:
- **Desktop**: Menú completo, carrusel grande
- **Tablet**: Grid de 2 columnas
- **Móvil**: Menú hamburguesa, 1 columna

---

## ⚠️ Notas Importantes

1. **API Key**: La clave de TMDB está en el código (línea 9 de script.js)
2. **Trailers**: Se muestran como miniaturas con enlace a YouTube
3. **Precios**: Configurados en pesos argentinos ($8000 por asiento)
4. **Datos**: Se guardan en localStorage (tema seleccionado)
