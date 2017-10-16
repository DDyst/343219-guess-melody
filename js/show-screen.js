// Модуль для отрисовки экранов

import {isEnterPressed, areArrayElementsIncludedInAnotherArray} from './util.js';
import welcomeScreenElement from './screen-welcome.js';
import createLevelScreenElement from './screen-level.js';
import createResultsScreenElement from './screen-results.js';
import {levels as gameLevels, InitialState, resultsScreenData, statistics as othersScore, points} from './data.js';
import {scoringSetup, countScore, countQuickAnswers} from './count-score.js';

let playerAnswers;
let levels;
let gameState;
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
  gameState = new InitialState();
  playerAnswers = [];
  levels = gameLevels.slice();
};

// Функция для показа следующео экрана во время прохождения игры
const showNextScreen = () => {
  if (gameState.notesLeft < 0) {
    screen.showResult();
  } else if (levels.length) {
    screen.showLevel(levels.shift());
  } else {
    screen.showResult();
  }
};

// Функция для обработки неверного ответа пользователя
const handleIncorrectAnswer = () => {
  playerAnswers.push(points.INCORRECT);
  gameState.notesLeft--;
};

// Функция для обработки верного ответа пользователя
const handleCorrectAnswer = () => {
  /*
    Тут должно учитываться время ответа,
    но пока у нас нет таймера
    и все ответы будем считать медленными
  */
  playerAnswers.push(points.CORRECT_SLOW);
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

// Обработчики событий
const startButtonClickHandler = () => {
  startNewGame();
  screen.showLevel(levels.shift());
};

const replayButtonClickHandler = () => {
  screen.showWelcome();
};

const replayButtonKeydownHandler = (evt) => {
  if (isEnterPressed(evt.key)) {
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

  showLevel(level) {
    showScreen(createLevelScreenElement(gameState, level));
    if (level.type === `genre`) {
      const genreForm = screenContainer.querySelector(`.genre`);
      const submitButton = screenContainer.querySelector(`.genre-answer-send`);
      const answersCheckboxes = screenContainer.querySelectorAll(`input[name="answer"]`);

      const genreFormChangeHandler = () => {
        changeButtonDisability(submitButton, answersCheckboxes);
      };

      const genreFormSubmitHandler = (evt) => {
        checkGenreAnswer(answersCheckboxes, level.answers);
        evt.currentTarget.reset();
        showNextScreen();
      };

      submitButton.disabled = true;

      genreForm.addEventListener(`change`, genreFormChangeHandler, true);
      genreForm.addEventListener(`submit`, genreFormSubmitHandler);
    } else {
      const answersContainer = screenContainer.querySelector(`.main-list`);

      const answersContainerClickHandler = (evt) => {
        acceptAnswer(evt.target, level.answers);
      };

      const answersContainerKeydownHandler = (evt) => {
        if (isEnterPressed(evt.key)) {
          acceptAnswer(evt.target, level.answers);
        }
      };

      answersContainer.addEventListener(`click`, answersContainerClickHandler);
      answersContainer.addEventListener(`keydown`, answersContainerKeydownHandler);
    }
  },

  showResult() {
    /*
      Не вижу смысла создавать отдельную структуру данных под результаты игрока,
      т.к. наш объект с состоянием игры и так содержит почти всю необходимую информацию.
      Остаётся только добавить в него недостающие поля: количество набранных баллов и быстрых ответов.
    */
    gameState.score = countScore(playerAnswers);
    gameState.quickAnswers = countQuickAnswers(playerAnswers);

    if (!gameState.timeLeft) {
      showScreen(createResultsScreenElement(resultsScreenData.timeout, othersScore.slice(), gameState));
    } else if (gameState.score === scoringSetup.FAILURE_SCORE) {
      showScreen(createResultsScreenElement(resultsScreenData.defeat, othersScore.slice(), gameState));
    } else {
      showScreen(createResultsScreenElement(resultsScreenData.success, othersScore.slice(), gameState));
    }

    const replayButton = screenContainer.querySelector(`.main-replay`);

    replayButton.addEventListener(`click`, replayButtonClickHandler);
    replayButton.addEventListener(`keydown`, replayButtonKeydownHandler);
  }
};

export default screen;
