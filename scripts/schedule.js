
const scheduleContainer = document.getElementById('sessions');

const today = new Date();

const dateKey = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0')
].join('-');

// Если в URL есть id, показываем сеансы только этого фильма
const params = new URLSearchParams(window.location.search);
const movieId = params.get('id');

function renderSchedule() {
    if (!scheduleContainer) return;

    scheduleContainer.innerHTML = '';

    let filteredSessions = sessions
        .filter(session => session.date === dateKey);

    if (movieId) {
        filteredSessions = filteredSessions.filter(
            session => session.movieId === Number(movieId)
        );
    }

    const scheduleList = filteredSessions
        .map(session => ({
            ...session,
            movie: getMovieById(session.movieId)
        }))
        .filter(session => session.movie && session.movie.isActive)
        .sort((a, b) => a.time.localeCompare(b.time));

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
        `;

        scheduleContainer.appendChild(row);
    });

    if (scheduleList.length === 0) {
        scheduleContainer.innerHTML = `
            <div class="empty-message">
                На выбранную дату сеансов нет.
            </div>
        `;
    }
}

renderSchedule();
