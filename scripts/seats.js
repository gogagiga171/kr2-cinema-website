const params = new URLSearchParams(window.location.search);

const sessionId = Number(params.get('sessionId'));

const session = sessions.find(
    item => item.id === sessionId
);

const movie = session
    ? getMovieById(session.movieId)
    : null;

const hall = document.getElementById('hall');
const sessionInfo = document.getElementById('session-info');

const modal = document.getElementById('purchase-modal');
const closeModal = document.getElementById('close-modal');

const purchaseForm = document.getElementById('purchase-form');

const selectedSeatInfo = document.getElementById('selected-seat');
const ticketPrice = document.getElementById('ticket-price');
const purchaseMessage = document.getElementById('purchase-message');

let selectedSeat = null;


// ПРОВЕРКА СЕАНСА

if (!session || !movie) {
    sessionInfo.innerHTML = `
        <div class="not-found">
            <h1>Сеанс не найден</h1>
            <a href="schedule.html">Вернуться к расписанию</a>
        </div>
    `;
} else {
    renderSessionInfo();
    renderHall();
}


// ИНФОРМАЦИЯ О СЕАНСЕ

function renderSessionInfo() {
    sessionInfo.innerHTML = `
        <div class="session-info">
            <h1>${movie.title}</h1>

            <p>
                ${session.date} ·
                ${session.time} ·
                Зал ${session.hall} ·
                ${session.format}
            </p>
        </div>
    `;
}


// ОТОБРАЖЕНИЕ ЗАЛА

function renderHall() {
    hall.innerHTML = '';

    const sessionSeats = getSeatsBySession(sessionId);

    rows.forEach(row => {
        const rowElement = document.createElement('div');
        rowElement.className = 'seat-row';

        const rowLabel = document.createElement('span');
        rowLabel.className = 'row-label';
        rowLabel.textContent = row;

        rowElement.appendChild(rowLabel);

        const seatsContainer = document.createElement('div');
        seatsContainer.className = 'row-seats';

        const rowSeats = sessionSeats.filter(
            seat => seat.row === row
        );

        rowSeats.forEach(seat => {
            const button = document.createElement('button');

            button.className = 'seat';

            button.textContent = seat.number;

            button.dataset.row = seat.row;
            button.dataset.number = seat.number;

            if (seat.isOccupied) {
                button.classList.add('occupied');
                button.disabled = true;
                button.title = 'Место занято';
            } else {
                button.classList.add('available');

                button.addEventListener('click', () => {
                    openPurchaseForm(seat);
                });
            }

            seatsContainer.appendChild(button);
        });

        rowElement.appendChild(seatsContainer);

        hall.appendChild(rowElement);
    });
}


// ОТКРЫТИЕ ФОРМЫ

function openPurchaseForm(seat) {
    selectedSeat = seat;

    selectedSeatInfo.textContent =
        `Ряд ${seat.row}, место ${seat.number}`;

    ticketPrice.textContent = `${session.price} ₽`;

    purchaseMessage.textContent = '';

    modal.classList.remove('hidden');
}


// ЗАКРЫТИЕ ФОРМЫ

function closePurchaseForm() {
    modal.classList.add('hidden');
    purchaseForm.reset();
    selectedSeat = null;
}

closeModal.addEventListener('click', closePurchaseForm);

modal.addEventListener('click', event => {
    if (event.target === modal) {
        closePurchaseForm();
    }
});


// ОФОРМЛЕНИЕ ПОКУПКИ

purchaseForm.addEventListener('submit', event => {
    event.preventDefault();

    if (!selectedSeat) return;

    const name = document
        .getElementById('buyer-name')
        .value.trim();

    const email = document
        .getElementById('buyer-email')
        .value.trim();

    if (!name || !email) {
        purchaseMessage.textContent =
            'Заполните все поля.';
        return;
    }

    const success = occupySeat(
        sessionId,
        selectedSeat.row,
        selectedSeat.number
    );

    if (!success) {
        purchaseMessage.textContent =
            'Это место уже занято. Выберите другое.';

        renderHall();
        return;
    }

    // Сохраняем информацию о покупке
    const purchases = JSON.parse(
        localStorage.getItem('cinema-purchases') || '[]'
    );

    purchases.push({
        id: Date.now(),
        sessionId,
        movieId: movie.id,
        movieTitle: movie.title,
        date: session.date,
        time: session.time,
        hall: session.hall,
        row: selectedSeat.row,
        seat: selectedSeat.number,
        price: session.price,
        buyerName: name,
        buyerEmail: email
    });

    localStorage.setItem(
        'cinema-purchases',
        JSON.stringify(purchases)
    );

    purchaseForm.reset();

    closePurchaseForm();

    renderHall();

    const purchasedRow = selectedSeat.row;
    const purchasedNumber = selectedSeat.number;

    alert(
        `Билет успешно оформлен!\n\n` +
        `Фильм: ${movie.title}\n` +
        `Дата: ${session.date}\n` +
        `Время: ${session.time}\n` +
        `Ряд: ${purchasedRow}\n` +
        `Место: ${purchasedNumber}\n` +
        `Цена: ${session.price} ₽`
    );
});