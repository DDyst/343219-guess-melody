// Модуль для вывода результатов игрока

import {getPercentageOfSmallerNumbers} from './util.js';

const FAILURE_SCORE = -1;

// Объект с шаблонами строк для вывода результата
const resultTemplates = {
  TIMEOUT: `Время вышло! Вы не успели отгадать все мелодии`,
  NO_ATTEMPTS_LEFT: `У вас закончились все попытки. Ничего, повезёт в следующий раз!`,
};

// Функция для вывода строки с результатом игрока, принимает на вход массив с баллами других игроков и объект с данными сессии игрока: число баллов, число оставшихся нот и оставшееся время
const displayResult = (statistics, {timeLeft: time, score: score}) => {
  if (!time) {
    return resultTemplates.TIMEOUT;
  }
  if (score === FAILURE_SCORE) {
    return resultTemplates.NO_ATTEMPTS_LEFT;
  }
  statistics.push(score);
  statistics.sort((a, b) => b - a);
  return `Вы заняли ${statistics.indexOf(score) + 1}-ое место из ${statistics.length} игроков. Это лучше, чем у ${getPercentageOfSmallerNumbers(statistics, score)}% игроков`;
};

export default displayResult;
