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
const acceptAnswer = (target, currentTarget) => {
  while (target !== currentTarget) {
    if (target.classList.contains(`main-answer`)) {
      screen.showGenre();
      break;
    }
    target = target.parentNode;
  }
};

// Функция для предотвращения отправки формы при нажатии на кнопку проигрыша аудио на экране выбора жанра
const blockControlButtons = (evt) => {
  if (evt.target.classList.contains(`player-control`)) {
    evt.preventDefault();
  }
};

// Обработчики событий
const startButtonClickHandler = () => {
  screen.showArtist();
};

const startButtonKeydownHandler = (evt) => {
  if (isEnterPressed(evt.keyCode)) {
    screen.showArtist();
  }
};

const answersContainerClickHandler = (evt) => {
  acceptAnswer(evt.target, evt.currentTarget);
};

const answersContainerKeydownHandler = (evt) => {
  if (isEnterPressed(evt.keyCode)) {
    acceptAnswer(evt.target, evt.currentTarget);
  }
};

const genreFormClickHandler = (evt) => {
  blockControlButtons(evt);
};

const genreFormKeydownHandler = (evt) => {
  if (isEnterPressed(evt.keyCode)) {
    blockControlButtons(evt);
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
    startButton.addEventListener(`keydown`, startButtonKeydownHandler);
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
      if (Array.from(answersCheckboxes).some((item) => item.checked)) {
        submitButton.disabled = false;
      } else {
        submitButton.disabled = true;
      }
    };

    submitButton.disabled = true;

    genreForm.addEventListener(`change`, genreFormChangeHandler, true);
    genreForm.addEventListener(`click`, genreFormClickHandler);
    genreForm.addEventListener(`keydown`, genreFormKeydownHandler);
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
