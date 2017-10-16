// Модуль для создания шаблона уровня игры нужного типа

import createGenreLevelTemplate from './template-level-genre.js';
import createArtistLevelTemplate from './template-level-artist.js';

const createLevelTemplate = (level) => (level.type === `genre`) ? createGenreLevelTemplate(level) : createArtistLevelTemplate(level);

export default createLevelTemplate;
