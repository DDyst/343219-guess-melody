// Вспомогательный модуль

(function () {
  // Объект со значениями кодов клавиш
  const keyCodes = {
    LEFT: 37,
    RIGHT: 39
  };

  window.util = {
    // Функция, сравнивающая значение переданного кода клавиши с кодом Left
    isLeftPressed(code) {
      return code === keyCodes.LEFT;
    },

    // Функция, сравнивающая значение переданного кода клавиши с кодом Right
    isRightPressed(code) {
      return code === keyCodes.RIGHT;
    }
  };
})();
