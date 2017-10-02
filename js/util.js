// Вспомогательный модуль

// Объект со значениями кодов клавиш
const keyCodes = {
  ENTER: 13
};

// Функция, сравнивающая значение переданного кода клавиши с кодом Enter
const isEnterPressed = (code) => code === keyCodes.ENTER;

// Функция нахождения случайного целого числа в заданном диапазоне включительно
const getRandomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Функция, возвращающая случайный элемент массива
const getRandomArrayItem = (array) => array[getRandomInRange(0, array.length - 1)];

export {isEnterPressed, getRandomArrayItem};
