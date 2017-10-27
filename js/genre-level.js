// Модуль для создания представления экрана игры на выбор жанра и управления им

import GenreLevelView from './view/genre-level-view.js';
import {checkGenreAnswer, showNextScreen} from './change-view.js';
import createTimer from './timer.js';

const createGenreLevelView = (state, level) => {
  const genreLevelView = new GenreLevelView(state, level);
  const startTime = state.timeLeft;
  const timer = createTimer(genreLevelView);

  genreLevelView.formChangeHandler = (button, checkboxes) => {
    genreLevelView.changeButtonDisability(button, checkboxes);
  };

  genreLevelView.formSubmitHandler = (form, chosenTracksSources, answers) => {
    window.clearInterval(timer);
    checkGenreAnswer(chosenTracksSources, answers, startTime);
    form.reset();
    showNextScreen();
  };

  return genreLevelView;
};

export default createGenreLevelView;
