let cells = document.querySelectorAll('.field__cell');//список ячеек
let field = document.querySelector('.field');//поле с числами
let numbers = [];//массив для чисел
let num;//переменная для хранения случайного числа из массива
let seconds = document.querySelector('.timer__seconds');
let milliseconds = document.querySelector('.timer__milliseconds');
let start = document.querySelector('#start-button');
let wrapper = document.querySelector('.button__wrapper');
let results = document.querySelector('#results-button');
let resultsWrapper = document.querySelector('.results');
let resultsTitle = document.querySelector('.results__title');
let resultsClose = document.querySelector('.results__close');
let resultsList = document.querySelector('.results__list');
let stop = document.querySelector('#stop-button');
let resultsOpen = false;
let timerStart = false;

console.log(start);

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
    stop.style.display = 'block';
    count = 1;
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
  let timerId = setTimeout(timer, 10);

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

    stop.addEventListener('click', function () {
        clearTimeout(timerId);
        wrapper.style.display = 'flex';
        seconds.textContent = '00';
        milliseconds.textContent = '00';
        clearArray();
        stop.style.display = 'none';
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
        resultsList.innerHTML += `<li>${seconds.textContent}:${milliseconds.textContent}</li>`;
        clearTimeout(timerId);
        start.addEventListener('click', game)
    }
}

// список результатов

let it = 0;

results.addEventListener('click', () => {
  if(!resultsOpen) {
    showResults();
  } else {
    hideResults();
  }
  resultsOpen = !resultsOpen;
})

resultsClose.addEventListener('click', () => {
    hideResults();
})

function showResults() {
    it += 10;
    resultsWrapper.style.width = `${it}px`;
    if(resultsWrapper.clientWidth >= field.clientWidth) {
        resultsWrapper.style.width = `${field.clientWidth}px`;
        resultsTitle.style.visibility = 'visible';
        resultsClose.style.display = 'block';
        resultsList.style.visibility = 'visible';
        console.log(field.clientWidth);
        console.log(resultsWrapper.clientWidth);
        return;
    }
    setTimeout(showResults, 5); 
}

function hideResults() {
    if(resultsTitle.style.visibility === 'visible') {
        resultsTitle.style.visibility = 'hidden';
        resultsClose.style.display = 'none';
        resultsList.style.visibility = 'hidden';
    }
    it -= 10;
    resultsWrapper.style.width = `${it}px`;
    if(resultsWrapper.clientWidth <= 0) {
        resultsWrapper.style.width = '0px';
        console.log(resultsWrapper.clientWidth);
        return;
    }
    setTimeout(hideResults, 5); 
}

// console.log(resultsWrapper.style.width);

// console.log(typeof resultsWrapper.style.width);
// console.log(typeof +resultsWrapper.style.width);
