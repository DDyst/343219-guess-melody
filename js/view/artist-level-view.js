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
    const src = this.state.getSource(this.state.level.src);
    return `<section class="main main--level main--level-artist">

      ${createStateTemplate(this.state)}

      <div class="main-wrap">
        <h2 class="title main-title">${this.state.level.question}</h2>
        <div class="player-wrapper">
          <div class="player">
            <audio src="${src || ``}" ${src ? `autoplay` : ``}></audio>
            <button class="player-control player-control--${src ? `pause` : `play`}" ${src ? `` : `disabled`}></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <form class="main-list">

          ${this.state.level.answers.map((item, index) => `<div class="main-answer-wrapper">
            <input class="main-answer-r" type="radio" id="answer-${index + 1}" name="answer" value="val-${index + 1}"/>
            <label class="main-answer" for="answer-${index + 1}">
              <img class="main-answer-preview" src="${item.image.url}" alt="${item.title}" width="134" height="134" tabindex="0">
              ${item.title}
            </label>
          </div>`).join(``)}

        </form>
      </div>

    </section>`;
  }

  bind() {
    const answersContainer = this.element.querySelector(`.main-list`);
    const playerControl = this.element.querySelector(`.player-control`);
    const imgElements = this.element.querySelectorAll(`.main-answer-preview`);

    this.minutesContainer = this.element.querySelector(`.timer-value-mins`);
    this.secondsContainer = this.element.querySelector(`.timer-value-secs`);

    Array.from(imgElements).forEach((item) => {
      item.addEventListener(`error`, () => this._imgErrorHandler(item));
    });

    playerControl.addEventListener(`click`, (evt) => {
      this._controlClickHandler(evt.target, evt.target.previousElementSibling);
    });

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

  _controlClickHandler(control, track) {
    if (track.paused) {
      track.play();
      control.classList.remove(`player-control--play`);
      control.classList.add(`player-control--pause`);
    } else {
      track.pause();
      control.classList.add(`player-control--play`);
      control.classList.remove(`player-control--pause`);
    }
  }

  // 404 ошибку нельзя скрыть из консоли, скрываем изображение на странице
  _imgErrorHandler(element) {
    element.style.visibility = `hidden`;
  }

  getArtist(ancestorElement) {
    return ancestorElement.querySelector(`.main-answer-preview`).alt;
  }

  updateTime() {
    this.minutesContainer.textContent = this.state.minutes;
    this.secondsContainer.textContent = this.state.seconds;
  }
}

export default ArtistLevelView;
