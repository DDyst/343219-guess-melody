// Модуль для создания представления экрана игры на выбор исполнителя и управления им

import ArtistLevelView from './view/artist-level-view.js';
import {checkArtistAnswer, showNextScreen} from './change-view.js';
import createTimer from './timer.js';

const createArtistLevelView = (state, level) => {
  const artistLevelView = new ArtistLevelView(state, level);
  const startTime = state.timeLeft;
  const timer = createTimer(artistLevelView);

  artistLevelView.choiceHandler = (suitableAncestor, answers) => {
    if (suitableAncestor) {
      window.clearInterval(timer);
      const chosenArtist = artistLevelView.identifyArtist(suitableAncestor);
      checkArtistAnswer(chosenArtist, answers, startTime);
      showNextScreen();
    }
  };

  return artistLevelView;
};

export default createArtistLevelView;

