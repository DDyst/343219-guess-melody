// Соотношение типов уровней и презентеров, отвечающих за их создание

import artistLevelScreen from './artist-level.js';
import genreLevelScreen from './genre-level.js';
import ArtistLevelView from './view/artist-level-view.js';
import GenreLevelView from './view/genre-level-view.js';

const presentersRelation = {
  genre: genreLevelScreen,
  artist: artistLevelScreen
};

const viewsRelation = {
  genre: GenreLevelView,
  artist: ArtistLevelView
};

export {presentersRelation, viewsRelation};
