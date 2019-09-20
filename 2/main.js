// 1. Теория + практика

// var total = 0; 					// сумма заказа пользователя

// const phonePrice = 50;			// цена товара
// var phoneCount = 5;				// кол-во телефонов на складе

// //add
// function addToCart (count, price) {
// 	const isPhoneAvaiable = (phoneCount - count ) >= 0;

// 	if (phoneCount > 0 && isPhoneAvaiable ) { // если есть телефоны на складе и их больше, чем п-ль хочет заказать
// 	total += price * count;
// 	phoneCount -= count;
// 	console.log("Общая цена: ", total);
// 	console.log("Осталось товаров: ", phoneCount);

// 	} else if (phoneCount > 0 && !isPhoneAvaiable) {
// 		console.log("Выберите меньшее количество");
// 		alert("Выберите меньшее количество");
// 		app();
// 	} else {
// 		console.log("Anything")
// 	}

// }

// function app() {
// 	let buyCount = prompt("Какое количество товаров?");		//результат - строка
// 	let buyCountNumber = parseInt(buyCount, 10)				// переводим в число
// 	addToCart(buyCountNumber, phonePrice);
// }

// app();



// 3. Дом. Задание
// Присвоить переменной а значение в промежутке [0..15]. С помощью оператора switch
// организовать вывод чисел от a до 15.

var a = 4;

switch (a) {
	case 0:
	console.log(a++);
	case 1:
	console.log(a++);
	case 2:
	console.log(a++);
	case 3:
	console.log(a++);
	case 4:
	console.log(a++);
	case 5:
	console.log(a++);
	case 6:
	console.log(a++);
	case 7:
	console.log(a++);
	case 8:
	console.log(a++);
	case 9:
	console.log(a++);
	case 10:
	console.log(a++);
}