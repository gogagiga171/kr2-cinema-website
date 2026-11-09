const scheduleContainer = document.getElementById('sessions');

const genreFilter = document.getElementById('filter-genre');
const minPriceFilter = document.getElementById('filter-min-price');
const maxPriceFilter = document.getElementById('filter-max-price');
const formatFilter = document.getElementById('filter-format');
const resetButton = document.getElementById('reset-filters');

const today = new Date();

const dateKey = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0')
].join('-');

// Если в URL есть id, показываем сеансы только этого фильма
const params = new URLSearchParams(window.location.search);
const movieId = params.get('id');

// Заполняем список жанров
function initGenreFilter() {
    const genres = [...new Set(
        getActiveMovies().flatMap(movie => movie.genre)
    )].sort();

    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreFilter.appendChild(option);
    });
}

// Настраиваем максимальную цену
function initPriceFilter() {
    const maxPrice = Math.max(
        ...sessions.map(session => Number(session.price) || 0),
        2000
    );

    minPriceFilter.value = 0;
    maxPriceFilter.value = maxPrice;

    minPriceFilter.max = maxPrice;
    maxPriceFilter.max = maxPrice;
}

// Проверяем наличие формата
function hasFormat(session, format) {
    const sessionFormat = String(session.format).toUpperCase();

    return sessionFormat.includes(format.toUpperCase());
}

// Получаем сеансы с учётом фильтров
function getFilteredSessions() {
    const selectedGenre = genreFilter.value;
    const minPriceFilter = document.getElementById('filter-min-price');
    const maxPriceFilter = document.getElementById('filter-max-price');
    const selectedFormat = formatFilter.value;
    const minPrice = Number(minPriceFilter.value) || 0;
    const maxPrice = Number(maxPriceFilter.value) || 0;

    return sessions
        .filter(session => session.date === dateKey)
        .filter(session => {
            if (movieId && session.movieId !== Number(movieId)) {
                return false;
            }

            const movie = getMovieById(session.movieId);

            if (!movie || !movie.isActive) {
                return false;
            }

            const matchesGenre =
                selectedGenre === 'all' ||
                movie.genre.includes(selectedGenre);

            if (session.price < minPrice || session.price > maxPrice) {
                return false;
            }

            const matchesFormat =
                selectedFormat === 'all' ||
                hasFormat(session, selectedFormat);

            return matchesGenre && matchesFormat;
        })
        .map(session => ({
            ...session,
            movie: getMovieById(session.movieId)
        }))
        .sort((a, b) => a.time.localeCompare(b.time));
}

// Отображаем расписание
function renderSchedule() {
    if (!scheduleContainer) return;

    const scheduleList = getFilteredSessions();

    scheduleContainer.innerHTML = '';

    scheduleList.forEach(session => {
        const row = document.createElement('div');
        row.className = 'schedule-row';

        row.innerHTML = `
            <a
                href="movie.html?id=${session.movie.id}"
                class="schedule-poster-link"
            >
                <img
                    src="${session.movie.poster}"
                    alt="${session.movie.title}"
                    class="schedule-poster"
                >
            </a>

            <div class="schedule-info">
                <a href="movie.html?id=${session.movie.id}">
                    ${session.movie.title}
                </a>

                <p>
                    ${session.movie.genre.join(', ')} ·
                    ${session.movie.ageRating}
                </p>

                <p>
                    Зал ${session.hall} · ${session.format}
                </p>
            </div>

            <div class="schedule-time">
                ${session.time}
            </div>

            <div class="schedule-price">
                ${session.price} ₽
            </div>

            <a
                href="seats.html?sessionId=${session.id}"
                class="schedule-buy btn btn-success"
            >
                Выбрать места
            </a>
        `;

        scheduleContainer.appendChild(row);
    });

    if (scheduleList.length === 0) {
        scheduleContainer.innerHTML = `
            <div class="empty-message">
                По выбранным параметрам сеансов нет.
            </div>
        `;
    }
}

// Обработчики фильтров
genreFilter.addEventListener('change', renderSchedule);

formatFilter.addEventListener('change', renderSchedule);

minPriceFilter.addEventListener('input', renderSchedule);
maxPriceFilter.addEventListener('input', renderSchedule);

// Сброс фильтров
resetButton.addEventListener('click', () => {
    genreFilter.value = 'all';
    formatFilter.value = 'all';
    minPriceFilter.value = 0;
    maxPriceFilter.value = maxPriceFilter.max;

    renderSchedule();
});

// Первоначальная загрузка
initGenreFilter();
initPriceFilter();
renderSchedule();