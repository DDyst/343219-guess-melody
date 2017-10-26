// Модуль для смены экранов и обработки ответов пользователя

import createResultsView from './results.js';
import {levels as gameLevels, GameState, Points, QUICK_ANSWER_TIME} from './data.js';
import {areArrayElementsIncludedInAnotherArray} from './util.js';
import levelRepresentation from './level-representation.js';

let playerAnswers;
let levels;
let gameState;
const screenContainer = document.querySelector(`.main`);

// Функция смены экрана
const changeView = (view) => {
  screenContainer.innerHTML = ``;
  screenContainer.appendChild(view.element);
};

// Функция для подготовки данных к началу новой игры
const startNewGame = () => {
  gameState = new GameState();
  playerAnswers = [];
  levels = gameLevels.slice();
};

// Функция для показа следующего экрана во время прохождения игры
const showNextScreen = () => {
  if (gameState.notesLeft < 0) {
    changeView(createResultsView(gameState, playerAnswers));
  } else if (levels.length) {
    const nextLevel = levels.shift();
    changeView(levelRepresentation[nextLevel.type](gameState, nextLevel));
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
const handleCorrectAnswer = (startTime) => {
  const pointsGain = (startTime - gameState.timeLeft < QUICK_ANSWER_TIME) ? Points.CORRECT_QUICK : Points.CORRECT_SLOW;
  playerAnswers.push(pointsGain);
};

// Функция проверки ответов пользователя на экране выбора жанра
const checkGenreAnswer = (chosenTracksSources, answers, startTime) => {
  const correctAnswersSources = answers.filter((item) => item.correct).map((item) => item.src);

  if (chosenTracksSources.length !== correctAnswersSources.length || !areArrayElementsIncludedInAnotherArray(chosenTracksSources, correctAnswersSources)) {
    handleIncorrectAnswer();
  } else {
    handleCorrectAnswer(startTime);
  }
};

// Функция проверки ответов пользователя на экране выбора артиста
const checkArtistAnswer = (chosenArtist, answers, startTime) => {
  const correctAnswer = answers.find((item) => item.correct).artist;

  if (chosenArtist !== correctAnswer) {
    handleIncorrectAnswer();
  } else {
    handleCorrectAnswer(startTime);
  }
};

export {startNewGame, changeView, checkArtistAnswer, checkGenreAnswer, showNextScreen};
