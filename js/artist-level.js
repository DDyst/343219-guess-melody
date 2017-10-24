// Модуль для создания представления экрана игры на выбор исполнителя и управления им

import ArtistLevelView from './view/artist-level-view.js';
import {acceptAnswer} from './change-view.js';

const createArtistLevelView = (state, level) => {
  const artistLevelView = new ArtistLevelView(state, level);

  artistLevelView.choiceHandler = (target, answers) => {
    acceptAnswer(target, answers);
  };

  return artistLevelView;
};

export default createArtistLevelView;

