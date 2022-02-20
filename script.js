let cells = document.querySelectorAll('.field__cell');//список ячеек
let field = document.querySelector('.field');//поле с числами
let numbers = [];//массив для чисел
let num;//переменная для хранения случайного числа из массива
let seconds = document.querySelector('.timer__seconds');
let milliseconds = document.querySelector('.timer__milliseconds');
let start = document.querySelector('.start-button');
let wrapper = document.querySelector('.button__wrapper');
let results = document.querySelector('.results');
let stop = document.querySelector('.stop-button');

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function fillArray() {
    //заполнение массива
    for(let i = 0; i < cells.length; i++) {
        numbers[i] = i + 1;
    }
    //заполнение ячеек случайными числами из массива
    for(let i = 0; i < cells.length; i++) {
        num = numbers.splice(getRandomInt(numbers.length), 1);
        cells[i].textContent = num;
    }
}

//очистка поля
function clearArray() {
    for(let el of cells) {
        el.textContent = '';
    }
}

//старт игры
start.addEventListener('click', game)

//игра
function game() {
    count = 1;
    start.textContent = 'Стоп';
    wrapper.style.display = 'none';
    pastSec = 0;
    pastMsec = 0;
    fillArray();
    timer();
    start.removeEventListener('click', game);
}

//таймер
let count = 1;//внешний счетчик для чисел

let pastSec = 0;//начальные значения таймера
let pastMsec = 0;

function timer() {
    if(pastSec < 10) {
        seconds.textContent = `0${pastSec}`;
    } else {
        seconds.textContent = pastSec;
    }
    
    if(pastMsec < 10) {
        milliseconds.textContent = `0${pastMsec}`;
    } else {
        milliseconds.textContent = pastMsec;
    }
    
    pastMsec++;

    if(pastMsec === 100) {
        pastMsec = 0;
        pastSec++;
    }

    start.addEventListener('click', function () {
        clearTimeout(timerId);
        start.textContent = 'Старт';
        seconds.textContent = '00';
        milliseconds.textContent = '00';
        clearArray();
        start.addEventListener('click', game);
    })

    field.addEventListener('click', function (e) {
        if(e.target.textContent == count) {
            e.target.textContent = '';
            count++;
            console.log(count);
        }
    })

    if(count === 26) {
        clearTimeout(timerId);
        start.textContent = 'Старт';
        start.addEventListener('click', game)
    }

    let timerId = setTimeout(timer, 10);
}
