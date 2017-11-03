// Модуль для создания представления экрана игры на выбор жанра и управления им

import LevelScreen from './level.js';

class GenreLevelScreen extends LevelScreen {
  constructor() {
    super();
  }

  redefineHandlers() {
    this.view.formSubmitHandler = (form, chosenTracksSources, answers) => {
      this.stopTimer();
      this.state.checkGenreAnswer(chosenTracksSources, answers, this.startTime);
      form.reset();
      this.showNextScreen();
    };
  }
}

export default new GenreLevelScreen();
