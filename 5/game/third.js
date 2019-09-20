"use strict"

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

	createMoveBtn: function() {
		var leftBtn = document.createElement('button');			// Создаём контейнер для кнопок
		leftBtn.classList.add('btn-left');						// Добавляем ему класс
		leftBtn.innerHTML = "Left";								// Пишем в него
		leftBtn.setAttribute("onclick", "game.moveLeft()");
		document.body.appendChild(leftBtn);						// Отображаем на странице

		var rightBtn = document.createElement('button');			// Создаём контейнер для кнопок
		rightBtn.classList.add('btn-right');						// Добавляем ему класс
		rightBtn.innerHTML = "Right";								// Пишем в него
		rightBtn.setAttribute("onclick", "game.moveRight()");
		document.body.appendChild(rightBtn);						// Отображаем на странице

	},


	// Движение направо
	moveRight: function() {
		this.position++;	
		this.run();
	},

	// Движение налево
	moveLeft: function() {
		this.position--;
		this.run();
	},

	// Выход из игры
	exit: function() {
		this.isRunning = false;									// останавливаем игру
		console.log("Выход из игры.");
		// break;		
	},

	// Движение пользователя
	// move: function(direction) {
	// 	switch(direction) {
	// 		case "right":
	// 			this.moveRight();
	// 			break;
	// 		case "left":
	// 			this.moveLeft();
	// 			break;
	// 		default: 
	// 			alert("Unknown direction");
	// 			break;
	// 	}
	// },

	// replaceMap: function() {
	// 	this.createQuest();
	// 	// this.move(direction);										// перемещаем
	// 	// map = this.renderMap();	
	// 	var map = this.renderMap();										// начальное состояние карты
	// 	// var previousMap = map;
	// 	// document.body.appendChild(map);									// добавляем карту на страницу
	// 	previousMap = map;									// формируем карту
	// 	document.body.replaceChild(map, previousMap);				// заменяем карту на новую
	// 	previousMap = map;											// заменяем переменную
	// },

	// Запуск игры
	createQuest: function() {
		// this.isRunning = true;
		var map = this.renderMap();										// начальное состояние карты
		var previousMap = map;
		document.body.appendChild(map);									// добавляем карту на страницу
		this.createMoveBtn();											// Добавляем кнопки на страницу
	},

	run: function() {
		var map = this.renderMap();										// начальное состояние карты
		var previousMap = map;
		previousMap = map;											// заменяем переменную
		map = this.renderMap();			
		previousMap = this.renderMap();							// формируем карту

		var table = document.getElementsByTagName('table'); 
		document.body.Child(table);									// добавляем карту на страницу
		document.body.appendChild(map);									// добавляем карту на страницу
		// document.body.removeChild(map);						// заменяем карту на новую
		// document.body.replaceChild(map, previousMap);						// заменяем карту на новую
		// }
	}


};


// run: function() {
// 		var map = this.renderMap();										// начальное состояние карты
// 		var previousMap = map;
// 		document.body.appendChild(map);									// добавляем карту на страницу
// 		this.createMoveBtn();											// Добавляем кнопки на страницу
// 		while (this.isRunning) {
// 			var direction = prompt("Выберите направление: right, left (выход: '-1')");
// 			this.move(direction);										// перемещаем
// 			map = this.renderMap();										// формируем карту
// 			document.body.replaceChild(map, previousMap);						// заменяем карту на новую
// 			previousMap = map;											// заменяем переменную
// 		}
// 	}





game.createQuest();
// game.run();