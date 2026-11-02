const moviesContainer = document.getElementById('movies-container');
const scheduleContainer = document.getElementById('schedule-container');

// Получаем первые 3 активных фильма
const activeMovies = getActiveMovies().slice(0, 3);

// Получаем сегодняшнюю дату
const today = new Date();

const dateKey = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0')
].join('-');

// Форматируем дату
const formattedDate = today.toLocaleDateString('ru-RU');

// Генерация карточек фильмов
function renderMovies() {
    moviesContainer.innerHTML = '';

    activeMovies.forEach(movie => {
        const card = document.createElement('a');
        card.className = 'movie';

        card.href = `movie.html?id=${movie.id}`

        card.innerHTML = `
            <img
                src="${movie.poster}"
                alt="${movie.title}"
                class="movie-poster"
            >

            <div class="movie-info">
                <h3>${movie.title}</h3>

                <p>
                    ${movie.genre.join(', ')} /
                    ${movie.duration} мин /
                    ${movie.ageRating}
                </p>

                <div class="movie-bottom">
                    <span>от ${movie.price} ₽</span>

                    <a href="schedule.html?id=${movie.id}">
                        СЕАНСЫ →
                    </a>
                </div>
            </div>
        `;

        moviesContainer.appendChild(card);
    });

    if (activeMovies.length === 0) {
        moviesContainer.innerHTML = `
            <div class="empty-message">
                Сейчас нет доступных фильмов.
            </div>
        `;
    }
}

// Генерация расписания
function renderSchedule() {
    scheduleContainer.innerHTML = '';

    const sessions = [];

    activeMovies.forEach(movie => {
        // Используем расписание на конкретную дату,
        // если оно задано, иначе используем обычный массив sessions.
        const movieSessions = movie.schedule?.[dateKey]
            ?? movie.sessions;

        movieSessions.forEach(time => {
            sessions.push({
                movie,
                time
            });
        });
    });

    // Сортировка всех сеансов по времени
    sessions.sort((a, b) =>
        a.time.localeCompare(b.time)
    );

    sessions.forEach(session => {
        const row = document.createElement('div');
        row.className = 'schedule-row';

        row.innerHTML = `
            <div class="schedule-info">
                <a href="movie.html?id=${session.movie.id}">${session.movie.title}</a>

                <p>
                    ${session.movie.genre.join(', ')} ·
                    ${session.movie.ageRating}
                </p>
            </div>

            <div class="schedule-time">
                ${session.time}
            </div>

            <div class="schedule-price">
                ${session.movie.price} ₽
            </div>
        `;

        scheduleContainer.appendChild(row);
    });

    if (sessions.length === 0) {
        scheduleContainer.innerHTML = `
            <div class="empty-message">
                На сегодня сеансов нет.
            </div>
        `;
    }
}

// Запуск
renderMovies();
renderSchedule();