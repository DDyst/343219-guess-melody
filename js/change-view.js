// Модуль для смены экранов и обработки ответов пользователя

import createResultsView from './results.js';
import {levels as gameLevels, GameState, Points, levelViews} from './data.js';
import {areArrayElementsIncludedInAnotherArray} from './util.js';

let playerAnswers;
let levels;
let gameState;
const screenContainer = document.querySelector(`.main`);

// Функция смены экрана
const changeView = (view) => {
  screenContainer.innerHTML = ``;
  screenContainer.appendChild(view.element);
};

// Функция для принятия ответа на экране выбора артиста
const acceptAnswer = (target, answers) => {
  if (target.closest(`.main-answer`)) {
    checkArtistAnswer(target.closest(`.main-answer`), answers);
    showNextScreen();
  }
};

// Функция, проверяющая чекбоксы ответов на экране выбора жанра и блокирующая кнопку отправки формы в случае, если ни один ответ не выбран
const changeButtonDisability = (buttonElement, checkboxesElements) => {
  buttonElement.disabled = !(Array.from(checkboxesElements).some((item) => item.checked));
};

// Функция для подготовки данных к началу новой игры
const startNewGame = () => {
  gameState = new GameState();
  playerAnswers = [];
  levels = gameLevels.slice();

  /*
    Таймер надо переделать, пока черновой вариант
  */
  const intervalID = window.setInterval(() => {
    if (!gameState.tick()) {
      changeView(createResultsView(gameState, playerAnswers));
      window.clearInterval(intervalID);
    }
    screenContainer.querySelector(`.timer-value-mins`).textContent = gameState.minutes;
    screenContainer.querySelector(`.timer-value-secs`).textContent = gameState.seconds;
  }, 1000);
};

// Функция для показа следующего экрана во время прохождения игры
const showNextScreen = () => {
  if (gameState.notesLeft < 0) {
    changeView(createResultsView(gameState, playerAnswers));
  } else if (levels.length) {
    const nextLevel = levels.shift();
    changeView(levelViews[nextLevel.type](gameState, nextLevel));
  } else {
    changeView(createResultsView(gameState, playerAnswers));
  }
};

// Функция для обработки неверного ответа пользователя
const handleIncorrectAnswer = () => {
  playerAnswers.push(Points.INCORRECT);
  gameState.notesLeft--;
};

// Функция для обработки верного ответа пользователя
const handleCorrectAnswer = () => {
  /*
    Тут должно учитываться время ответа,
    но пока все ответы будем считать медленными
  */
  playerAnswers.push(Points.CORRECT_SLOW);
};

// Функция проверки ответов пользователя на экране выбора жанра
const checkGenreAnswer = (checkboxesElements, answers) => {
  const chosenAnswers = Array.from(checkboxesElements).filter((item) => item.checked);
  const chosenTracksSources = chosenAnswers.map((item) => item.closest(`.genre-answer`).querySelector(`source`).src);
  const correctAnswersSources = answers.filter((item) => item.correct).map((item) => item.src);

  if (chosenTracksSources.length !== correctAnswersSources.length || !areArrayElementsIncludedInAnotherArray(chosenTracksSources, correctAnswersSources)) {
    handleIncorrectAnswer();
  } else {
    handleCorrectAnswer();
  }
};

// Функция проверки ответов пользователя на экране выбора артиста
const checkArtistAnswer = (chosenAnswer, answers) => {
  const chosenArtist = chosenAnswer.querySelector(`.main-answer-preview`).alt;
  const correctAnswer = answers.find((item) => item.correct).artist;

  if (chosenArtist !== correctAnswer) {
    handleIncorrectAnswer();
  } else {
    handleCorrectAnswer();
  }
};

export {startNewGame, changeView, acceptAnswer, changeButtonDisability, checkGenreAnswer, showNextScreen};
