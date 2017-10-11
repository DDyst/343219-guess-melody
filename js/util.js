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

// Функция, возвращающая процент чисел из переданного массива, меньших, чем переданное число
const getPercentageOfSmallerNumbers = (allNumbers, ourNumber) => {
  const smallerNumbersQuantity = allNumbers.filter((item) => item < ourNumber).length;
  return Math.floor(smallerNumbersQuantity / allNumbers.length * 100);
};

// Функция, находящая количество элементов в массиве чисел, больших, чем переданное число
const getGreaterNumbersQuantity = (allNumbers, ourNumber) => allNumbers.filter((item) => item > ourNumber).length;

export {isEnterPressed, getRandomArrayItem, getPercentageOfSmallerNumbers, getGreaterNumbersQuantity};
