// Модуль для создания части шаблона, отвечающей за отрисовку итоговой статистики игры

import displayResult from './display-result.js';

const createStatsTemplate = (screenData, statistics, result) => screenData.failure
  ? `<div class="main-stat">${displayResult(statistics, result)}</div>`
  : `<div class="main-stat">За&nbsp;${result.minutes}&nbsp;минуты и ${result.seconds}&nbsp;секунд
      <br>вы&nbsp;набрали ${result.score} баллов (8 быстрых)
      <br>совершив ${3 - result.notesLeft} ошибки
    </div>
    <span class="main-comparison">${displayResult(statistics, result)}</span>`;

export default createStatsTemplate;
