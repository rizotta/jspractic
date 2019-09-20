"use strict"
// Действия: Начало игры, Генерация карты, Предложение сделать ход, Обновление карты

const game = {
	// 1. Состояния
	isRunning: false,		// состояние игры, по умолчанию - остановлено
	positionX: 0,			// позиция пользователя по оси X
	positionY: 0,			// позиция пользователя по оси Y
	rows: 5,				// строки
	cols: 5,				// колонки
	shistory: [],			// история
	step: 0,				// шаг пользователя
	isMove: true,			// было ли движение

	// 2. Поведение игры
 
	// Генерация карты
	renderMap: function() {
		var rowString = "";

		for (var row = 0; row < this.rows; row ++ ) {					// генерация строк

			for (var col = 0; col < this.cols; col++ )	{				// генерация колонок
				if (this.positionX === col && this.positionY === row) {
					rowString += "O";
				} else rowString += "X";
			}
			rowString += "\n";											// новая строка
		}
		return rowString;
	},

	// Запуск игры
	run: function() {
		this.isRunning = true;
		this.shistory.push({x:this.positionX, y:this.positionY});		// запись истории

		var map = this.renderMap();										// начальное состояние карты
		console.log("Текущий ход: " + this.step);
		console.log(map);

		while (this.isRunning) {
			var direction = prompt("Выберите направление: up, right, down, left или введите номер хода (выход: '-1')");

			if (direction === "-1") {
				this.isRunning = false;									// останавливаем игру
				console.log("Выход из игры.");
				break;													// прерываем действие цикла
			}

			this.move(direction);										// перемещаем
			this.shistory.push({x:this.positionX, y:this.positionY});	// запись истории
			if (this.isMove) {
				map = this.renderMap();									// формируем карту
				console.log("Текущий ход: " + this.step);
				console.log(map);
			}
		}
	},


	// Движение пользователя
	move: function(direction) {
		if (isNaN(+direction)) {
			switch(direction) {
				case "up":
					this.moveUp();
					break;
				case "right":
					this.moveRight();
					break;
					case "down":
					this.moveDown();
					break;
				case "left":
					this.moveLeft();
					break;
				default: 
					alert("Unknown direction");
					break;
			}

		} else {
			var stepN = parseInt(direction);
			if (stepN > this.shistory.length) {					 // введённый номер больше, чем есть в истории
				alert("Шаг больше имеющихся");					// сообщаем о некорректности ввода
			} else {
				console.log(parseInt(direction));
				this.positionX = this.shistory[stepN].x;		// текущие координаты = координаты истории по ходу
				this.positionY = this.shistory[stepN].y;

				var toDelete = this.shistory.length - stepN;	// убираем все лишние ходы
				for (var i = 0; i < toDelete; i++) {
					this.shistory.pop();
					this.step = stepN;
				}
				this.isMove = true;
			}
		}
	},

	// Движение вверх
	moveUp: function() {
		if (this.positionY > 0 ){								// если положение не выходит за 0
			this.positionY--;
			this.step++;										// номер хода + 1
			this.isMove = true;
		} else {
			console.log("Вы достигли верхнего края карты. Дальше хода нет.");
			this.isMove = false;
		}
			
	},

	// Движение направо
		moveRight: function() {
		if (this.positionX < this.cols - 1){					// если положение не выходит за правую границу
			this.positionX++;	
			this.step++;										// номер хода + 1
			this.isMove = true;												
		} else {
			console.log("Вы достигли правого края карты. Дальше хода нет.");
			this.isMove = false;
		}
	},

	// Движение вниз
	moveDown: function() {
		if (this.positionY < this.rows - 1){					// если положение не выходит за максимально возможное
			this.positionY++;
			this.step++;										// номер хода + 1
			this.isMove = true;
		} else {
			console.log("Вы достигли нижнего края карты. Дальше хода нет.");
			this.isMove = false;
		}
	},

	// Движение налево
	moveLeft: function() {
		if (this.positionX > 0 ){								// если положение не выходит за 0
			this.positionX--;
			this.step++;										// номер хода + 1
			this.isMove = true;
		} else {
			console.log("Вы достигли левого края карты. Дальше хода нет.");
			this.isMove = false;
		}
	},

};

game.run();