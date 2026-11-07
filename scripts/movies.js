const search = document.getElementById('search');
const genre = document.getElementById('genre');
const catalog = document.getElementById('catalog');
const empty = document.getElementById('empty');

function renderMovies(list) {
    catalog.innerHTML = '';

    list.forEach(movie => {
        const card = document.createElement('a');
        card.className = 'catalog-card card h-100';

        card.href = `movie.html?id=${movie.id}`

        card.innerHTML = `
            <img
                class="catalog-poster"
                src="${movie.poster}"
                alt="${movie.title}"
            >

            <div class="catalog-content card-body">
                <h3>${movie.title}</h3>

                <div class="catalog-meta">
                    Жанр: ${movie.genre.join(', ')}<br>
                    Длительность: ${movie.duration} минут<br>
                    Возраст: ${movie.ageRating}<br>
                    Рейтинг: ${movie.rating} / 10<br>
                    Отзывы: ${movie.reviews}
                </div>

                <div class="catalog-bottom">
                    <span class="catalog-price">
                        от ${movie.price} ₽
                    </span>

                    <a href="schedule.html?id=${movie.id}"
                       class="catalog-button btn btn-outline-light btn-sm">
                        СЕАНСЫ →
                    </a>
                </div>
            </div>
        `;

        catalog.appendChild(card);
    });

    empty.style.display = list.length === 0 ? 'block' : 'none';
}

function filterMovies() {
    const query = search.value.toLowerCase().trim();
    const selectedGenre = genre.value;

    const filtered = getActiveMovies().filter(movie => {
        const matchesName =
            movie.title.toLowerCase().includes(query);

        const matchesGenre =
            selectedGenre === 'all' ||
            movie.genre.includes(selectedGenre);

        return matchesName && matchesGenre;
    });

    renderMovies(filtered);
}

search.addEventListener('input', filterMovies);
genre.addEventListener('change', filterMovies);

// Первоначальная загрузка
renderMovies(getActiveMovies());