
// --- Класс Container
function Container() {
    this.htmlCode = '';
}

Container.prototype.render = function () {
    return this.htmlCode;
};

//  Класс меню
function Main(myId, myClass, items) {
    Container.call(this);
    this.id = myId;
    this.className = myClass;
    this.items = items;
}

//Наследование от контейнер (прототипное)
Main.prototype = Object.create(Container.prototype);
Main.prototype.constructor = Main;

Main.prototype.render = function () {
    let result = '<ul class="' + this.className + '" id="' + this.id + '">';

    for (let i = 0; i < this.items.length; i++) {
        if (this.items[i] instanceof MenuItem) {        // Проверка, принадлежит ли items к MenuItem с учётом наследования
            result += this.items[i].render();
        }
    }
    result += '</ul>';
    this.htmlCode = result;
    return result;
};

// --- Класс Пункт меню
function MenuItem(href, title) {
    this.href = href;
    this.title = title;
}

MenuItem.prototype.render = function () {
    return '<li><a href="' + this.href + '">' + this.title + '</a></li>';
};

// --- Создание структуры меню
let menu1 = new Main('my-menu', 'my-menu', [
    new MenuItem('/', 'Главная'),
    new MenuItem('/about/', 'О компании'),
    new MenuItem('/blog/', 'Блог'),
    new MenuItem('/shops/', 'Магазины'),
    new MenuItem('/contacts/', 'Мы на карте'),
    new MenuItem('/test', 'Test')
]);

window.onload = function () {
    document.getElementById('menu').innerHTML = menu1.render();
};