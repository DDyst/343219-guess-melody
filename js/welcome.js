// Модуль для создания представления экрана приветствия и управления им

import WelcomeView from './view/welcome-view.js';
import changeView from './view/change-view.js';
import Application from './application.js';

class WelcomeScreen {
  constructor() {
    this.view = new WelcomeView();
    this.view.startButtonClickHandler = () => this.startButtonClickHandler();
  }

  init(state) {
    this.state = state;
    changeView(this.view);
  }

  startButtonClickHandler() {
    Application.showLevel(this.state);
  }
}

export default new WelcomeScreen();
