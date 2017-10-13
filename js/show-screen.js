// Модуль для отрисовки экранов

import {isEnterPressed} from './util.js';
import welcomeScreenElement from './screen-welcome.js';
import createLevelScreenElement from './screen-level.js';
import createResultsScreenElement from './screen-results.js';
import {levels as gameLevels, initialState, resultsScreenData, statistics as othersScore, playerResult} from './data.js';

// let playerAnswers;
let levels;
const screenContainer = document.querySelector(`.main`);

// Функция для отрисовки нужного экрана на странице
const renderScreen = (screenElement) => {
  screenContainer.appendChild(screenElement);
};

// Функция, удаляющая из DOM текущий экран при его наличии
const removeScreen = () => {
  if (screenContainer.querySelector(`.main`)) {
    screenContainer.removeChild(screenContainer.querySelector(`.main`));
  }
};

// Функция для показа другого экрана
const showScreen = (screenElement) => {
  removeScreen();
  renderScreen(screenElement);
};

// Функция для принятия ответа на экране выбора артиста
const acceptAnswer = (target) => {
  if (target.closest(`.main-answer`)) {
    showNextScreen();
  }
};

// Функция, проверяющая чекбоксы ответов на экране выбора жанра и блокирующая кнопку отправки формы в случае, если ни один ответ не выбран
const checkAnswers = (buttonElement, checkboxesElements) => {
  buttonElement.disabled = !(Array.from(checkboxesElements).some((item) => item.checked));
};

// Функция для подготовки данных к началу новой игры
const startNewGame = () => {
  // playerAnswers = [];
  levels = gameLevels.slice();
};

const showNextScreen = () => {
  if (levels.length) {
    screen.showLevel(initialState, levels.shift());
  } else {
    screen.showResult(resultsScreenData, othersScore, playerResult);
  }
};

// Обработчики событий
const startButtonClickHandler = () => {
  startNewGame();
  screen.showLevel(initialState, levels.shift());
};

const answersContainerClickHandler = (evt) => {
  acceptAnswer(evt.target);
};

const answersContainerKeydownHandler = (evt) => {
  if (isEnterPressed(evt.keyCode)) {
    acceptAnswer(evt.target);
  }
};

const genreFormSubmitHandler = (evt) => {
  evt.currentTarget.reset();
  showNextScreen();
};

const replayButtonClickHandler = () => {
  screen.showWelcome();
};

const replayButtonKeydownHandler = (evt) => {
  if (isEnterPressed(evt.keyCode)) {
    screen.showWelcome();
  }
};

// Объект с методами для показа различных экранов
const screen = {
  showWelcome() {
    showScreen(welcomeScreenElement);

    const startButton = screenContainer.querySelector(`.main-play`);

    startButton.addEventListener(`click`, startButtonClickHandler);
  },

  showLevel(state, level) {
    showScreen(createLevelScreenElement(state, level));
    if (level.type === `genre`) {
      const genreForm = screenContainer.querySelector(`.genre`);
      const submitButton = screenContainer.querySelector(`.genre-answer-send`);
      const answersCheckboxes = screenContainer.querySelectorAll(`input[name="answer"]`);

      const genreFormChangeHandler = () => {
        checkAnswers(submitButton, answersCheckboxes);
      };

      submitButton.disabled = true;

      genreForm.addEventListener(`change`, genreFormChangeHandler, true);
      genreForm.addEventListener(`submit`, genreFormSubmitHandler);
    } else {
      const answersContainer = screenContainer.querySelector(`.main-list`);

      answersContainer.addEventListener(`click`, answersContainerClickHandler);
      answersContainer.addEventListener(`keydown`, answersContainerKeydownHandler);
    }
  },

  showResult(screenData, statistics, result) {
    if (!result.timeLeft) {
      showScreen(createResultsScreenElement(screenData.timeout, statistics, result));
    } else if (result.score === -1) {
      showScreen(createResultsScreenElement(screenData.defeat, statistics, result));
    } else {
      showScreen(createResultsScreenElement(screenData.success, statistics, result));
    }

    const replayButton = screenContainer.querySelector(`.main-replay`);

    replayButton.addEventListener(`click`, replayButtonClickHandler);
    replayButton.addEventListener(`keydown`, replayButtonKeydownHandler);
  }
};

export default screen;
