// Модуль для управления всеми экранами приложения

import welcomeScreen from './welcome.js';
import resultsScreen from './results.js';
import GameState from './model/game-state.js';
import {presentersRelation} from './levels-relations.js';
import artistLevelScreen from './artist-level.js';
import genreLevelScreen from './genre-level.js';

const ControllerId = {
  WELCOME: ``,
  GAME: `game`,
  SCORE: `score`
};

const saveState = (state) => {
  return JSON.stringify(state);
};

const loadState = (dataString) => {
  try {
    return JSON.parse(dataString);
  } catch (e) {
    throw new Error();
  }
};

const routes = {
  [ControllerId.WELCOME]: welcomeScreen,
  [ControllerId.GAME]: genreLevelScreen,
  [ControllerId.SCORE]: resultsScreen
};

class Application {
  static init() {
    const hashChangeHandler = () => {
      const hashValue = window.location.hash.replace(`#`, ``);
      const [id, data] = hashValue.split(`?`);
      this.changeHash(id, data);
    };
    window.onhashchange = hashChangeHandler;
    hashChangeHandler();
  }

  static changeHash(id, data) {
    const controller = routes[id];
    if (controller) {
      controller.init(loadState(data));
    }
  }

  static showWelcome() {
    this.gameState = new GameState();
    // welcomeScreen.init(this.gameState);
    window.location.hash = location.hash = ControllerId.WELCOME;
  }
//
  static showLevel(state) {
    // presentersRelation[state.level.type].init(state);
    window.location.hash = `${ControllerId.GAME}?${saveState(state)}`;
  }

  static showResults(state) {
    // resultsScreen.init(state);
    window.location.hash = `${ControllerId.SCORE}?${saveState(state)}`;
  }
}

Application.init();

export default Application;
