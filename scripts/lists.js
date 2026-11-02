const movies = [
    {
        id: 1,
        title: "Интерстеллар",
        originalTitle: "Interstellar",

        description: "Когда Земля становится непригодной для жизни, группа исследователей отправляется через червоточину в поисках нового дома для человечества.",

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

        cast: [
            "Мэттью Макконахи",
            "Энн Хэтэуэй",
            "Джессика Честейн"
        ],

        sessions: ["12:30", "15:40", "19:00", "21:30"],

        isActive: true,
        isPremiere: false,
        isPopular: true
    },

    {
        id: 2,
        title: "Начало",
        originalTitle: "Inception",

        description: "Профессиональный вор, специализирующийся на краже информации из подсознания людей во время сна, получает необычное задание.",

        genre: ["Триллер", "Фантастика", "Боевик"],
        director: "Кристофер Нолан",

        releaseYear: 2010,
        duration: 148,
        ageRating: "16+",

        rating: 8.8,
        reviews: 980,

        price: 300,
        format: ["2D"],

        poster: "static/inception.jpg",

        cast: [
            "Леонардо ДиКаприо",
            "Джозеф Гордон-Левитт",
            "Том Харди"
        ],

        sessions: ["13:00", "16:00", "20:00"],

        isActive: true,
        isPremiere: false,
        isPopular: true
    },

    {
        id: 3,
        title: "Дюна",
        originalTitle: "Dune",

        description: "Молодой Пол Атрейдес отправляется на опасную пустынную планету Арракис, где ему предстоит столкнуться с судьбой своей семьи и целой цивилизации.",

        genre: ["Фантастика", "Приключения", "Драма"],
        director: "Дени Вильнёв",

        releaseYear: 2021,
        duration: 155,
        ageRating: "12+",

        rating: 8.0,
        reviews: 760,

        price: 400,
        format: ["2D", "3D"],

        poster: "static/dune.jpg",

        cast: [
            "Тимоти Шаламе",
            "Ребекка Фергюсон",
            "Оскар Айзек"
        ],

        sessions: ["11:30", "16:30", "20:00"],

        isActive: true,
        isPremiere: false,
        isPopular: true
    },

    {
        id: 4,
        title: "Джон Уик",
        originalTitle: "John Wick",

        description: "Бывший наёмный убийца возвращается в криминальный мир после того, как неизвестные преступники отнимают у него последнее, что связывало его с прошлым.",

        genre: ["Боевик", "Триллер", "Криминал"],
        director: "Чад Стахелски",

        releaseYear: 2014,
        duration: 101,
        ageRating: "18+",

        rating: 7.4,
        reviews: 620,

        price: 320,
        format: ["2D"],

        poster: "static/john-wick.jpg",

        cast: [
            "Киану Ривз",
            "Майкл Нюквист",
            "Уиллем Дефо"
        ],

        sessions: ["14:00", "18:30", "22:00"],

        isActive: true,
        isPremiere: false,
        isPopular: false
    },

    {
        id: 5,
        title: "Зелёная миля",
        originalTitle: "The Green Mile",

        description: "В тюремном блоке смертников появляется необычный заключённый, обладающий удивительной способностью, которая меняет жизнь окружающих.",

        genre: ["Драма", "Фэнтези", "Криминал"],
        director: "Фрэнк Дарабонт",

        releaseYear: 1999,
        duration: 189,
        ageRating: "16+",

        rating: 9.1,
        reviews: 1450,

        price: 350,
        format: ["2D"],

        poster: "static/green-mile.jpg",

        cast: [
            "Том Хэнкс",
            "Майкл Кларк Дункан",
            "Дэвид Морс"
        ],

        sessions: ["12:00", "17:00", "21:00"],

        isActive: true,
        isPremiere: false,
        isPopular: true
    },

    {
        id: 6,
        title: "Остров проклятых",
        originalTitle: "Shutter Island",

        description: "Два федеральных маршала прибывают на остров, где находится психиатрическая клиника для особо опасных преступников, чтобы расследовать загадочное исчезновение пациентки.",

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

        cast: [
            "Леонардо ДиКаприо",
            "Марк Руффало",
            "Бен Кингсли"
        ],

        sessions: ["15:00", "19:30"],

        isActive: true,
        isPremiere: false,
        isPopular: false
    }
];

// Получить фильм по ID
function getMovieById(id) {
    return movies.find(movie => movie.id === Number(id));
}

// Получить все активные фильмы
function getActiveMovies() {
    return movies.filter(movie => movie.isActive);
}

// Получить популярные фильмы
function getPopularMovies() {
    return movies.filter(movie => movie.isPopular);
}

// Получить фильмы по жанру
function getMoviesByGenre(genre) {
    return movies.filter(movie =>
        movie.genre.includes(genre)
    );
}

// Поиск фильмов по названию
function searchMovies(query) {
    return movies.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase())
    );
}

// Сортировка по рейтингу
function sortMoviesByRating() {
    return [...movies].sort((a, b) => b.rating - a.rating);
}

// Сортировка по году выпуска
function sortMoviesByYear() {
    return [...movies].sort((a, b) => b.releaseYear - a.releaseYear);
}