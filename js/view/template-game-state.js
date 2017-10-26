// Модуль для создания части шаблона, отвечающей за отрисовку состояния игры

import {initialData} from '../data.js';

const createStateTemplate = (state) => `\
<div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
  <span class="timer-value-mins">${state.minutes}</span><!--
  --><span class="timer-value-dots">:</span><!--
  --><span class="timer-value-secs">${state.seconds}</span>
</div>
<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
  <circle
    cx="390" cy="390" r="370"
    class="timer-line"
    style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
</svg>
<div class="main-mistakes">
  ${new Array(initialData.notes - state.notesLeft).fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`).join(``)}
</div>
`;

export default createStateTemplate;
