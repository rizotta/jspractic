let phase = 1;                  // переменная для настройки очерёдности ходов (0 - игрок-нолика, 1 - игрок-крестика)

    let gameMap = [                 // Массив с полем для игры, внутри будет указан тот, кто сделал ход
    [3, 3, 3],               // 3: пустота
    [3, 3, 3],               // 0: ход игрока - нолика
    [3, 3, 3]                // 1: ход игрока - крестика
];

let tictactoe = {
    gameDiv: null,              // элемент, в котором будут крестики-нолики

    renderGame: function() {
        for (let i = 0; i < 3; i++) {                               // рисуем строки
            for (let j = 0; j < 3; j++) {                           // рисуем колонки
                let col = document.createElement('div');
                col.setAttribute('data-row', String(i));        // записываем индекс строки в атрибут
                col.setAttribute('data-col', String(j));        // записываем индекс колонки в атрибут

                col.addEventListener('click', this.gameMove.bind(this));     // делаем ход, вызываем контекст

                this.gameDiv.appendChild(col);                      // сразу помещаем колонку в Div
            }
        }
    },

    gameMove: function(event) {
        let col = event.target;                         // определяем элемент, на который был клик
        let sign;

        let rowNum = col.getAttribute('data-row');      // получаем индекс строки
        let colNum = col.getAttribute('data-col');      // получаем индекс колонки

        if (gameMap[rowNum][colNum] === 3) {           // если строка пуста
            gameMap[rowNum][colNum] = phase;            // устанавливаем ход игрока Х или 0

            if (phase === 1) {          // если ходили Х
                sign = 'X';             // ставим Х
                phase = 0;              // передача хода игроку - нолику
            } else {                    // если ходили 0
                sign = '0';             // ставим 0
                phase = 1;              // передача хода игроку - крестику
            }

            col.innerHTML = sign;       // записываем ход в элемент

            let winner = this.checkResult();
            if (winner === 1) {
                alert('Победа крестиков. Игра начнётся ещё раз.');
                window.location.reload();
            } else if (winner === 0) {
                alert('Победа ноликов. Игра начнётся ещё раз.');
                window.location.reload();
            }

            // если не осталось пустых клеток - повтор
            if (gameMap[0].indexOf(3) === -1 && gameMap[1].indexOf(3) === -1 && gameMap[2].indexOf(3) === -1 ) {
                alert('Ничья. Игра начнётся ещё раз.');
                window.location.reload();
            }
        }
    },

    // находим победителя
    checkResult: function(){
        let winner;

        for (let i = 0; i < 2; i++) {
            if (
                (gameMap[0][0] === i && gameMap[1][0] === i && gameMap[2][0] === i) ||
                (gameMap[0][1] === i && gameMap[1][1] === i && gameMap[2][1] === i) ||
                (gameMap[0][2] === i && gameMap[1][2] === i && gameMap[2][2] === i) ||

                (gameMap[0][0] === i && gameMap[0][1] === i && gameMap[0][2] === i) ||
                (gameMap[1][0] === i && gameMap[1][1] === i && gameMap[1][2] === i) ||
                (gameMap[2][0] === i && gameMap[2][1] === i && gameMap[2][2] === i) ||

                (gameMap[0][0] === i && gameMap[1][1] === i && gameMap[2][2] === i) ||
                (gameMap[2][0] === i && gameMap[1][1] === i && gameMap[0][2] === i)
            ) {
                winner = i;
            }
        }
        return winner;
    },

    run: function() {
        this.gameDiv = document.getElementById('game');
        this.renderGame();
    }
};

window.onload = tictactoe.run.bind(tictactoe);      // ставим bind чтобы run вызывался в контексте функции