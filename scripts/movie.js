
const movieContainer = document.getElementById('movie-container');

const params = new URLSearchParams(window.location.search);
const movieId = Number(params.get('id'));

const movie = getMovieById(movieId);

// Сегодняшняя дата
const today = new Date();

const dateKey = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0')
].join('-');

const formattedDate = today.toLocaleDateString('ru-RU');


// СЕАНСЫ ФИЛЬМА НА СЕГОДНЯ
function getTodaySessions() {
    return sessions
        .filter(session =>
            session.movieId === movieId &&
            session.date === dateKey
        )
        .sort((a, b) => a.time.localeCompare(b.time));
}


// ОТОБРАЖЕНИЕ ФИЛЬМА
function renderMovie() {
    if (!movie) {
        movieContainer.innerHTML = `
            <div class="not-found">
                <h1>Фильм не найден</h1>
                <p>Возможно, фильм был удалён или ссылка неверна.</p>
                <a href="movies.html">Вернуться к фильмам</a>
            </div>
        `;
        return;
    }

    movieContainer.innerHTML = `
        <section class="movie-layout">

            <div>
                <img
                    src="${movie.poster}"
                    alt="${movie.title}"
                    class="movie-poster"
                >
            </div>

            <div class="movie-content">

                <h1>${movie.title}</h1>

                <div class="movie-original">
                    ${movie.originalTitle}
                </div>

                <div class="movie-rating">
                    <div class="rating-number">
                        ${movie.rating}
                    </div>

                    <div class="rating-info">
                        Рейтинг фильма<br>
                        ${movie.reviews} оценок
                    </div>
                </div>

                <p class="movie-description">
                    ${movie.description}
                </p>

                <div class="movie-details">

                    <div class="detail-row">
                        <span class="detail-label">Год выпуска</span>
                        <span class="detail-value">${movie.releaseYear}</span>
                    </div>

                    <div class="detail-row">
                        <span class="detail-label">Жанр</span>
                        <span class="detail-value">${movie.genre.join(', ')}</span>
                    </div>

                    <div class="detail-row">
                        <span class="detail-label">Режиссёр</span>
                        <span class="detail-value">${movie.director}</span>
                    </div>

                    <div class="detail-row">
                        <span class="detail-label">Длительность</span>
                        <span class="detail-value">${movie.duration} мин.</span>
                    </div>

                    <div class="detail-row">
                        <span class="detail-label">Возрастное ограничение</span>
                        <span class="detail-value">${movie.ageRating}</span>
                    </div>

                    <div class="detail-row">
                        <span class="detail-label">Формат</span>
                        <span class="detail-value">${movie.format.join(', ')}</span>
                    </div>

                </div>

            </div>

        </section>


        <section class="movie-section">

            <h2>В главных ролях</h2>

            <div class="cast-list">
                ${movie.cast.map(actor => `
                    <div class="cast-item">${actor}</div>
                `).join('')}
            </div>

        </section>


        <section class="movie-section">

            <h2>Расписание на сегодня</h2>

            <p class="section-description">
                ${formattedDate}
            </p>

            <div id="sessions" class="sessions"></div>

        </section>


        <section class="movie-section">
        <h2>Отзывы зрителей</h2>
    
        <div id="reviews-container"></div>
    
        <button
            id="show-reviews-button"
            class="show-reviews-button"
            style="display: none"
        >
            Показать все отзывы
        </button>
    
        <h3 class="review-form-title">Оставить отзыв</h3>
    
        <form id="review-form" class="review-form needs-validation">
            <div class="form-group">
                <label for="review-author">Ваше имя</label>
                <input
                    type="text"
                    id="review-author"
                class="form-control"
                    maxlength="40"
                    placeholder="Введите имя"
                    required
                >
            </div>
    
            <div class="form-group">
                <label for="review-rating">Оценка</label>
                <select id="review-rating" class="form-select" required>
                    <option value="">Выберите оценку</option>
                    ${Array.from({ length: 10 }, (_, i) =>
                        `<option value="${i + 1}">${i + 1}/10</option>`
                    ).join('')}
                </select>
            </div>
    
            <div class="form-group">
                <label for="review-text">Текст отзыва</label>
                <textarea
                    id="review-text"
                    class="form-control"
                    maxlength="1000"
                    placeholder="Поделитесь впечатлениями о фильме"
                    required
                ></textarea>
            </div>
    
            <button type="submit" class="review-submit btn btn-success">
                Отправить отзыв
            </button>
    
            <p id="review-message"></p>
        </form>
    </section>
    `;

    renderSessions();
    renderReviews();
    initReviewForm();
}


// ОТОБРАЖЕНИЕ СЕАНСОВ
function renderSessions() {
    const scheduleContainer = document.getElementById('sessions');

    const movieSessions = getTodaySessions();

    if (movieSessions.length === 0) {
        scheduleContainer.innerHTML = `
            <div class="empty-message">
                На сегодня сеансов нет.
            </div>
        `;
        return;
    }

    movieSessions.forEach(session => {
        const row = document.createElement('div');
        row.className = 'session-row';

        row.innerHTML = `
            <div class="session-time">
                ${session.time}
            </div>

            <div class="session-format">
                Зал ${session.hall} · ${session.format}
            </div>

            <div class="session-price">
                ${session.price} ₽
            </div>

            <button
                class="session-button"
                data-session-id="${session.id}"
            >
                Выбрать
            </button>
        `;

        row.querySelector('button').addEventListener('click', () => {
            selectSession(session.id);
        });

        scheduleContainer.appendChild(row);
    });
}


// ВЫБОР СЕАНСА
function selectSession(sessionId) {
    window.location.href = `seats.html?sessionId=${sessionId}`;
}


// ОТОБРАЖЕНИЕ ОТЗЫВОВ
function renderReviews(showAll = false) {
    const reviewsContainer = document.getElementById('reviews-container');
    const showButton = document.getElementById('show-reviews-button');

    const movieReviews = getReviewsByMovie(movieId);

    if (movieReviews.length === 0) {
        reviewsContainer.innerHTML = `
            <div class="empty-message">
                Пока нет отзывов об этом фильме.
            </div>
        `;

        showButton.style.display = 'none';
        return;
    }

    const visibleReviews = showAll
        ? movieReviews
        : movieReviews.slice(0, 3);

    reviewsContainer.innerHTML = '';

    const reviewsList = document.createElement('div');
    reviewsList.className = 'reviews';

    visibleReviews.forEach(review => {
        const article = document.createElement('article');
        article.className = 'review';

        article.innerHTML = `
            <div class="review-header">
                <span class="review-author">
                    ${review.author}
                </span>

                <span class="review-rating">
                    ${review.rating}/10
                </span>
            </div>

            <p class="review-text">
                ${review.text}
            </p>

            <span class="review-date">
                ${new Date(review.date + 'T00:00:00')
                    .toLocaleDateString('ru-RU')}
            </span>
        `;

        reviewsList.appendChild(article);
    });

    reviewsContainer.appendChild(reviewsList);

    if (movieReviews.length > 3 && !showAll) {
        showButton.style.display = 'inline-block';

        showButton.onclick = () => {
            renderReviews(true);
        };
    } else {
        showButton.style.display = 'none';
    }
}

function initReviewForm() {
    const form = document.getElementById('review-form');
    const message = document.getElementById('review-message');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const author = document
            .getElementById('review-author')
            .value.trim();

        const rating = Number(
            document.getElementById('review-rating').value
        );

        const text = document
            .getElementById('review-text')
            .value.trim();

        if (!author || !text || rating < 1 || rating > 10) {
            message.textContent = 'Заполните все поля корректно.';
            return;
        }

        addReview(movieId, author, rating, text);

        // Обновляем количество оценок и средний рейтинг
        const movieReviews = getReviewsByMovie(movieId);

        movie.reviews = movieReviews.length;

        movie.rating = Number((
            movieReviews.reduce((sum, review) => sum + review.rating, 0)
            / movieReviews.length
        ).toFixed(1));

        renderReviews();

        // Обновляем рейтинг в верхней части страницы
        const ratingNumber = document.querySelector('.rating-number');
        const ratingInfo = document.querySelector('.rating-info');

        ratingNumber.textContent = movie.rating;
        ratingInfo.innerHTML = `
            Рейтинг фильма<br>
            ${movie.reviews} оценок
        `;

        form.reset();

        message.textContent = 'Ваш отзыв добавлен.';
    });
}

// ЗАПУСК
renderMovie();
