// Соотношение типов уровней и презентеров, отвечающих за их создание

import artistLevelScreen from './artist-level.js';
import genreLevelScreen from './genre-level.js';

const levelRepresentation = {
  genre: genreLevelScreen,
  artist: artistLevelScreen
};

export default levelRepresentation;
