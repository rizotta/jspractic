function changeBigPicture(event) {
    if (event.target.tagName !== 'IMG') {               // если клик не на изображение, то ничего не делаем
        return;
    }

    let getBigPhoto = function(name) {
        let path = 'img/big/';                                      // путь к папке с большими изображениями
        let indexOfName = name.lastIndexOf('/');                    // ищем индекс, после которого будет имя файла
        let imgName = event.target.src.slice(indexOfName + 1);      // вырезаем из адреса имя изображения
        img.src = path + imgName;                                   // находим большое изображения в папке по имени
    };

    let img = new Image();                              // создаём новый элемент img через конструктор

    getBigPhoto(event.target.src);
    big.innerHTML = ('');                               // очищаем блок для нового изображения\

    img.onload = function(){                            // если всё успешно
        big.appendChild(img);                           // вставляем большое изображение

        let btnLeft = document.querySelector('.btn-left');
        btnLeft.style.display = 'block';
        let btnRight = document.querySelector('.btn-right');
        btnRight.style.display = 'block';

        let next = event.target.nextElementSibling;
        console.log(next);

    };
    img.onerror = function(){                           // если возникла ошибка во время загрузки, пишем об этом
        big.innerHTML = ('Изображение большого размера не найдено.');
    };


}

// отображаем большие изображения по ссылке на миниатюры
let big = document.getElementById('big_picture');
let gallery = document.getElementById('gallery');
gallery.addEventListener('click', changeBigPicture);


// запрещаем стандартный переход по ссылке
let back = document.getElementById('false-back');
back.addEventListener('click', function (event) {
   event.preventDefault();
});

