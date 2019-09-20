const chess = {
	rows: 10,
	cols: 10,
	chars: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],				// Буквы для обозначения доски

	blackFigures: 													// Массив чёрных фигур
	[
		'b_rock.png',
		'b_knight.png',
		'b_bishop.png',
		'b_queen.png',
		'b_king.png',
		'b_bishop.png',
		'b_knight.png',
		'b_rock.png',
		'b_pawn.png'	
	],

	whiteFigures : 													// Массив белых фигур
		[
		'w_rock.png',
		'w_knight.png',
		'w_bishop.png',
		'w_queen.png',
		'w_king.png',
		'w_bishop.png',
		'w_knight.png',
		'w_rock.png',
		'w_pawn.png'
	],	

	renderField: function() {
		var table = document.createElement('table');				// Создаём таблицу
		
		for (var i = 0; i < this.rows; i++) {						// Проходим по строкам
			var tr = document.createElement('tr');

			for (var j = 0; j < this.cols; j++) {					// Проходим по колонкам
				var td = document.createElement('td');
				
				switch(i) {
					case 0: case 9: 							
						if (j > 0 && j < this.cols -1) {
							td.innerHTML = this.chars[ j-1 ];		//	Записываем буквы для доски из массива
						}
						break;
					default:
						switch (j) {
							case 0: case 9:
								td.innerHTML = 9 - i;				//	Записываем цифры для доски 
								break;
							default: 								// Ниже идёт часть доски с клетками и фигурами
								switch (i) {
									case 1: 
										td.innerHTML = '<img width="33px" src="img/' + this.blackFigures[j-1] + '">' ;		// Здесь первый ряд чёрных фигур
										break;
									case 2:
										td.innerHTML = '<img width="33px" src="img/' + this.blackFigures[8] + '">' ;		// Здесь чёрные пешки
										break;
									case 7: 
										td.innerHTML = '<img width="33px" src="img/' + this.whiteFigures[8] + '">' ;		// Здесь белые пешки
										break;
									case 8:
										td.innerHTML = '<img width="33px" src="img/' + this.whiteFigures[j-1] + '">' ;		// Здесь первый ряд белых фигур 
										break;
								}

							td.id = this.chars[j-1] + (9-i);			// Записываем id для каждой клетки

							if 		(i % 2 && j % 2) 		td.setAttribute('class', 'white')			// Назначаем классы чёрным и белым клеткам
							else if (!(i % 2) && !(j % 2))	td.setAttribute('class', 'white')
							else td.setAttribute('class', 'black');


							
						}
				};

				tr.appendChild(td);
			}

			table.appendChild(tr);

		}
		document.body.appendChild(table);
	},
};


chess.renderField();