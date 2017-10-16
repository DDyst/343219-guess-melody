// Модуль для подсчёта набранных игроком баллов

import {points} from './data.js';

// Объект с установками для подсчёта очков
const scoringSetup = {
  SCREENS_NUMBER: 10,
  FAILURE_SCORE: -1
};

// Функция для подсчёта баллов, принимает на вход массив с ответами игрока и количество оставшихся нот
const countScore = (answers) => (answers.length < scoringSetup.SCREENS_NUMBER) ? scoringSetup.FAILURE_SCORE : answers.reduce((sum, item) => sum + item);

// Функция для подсчёта количества быстрых ответов
const countQuickAnswers = (answers) => answers.filter((item) => item === points.CORRECT_QUICK).length;

export {countScore, scoringSetup, countQuickAnswers};
