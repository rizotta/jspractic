const MAP_WIDTH = 20;       // количество ячеек по ширине
const MAP_HEIGHT = 20;      // количество ячеек по высоте
let direction = 'up';       // начальное направление движения
let snake = [];             // массив с элементами тела змейки

// Генерация карты
function generateMap() {
    let gameMap = document.createElement('table');

    gameMap.classList.add('game_table');                 // задаём класс карте для регулирования стилей

    for (let i = 0; i < MAP_HEIGHT; i++) {
        let tr = document.createElement('tr');      // создаём строки

        tr.classList.add('game_table-row');

        for (let j = 0; j < MAP_WIDTH; j++) {               // создаём ячейки = колонки
            let td = document.createElement('td');

            td.setAttribute('data-x', i);       // устанавливаем атрибут по оси X
            td.setAttribute('data-y', j);       // устанавливаем атрибут по оси Y

            td.classList.add('game_table-cell');

            tr.appendChild(td);                             // вставляем колонки в строку
        }
        gameMap.appendChild(tr);                              // вставляем строки в таблицу
    }
    document.querySelector('#snake-field').appendChild(gameMap);    // находим поле, вставляем таблицу
}

// Рисуем змейку на карте
function respawn() {
    let start_cord_x = Math.floor(MAP_WIDTH / 2);       // стартовая координата змейки будет по центру поля
    let start_cord_y = Math.floor(MAP_HEIGHT / 2);

    // Голова змейки. Ищем ячейку по атрибуту. Используем переменную в ${}, чтобы найти [data-x=10][data-y=10]
    let snake_head = document.querySelector(`[data-x="${start_cord_x}"][data-y="${start_cord_y}"]`);

    // Хвост змейки (в начале тело из 2-х клеток)
    let snake_tail = document.querySelector(`[data-x="${start_cord_x - 1}"][data-y="${start_cord_y}"]`);

    snake_head.classList.add('unit_snake');             // задаём класс, чтобы перекрашивать ячейку со змейкой
    snake_tail.classList.add('unit_snake');

    snake.push(snake_head);         // помещаем в массив тела змейки ячейку головы
    snake.push(snake_tail);         // и хвоста
}

// Движение змейки
function move() {
    let snake_tail = snake[snake.length - 1];   // находим элемент хвоста змейки, чтобы его переместить над головой

    // находим текущие координаты ячейки хвоста змейки и преобразуем в числа для удобства
    let coord_x = parseInt(snake_tail.getAttribute('data-x'));
    let coord_y = parseInt(snake_tail.getAttribute('data-y'));

    // рассчитываем позицию новой ячейки
    let unit_new;
    if (direction === 'up') {
        unit_new = document.querySelector(`[data-x="${coord_x - 1}"][data-y="${coord_y}"]`);
    }

    // добавим проверку, можем ли двигаться выше границы поля (т.к. там unit_new = 0)
    // иначе - ничего не делаем, чтобы не возникала ошибка
    if (unit_new) {
        unit_new.classList.add('unit_snake');                   // делаем змейку нужного цвета через класс
        snake.push(unit_new);                                   // помещаем элемент в массив с телом

        // удаляем старый элемент хвоста
        let removed = snake.splice(0, 1)[0];                    // выбираем первый элемент из массива
        removed.classList.remove('unit_snake');         // убираем класс цвета змейки у
    }
}

// Запуск игры
function startGame() {
    generateMap();
    respawn();

    setInterval(move, 300);
    // move();
}

window.onload = startGame;