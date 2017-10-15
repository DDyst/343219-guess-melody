// Модуль для создания части шаблона, отвечающей за отрисовку итоговой статистики игры

import displayResult from './display-result.js';
import {initialData} from './data.js';
import declension from './declension.js';

const createStatsTemplate = (screenData, statistics, result) => screenData.failure
  ? `<div class="main-stat">${displayResult(statistics, result)}</div>`
  : `<div class="main-stat">За&nbsp;${result.getMinutes()}&nbsp;${declension.adjustMinutes(result.getMinutes())} и ${result.getSeconds()}&nbsp;${declension.adjustSeconds(result.getSeconds())}
      <br>вы&nbsp;набрали ${result.score} ${declension.adjustScore(result.score)} (${result.quickAnswers} ${declension.adjustQuickAnswers(result.quickAnswers)})
      <br>совершив ${initialData.notes - result.notesLeft} ${declension.adjustMistakes(initialData.notes - result.notesLeft)}
    </div>
    <span class="main-comparison">${displayResult(statistics, result)}</span>`;

export default createStatsTemplate;
