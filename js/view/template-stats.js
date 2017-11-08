// Модуль для создания части шаблона, отвечающей за отрисовку итоговой статистики игры

import displayResult from './display-result.js';
import {initialData, DeclinationForms} from '../model/data.js';
import changeDeclination from '../model/change-declination.js';

const {MINUTES: minutes, SECONDS: seconds, POINTS: points, QUICK: quick, MISTAKES: mistakes} = DeclinationForms;

const createStatsTemplate = (screenData, statistics, result) => screenData.failure
  ? `<div class="main-stat">${displayResult(statistics, result)}</div>`
  : `<div class="main-stat">За&nbsp;${changeDeclination(result.minutesSpent, minutes)} и ${changeDeclination(result.secondsSpent, seconds)}
      <br>вы&nbsp;набрали ${changeDeclination(result.score, points)} (${changeDeclination(result.quickAnswers, quick, true)})
      <br>совершив ${changeDeclination(initialData.notes - result.notes, mistakes)}
    </div>
    <span class="main-comparison">${displayResult(statistics, result)}</span>`;

export default createStatsTemplate;
