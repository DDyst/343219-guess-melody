// Модуль для подсчёта набранных игроком баллов

// Объект с установками для подсчёта очков
const scoringSetup = {
  SCREENS_NUMBER: 10
};

// Функция для подсчёта баллов, принимает на вход массив с ответами игрока и количество оставшихся нот
const countScore = (answers) => (answers.length < scoringSetup.SCREENS_NUMBER) ? -1 : answers.reduce((sum, item) => sum + item);

export default countScore;
