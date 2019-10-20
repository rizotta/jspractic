//Функция-конструктор
function User(name, email) {
    this.name = name;
    this.email = email;
}

User.prototype.showInfo = function () {                     // Метод для примера наследования
    console.log('this.showInfo()', this.name, this.email);
};

function Developer(name, email, department) {
    User.call(this, name, email);
    this.department = department;
}
Developer.prototype = Object.create(User.prototype);    // В прот. Developer записываем новый объект на основании прот. User
Developer.prototype.constructor = Developer;            // Восстанавлиаем constructor в прототипе Developer

let user1 = new User('Anna', 'anna@an.ru');
console.log(user1);
user1.showInfo();
let user2 = new Developer('Oleg', 'ol@eg.ru', 'Frontend');
console.log(user2);
user2.showInfo();
