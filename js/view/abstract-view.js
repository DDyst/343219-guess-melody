// Модуль базового класса для представления экранов

import getElementFromTemplate from '../get-element.js';

class AbstractView {
  get template() {
    throw new Error(`You have to define template`);
  }

  render() {
    return getElementFromTemplate(this.template);
  }

  bind() {

  }

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }
}

export default AbstractView;
