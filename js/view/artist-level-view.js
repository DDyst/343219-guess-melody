// Модуль отображения экрана уровня игры на выбор исполнителя

import AbstractView from './abstract-view.js';
import createStateTemplate from './template-game-state.js';
import {isEnterPressed} from '../model/util.js';

class ArtistLevelView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `<section class="main main--level main--level-artist">

      ${createStateTemplate(this.state)}

      <div class="main-wrap">
        <h2 class="title main-title">Кто исполняет эту песню?</h2>
        <div class="player-wrapper">
          <div class="player">
            <audio>
              <source src="${this.state.level.audio}">
            </audio>
            <button class="player-control player-control--pause"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <form class="main-list">

          ${this.state.level.answers.map((item, index) => `<div class="main-answer-wrapper">
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
      if (evt.target.closest(`.main-answer`)) {
        const chosenArtist = this.getArtist(evt.target.closest(`.main-answer`));
        this.choiceHandler(chosenArtist, this.state.level.answers);
      }
    });

    answersContainer.addEventListener(`keydown`, (evt) => {
      if (isEnterPressed(evt.key) || evt.target.closest(`.main-answer`)) {
        const chosenArtist = this.getArtist(evt.target.closest(`.main-answer`));
        this.choiceHandler(chosenArtist, this.state.level.answers);
      }
    });
  }

  choiceHandler() {

  }

  getArtist(ancestorElement) {
    return ancestorElement.querySelector(`.main-answer-preview`).alt;
  }

  updateTime() {
    this.element.querySelector(`.timer-value-mins`).textContent = this.state.minutes;
    this.element.querySelector(`.timer-value-secs`).textContent = this.state.seconds;
  }
}

export default ArtistLevelView;
