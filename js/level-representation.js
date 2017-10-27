// Соотношение типов уровней и создающих их представление функций

import createArtistLevelView from './artist-level.js';
import createGenreLevelView from './genre-level.js';

const levelRepresentation = {
  genre: createGenreLevelView,
  artist: createArtistLevelView
};

export default levelRepresentation;
