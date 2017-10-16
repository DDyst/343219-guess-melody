// Модуль создания главного экрана

import getElementFromTemplate from './get-element.js';
import logoTemplate from './template-logo.js';
import {initialData} from './data.js';

const template = `\
<section class="main main--welcome">
  ${logoTemplate}
  <button class="main-play">Начать игру</button>
  <h2 class="title main-title">Правила игры</h2>
  <p class="text main-text">
    Правила просты&nbsp;— за&nbsp;${initialData.minutes} минут ответить на все вопросы.<br>
    Ошибиться можно ${initialData.notes} раза.<br>
    Удачи!
  </p>
</section>
`;

const welcomeScreenElement = getElementFromTemplate(template);

export default welcomeScreenElement;
