
// СПИСОК ФИЛЬМОВ
const movies = [
    {
        id: 1,
        title: "Интерстеллар",
        originalTitle: "Interstellar",
        description: "Команда исследователей отправляется через червоточину на поиски нового дома для человечества.",
        genre: ["Фантастика", "Драма", "Приключения"],
        director: "Кристофер Нолан",
        releaseYear: 2014,
        duration: 169,
        ageRating: "16+",
        rating: 8.7,
        reviews: 1250,
        price: 350,
        format: ["2D", "IMAX"],
        poster: "static/interstellar.jpg",
        cast: ["Мэттью Макконахи", "Энн Хэтэуэй", "Джессика Честейн"],
        isActive: true,
        isPremiere: false,
        isPopular: true
    },
    {
        id: 2,
        title: "Начало",
        originalTitle: "Inception",
        description: "Профессиональный вор проникает в сны людей, чтобы похищать их секреты.",
        genre: ["Фантастика", "Боевик", "Триллер"],
        director: "Кристофер Нолан",
        releaseYear: 2010,
        duration: 148,
        ageRating: "12+",
        rating: 8.8,
        reviews: 980,
        price: 300,
        format: ["2D"],
        poster: "static/inception.jpg",
        cast: ["Леонардо Ди Каприо", "Джозеф Гордон-Левитт"],
        isActive: true,
        isPremiere: false,
        isPopular: true
    },
    {
        id: 3,
        title: "Дюна",
        originalTitle: "Dune",
        description: "История Пола Атрейдеса на пустынной планете Арракис.",
        genre: ["Фантастика", "Драма"],
        director: "Дени Вильнёв",
        releaseYear: 2021,
        duration: 155,
        ageRating: "12+",
        rating: 8.0,
        reviews: 750,
        price: 400,
        format: ["2D", "IMAX"],
        poster: "static/dune.jpg",
        cast: ["Тимоти Шаламе", "Ребекка Фергюсон"],
        isActive: true,
        isPremiere: false,
        isPopular: true
    },
    {
        id: 4,
        title: "Джон Уик",
        originalTitle: "John Wick",
        description: "Бывший наёмный убийца возвращается в преступный мир.",
        genre: ["Боевик", "Триллер"],
        director: "Чад Стахелски",
        releaseYear: 2014,
        duration: 101,
        ageRating: "18+",
        rating: 7.2,
        reviews: 620,
        price: 320,
        format: ["2D"],
        poster: "static/john-wick.jpg",
        cast: ["Киану Ривз", "Майкл Нюквист"],
        isActive: true,
        isPremiere: false,
        isPopular: false
    },
    {
        id: 5,
        title: "Зелёная миля",
        originalTitle: "The Green Mile",
        description: "История надзирателя тюрьмы и необычного заключённого.",
        genre: ["Драма", "Фэнтези"],
        director: "Фрэнк Дарабонт",
        releaseYear: 1999,
        duration: 189,
        ageRating: "16+",
        rating: 9.1,
        reviews: 1500,
        price: 280,
        format: ["2D"],
        poster: "static/green-mile.jpg",
        cast: ["Том Хэнкс", "Майкл Кларк Дункан"],
        isActive: true,
        isPremiere: false,
        isPopular: true
    },
    {
        id: 6,
        title: "Остров проклятых",
        originalTitle: "Shutter Island",
        description: "Два маршала расследуют исчезновение пациентки психиатрической больницы.",
        genre: ["Триллер", "Детектив", "Драма"],
        director: "Мартин Скорсезе",
        releaseYear: 2010,
        duration: 138,
        ageRating: "18+",
        rating: 8.5,
        reviews: 890,
        price: 300,
        format: ["2D"],
        poster: "static/shutter-island.jpg",
        cast: ["Леонардо Ди Каприо", "Марк Руффало"],
        isActive: true,
        isPremiere: false,
        isPopular: false
    }
];


// СПИСОК СЕАНСОВ
const sessions = [
    { id: 1, movieId: 1, date: "2026-12-06", time: "12:30", hall: 1, format: "2D", price: 350 },
    { id: 2, movieId: 1, date: "2026-12-06", time: "15:40", hall: 2, format: "IMAX", price: 450 },
    { id: 3, movieId: 1, date: "2026-12-06", time: "19:00", hall: 1, format: "2D", price: 350 },

    { id: 4, movieId: 2, date: "2026-12-06", time: "13:00", hall: 3, format: "2D", price: 300 },
    { id: 5, movieId: 2, date: "2026-12-06", time: "17:00", hall: 2, format: "2D", price: 300 },
    { id: 6, movieId: 2, date: "2026-12-06", time: "21:00", hall: 1, format: "2D", price: 300 },

    { id: 7, movieId: 3, date: "2026-12-06", time: "14:00", hall: 2, format: "IMAX", price: 400 },
    { id: 8, movieId: 3, date: "2026-12-06", time: "18:30", hall: 2, format: "IMAX", price: 450 },

    { id: 9, movieId: 4, date: "2026-12-06", time: "16:00", hall: 1, format: "2D", price: 320 },
    { id: 10, movieId: 4, date: "2026-12-06", time: "20:00", hall: 3, format: "2D", price: 320 },

    { id: 11, movieId: 5, date: "2026-12-06", time: "12:00", hall: 3, format: "2D", price: 280 },
    { id: 12, movieId: 6, date: "2026-12-06", time: "19:30", hall: 1, format: "2D", price: 300 }
];

// МЕСТА В ЗАЛАХ

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const savedSeats = JSON.parse(
    localStorage.getItem('cinema-seats') || '{}'
);

const seats = sessions.flatMap(session =>
    rows.flatMap(row =>
        Array.from({ length: 20 }, (_, index) => {
            const id = `${session.id}-${row}-${index + 1}`;

            return {
                id,
                sessionId: session.id,
                row,
                number: index + 1,
                isOccupied: savedSeats[id] ?? false
            };
        })
    )
);


// СПИСОК ОТЗЫВОВ
const reviews = JSON.parse(localStorage.getItem('cinema-reviews')) || [
    {
        id: 1,
        movieId: 1,
        author: "Александр",
        rating: 10,
        text: "Один из лучших фильмов, которые я когда-либо смотрел.",
        date: "2026-10-20"
    },
    {
        id: 2,
        movieId: 1,
        author: "Мария",
        rating: 9,
        text: "Очень сильный фильм с потрясающей атмосферой.",
        date: "2026-10-22"
    },
    {
        id: 3,
        movieId: 2,
        author: "Дмитрий",
        rating: 10,
        text: "Невероятный сюжет, который заставляет задуматься.",
        date: "2026-10-18"
    },
    {
        id: 4,
        movieId: 3,
        author: "Екатерина",
        rating: 8,
        text: "Красивый визуал и интересный мир.",
        date: "2026-10-25"
    },
    {
        id: 5,
        movieId: 5,
        author: "Иван",
        rating: 10,
        text: "Очень эмоциональная история.",
        date: "2026-10-28"
    }
];


// ФУНКЦИИ ДЛЯ ФИЛЬМОВ

function getMovieById(id) {
    return movies.find(movie => movie.id === Number(id));
}

function getActiveMovies() {
    return movies.filter(movie => movie.isActive);
}

function getPopularMovies() {
    return movies.filter(movie => movie.isPopular);
}

function getMoviesByGenre(genre) {
    return movies.filter(movie => movie.genre.includes(genre));
}

function searchMovies(query) {
    return movies.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase())
    );
}

function sortMoviesByRating() {
    return [...movies].sort((a, b) => b.rating - a.rating);
}

function sortMoviesByYear() {
    return [...movies].sort((a, b) => b.releaseYear - a.releaseYear);
}


// ФУНКЦИИ ДЛЯ СЕАНСОВ

function getSessionsByMovie(movieId) {
    return sessions.filter(session => session.movieId === Number(movieId));
}

function getSessionsByDate(date) {
    return sessions.filter(session => session.date === date);
}

function getSessionsByMovieAndDate(movieId, date) {
    return sessions.filter(session =>
        session.movieId === Number(movieId) &&
        session.date === date
    );
}


// ФУНКЦИИ ДЛЯ ОТЗЫВОВ

function getReviewsByMovie(movieId) {
    return reviews.filter(review => review.movieId === Number(movieId));
}

function addReview(movieId, author, rating, text) {
    const newReview = {
        id: reviews.length
            ? Math.max(...reviews.map(review => review.id)) + 1
            : 1,

        movieId: Number(movieId),
        author,
        rating: Number(rating),
        text,
        date: new Date().toISOString().slice(0, 10)
    };

    reviews.push(newReview);

    // Сохраняем отзывы в браузере
    localStorage.setItem('cinema-reviews', JSON.stringify(reviews));

    return newReview;
}

// ПОЛУЧИТЬ МЕСТА СЕАНСА

function getSeatsBySession(sessionId) {
    return seats.filter(
        seat => seat.sessionId === Number(sessionId)
    );
}


// ПОЛУЧИТЬ СВОБОДНЫЕ МЕСТА

function getAvailableSeats(sessionId) {
    return getSeatsBySession(sessionId)
        .filter(seat => !seat.isOccupied);
}


// СОХРАНИТЬ ЗАНЯТОСТЬ МЕСТ

function saveSeats() {
    const data = {};

    seats.forEach(seat => {
        data[seat.id] = seat.isOccupied;
    });

    localStorage.setItem('cinema-seats', JSON.stringify(data));
}


// ЗАНЯТЬ МЕСТО

function occupySeat(sessionId, row, number) {
    const seat = seats.find(seat =>
        seat.sessionId === Number(sessionId) &&
        seat.row === row &&
        seat.number === Number(number)
    );

    if (!seat || seat.isOccupied) {
        return false;
    }

    seat.isOccupied = true;
    saveSeats();

    return true;
}


// ОСВОБОДИТЬ МЕСТО

function releaseSeat(sessionId, row, number) {
    const seat = seats.find(seat =>
        seat.sessionId === Number(sessionId) &&
        seat.row === row &&
        seat.number === Number(number)
    );

    if (!seat || !seat.isOccupied) {
        return false;
    }

    seat.isOccupied = false;
    saveSeats();

    return true;
}