// Модуль отображения экрана уровня игры на выбор жанра

import AbstractView from './abstract-view.js';
import createStateTemplate from './template-game-state.js';

class GenreLevelView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `<section class="main main--level main--level-genre">

      ${createStateTemplate(this.state)}

      <div class="main-wrap">
        <h2 class="title">Выберите ${this.state.level.genre} треки</h2>
        <form class="genre">

          ${this.state.level.answers.map((item, index) => `<div class="genre-answer">
            <div class="player-wrapper">
              <div class="player">
                <audio>
                  <source src="${item.src}">
                </audio>
                <button class="player-control player-control--play" type="button"></button>
                <div class="player-track">
                  <span class="player-status"></span>
                </div>
              </div>
            </div>
            <input type="checkbox" name="answer" value="answer-${index + 1}" id="a-${index + 1}">
            <label class="genre-answer-check" for="a-${index + 1}"></label>
          </div>`).join(``)}

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
    form.addEventListener(`change`, () => {
      this.formChangeHandler(submitButton, answersCheckboxes);
    }, true);

    form.addEventListener(`submit`, (evt) => {
      const chosenTracksSources = Array.from(answersCheckboxes).filter((item) => item.checked).map((item) => item.closest(`.genre-answer`).querySelector(`source`).src);
      evt.preventDefault();
      this.formSubmitHandler(evt.currentTarget, chosenTracksSources, this.state.level.answers);
    });
  }

  formChangeHandler(buttonElement, checkboxesElements) {
    this.changeButtonDisability(buttonElement, checkboxesElements);
  }

  formSubmitHandler() {

  }

  // Функция, проверяющая чекбоксы ответов на экране выбора жанра и блокирующая кнопку отправки формы в случае, если ни один ответ не выбран
  changeButtonDisability(buttonElement, checkboxesElements) {
    buttonElement.disabled = !(Array.from(checkboxesElements).some((item) => item.checked));
  }

  updateTime() {
    this.element.querySelector(`.timer-value-mins`).textContent = this.state.minutes;
    this.element.querySelector(`.timer-value-secs`).textContent = this.state.seconds;
  }
}

export default GenreLevelView;
