// Модуль для создания представления экрана результатов и управления им

import ResultsView from './view/results-view.js';
import changeView from './view/change-view.js';
import {countScore, countQuickAnswers} from './model/count-score.js';
import {FAILURE_SCORE, resultsScreenData, ResultStatuses} from './model/data.js';
import Application from './application.js';
import GameState from './model/game-state.js';
import Loader from './loader.js';
import {initialData} from './model/data.js';

class ResultsScreen {
  init(jsonState) {
    const state = new GameState(jsonState.levels, jsonState.timeLeft, jsonState.notes, jsonState.playerAnswers);
    state.score = countScore(state.playerAnswers, Application.gameData);
    state.quickAnswers = countQuickAnswers(state.playerAnswers);

    if (!state.timeLeft) {
      state.status = ResultStatuses.TIMEOUT;
      this.showDefeat(state);
    } else if (state.score === FAILURE_SCORE) {
      state.status = ResultStatuses.DEFEAT;
      this.showDefeat(state);
    } else {
      state.status = ResultStatuses.SUCCESS;
      this.showSuccess(state);
    }

    this.view.replayButtonClickHandler = () => {
      Application.showWelcome();
    };

    changeView(this.view);
  }

  showSuccess(state) {
    const statistics = Loader.loadResults().then(() => {
      this.view = new ResultsView(resultsScreenData[state.status], statistics, state);
      Loader.saveResults({time: initialData.time - state.timeLeft, answers: state.playerAnswers});
    });
  }

  showDefeat(state) {
    this.view = new ResultsView(resultsScreenData[state.status], [], state);
  }
}

export default new ResultsScreen();
