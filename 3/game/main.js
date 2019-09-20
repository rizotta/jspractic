// Игра "Быки и коровы"


var number; 		// загаданое число
var attemps = 0;	// число попыток
// var max = 9999;
// var min = 1000;
// number = Math.round(1000 + Math.random() * (max - min));
number = [2, 4, 5, 6];
guessNumber();

function guessNumber() {
	var result = parseInt(prompt("Введите четырехзначное число без нулей ('-1' - закончить игру)."));	// 0 - default, если ничего не ввели
	var gameIsRunning = true;

	while (gameIsRunning) {
		if (result === -1) {
			gameIsRunning = false;
		} else if (result === 0 || isNaN(result)) {
			alert("Вы ввели не число или ваше число равно нулю");
			result = parseInt(prompt("Введите число ('-1' - закончить игру)", 0));
		} else if (result === 936434 ) {
			alert("Вы ввели чит-код. Загаданное число: " + number.join(""));
			result = parseInt(prompt("Введите число ('-1' - закончить игру)", 0));
		} else {
			var answer = checkNumber(result);

			if (answer[0]) {		// сравниваем с массивом, в котором 1-й элемент означает выйграл или нет
				alert("Вы угадали! Число попыток: " + attemps);
				gameIsRunning = false;
			} else {
				result = parseInt(prompt("Быки - " + answer[1] + ". Коровы - " + answer[2] + "."));
			}
		}
	}
}

function checkNumber(userResult) {
	attemps++;
	var answer = [false, 0, 0];				// выйграл ли, кол-во быков, кол-во коров. 
	var ranks = ('' + userResult).split('');	// пользоват-ое число в строку + разбиваем строку на символы
	// userResult === 1234, ranks ===["1", "2", "3", "4"]
	for (var i = 0; i < ranks.length; i++) {
		var num = parseInt(ranks[i]);

		if (num === number[i]) {		// если угадал число на правильной позиции
			answer[1]++;							// увеличиваем быков
		} else if (number.indexOf(num) !== -1) {	// ищем цифру внутри всего массива 
			answer[2]++;
		}
	}
	if (answer[1] === 4) {	// угадал все 4 цифры на нужных местах
		answer[0] = true; 	// выиграл
	}
	return answer;
}


