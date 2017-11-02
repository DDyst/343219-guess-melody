// Модуль для смены экранов

const screenContainer = document.querySelector(`.main`);

// Функция смены экрана
const changeView = (view) => {
  screenContainer.innerHTML = ``;
  screenContainer.appendChild(view.element);
};

export default changeView;
