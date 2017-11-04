// Модуль для создания представления экрана приветствия и управления им

import WelcomeView from './view/welcome-view.js';
import changeView from './view/change-view.js';
import Application from './application.js';
import GameState from './model/game-state.js';
import {initialData} from './model/data.js';

class WelcomeScreen {
  constructor() {
    this.view = new WelcomeView();
    this.view.startButtonClickHandler = () => this.startButtonClickHandler();
  }

  init() {
    changeView(this.view);
  }

  startButtonClickHandler() {
    Application.showLevel(new GameState(Application.gameData, initialData.time, initialData.notes));
  }
}

export default new WelcomeScreen();
