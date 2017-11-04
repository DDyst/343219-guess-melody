// Соотношение типов уровней и презентеров, отвечающих за их создание

import ArtistLevelScreen from './artist-level.js';
import GenreLevelScreen from './genre-level.js';
import ArtistLevelView from './view/artist-level-view.js';
import GenreLevelView from './view/genre-level-view.js';

const presentersRelation = {
  genre: GenreLevelScreen,
  artist: ArtistLevelScreen
};

const viewsRelation = {
  genre: GenreLevelView,
  artist: ArtistLevelView
};

export {presentersRelation, viewsRelation};
