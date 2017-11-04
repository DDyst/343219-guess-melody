// Модуль для управления всеми экранами приложения

import welcomeScreen from './welcome.js';
import resultsScreen from './results.js';
import {presentersRelation} from './levels-relations.js';
import ArtistLevelScreen from './artist-level.js';
import GenreLevelScreen from './genre-level.js';
import Loader from './loader.js';

const ControllerId = {
  WELCOME: ``,
  GENRE: `genreLevel`,
  ARTIST: `artistLevel`,
  SCORE: `score`
};

const saveState = (state) => {
  return window.btoa(encodeURIComponent(JSON.stringify(state)));
};

const loadState = (dataString) => {
  return JSON.parse(decodeURIComponent(window.atob(dataString)));
};

class Application {
  static init(levels) { // (data)
    this.gameData = levels;
    this.routes = {
      [ControllerId.WELCOME]: welcomeScreen,
      [ControllerId.ARTIST]: new ArtistLevelScreen(this.gameData),
      [ControllerId.GENRE]: new GenreLevelScreen(this.gameData),
      [ControllerId.SCORE]: resultsScreen
    };

    const hashChangeHandler = () => {
      const hashValue = window.location.hash.replace(`#`, ``);
      const [id, data] = hashValue.split(`?`);
      this.changeHash(id, data);
    };
    window.onhashchange = hashChangeHandler;
    hashChangeHandler();
  }

  static changeHash(id, data) {
    const controller = this.routes[id];
    if (controller) {
      controller.init(data ? loadState(data) : null);
    }
  }

  static showWelcome() {
    location.hash = location.hash = ControllerId.WELCOME;
  }

  static showLevel(state) {
    const Presenter = presentersRelation[state.level.type];
    (new Presenter()).init(state);
  }

  static showResults(state) {
    location.hash = `${ControllerId.SCORE}?${saveState(state)}`;
  }
}

Loader.loadData().then((gameData) => Application.init(gameData)).catch(window.console.error);

export default Application;
