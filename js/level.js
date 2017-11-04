// Модуль для создания общего класса уровней игры

import Application from './application.js';
import changeView from './view/change-view.js';
import {viewsRelation} from './levels-relations.js';

class LevelScreen {
  constructor(state) {
    this.state = state;
  }

  init(state) {
    this.startTime = state.timeLeft;
    this.state = state;
    this.view = new viewsRelation[this.state.level.type](this.state);

    this.redefineHandlers();

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
    if (this.state.tick()) {
      this.view.updateTime();
      this.timer = window.setTimeout(() => this.tick(), 1000);
    } else {
      Application.showResults(this.state);
    }
  }

  stopTimer() {
    window.clearTimeout(this.timer);
  }

  redefineHandlers() {
    throw new Error(`You have to define this method`);
  }
}

export default LevelScreen;
