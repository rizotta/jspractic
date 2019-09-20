"use strict";

// Интернет магазин

const goods = [				// Массив товаров где каждый товар - объект с набором свойств
	{	
	name: "iPhone",
	price: 60 
},
{	
	name: "S8",
	price: 50 
},
{	
	name: "Sony",
	price: 45 
},
{	
	name: "iPhone",
	price: 60 },
{	
	name: "S8",
	price: 50 },
{	
	name: "Sony",
	price: 45 }
];

const cart = {							// Объект, который представлет итоговое состояние корзины пользователя
	total: 0,							// Общая стоимость товаров в корзине, заменяется на значение ч-з cart.calcTotal;
	goods: [		
	{
			price: 100,					// Цена товара
			count: 2	 				// Кол-во штук товаров
		}
		],
	// Подсчёт общей стоимости товаров
	calcTotal: function() {	
		var total = 0;
		for (var i = 0; i < this.goods.length; i++) {		// this.goods = cart.goods
			var good = this.goods[i];						
			total += good.price * good.count;
		}
		this.total = total;
	},	
	// Добавление товара в корзину. 
	// В качестве аргумента получаем товар, сохраняем его в список товаров this.goods, пересчитываем cart.total
	addToCart: function() {

	},
	// Удаление товара из корзины. 
	removeFromCart: function() {

	}

};


// Вывод карточек товара. Основная программа
function app () {
	// Переменная, которая будет содержать разметку для всех товаров
	let result = "";

	// В цикле обходим все доступные товары
	for (let i = 0; i < goods.length; i++) {
		// Получаем массив товара по его индексу (на каждой итерации цикла - разный)
		let phone = goods[i];
		// Получаем разметку для каждого товара, передаём в функцию имя и цену
		let phoneMarkup = getPhoneMark(phone.name, phone.price);
		// Объединяем разметку
		result += phoneMarkup;
	}

	// Отображение всех товаров на странице
	shop.innerHTML = result;				// элемент из index.html с id="shop"

	// Подсчёт общей суммы
	cart.calcTotal();
	shopTotal.innerHTML = "Общая стоимость: " + cart.total + " $";
}

// Функция возвращающая разметку для товара в виде строки
function getPhoneMark(name, price) {
	return `<div class="col-sm-4 col-lg-4 col-md-4">
	<div class="thumbnail">
	<img src="http://placehold.it/270x200" alt="">
	<div class="caption">
	<h4>
	<a href="#">` + name +`</a>
	</h4>
	<h4 class="pull-right">` + price + ` $</h4>
	</div>
	<div style="margin: 10px;">
	<button class="btn btn-primary">Buy</button>
	</div>
	</div>
	</div>`;
}

app();