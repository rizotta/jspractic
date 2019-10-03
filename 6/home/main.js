"use strict";

// Интернет магазин

const goodsAll = [				// Массив товаров где каждый товар - объект с набором свойств
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
		let total = 0;
		for (let i = 0; i < this.goods.length; i++) {		// this.goods = cart.goods
			let good = this.goods[i];
			total += good.price * good.count;
		}
		this.total = total; 
	},

	cartShow: function() {
		let shop = document.getElementById('shop');
		shop.innerHTML = '';

		let divCart = document.createElement('div');
		divCart.id = 'div-cart';
		shop.appendChild(divCart);

		let table1 = document.createElement('table');
		table1.id = 'table-cart';
		for (let i = 0; i < this.goods.length; i++) {
			let tr = document.createElement('tr');
			for (let j = 0; j<4; j++) {
				let td = document.createElement('td');
				switch (j) {
					case 0: td.innerHTML = i+1;
						break;
					case 1: td.innerHTML = this.goods[i].name;
						break;
					case 2: td.innerHTML = this.goods[i].count + 'шт';
						break;
					case 3: td.innerHTML = '$ ' +this.goods[i].price;
						break;
				}
				tr.appendChild(td);
			}
			table1.appendChild(tr);
		}
		divCart.appendChild(table1);

		// кнопка назад
		let backLink = document.createElement('a');
		backLink.href = '#';
		backLink.innerHTML = 'Назад';
		backLink.setAttribute("onclick", 'app.run()');
		shop.appendChild(backLink);
	},

	// Добавление товара в корзину. 
	// В качестве аргумента получаем товар, сохраняем его в список товаров this.goods, пересчитываем cart.total
	// Вызов функции происходит по методу onclick, настроенному в кнопке товара
	addToCart: function(buttonElement) {					
		let name = buttonElement.getAttribute("data-name");
		let price = buttonElement.getAttribute("data-price");

		this.goods.push({
			price: parseInt(price),
			name: name,
			count: 1
		});

		// Подсчёт суммы и вывод в верхнее меню
		this.calcTotal();
		let shopTotal = document.getElementById('shopTotal');
		shopTotal.innerHTML = "Товаров: " + cart.goods.length + ", на сумму " + cart.total + " $<br>" +
			"<a href='#' id='cart-link' onclick = 'cart.cartShow()'>" +	"Открыть корзину</a>";
		console.log("Add to cart " + name + " " + price);
	},

	// Удаление товара из корзины. 
	removeFromCart: function() {

	}

};

function createElement() {								// Создаём шаблон элемента карточки товара
	let element = document.createElement('div');

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


let app = {																// объект всего приложения
	cartElement: createElement(),										// свойство, внутри которого элемент, представлющий карточку товара
	
	run: function() {
		// let result = "";												// Переменная, которая будет содержать разметку для всех товаров
		shop.innerHTML = '';
		for (let i = 0; i < goodsAll.length; i++) {						// В цикле обходим все доступные товары
			let phone = goodsAll[i];										// Получаем массив товара по его индексу (на каждой итерации цикла - разный)
			let phoneElement = this.createCart(phone.name, phone.price);	// Получаем элемент(new) для каждого товара, передаём в функцию имя и цену

			let shop = document.getElementById('shop');
			shop.appendChild(phoneElement);								// Вставляем в shop элемент phoneElement, отображаем
		}

	},

// Функция возвращающая разметку для товара в виде строки
	createCart: function(name, price) {
		let newElement = this.cartElement.cloneNode(true);				// Создаём клон карточки. True - чтобы скопировать все вложенные свойства
		let nameElement = newElement.querySelector('.name');					// Ищем элемент с классом 'name' внутри карточки, вставляем имя
		let priceElement = newElement.querySelector('.price');					// Ищем элемент с классом 'name' внутри карточки, вставляем цену
		let buttonElement = newElement.querySelector('.btn-primary');			// Находим кнопку с указанным классом

		nameElement.innerHTML = name;									// Добавляем название
		priceElement.innerHTML = price + " $";							// Добавляем цену

		buttonElement.setAttribute("data-name", name);					// Добавляем атрибуты кнопке, чтобы получать товар
		buttonElement.setAttribute("data-price", price);				//  и его стоимость

		return newElement;
	}
}; 				



app.run();