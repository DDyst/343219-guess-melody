// Модуль для создания представления экрана результатов и управления им

import ResultsView from './view/results-view.js';
import changeView from './view/change-view.js';
import {countScore, countQuickAnswers} from './model/count-score.js';
import {FAILURE_SCORE, resultsScreenData, statistics, ResultStatuses} from './model/data.js';
import Application from './application.js';

class ResultsScreen {
  init(state) {
    state.score = countScore(state.playerAnswers);
    state.quickAnswers = countQuickAnswers(state.playerAnswers);

    if (!state.timeLeft) {
      state.status = ResultStatuses.TIMEOUT;
    } else if (state.score === FAILURE_SCORE) {
      state.status = ResultStatuses.DEFEAT;
    } else {
      state.status = ResultStatuses.SUCCESS;
    }

    this.view = new ResultsView(resultsScreenData[state.status], statistics.slice(), state);

    this.view.replayButtonClickHandler = () => {
      Application.showWelcome();
    };

    changeView(this.view);
  }
}

export default new ResultsScreen();
