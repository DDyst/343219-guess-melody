// Модуль для регулировония форм склонения слов

// Функция, изменяющая склонение существительных и прилагательных в зависимости от числа, работает со значениями в пределах 100
const changeDeclination = (value, {single, few, many}, adjective = false) => {
  const lastChar = value.toString().charAt(value.toString().length - 1);
  let correctForm;

  if (value.toString().length === 2 && value.toString().charAt(0) === `1`) {
    correctForm = many;
  } else if (adjective) {
    correctForm = (lastChar === `1`) ? single : many;
  } else {
    switch (lastChar) {
      case `1`:
        correctForm = single;
        break;
      case `2`:
      case `3`:
      case `4`:
        correctForm = few;
        break;
      default:
        correctForm = many;
    }
  }

  return `${value}&nbsp;${correctForm}`;
};

export default changeDeclination;
