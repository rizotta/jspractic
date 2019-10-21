"use strict"
// Для числа 245 получить следующий объект: {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}. 
// Выше 999 = вывести сообщение с помощью console.log и вернуть пустой объект.

function getNumericalDigits(num) {
	let myObject = {};
	num = prompt('Введите число от 0 до 999');
	num = parseInt(num, 10);

	if (isNaN(num)) {
		throw new Error('Введено не число');
	}

	if (num > 999) {
		console.log('Введённое Число больше 999. Перезагрузите страницу и введите новое число.');
	} else {
		myObject.единицы = num % 10;
		myObject.десятки = parseInt((num % 100) / 10 );
		myObject.сотни = parseInt(num / 100);
	}

	console.log(myObject);
}

getNumericalDigits();