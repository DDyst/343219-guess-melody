// Модуль для регулировония форм склонения слов

const declension = {
  adjustMistakes(value) {
    switch (value) {
      case 0:
        return `ошибок`;
      case 1:
        return `ошибку`;
      default:
        return `ошибки`;
    }
  },

  adjustMinutes(value) {
    switch (value) {
      case 0:
      case 5:
        return `минут`;
      case 1:
        return `минуту`;
      default:
        return `минуты`;
    }
  },

  adjustSeconds(value) {
    if (value.toString().charAt(0) === `1`) {
      return `секунд`;
    }
    switch (value.toString().charAt(1)) {
      case `1`:
        return `секунду`;
      case `2`:
      case `3`:
      case `4`:
        return `секунды`;
      default:
        return `секунд`;
    }
  },

  adjustScore(value) {
    switch (value) {
      case 1:
        return `балл`;
      case 2:
      case 3:
      case 4:
        return `балла`;
      default:
        return `баллов`;
    }
  },

  adjustQuickAnswers(value) {
    switch (value) {
      case 0:
        return `быстрых`;
      case 1:
        return `быстрый`;
      default:
        return `быстрых`;
    }
  }
};

export default declension;
