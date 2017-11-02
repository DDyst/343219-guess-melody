// Модуль для создания представления экрана игры на выбор жанра и управления им

import GenreLevelView from './view/genre-level-view.js';
import changeView from './view/change-view.js';
import Application from './application.js';
import GameState from './model/game-state.js';

class GenreLevelScreen {
  constructor() {
    this.state = new GameState();
    this.view = new GenreLevelView(this.state);
  }

  init(state) {
    this.startTime = state.timeLeft;
    this.state = state;
    this.view = new GenreLevelView(this.state);
    this.view.formSubmitHandler = (form, chosenTracksSources, answers) => {
      this.stopTimer();
      this.state.checkGenreAnswer(chosenTracksSources, answers, this.startTime);
      form.reset();
      this.showNextScreen();
    };
    changeView(this.view);
    this.tick();
  }

  showNextScreen() {
    if (this.state.notes < 0) {
      Application.showResults(this.state);
    } else if (this.state.levels.length) {
      this.state.setNextLevel();
      Application.showLevel(this.state);
    } else {
      Application.showResults(this.state);
    }
  }

  tick() {
    this.state.tick();
    this.view.updateTime();
    this.timer = window.setTimeout(() => this.tick(), 1000);
  }

  stopTimer() {
    window.clearTimeout(this.timer);
  }
}

export default new GenreLevelScreen();
