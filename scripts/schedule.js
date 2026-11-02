const datesContainer = document.getElementById('dates');
const selectedDate = document.getElementById('selected-date');
const sessionsContainer = document.getElementById('sessions');

const today = new Date();

const days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

const months = [
    'января', 'февраля', 'марта',
    'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября',
    'октября', 'ноября', 'декабря'
];

let selectedDay = 0;

// Создание выбора даты
for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const button = document.createElement('button');

    button.className = 'date-button' + (i === 0 ? ' active' : '');

    button.innerHTML = `
        <div>${days[date.getDay()]}</div>
        <strong>
            ${date.getDate()} ${months[date.getMonth()]}
        </strong>
    `;

    button.addEventListener('click', () => {
        selectedDay = i;

        document.querySelectorAll('.date-button').forEach(btn => {
            btn.classList.remove('active');
        });

        button.classList.add('active');

        renderSchedule();
    });

    datesContainer.appendChild(button);
}

// Генерация расписания
function renderSchedule() {
    const date = new Date(today);
    date.setDate(today.getDate() + selectedDay);

    selectedDate.textContent =
        'СЕАНСЫ НА ' +
        date.getDate() + ' ' +
        months[date.getMonth()].toUpperCase();

    const activeMovies = getActiveMovies();

    sessionsContainer.innerHTML = '';

    // Если пользователь пришёл из каталога с ID фильма
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get('id');

    const filteredMovies = movieId
        ? activeMovies.filter(movie => movie.id === Number(movieId))
        : activeMovies;

    console.log(1)

    filteredMovies.forEach(movie => {
        const group = document.createElement('div');
        group.className = 'session-group';

        group.innerHTML = `
            <div class="session-heading">
                <h3>${movie.title}</h3>

                <span>
                    ${movie.genre.join(', ')} /
                    ${movie.duration} мин /
                    ${movie.ageRating}
                </span>
            </div>
        `;

        movie.sessions.forEach((time, index) => {
            const session = document.createElement('div');
            session.className = 'session-details';

            session.innerHTML = `
                <div class="session-time">
                    ${time}
                </div>

                <div class="session-info">
                    Зал №${(index % 3) + 1}<br>
                    ${movie.format[index % movie.format.length]}
                    · Обычный зал
                </div>

                <div class="session-price">
                    ${movie.price} ₽
                </div>

                <button class="session-buy">
                    ВЫБРАТЬ
                </button>
            `;

            session.querySelector('.session-buy').addEventListener(
                'click',
                () => {
                    alert(
                        `Фильм: ${movie.title}\n` +
                        `Дата: ${date.toLocaleDateString('ru-RU')}\n` +
                        `Время: ${time}\n` +
                        `Цена: ${movie.price} ₽`
                    );
                }
            );

            group.appendChild(session);
        });

        sessionsContainer.appendChild(group);
    });

    if (filteredMovies.length === 0) {
        sessionsContainer.innerHTML = `
            <p style="color: var(--secondary); padding: 30px 0;">
                Фильмы не найдены.
            </p>
        `;
    }
}

// Первоначальная загрузка
renderSchedule();