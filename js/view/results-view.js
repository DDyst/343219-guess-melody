// Модуль отображения экрана результатов

import AbstractView from './abstract-view.js';
import logoTemplate from './template-logo.js';
import createStatsTemplate from './template-stats.js';
import {isEnterPressed} from '../model/util.js';

class ResultsView extends AbstractView {
  constructor(screenData, statistics = [], result) {
    super();
    this.screenData = screenData;
    this.statistics = statistics;
    this.result = result;
  }

  get template() {
    return `<section class="main main--result">
      ${logoTemplate}
      <h2 class="title">${this.screenData.title}</h2>
      ${createStatsTemplate(this.screenData, this.statistics, this.result)}
      <span role="button" tabindex="0" class="main-replay">${this.screenData.replay}</span>
    </section>`;
  }

  bind() {
    const replayButton = this.element.querySelector(`.main-replay`);

    replayButton.addEventListener(`click`, this.replayButtonClickHandler);
    replayButton.addEventListener(`keydown`, (evt) => {
      if (isEnterPressed(evt.key)) {
        this.replayButtonClickHandler();
      }
    });
  }

  replayButtonClickHandler() {

  }
}

export default ResultsView;
