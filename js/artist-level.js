// Модуль для создания представления экрана игры на выбор исполнителя и управления им

import ArtistLevelView from './view/artist-level-view.js';
import changeView from './view/change-view.js';
import Application from './application.js';
import GameState from './model/game-state.js';

class ArtistLevelScreen {
  constructor() {
    this.state = new GameState();
    this.view = new ArtistLevelView(this.state);
  }

  init(state) {
    this.startTime = state.timeLeft;
    this.state = state;
    this.view = new ArtistLevelView(this.state);
    this.view.choiceHandler = (chosenArtist, answers) => {
      this.stopTimer();
      this.state.checkArtistAnswer(chosenArtist, answers, this.startTime);
      if (this.state.notes < 0) {
        Application.showResults(this.state);
      } else if (this.state.levels.length) {
        this.showNextLevel();
      } else {
        Application.showResults(this.state);
      }
    };
    changeView(this.view);
    this.tick();
  }

  showNextLevel() {
    this.state.setNextLevel();
    Application.showLevel(this.state);
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

export default new ArtistLevelScreen();
