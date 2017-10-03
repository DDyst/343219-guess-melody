// Модуль для создания DOM-элементов на основе переданной в виде строки разметки.

const wrapper = document.createElement(`div`);

const getElementFromTemplate = (markup) => {
  wrapper.innerHTML = markup;
  return wrapper.firstChild;
};

export default getElementFromTemplate;
