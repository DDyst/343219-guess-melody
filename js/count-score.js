// Модуль для подсчёта набранных игроком баллов

// Объект с установками для подсчёта очков
const scoringSetup = {
  SCREENS_NUMBER: 10,
  INITIAL_NOTES_NUMBER: 3,
  POINTS_PER_NOTE: 2
};

// Функция для корректировки числа очков в случае, если у игрока осталось менее изначального числа нот
const adjustScore = (points, notesLeft) => points - (scoringSetup.INITIAL_NOTES_NUMBER - notesLeft) * scoringSetup.POINTS_PER_NOTE;

// Функция для подсчёта баллов, принимает на вход массив с ответами игрока и количество оставшихся нот
const countScore = (answers, notesLeft) => {
  if (answers.length < scoringSetup.SCREENS_NUMBER) {
    return -1;
  }

  const answersPoints = answers.reduce((acc, item) => {
    return acc + item;
  });

  return (notesLeft === scoringSetup.INITIAL_NOTES_NUMBER) ? answersPoints : adjustScore(answersPoints, notesLeft);
};

export default countScore;
