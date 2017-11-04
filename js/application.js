// Модуль для управления всеми экранами приложения

import welcomeScreen from './welcome.js';
import resultsScreen from './results.js';
import GameState from './model/game-state.js';
import {presentersRelation} from './levels-relations.js';
// import artistLevelScreen from './artist-level.js';
// import genreLevelScreen from './genre-level.js';
// import Loader from './loader.js';

// const ControllerId = {
//   WELCOME: ``,
//   GENRE: `genreLevel`,
//   ARTIST: `artistLevel`,
//   SCORE: `score`
// };

// const saveState = (state) => {
//   return JSON.stringify(state);
// };

// const loadState = (dataString) => {
//   try {
//     return JSON.parse(dataString);
//   } catch (e) {
//     throw new Error();
//   }
// };

class Application {
  static init() { // (data)
    // this.gameData = data;
    // this.routes = {
    //   [ControllerId.WELCOME]: welcomeScreen,
    //   [ControllerId.ARTIST]: new artistLevelScreen(this.gameData),
    //   [ControllerId.GENRE]: new genreLevelScreen(this.gameData),
    //   [ControllerId.SCORE]: resultsScreen
    // };

  //   const hashChangeHandler = () => {
  //     const hashValue = window.location.hash.replace(`#`, ``);
  //     const [id, data] = hashValue.split(`?`);
  //     this.changeHash(id, data);
  //   };
  //   window.onhashchange = hashChangeHandler;
  //   hashChangeHandler();
  // }

  // static changeHash(id, data) {
  //   const controller = routes[id];
  //   if (controller) {
  //     controller.init(loadState(data));
  //   }
  }

  static showWelcome() {
    this.gameState = new GameState(this.gameData);
    welcomeScreen.init(this.gameState);
    // location.hash = location.hash = ControllerId.WELCOME;
  }

  static showLevel(state) {
    presentersRelation[state.level.type].init(state);
    // location.hash = `${ControllerId.GAME}?${saveState(state)}`;
  }

  static showResults(state) {
    resultsScreen.init(state);
    // location.hash = `${ControllerId.SCORE}?${saveState(state)}`;
  }
}

// Loader.loadData().then((gameData) => Application.init(gameData)).catch(window.console.error);

export default Application;
