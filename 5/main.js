"use strict";

// Интернет магазин

const goods = [				// Массив товаров где каждый товар - объект с набором свойств
{
	name: "iPhone",
	price: 60 },
{	
	name: "S8",
	price: 50 },
{	
	name: "Sony",
	price: 45 },
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

// Корзина пользователя
const cart = {							// Объект, который представлет итоговое состояние корзины пользователя
	total: 0,							// Общая стоимость товаров в корзине, заменяется на значение ч-з cart.calcTotal;
	goods: [],							// Массив объектов товаров с ценой, и колличеством
	
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
	// Вызов функции происходит по методу onclick, настроенному в кнопке товара
	addToCart: function(buttonElement) {					
		var name = buttonElement.getAttribute("data-name");
		var price = buttonElement.getAttribute("data-price");

		this.goods.push({
			price: parseInt(price),
			name: name,
			count: 1
		});

		// Подсчёт суммы и вывод в верхнее меню
		this.calcTotal();						
		shopTotal.innerHTML = "Общая стоимость: " + cart.total + " $";	
		console.log("Add to cart " + name + " " + price);
	},

	// Удаление товара из корзины. 
	removeFromCart: function() {

	}

};

function createElement() {								// Создаём шаблон элемента карточки товара
	var element = document.createElement('div');

	element.classList.add('col');
	element.innerHTML = 
		`<div class="thumbnail">
			<img src="http://placehold.it/270x200" alt="">
			<div class="caption">
				<h4>
					<a href="#" class="name"></a>
				</h4>
				<h4 class="pull-right price"></h4>
			</div>
			<div style="margin: 10px;">
				<button onclick="cart.addToCart(this)" class="btn btn-primary">Buy</button>
			</div>
		</div>`;

	return element;
}
 

var app = {																// объект всего приложения
	cartElement: createElement(),										// свойство, внутри которого элемент, представлющий карточку товара
	
	run: function() {
		let result = "";												// Переменная, которая будет содержать разметку для всех товаров

		for (let i = 0; i < goods.length; i++) {						// В цикле обходим все доступные товары
			let phone = goods[i];										// Получаем массив товара по его индексу (на каждой итерации цикла - разный)
			let phoneElement = this.createCart(phone.name, phone.price);	// Получаем элемент(new) для каждого товара, передаём в функцию имя и цену
			
			shop.appendChild(phoneElement);								// Вставляем в shop элемент phoneElement, отображаем
		}

		// cart.calcTotal();												// Подсчёт общей суммы
		// shopTotal.innerHTML = "Общая стоимость: " + cart.total + " $";
	},

// Функция возвращающая разметку для товара в виде строки
	createCart: function(name, price) {
		var newElement = this.cartElement.cloneNode(true);				// Создаём клон карточки. True - чтобы скопировать все вложенные свойства
		var nameElement = newElement.querySelector('.name');					// Ищем элемент с классом 'name' внутри карточки, вставляем имя
		var priceElement = newElement.querySelector('.price');					// Ищем элемент с классом 'name' внутри карточки, вставляем цену
		var buttonElement = newElement.querySelector('.btn-primary');			// Находим кнопку с указанным классом

		nameElement.innerHTML = name;									// Добавляем название
		priceElement.innerHTML = price + " $";							// Добавляем цену

		buttonElement.setAttribute("data-name", name);					// Добавляем атрибуты кнопке, чтобы получать товар
		buttonElement.setAttribute("data-price", price);				//  и его стоимость

		return newElement;
	}
}; 				



app.run();