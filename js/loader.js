// Модуль загрузки данных с сервера

const SERVER_URL = `https://es.dump.academy/guess-melody`;
const DEFAULT_NAME = `...`;

class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}/questions`).then((res) => res.json());
  }

  static loadAudio(url) {
    return fetch(url)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error();
          }
          return response.blob();
        })
        .then((blob) => URL.createObjectURL(blob));
  // Обработка сделана на уровне блокировки проигрывания
  // catch не скрывает ошибку из консоли
  }

  static loadResults(name = DEFAULT_NAME) {
    return fetch(`${SERVER_URL}/stats/${name}`).then((res) => res.json());
  }

  static saveResults(data, name = DEFAULT_NAME) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${name}`, requestSettings);
  }
}

export default Loader;
