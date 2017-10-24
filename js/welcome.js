// Модуль для создания представления экрана приветствия и управления им

import WelcomeView from './view/welcome-view.js';
import {startNewGame, showNextScreen} from './change-view.js';

const createWelcomeView = () => {
  const welcomeView = new WelcomeView();

  welcomeView.startButtonClickHandler = () => {
    startNewGame();
    showNextScreen();
  };

  return welcomeView;
};

export default createWelcomeView;
