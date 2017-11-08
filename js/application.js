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

const prepareData = (localSources) => {
  return Promise.all(
      Object.keys(localSources).map((src) => {
        return Loader.loadAudio(src).then((audio) => {
          localSources[src] = audio;
        });
      })
  );
};

const extractURL = (levels) => {
  return levels.reduce((acc, item) =>
    acc.concat(item.src || item.answers.map((answersItem) => answersItem.src)), []
  );
};

class Application {
  static init(levels) {
    this.localSources = {};
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

  static preloadAudio() {
    extractURL(this.gameData).forEach((src) => {
      this.localSources[src] = null;
    });

    return prepareData(this.localSources);
  }

  static changeHash(id, data) {
    const controller = this.routes[id];
    if (controller) {
      controller.init(data ? loadState(data) : null);
    }
  }

  static showWelcome() {
    location.hash = ControllerId.WELCOME;
  }

  static showLevel(state) {
    const Presenter = presentersRelation[state.level.type];
    (new Presenter()).init(state);
  }

  static showResults(state) {
    location.hash = `${ControllerId.SCORE}?${saveState(state)}`;
  }
}

Loader.loadData().then((gameData) => Application.init(gameData)).catch(() => alert(`Данные уровней не загрузились`));

export default Application;
