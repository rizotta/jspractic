// 2. Игра "Угадай число"

let number; 		// загаданное число
let attempts = 0;	// число попыток
let max = 9999;
let min = 0;
number = Math.round(1000 + Math.random() * (max - min));
guessNumber();


function guessNumber() {
	attempts++;
	let result = parseInt(prompt("Введите число от " + min + " до " + max + " ('-1' - закончить игру)", 0));	// 0 - default, если ничего не ввели

	if (result === number) {
		alert("Вы угадали! Число попыток: " + attempts);
		window.location.reload();				// перезагрузить браузер
	} else if (result === 0 || isNaN(result)) {
		alert("Вы ввели не число или ваше число равно нулю");
		guessNumber();							// рекурсия
	} else if (result === -1) {
		alert("Выходим");
	} else if (result === 936434) {
		alert("Вы ввели чит-код. Загаданное число: " + number);
		guessNumber();	
	} else {
		if (result > number) {
			max = result;
			alert("Меньше");
		} else {
			min = result;
			alert("Больше");
		}
		guessNumber();
	}
}