// Модуль таймера

import {changeView} from './change-view.js';
import createResultsView from './results';

const createTimer = (view) => {
  const timer = window.setInterval(() => {
    if (view.state.timeLeft > 0) {
      view.state.timeLeft--;
      view.updateTime();
    } else {
      window.clearInterval(timer);
      changeView(createResultsView(view.state));
    }
  }, 1000);
  return timer;
};

export default createTimer;
