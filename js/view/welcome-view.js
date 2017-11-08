// Модуль отображения экрана приветствия

import AbstractView from './abstract-view.js';
import logoTemplate from './template-logo.js';
import {initialData, DeclinationForms} from '../model/data.js';
import changeDeclination from '../model/change-declination.js';

class WelcomeView extends AbstractView {
  get template() {
    return `<section class="main main--welcome">
      ${logoTemplate}
      <button class="main-play" disabled>Начать игру</button>
      <h2 class="title main-title">Правила игры</h2>
      <p class="text main-text">
        Правила просты&nbsp;— за&nbsp;${changeDeclination(initialData.minutes, DeclinationForms.MINUTES)} ответить на все вопросы.<br>
        Ошибиться можно ${changeDeclination(initialData.notes, DeclinationForms.TIMES)}.<br>
        Удачи!
      </p>
    </section>`;
  }

  bind() {
    this.startButton = this.element.querySelector(`.main-play`);
    this.startButton.addEventListener(`click`, this.startButtonClickHandler);
  }

  startButtonClickHandler() {

  }

  unlockStartButton() {
    this.startButton.disabled = false;
  }
}

export default WelcomeView;
