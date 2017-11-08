// Модуль для создания представления экрана приветствия и управления им

import WelcomeView from './view/welcome-view.js';
import changeView from './view/change-view.js';
import Application from './application.js';
import GameState from './model/game-state.js';
import {initialData} from './model/data.js';

const TRACK_LOADING_TIMEOUT = 10000;

class WelcomeScreen {
  constructor() {
    this.view = new WelcomeView();
    this.view.startButtonClickHandler = () => this.startButtonClickHandler();
  }

  init() {
    changeView(this.view);
    Application.preloadAudio()
        .catch(() => alert(`Аудиофайлы не загрузились`))
        .then(() => this.view.unlockStartButton());

    // Если треки загружаются слишком долго, игра начинается раньше
    window.setTimeout(() => this.view.unlockStartButton(), TRACK_LOADING_TIMEOUT);
  }

  startButtonClickHandler() {
    Application.showLevel(new GameState(Application.gameData, Application.localSources, initialData.time, initialData.notes));
  }
}

export default new WelcomeScreen();
