// Модуль для подсчёта набранных игроком баллов

import {Points, FAILURE_SCORE, levels} from './data.js';

// Функция для подсчёта баллов, принимает на вход массив с ответами игрока и количество оставшихся нот
const countScore = (answers) => (answers.length < levels.length) ? FAILURE_SCORE : answers.reduce((sum, item) => sum + item);

// Функция для подсчёта количества быстрых ответов
const countQuickAnswers = (answers) => answers.filter((item) => item === Points.CORRECT_QUICK).length;

export {countScore, countQuickAnswers};
