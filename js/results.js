// Модуль для создания представления экрана результатов и управления им

import ResultsView from './view/results-view.js';
import createWelcomeView from './welcome.js';
import {changeView} from './change-view.js';
import {countScore, countQuickAnswers} from './count-score.js';
import {FAILURE_SCORE, resultsScreenData, statistics, ResultStatuses} from './data.js';

const createResultsView = (result, playerAnswers) => {
  result.score = countScore(playerAnswers);
  result.quickAnswers = countQuickAnswers(playerAnswers);

  if (!result.timeLeft) {
    result.status = ResultStatuses.TIMEOUT;
  } else if (result.score === FAILURE_SCORE) {
    result.status = ResultStatuses.DEFEAT;
  } else {
    result.status = ResultStatuses.SUCCESS;
  }

  const resultsView = new ResultsView(resultsScreenData[result.status], statistics.slice(), result);

  resultsView.replayButtonClickHandler = () => {
    changeView(createWelcomeView());
  };

  return resultsView;
};

export default createResultsView;
