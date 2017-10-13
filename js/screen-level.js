// Модуль создания экрана с уровнем игры

import getElementFromTemplate from './get-element.js';
import createStateTemplate from './template-game-state.js';
import createLevelTemplate from './create-level-template.js';

const createLevelScreenElement = (state, level) => {
  const template = `<section class="main main--level main--level-${level.type}">

      ${createStateTemplate(state)}
      ${createLevelTemplate(level)}

    </section>
  `;

  return getElementFromTemplate(template);
};

export default createLevelScreenElement;
