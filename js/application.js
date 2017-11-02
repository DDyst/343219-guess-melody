// Модуль для управления всеми экранами приложения

import welcomeScreen from './welcome.js';
import resultsScreen from './results.js';
import GameState from './model/game-state.js';
import levelRepresentation from './level-representation.js';

class Application {
  static showWelcome() {
    this.gameState = new GameState();
    welcomeScreen.init(this.gameState);
  }

  static showLevel(state) {
    levelRepresentation[state.level.type].init(state);
  }

  static showResults(state) {
    resultsScreen.init(state);
  }
}

export default Application;
