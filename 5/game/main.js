// "use strict"

const game = {
	// 1. Состояния
	position: 0,			// позиция пользователя по оси X
	rows: 5,				// строки
	cols: 5,				// колонки
	isRunning: false,		// состояние игры, по умолчанию - остановлено

	// 2. Поведение игры
 
	// Генерация карты
	renderMap: function() {
		var table = document.createElement("table");
		table.style.width = "200px";
		table.style.height= "200px";

		var currentPosition = 0;

		for (var row = 0; row < this.rows; row ++ ) {					// генерация строк
			var tr = document.createElement("tr");

			for (var col = 0; col < this.cols; col++ )	{				// генерация колонок
				var td = document.createElement("td");

				if (currentPosition === this.position) {
					td.innerHTML = "<img width='20' src='o.png'>";				// позиция пользователя
				} else {
					td.innerHTML = "<img width='20' src='x.png'>";				// пустая клетка
				}
				
				currentPosition++;

				tr.appendChild(td);										// добавляем элемент к строке
			}

			table.appendChild(tr);									// вставляем строку в таблицу
		}

		return table;

	},


	// Движение направо
	moveRight: function() {
		this.position++;	
	},

	// Движение налево
	moveLeft: function() {
		this.position--;
	},

	// Движение пользователя
	move: function(direction) {
		switch(direction) {
			case "right":
				this.moveRight();
				break;
			case "left":
				this.moveLeft();
				break;
			default: 
				alert("Unknown direction");
				break;
		}
	},

	// Запуск игры
	run: function() {
		this.isRunning = true;
 
		var map = this.renderMap();										// начальное состояние карты
		var previousMap = map;
		

		document.body.appendChild(map);										// добавляем карту на страницу


		while (this.isRunning) {
			var direction = prompt("Выберите направление: right, left (выход: '-1')");

			if (direction === "-1") {
				this.isRunning = false;									// останавливаем игру
				console.log("Выход из игры.");
				break;													// прерываем действие цикла
			}

			this.move(direction);										// перемещаем
			map = this.renderMap();										// формируем карту


			document.body.replaceChild(map, previousMap);						// заменяем карту на новую
			previousMap = map;											// заменяем переменную
		}
	}
};


game.run();
