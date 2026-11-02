const datesContainer = document.getElementById('dates');
const selectedDate = document.getElementById('selected-date');

const today = new Date();

const days = [
    'ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'
];

const months = [
    'января', 'февраля', 'марта',
    'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября',
    'октября', 'ноября', 'декабря'
];

for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const button = document.createElement('button');
    button.className = 'date-button' + (i === 0 ? ' active' : '');

    button.innerHTML = `
        <div>${days[date.getDay()]}</div>
        <strong>${date.getDate()} ${months[date.getMonth()]}</strong>
    `;

    button.addEventListener('click', () => {
        document.querySelectorAll('.date-button').forEach(btn => {
            btn.classList.remove('active');
        });

        button.classList.add('active');

        selectedDate.textContent =
            'СЕАНСЫ НА ' +
            date.getDate() + ' ' +
            months[date.getMonth()].toUpperCase();
    });

    datesContainer.appendChild(button);
}

document.querySelectorAll('.session-buy').forEach(button => {
    button.addEventListener('click', () => {
        alert('Система покупки билетов пока не подключена.');
    });
});