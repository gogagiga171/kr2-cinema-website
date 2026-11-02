const container = document.getElementById('movie-container');

const params = new URLSearchParams(window.location.search);
const movieId = params.get('id');

const movie = getMovieById(movieId);

// Если фильм не найден
if (!movie || !movie.isActive) {
    container.innerHTML = `
        <div class="not-found">
            <h1>ФИЛЬМ НЕ НАЙДЕН</h1>
            <p>Возможно, фильм больше не находится в прокате.</p>
            <a href="movies.html" class="button">
                К КАТАЛОГУ
            </a>
        </div>
    `;
} else {

    document.title = `${movie.title} — CINEMA`;

    // Основная информация
    container.innerHTML = `
        <div class="movie-layout">

            <div>
                <img
                    src="${movie.poster}"
                    alt="${movie.title}"
                    class="movie-poster"
                >
            </div>

            <div class="movie-content">

                <div class="hero-label">
                    ${movie.isPremiere ? 'ПРЕМЬЕРА' : 'СЕЙЧАС В КИНО'}
                </div>

                <h1>${movie.title}</h1>

                <div class="movie-original">
                    ${movie.originalTitle} · ${movie.releaseYear}
                </div>

                <div class="movie-rating">
                    <div class="rating-number">
                        ${movie.rating}
                    </div>

                    <div class="rating-info">
                        РЕЙТИНГ ФИЛЬМА<br>
                        ${movie.reviews} отзывов
                    </div>
                </div>

                <p class="movie-description">
                    ${movie.description}
                </p>

                <div class="movie-details">

                    <div class="detail-row">
                        <span class="detail-label">Жанр</span>
                        <span class="detail-value">
                            ${movie.genre.join(', ')}
                        </span>
                    </div>

                    <div class="detail-row">
                        <span class="detail-label">Режиссёр</span>
                        <span class="detail-value">
                            ${movie.director}
                        </span>
                    </div>

                    <div class="detail-row">
                        <span class="detail-label">Длительность</span>
                        <span class="detail-value">
                            ${movie.duration} минут
                        </span>
                    </div>

                    <div class="detail-row">
                        <span class="detail-label">Возраст</span>
                        <span class="detail-value">
                            ${movie.ageRating}
                        </span>
                    </div>

                    <div class="detail-row">
                        <span class="detail-label">Формат</span>
                        <span class="detail-value">
                            ${movie.format.join(', ')}
                        </span>
                    </div>

                    <div class="detail-row">
                        <span class="detail-label">Стоимость</span>
                        <span class="detail-value">
                            от ${movie.price} ₽
                        </span>
                    </div>

                </div>

                <a href="#sessions" class="button">
                    ВЫБРАТЬ СЕАНС →
                </a>

            </div>
        </div>

        <section class="movie-section">
            <h2>АКТЁРСКИЙ СОСТАВ</h2>

            <div class="cast-list" id="cast-list"></div>
        </section>

        <section class="movie-section" id="sessions">
            <h2>СЕАНСЫ СЕГОДНЯ</h2>

            <div class="sessions" id="sessions-list"></div>
        </section>
    `;

    // Актёрский состав
    const castList = document.getElementById('cast-list');

    movie.cast.forEach(actor => {
        const item = document.createElement('div');
        item.className = 'cast-item';
        item.textContent = actor;

        castList.appendChild(item);
    });

    // Расписание на сегодня
    const sessionsList = document.getElementById('sessions-list');

    const today = new Date();

    const dateKey = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, '0'),
        String(today.getDate()).padStart(2, '0')
    ].join('-');

    const todaySessions = movie.schedule?.[dateKey] ?? movie.sessions;

    if (todaySessions.length === 0) {
        sessionsList.innerHTML = `
            <div class="session-row">
                <span class="session-format">
                    Сегодня сеансов нет.
                </span>
            </div>
        `;
    }

    todaySessions.forEach((time, index) => {
        const row = document.createElement('div');
        row.className = 'session-row';

        row.innerHTML = `
            <div class="session-time">${time}</div>

            <div class="session-format">
                Зал №${(index % 3) + 1}<br>
                ${movie.format[index % movie.format.length]}
            </div>

            <div class="session-price">
                ${movie.price} ₽
            </div>

            <button class="session-button">
                ВЫБРАТЬ
            </button>
        `;

        row.querySelector('button').addEventListener('click', () => {
            alert(
                `Фильм: ${movie.title}\n` +
                `Дата: ${today.toLocaleDateString('ru-RU')}\n` +
                `Время: ${time}\n` +
                `Цена: ${movie.price} ₽`
            );
        });

        sessionsList.appendChild(row);
    });
}