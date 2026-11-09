const search = document.getElementById('search');
const genre = document.getElementById('genre');
const catalog = document.getElementById('catalog');
const empty = document.getElementById('empty');


function renderMovies(list) {
    catalog.innerHTML = '';

    list.forEach(movie => {
        const card = document.createElement('a');
        let cardType = '';
        if (movie.isPremiere) {
            cardType = 'card-premiere';
        } else if (movie.format?.includes('IMAX')) {
            cardType = 'card-imax';
        } else if (movie.format?.includes('3D')) {
            cardType = 'card-3d';
        }

        card.className = `catalog-card card h-100 ${cardType}`;

        card.href = `movie.html?id=${movie.id}`;

        // Формируем метки фильма
        const badges = [];

        if (movie.isPremiere) {
            badges.push('<span class="movie-badge premiere">ПРЕМЬЕРА</span>');
        }

        if (movie.format?.includes('3D')) {
            badges.push('<span class="movie-badge format-3d">3D</span>');
        }

        if (movie.format?.includes('IMAX')) {
            badges.push('<span class="movie-badge imax">IMAX</span>');
        }

        card.innerHTML = `
            <div class="catalog-poster-wrapper">
                <img
                    class="catalog-poster"
                    src="${movie.poster}"
                    alt="${movie.title}"
                >

                <div class="movie-badges">
                    ${badges.join('')}
                </div>
            </div>

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

                    <span class="catalog-button btn btn-outline-light btn-sm">
                        СЕАНСЫ →
                    </span>
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