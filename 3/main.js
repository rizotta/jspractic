// Интернет магазин

const goods = [					// массив с названием телефона и ценой
	["iPhone", 60],
	["S8", 50],
	["Sony", 45],
	["iPhone", 60],
	["S8", 50],
	["Sony", 45],
];

// Вывод карточек товара. Основная программа
function app () {
	// Переменная, которая будет содержать разметку для всех товаров
	let result = "";

	// В цикле обходим все доступные товары
	for (let i = 0; i < goods.length; i++) {
		// Получаем массив товара по его индексу (на каждой итерации цикла - разный)
		let phone = goods[i];
		// Получаем разметку для каждого товара, передаём в функцию имя и цену
		let phoneMarkup = getPhoneMark(phone[0], phone[1]);
		// Объединяем разметку
		result += phoneMarkup;
	}
	
	// Показываем пользователю все товары
	shop.innerHTML = result;			// элемент из index.html с id="shop"
}

app();


// Функция возвращающая разметку для товара в виде строки
function getPhoneMark(name, price) {
 return `<div class="col-sm-4 col-lg-4 col-md-4">
			<div class="thumbnail">
				<img src="http://placehold.it/300x150" alt="">
				<div class="caption">
					<h4>
						<a href="#">` + name +`</a>
					</h4>
					<h4 class="pull-right">$` + price + `</h4>
				</div>
				<div style="margin: 10px;">
					<button class="btn btn-primary">Buy</button>
				</div>
			</div>
		</div>`;
}



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
// 		appQuestion();
// 	} else {
// 		console.log("Anything")
// 	}

// }

// function appQuestion() {
// 	let buyCount = prompt("Какое количество товаров?");		//результат - строка
// 	let buyCountNumber = parseInt(buyCount, 10)				// переводим в число
// 	addToCart(buyCountNumber, phonePrice);
// }

// appQuestion();
