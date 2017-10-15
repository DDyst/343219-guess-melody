// Вспомогательный модуль

// Объект со значениями клавиш
const keyValues = {
  ENTER: `Enter`
};

// Функция, сравнивающая значение переданного кода клавиши с кодом Enter
const isEnterPressed = (value) => value === keyValues.ENTER;

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

// Функция для копирования объектов
// const cloneObject = (source) => {
//   let value;
//   const clone = Object.create(source);
//   for (const key in source) {
//     if (source.hasOwnProperty(key)) {
//       value = source[key];
//       if (value !== null && typeof value === `object`) {
//         clone[key] = cloneObject(value);
//       } else {
//         clone[key] = value;
//       }
//     }
//   }
//   return clone;
// };

// Функция определяет, включены ли все элементы одного массива в другой
const areArrayElementsIncludedInAnotherArray = (array, anotherArray) => array.reduce((acc, item) => acc * anotherArray.includes(item), true);

export {isEnterPressed, getRandomArrayItem, getPercentageOfSmallerNumbers, getGreaterNumbersQuantity, areArrayElementsIncludedInAnotherArray};
