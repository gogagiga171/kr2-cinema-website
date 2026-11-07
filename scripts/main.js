
const moviesContainer = document.getElementById('movies-container');
const scheduleContainer = document.getElementById('schedule-container');

const today = new Date();
const dateKey = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0')
].join('-');

// Первые 3 активных фильма
const activeMovies = getActiveMovies().slice(0, 3);

// Карточки фильмов
function renderMovies() {
    if (!moviesContainer) return;

    moviesContainer.innerHTML = '';

    activeMovies.forEach(movie => {
        const card = document.createElement('a');
        card.className = 'movie card h-100';
        card.href = `movie.html?id=${movie.id}`;

        card.innerHTML = `
            <img
                src="${movie.poster}"
                alt="${movie.title}"
                class="movie-poster"
            >

            <div class="movie-info card-body">
                <h3>${movie.title}</h3>

                <p>
                    ${movie.genre.join(', ')} /
                    ${movie.duration} мин /
                    ${movie.ageRating}
                </p>

                <div class="movie-bottom">
                    <span>от ${movie.price} ₽</span>
                    <span>СЕАНСЫ →</span>
                </div>
            </div>
        `;

        moviesContainer.appendChild(card);
    });

    if (activeMovies.length === 0) {
        moviesContainer.innerHTML =
            '<div class="empty-message">Сейчас нет доступных фильмов.</div>';
    }
}

// Расписание на сегодня
function renderSchedule() {
    if (!scheduleContainer) return;

    scheduleContainer.innerHTML = '';

    const todaySessions = sessions
        .filter(session => session.date === dateKey)
        .map(session => ({
            ...session,
            movie: getMovieById(session.movieId)
        }))
        .filter(session => session.movie && session.movie.isActive)
        .sort((a, b) => a.time.localeCompare(b.time));

    todaySessions.forEach(session => {
        const row = document.createElement('div');
        row.className = 'schedule-row d-flex flex-wrap';

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
                    ${session.movie.ageRating} ·
                    Зал ${session.hall}
                </p>
            </div>

            <div class="schedule-time">${session.time}</div>
            <div class="schedule-price">${session.price} ₽</div>
        `;

        scheduleContainer.appendChild(row);
    });

    if (todaySessions.length === 0) {
        scheduleContainer.innerHTML =
            '<div class="empty-message">На сегодня сеансов нет.</div>';
    }
}

renderMovies();
renderSchedule();
