// Модуль отображения экрана уровня игры на выбор исполнителя

import AbstractView from './abstract-view.js';
import createStateTemplate from './template-game-state.js';
import {isEnterPressed} from '../util.js';

class ArtistLevelView extends AbstractView {
  constructor(state, level) {
    super();
    this.state = state;
    this.level = level;
  }

  get template() {
    return `<section class="main main--level main--level-artist">

      ${createStateTemplate(this.state)}

      <div class="main-wrap">
        <h2 class="title main-title">Кто исполняет эту песню?</h2>
        <div class="player-wrapper">
          <div class="player">
            <audio>
              <source src="${this.level.audio}">
            </audio>
            <button class="player-control player-control--pause"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <form class="main-list">

          ${this.level.answers.map((item, index) => `<div class="main-answer-wrapper">
            <input class="main-answer-r" type="radio" id="answer-${index + 1}" name="answer" value="val-${index + 1}"/>
            <label class="main-answer" for="answer-${index + 1}">
              <img class="main-answer-preview" src="${item.image}" alt="${item.artist}" width="134" height="134" tabindex="0">
              ${item.artist}
            </label>
          </div>`).join(``)}

        </form>
      </div>

    </section>`;
  }

  bind() {
    const answersContainer = this.element.querySelector(`.main-list`);

    answersContainer.addEventListener(`click`, (evt) => {
      this.choiceHandler(evt.target.closest(`.main-answer`), this.level.answers);
    });

    answersContainer.addEventListener(`keydown`, (evt) => {
      if (isEnterPressed(evt.key)) {
        this.choiceHandler(evt.target.closest(`.main-answer`), this.level.answers);
      }
    });
  }

  choiceHandler() {

  }

  identifyArtist(ancestorElement) {
    return ancestorElement.querySelector(`.main-answer-preview`).alt;
  }

  updateTime() {
    this.element.querySelector(`.timer-value-mins`).textContent = this.state.minutes;
    this.element.querySelector(`.timer-value-secs`).textContent = this.state.seconds;
  }
}

export default ArtistLevelView;
