// Модуль для создания представления экрана игры на выбор исполнителя и управления им

import LevelScreen from './level.js';

class ArtistLevelScreen extends LevelScreen {
  constructor() {
    super();
  }

  redefineHandlers() {
    this.view.choiceHandler = (chosenArtist, answers) => {
      this.stopTimer();
      this.state.checkArtistAnswer(chosenArtist, answers, this.startTime);
      this.showNextScreen();
    };
  }
}

export default new ArtistLevelScreen();
