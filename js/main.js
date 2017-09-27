// Основной модуль, работа с экранами приложения

(function () {
  const template = document.querySelector(`#templates`).content;
  const screens = [].slice.call(template.querySelectorAll(`.main`));
  const screenContainer = document.querySelector(`.main`);
  let screenNumber = 0;

  // Функция для отрисовки нужного экрана
  const renderScreen = (number) => {
    screenContainer.appendChild(screens[number].cloneNode(true));
  };

  // Функция, удаляющая из DOM текущий экран
  const removeScreen = () => {
    screenContainer.removeChild(screenContainer.querySelector(`.main`));
  };

  // Функция сортировки массива с экранами
  const setProperScreensOrder = (unsortedScreens) => {
    unsortedScreens.sort((firstItem) => {
      if (firstItem.classList.contains(`main--welcome`)) {
        return -1;
      }
      if (firstItem.classList.contains(`main--result`)) {
        return 1;
      }
      return 0;
    });
  };

  // Функция для показа следующего экрана
  const showNextScreen = () => {
    if (screenNumber < (screens.length - 1)) {
      removeScreen();
      screenNumber++;
      renderScreen(screenNumber);
    }
  };

  // Функция для показа предыдущего экрана
  const showPreviousScreen = () => {
    if (screenNumber > 0) {
      removeScreen();
      screenNumber--;
      renderScreen(screenNumber);
    }
  };

  // Обработчик события удержания клавиши
  const keyDownHandler = (evt) => {
    if (evt.altKey) {
      if (window.util.isRightPressed(evt.keyCode)) {
        showNextScreen();
      } else if (window.util.isLeftPressed(evt.keyCode)) {
        showPreviousScreen();
      }
    }
  };

  setProperScreensOrder(screens);
  renderScreen(screenNumber);

  document.addEventListener(`keydown`, keyDownHandler);
})();
