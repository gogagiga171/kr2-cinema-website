const search = document.getElementById('search');
const genre = document.getElementById('genre');
const cards = document.querySelectorAll('.catalog-card');
const empty = document.getElementById('empty');

function filterMovies() {
    const query = search.value.toLowerCase();
    const selectedGenre = genre.value;
    let visible = 0;

    cards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const cardGenre = card.dataset.genre;

        const matchesName = name.includes(query);
        const matchesGenre = selectedGenre === 'all' ||
                             cardGenre === selectedGenre;

        card.style.display = matchesName && matchesGenre
            ? 'block'
            : 'none';

        if (matchesName && matchesGenre) visible++;
    });

    empty.style.display = visible === 0 ? 'block' : 'none';
}

search.addEventListener('input', filterMovies);
genre.addEventListener('change', filterMovies);