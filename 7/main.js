const MAP_WIDTH = 20;       // количество ячеек по ширине
const MAP_HEIGHT = 20;      // количество ячеек по высоте
let direction = 'up';       // начальное направление движения
let snake = [];             // массив с элементами тела змейки
let snake_interval = null;  // интервал движения змейки
let food_interval = null;   // интервал генерации еды
let snake_speed = 400;

// Формирование селектора для координат
function getSelectorByCoords(x, y) {
    return '[data-x="' + x + '"][data-y="' + y + '"]';
}

// Генерация карты
function generateMap() {
    let gameMap = document.createElement('table');

    gameMap.classList.add('game_table');                 // задаём класс карте для регулирования стилей

    for (let i = 0; i < MAP_HEIGHT; i++) {
        let tr = document.createElement('tr');      // создаём строки

        tr.classList.add('game_table-row');

        for (let j = 0; j < MAP_WIDTH; j++) {               // создаём ячейки = колонки
            let td = document.createElement('td');

            td.setAttribute('data-x', i.toString());       // устанавливаем атрибут по оси X
            td.setAttribute('data-y', j.toString());       // устанавливаем атрибут по оси Y

            td.classList.add('game_table-cell');

            tr.appendChild(td);                                 // вставляем колонки в строку
        }
        gameMap.appendChild(tr);                                // вставляем строки в таблицу
    }
    let map = document.querySelector('#snake-field');  // находим нужное поле на странице
    map.innerHTML='';                                           // очищаем всё, что в нём было
    map.appendChild(gameMap);                                   // вставляем таблицу
}

// Рисуем змейку на карте
function respawn() {
    let start_coord_x = Math.floor(MAP_WIDTH / 2);       // стартовая координата змейки будет по центру поля
    let start_coord_y = Math.floor(MAP_HEIGHT / 2);

    // Голова змейки. Ищем ячейку по атрибуту. Используем переменную в ${}, чтобы найти [data-x=10][data-y=10]
    let snake_head = document.querySelector(getSelectorByCoords(start_coord_x, start_coord_y));

    // Хвост змейки (в начале тело из 2-х клеток)
    let snake_tail = document.querySelector(getSelectorByCoords(start_coord_x - 1, start_coord_y));

    snake_head.classList.add('unit_snake');             // задаём класс, чтобы перекрашивать ячейку со змейкой
    snake_tail.classList.add('unit_snake');

    snake.push(snake_head);         // помещаем в массив тела змейки ячейку головы
    snake.push(snake_tail);         // и хвоста
}

// Герерация еды на карте
function createFood() {
    let x = Math.floor(Math.random() * MAP_HEIGHT);     // случайные координаты по оси X на поле
    let y = Math.floor(Math.random() * MAP_WIDTH);      // случайные координаты по оси Y на поле
    let food_cell = document.querySelector(getSelectorByCoords(x, y));      // находим ячейку по случайным координатам

    if (!snake.includes(food_cell)) {         // если ячейка не присутствует в массиве с телом змейки
        food_cell.classList.add('unit_food');   // добавляем цвет для еды через класс
    }
}

// Движение змейки
function move() {
    let snake_tail = snake[snake.length - 1];   // находим элемент хвоста змейки, чтобы его переместить над головой

    // находим текущие координаты ячейки хвоста змейки и преобразуем в числа для удобства
    let coord_x = parseInt(snake_tail.getAttribute('data-x'));
    let coord_y = parseInt(snake_tail.getAttribute('data-y'));

    // рассчитываем позицию новой ячейки в зависимости от направления
    let unit_new;
    if (direction === 'up') {
        unit_new = document.querySelector(getSelectorByCoords(coord_x - 1, coord_y));
    } else if (direction === 'down') {
        unit_new = document.querySelector(getSelectorByCoords(coord_x + 1, coord_y));
    } else if (direction === 'right') {
        unit_new = document.querySelector(getSelectorByCoords(coord_x, coord_y + 1));
    } else if (direction === 'left') {
        unit_new = document.querySelector(getSelectorByCoords(coord_x, coord_y - 1));
    }

    // если положение внутри границ поля - перемещаем, иначе - ничего не делаем (т.к. там unit_new <= 0)
    if (unit_new) {
        unit_new.classList.add('unit_snake');                   // делаем змейку нужного цвета через класс
        snake.push(unit_new);                                   // помещаем элемент в массив с телом

        if (haveFood(unit_new)) {                               // съела ли змейка еду
            unit_new.classList.remove('unit_food');     // убираем класс у ячейки с едой
            increaseSpeed();                                    // увеличиваем скорость
            return;                                             // не идём дальше к удалению хвоста
        }

        // удаляем старый элемент хвоста
        let removed = snake.splice(0, 1)[0];                    // выбираем первый элемент из массива
        removed.classList.remove('unit_snake');         // убираем класс цвета змейки
    }
}

function increaseSpeed() {
    clearInterval(snake_interval);              // очищение интервала движения змейки
    snake_speed -= 20;                          // уменьшаем колличество милисекунд в интервале
    snake_interval = setInterval(move, snake_speed);    // запускаем новый интервал
}

function haveFood(cell) {
    return cell.classList.contains('unit_food');
}

// Смена направления. Объект события, которое возникает при нажатии на кнопку клавиатуры
function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp': // если нажата стрелка вверх
            if (direction !== 'down') {    // если двигалась вправо - не менять сразу влево
                direction = 'up';
            }
            break;
        case 'ArrowDown': // если нажата стрелка вниз
            if (direction !== 'up') {    // если двигалась вправо - не менять сразу влево
                direction = 'down';
            }
            break;
        case 'ArrowRight': // если нажата стрелка вправо
            if (direction !== 'left') {    // если двигалась вправо - не менять сразу влево
                direction = 'right';
            }
            break;
        case 'ArrowLeft': // если нажата стрелка влево
            if (direction !== 'right') {    // если двигалась вправо - не менять сразу влево
                direction = 'left';
            }
            break;
    }
}

function pauseGame() {
    clearInterval(snake_interval);      // остановка интервала движения змейки
    clearInterval(food_interval);       // остановка интервала генерации еды
    let pause = document.querySelector('#snake-pause');
    pause.innerHTML = 'Continue';
    pause.setAttribute('id','snake-continue');
    let start = document.querySelector('#snake-start');
    start.innerHTML = 'Re-start';
    document.querySelector('#snake-continue').addEventListener('click', continueGame);
}

function continueGame() {
    snake_interval = setInterval(move, snake_speed);          // интервал для функции движения
    food_interval = setInterval(createFood, 3000);     // интервал для функции генерации еды, 3 сек
    let contGame = document.querySelector('#snake-continue');
    contGame.innerHTML = 'Pause';
    contGame.setAttribute('id','snake-pause');
    document.querySelector('#snake-pause').addEventListener('click', pauseGame);
}


// Старт игры
function startGame () {
    direction = 'up';                   // направление по умолчанию = вверх
    snake_speed = 400;                  // интервал скорости отрисовки змейки по умолчанию = 300
    snake = [];                         // обнуление массива с телом змейки (важно это делать после очистки классов)
    generateMap();                      // генерация карты заново

    clearInterval(snake_interval);      // остановка интервала движения змейки
    clearInterval(food_interval);       // остановка интервала генерации еды
    respawn();                          // рисуем змейку

    window.addEventListener('keydown', changeDirection); // при нажатии клавиш - смена направления движения
    snake_interval = setInterval(move, snake_speed);          // интервал для функции движения
    food_interval = setInterval(createFood, 3000);     // интервал для функции генерации еды, 3 сек
}

window.onload = function () {
    generateMap();      // генерация карты
    document.querySelector('#snake-start').addEventListener('click', startGame);
    document.querySelector('#snake-pause').addEventListener('click', pauseGame);

};