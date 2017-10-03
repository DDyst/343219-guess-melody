// Модуль для отрисовки экранов

import {isEnterPressed, getRandomArrayItem} from './util.js';
import welcomeScreenElement from './screen-welcome.js';
import artistScreenElement from './screen-artist.js';
import genreScreenElement from './screen-genre.js';
import successScreenElement from './screen-success.js';
import timeoutScreenElement from './screen-timeout.js';
import defeatScreenElement from './screen-defeat.js';

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
    screen.showGenre();
  }
};

// Функция, проверяющая чекбоксы ответов на экране выбора жанра и блокирующая кнопку отправки формы в случае, если ни один ответ не выбран
const checkAnswers = (buttonElement, checkboxesElements) => {
  buttonElement.disabled = !(Array.from(checkboxesElements).some((item) => item.checked));
};

// Обработчики событий
const startButtonClickHandler = () => {
  screen.showArtist();
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
  screen.showResult();
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

  showArtist() {
    showScreen(artistScreenElement);

    const answersContainer = screenContainer.querySelector(`.main-list`);

    answersContainer.addEventListener(`click`, answersContainerClickHandler);
    answersContainer.addEventListener(`keydown`, answersContainerKeydownHandler);
  },

  showGenre() {
    showScreen(genreScreenElement);

    const genreForm = screenContainer.querySelector(`.genre`);
    const submitButton = screenContainer.querySelector(`.genre-answer-send`);
    const answersCheckboxes = screenContainer.querySelectorAll(`input[name="answer"]`);

    const genreFormChangeHandler = () => {
      checkAnswers(submitButton, answersCheckboxes);
    };

    submitButton.disabled = true;

    genreForm.addEventListener(`change`, genreFormChangeHandler, true);
    genreForm.addEventListener(`submit`, genreFormSubmitHandler);
  },

  showResult() {
    showScreen(getRandomArrayItem([successScreenElement, timeoutScreenElement, defeatScreenElement]));

    const replayButton = screenContainer.querySelector(`.main-replay`);

    replayButton.addEventListener(`click`, replayButtonClickHandler);
    replayButton.addEventListener(`keydown`, replayButtonKeydownHandler);
  }
};

export default screen;
