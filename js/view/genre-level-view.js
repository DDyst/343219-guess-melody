// Модуль отображения экрана уровня игры на выбор жанра

import AbstractView from './abstract-view.js';
import createStateTemplate from './template-game-state.js';

const getAnswerTemplate = (state, item, index) => {
  const src = state.getSource(item.src);
  return `<div class="genre-answer">
            <div class="player-wrapper">
              <div class="player">
                <audio src="${src || ``}"></audio>
                <button class="player-control player-control--play" type="button" ${src ? `` : `disabled`}></button>
                <div class="player-track">
                  <span class="player-status"></span>
                </div>
              </div>
            </div>
            <input type="checkbox" name="answer" value="answer-${index + 1}" id="a-${index + 1}">
            <label class="genre-answer-check" for="a-${index + 1}"></label>
          </div>`;
};

class GenreLevelView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `<section class="main main--level main--level-genre">

      ${createStateTemplate(this.state)}

      <div class="main-wrap">
        <h2 class="title">${this.state.level.question}</h2>
        <form class="genre">

          ${this.state.level.answers.map((item, index) => getAnswerTemplate(this.state, item, index)).join(``)}

          <button class="genre-answer-send" type="submit">Ответить</button>
        </form>
      </div>

    </section>
  `;
  }

  bind() {
    const form = this.element.querySelector(`.genre`);
    const submitButton = this.element.querySelector(`.genre-answer-send`);
    const answersCheckboxes = this.element.querySelectorAll(`input[name="answer"]`);

    submitButton.disabled = true;

    this.currentControl = null;
    this.currentTrack = null;

    this.minutesContainer = this.element.querySelector(`.timer-value-mins`);
    this.secondsContainer = this.element.querySelector(`.timer-value-secs`);

    form.addEventListener(`click`, (evt) => {
      if (evt.target.classList.contains(`player-control`)) {
        this._formClickHandler(evt.target, evt.target.previousElementSibling);
      }
    });

    form.addEventListener(`change`, () => {
      this._formChangeHandler(submitButton, answersCheckboxes);
    }, true);

    form.addEventListener(`submit`, (evt) => {
      const chosenTracksSources = Array.from(answersCheckboxes).filter((item) => item.checked).map((item) => item.closest(`.genre-answer`).querySelector(`audio`).src);
      evt.preventDefault();
      this.formSubmitHandler(evt.currentTarget, chosenTracksSources, this.state.level.answers);
    });
  }

  _formChangeHandler(buttonElement, checkboxesElements) {
    this._changeButtonDisability(buttonElement, checkboxesElements);
  }

  _formClickHandler(control, track) {
    if (track.paused) {
      if (this.currentTrack) {
        this._stopTrack(this.currentControl, this.currentTrack);
      }
      this._playTrack(control, track);
      this.currentTrack = track;
      this.currentControl = control;
    } else {
      this._stopTrack(control, track);
    }
  }

  formSubmitHandler() {

  }

  // Функция, проверяющая чекбоксы ответов на экране выбора жанра и блокирующая кнопку отправки формы в случае, если ни один ответ не выбран
  _changeButtonDisability(buttonElement, checkboxesElements) {
    buttonElement.disabled = !(Array.from(checkboxesElements).some((item) => item.checked));
  }

  _playTrack(control, track) {
    track.play();
    control.classList.remove(`player-control--play`);
    control.classList.add(`player-control--pause`);
  }

  _stopTrack(control, track) {
    track.pause();
    control.classList.add(`player-control--play`);
    control.classList.remove(`player-control--pause`);
  }

  updateTime() {
    this.minutesContainer.textContent = this.state.minutes;
    this.secondsContainer.textContent = this.state.seconds;
  }
}

export default GenreLevelView;
