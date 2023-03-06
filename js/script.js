const cells = document.querySelectorAll('.field__cell'), //список ячеек
  field = document.querySelector('.field'), //поле с числами
  seconds = document.querySelector('.timer__seconds'),
  milliseconds = document.querySelector('.timer__milliseconds'),
  start = document.querySelector('#start-button'),
  wrapper = document.querySelector('.button__wrapper'),
  results = document.querySelector('#results-button'),
  resultsWrapper = document.querySelector('.results'),
  resultsTitle = document.querySelector('.results__title'),
  resultsClose = document.querySelector('.results__close'),
  resultsList = document.querySelector('.results__list'),
  stop = document.querySelector('#stop-button'),
  help = document.querySelector('#modal-help'),
  helpButton = document.querySelector('#help-button'),
  helpClose = document.querySelector('.help__close');

let numbers = [], //массив для чисел
    num, //переменная для хранения случайного числа из массива
    resultsOpen = false,
    timerStart = false,
    gameIsOn = false,
    helpIsOpen = false;

//сохранение результатов в LocalStorage
const keyName = 'schulte';

let today = () => {
  const date = new Date();
  let d = date.getDate(),
      m = date.getMonth() + 1,
      y = date.getFullYear();

  if (m < 10) m = `0${m}`;
  if (d < 10) d = `0${d}`;

  return `${d}.${m}.${y}`;
}

let games = {
  gameId: {}
};

function storageSetData() {
  saveResults();
  localStorage.setItem(keyName, JSON.stringify(games));
}

function storageGetData() {
  let key = keyName;
  let previousData = localStorage.getItem(key);

  let previousDataObj = JSON.parse(previousData);


  games.gameId = previousDataObj.gameId;

}

let result = 0;

function saveResults() {
  games.gameId[`${keyName}-${Date.now()}`] = {
    date: today(),
    result: `${seconds.textContent}:${milliseconds.textContent}`
  };
}

function updateStorage() {
  result++;

  if (keyName in localStorage) {
    //достаем данные из localStorage, сохраняем в объект game
    storageGetData();
    //сохраняем новые результаты в объект game
    storageSetData();
  } else {
    storageSetData();
  }
}

//запись результатов

function writingResults() {
  clearResultList();
  let list = localStorage.getItem(keyName);
  let listObj = JSON.parse(list);

  for (const key in listObj) {
    const element = listObj[key];
    for (const key1 in element) {
      const el = element[key1];
      resultsList.innerHTML += `<li class="results__item"><span class="results__date">${el.date}</span><span class="results__time">${el.result}</span></li>`;
    }
  }
}
writingResults();

//инициализация поля игры
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function fillArray() {
  //заполнение массива
  for (let i = 0; i < cells.length; i++) {
    numbers[i] = i + 1;
  }
  //заполнение ячеек случайными числами из массива
  for (let i = 0; i < cells.length; i++) {
    num = numbers.splice(getRandomInt(numbers.length), 1);
    cells[i].textContent = num;
  }
}

//очистка поля
function clearArray() {
  for (let el of cells) {
    el.textContent = '';
  }
}

//старт игры
start.addEventListener('click', game)

//игра
function game() {
  gameIsOn = true;
  stop.style.display = 'block';
  count = 1;
  wrapper.style.display = 'none';
  clearTimer();
  fillArray();
  timer();
  start.removeEventListener('click', game);
}

//таймер
let count = 1; //внешний счетчик для чисел

let pastSec = 0; //начальные значения таймера
let pastMsec = 0;

function clearTimer() {
  pastSec = 0;
  pastMsec = 0;
  seconds.textContent = '00';
  milliseconds.textContent = '00';
}

function timer() {
  let timerId = setTimeout(timer, 10);

  if (pastSec < 10) {
    seconds.textContent = `0${pastSec}`;
  } else {
    seconds.textContent = pastSec;
  }

  if (pastMsec < 10) {
    milliseconds.textContent = `0${pastMsec}`;
  } else {
    milliseconds.textContent = pastMsec;
  }

  pastMsec++;

  if (pastMsec === 100) {
    pastMsec = 0;
    pastSec++;
  }

  stop.addEventListener('click', function () {
    gameIsOn = false;
    clearTimeout(timerId);
    wrapper.style.display = 'flex';
    clearTimer();
    clearArray();
    stop.style.display = 'none';
    start.addEventListener('click', game);
  })

  field.addEventListener('click', function (e) {
    if (e.target.textContent == count) {
      e.target.textContent = '';
      count++;

    }
  })

  if (count === 26) {
    updateStorage();
    writingResults();
    clearTimeout(timerId);
    gameIsOn = false;
    start.addEventListener('click', game);
    setTimeout(() => {
      showResults();
      clearTimer();
    }, 1000)
  }
}

// список результатов

let it = 0;

results.addEventListener('click', () => {
  if (!resultsOpen && !gameIsOn) {
    showResults();
  } else {
    hideResults();
  }

  if(helpIsOpen) {
    modalHelp();
  }
})

resultsClose.addEventListener('click', () => {
  hideResults();
})

function showResults() {
  resultsOpen = true;
  it += 10;
  resultsWrapper.style.width = `${it}px`;
  if (resultsWrapper.clientWidth >= field.clientWidth) {
    resultsWrapper.style.width = `${field.clientWidth}px`;
    resultsTitle.style.visibility = 'visible';
    resultsClose.style.display = 'block';
    resultsList.style.visibility = 'visible';


    return;
  }
  setTimeout(showResults, 5);
}

function hideResults() {
  resultsOpen = false;

  if (resultsTitle.style.visibility === 'visible') {
    resultsTitle.style.visibility = 'hidden';
    resultsClose.style.display = 'none';
    resultsList.style.visibility = 'hidden';
  }
  it -= 10;
  resultsWrapper.style.width = `${it}px`;
  if (resultsWrapper.clientWidth <= 0) {
    resultsWrapper.style.width = '0px';

    return;
  }
  setTimeout(hideResults, 5);
}

function clearResultList() {
  resultsList.innerHTML = '';
}

//подсказка
helpButton.addEventListener('click', () => {
  modalHelp();
})

helpClose.addEventListener('click', () => {
  modalHelp();
})

function modalHelp() {
  if(!helpIsOpen && !gameIsOn) {
    help.classList.add('_active');
    helpIsOpen = true;
  } else {
    help.classList.remove('_active');
    helpIsOpen = false;
  }
}