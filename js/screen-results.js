// Модуль создания экрана результатов

import getElementFromTemplate from './get-element.js';
import createStatsTemplate from './template-stats.js';
import logoTemplate from './template-logo.js';

const createResultsScreenElement = (screenData, statistics, result) => {
  const template = `<section class="main main--result">
    ${logoTemplate}
    <h2 class="title">${screenData.title}</h2>
    ${createStatsTemplate(screenData, statistics, result)}
    <span role="button" tabindex="0" class="main-replay">${screenData.replay}</span>
  </section>`;

  return getElementFromTemplate(template);
};

export default createResultsScreenElement;
