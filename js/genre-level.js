// Модуль для создания представления экрана игры на выбор жанра и управления им

import GenreLevelView from './view/genre-level-view.js';
import {changeButtonDisability, checkGenreAnswer, showNextScreen} from './change-view.js';

const createGenreLevelView = (state, level) => {
  const genreLevelView = new GenreLevelView(state, level);

  genreLevelView.formChangeHandler = (button, checkboxes) => {
    changeButtonDisability(button, checkboxes);
  };

  genreLevelView.formSubmitHandler = (form, checkboxes, answers) => {
    checkGenreAnswer(checkboxes, answers);
    form.reset();
    showNextScreen();
  };

  return genreLevelView;
};

export default createGenreLevelView;
