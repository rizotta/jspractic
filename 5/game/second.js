"use strict"

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
		var table = document.createElement("table");
		table.style.width = "200px";
		table.style.height= "200px";
		
		var rowString = "";

		for (var row = 0; row < this.rows; row ++ ) {					// генерация строк
			var tr = document.createElement("tr";)

			for (var col = 0; col < this.cols; col++ )	{				// генерация колонок
				var td = document.createElement("td");

				if (this.positionX === col && this.positionY === row) {
					td.innerHTML = "<img src='img/o.png'>";				// позиция пользователя
				} else {
					td.innerHTML = "<img src='img/x.png'>";				// пустая клетка
				}

				tr.appendChild(td);										// добавляем элемент к строке
			}

			table = appendChild(tr);									// вставляем строку в таблицу
		}
		return table;
	},

	// Запуск игры
	run: function() {
		this.isRunning = true;
		this.shistory.push({x:this.positionX, y:this.positionY});		// запись истории

		var map = this.renderMap();										// начальное состояние карты
		var previousMap = map;
		// console.log("Текущий ход: " + this.step);
		document.body.appendChild(map);									// Добавляем карту на страницу

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

				document.body.replaceChild(map, previousMap);			// заменяем карту на новую
				previousMap = map;										// заменяем переменную
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