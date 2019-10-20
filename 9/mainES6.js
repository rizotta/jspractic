class BaseCar {
    constructor(model, color, year) {
        this.model = model;
        this.color = color;
        this.year = year;
    }

    show() {                                                // Функция будет находиться в prototype
        console.log(this.model, this.color, this.year);
    }
}

class Car extends BaseCar {
    constructor(model, color, year, description) {
        super(model, color, year);                          // Вызов конструктора родителя (перед this, иначе - ошибка)
        this.description = description;
    }

    show() {
        super.show();                                       // Вызов родительского метода
        console.log(this.description);
    }
}

let car1 = new BaseCar('Honda', 'black', 2015);
console.log(car1);
car1.show();

let car2 = new Car('Mazda', 'white', 2019, 'Gift');
console.log(car2);
car2.show();