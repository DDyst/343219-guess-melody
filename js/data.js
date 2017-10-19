// Модуль с данными игры

import audio from './audio.js';

const SECONDS_PER_MINUTE = 60;
const SMALLEST_TWO_DIGIT_NUMBER = 10;

// Объект с данными о количестве баллов, присуждаемых за ответ игрока
const points = {
  CORRECT_QUICK: 2,
  CORRECT_SLOW: 1,
  INCORRECT: -2
};

// Объект с исходными условиями игры
const initialData = {
  time: 300,
  notes: 3,
  get minutes() {
    return Math.floor(this.time / SECONDS_PER_MINUTE);
  }
};

// Объект с формами склоняемых слов
const declinationForms = {
  mistakes: {
    single: `ошибку`,
    few: `ошибки`,
    many: `ошибок`
  },

  points: {
    single: `балл`,
    few: `балла`,
    many: `баллов`
  },

  minutes: {
    single: `минуту`,
    few: `минуты`,
    many: `минут`
  },

  seconds: {
    single: `секунду`,
    few: `секунды`,
    many: `секунд`
  },

  times: {
    single: `раз`,
    few: `раза`,
    many: `раз`
  },

  quick: {
    single: `быстрый`,
    many: `быстрых`
  }
};

// Объект с данными экрана результатов
const resultsScreenData = {
  success: {
    title: `Вы настоящий меломан!`,
    replay: `Сыграть ещё раз`,
    failure: false
  },
  timeout: {
    title: `Увы и ах!`,
    replay: `Попробовать ещё раз`,
    failure: true
  },
  defeat: {
    title: `Какая жалость!`,
    replay: `Попробовать ещё раз`,
    failure: true
  }
};

// Список баллов, набранных другими игроками
const statistics = [10, 12, 8, 5, 9, 2];

// Изначальное состояние игры
const InitialState = function () {
  this.timeLeft = initialData.time;
  this.notesLeft = initialData.notes;
};

InitialState.prototype = {
  getMinutes() {
    return Math.floor(this.timeLeft / SECONDS_PER_MINUTE);
  },

  getSeconds() {
    const secondsLeft = this.timeLeft % SECONDS_PER_MINUTE;
    return (secondsLeft >= SMALLEST_TWO_DIGIT_NUMBER) ? secondsLeft : `0${secondsLeft}`;
  }
};

// Объект с данными уровней
const testLevels = [
  {
    type: `genre`,
    genre: `Rock`,
    answers: [
      {
        src: audio[0].src,
        correct: false
      },
      {
        src: audio[1].src,
        correct: true
      },
      {
        src: audio[2].src,
        correct: false
      },
      {
        src: audio[3].src,
        correct: false
      }
    ]
  },
  {
    type: `genre`,
    genre: `Rock`,
    answers: [
      {
        src: audio[0].src,
        correct: false
      },
      {
        src: audio[1].src,
        correct: true
      },
      {
        src: audio[2].src,
        correct: false
      },
      {
        src: audio[3].src,
        correct: false
      }
    ]
  },
  {
    type: `genre`,
    genre: `Rock`,
    answers: [
      {
        src: audio[0].src,
        correct: false
      },
      {
        src: audio[1].src,
        correct: true
      },
      {
        src: audio[2].src,
        correct: false
      },
      {
        src: audio[3].src,
        correct: false
      }
    ]
  },
  {
    type: `genre`,
    genre: `Rock`,
    answers: [
      {
        src: audio[0].src,
        correct: false
      },
      {
        src: audio[1].src,
        correct: true
      },
      {
        src: audio[2].src,
        correct: false
      },
      {
        src: audio[3].src,
        correct: false
      }
    ]
  },
  {
    type: `genre`,
    genre: `Rock`,
    answers: [
      {
        src: audio[0].src,
        correct: false
      },
      {
        src: audio[1].src,
        correct: true
      },
      {
        src: audio[2].src,
        correct: false
      },
      {
        src: audio[3].src,
        correct: false
      }
    ]
  },
  {
    type: `artist`,
    audio: audio[0].src,
    answers: [
      {
        artist: audio[0].artist,
        image: audio[0].image,
        correct: true
      },
      {
        artist: audio[1].artist,
        image: audio[1].image,
        correct: false
      },
      {
        artist: audio[2].artist,
        image: audio[2].image,
        correct: false
      }
    ]
  },
  {
    type: `artist`,
    audio: audio[0].src,
    answers: [
      {
        artist: audio[0].artist,
        image: audio[0].image,
        correct: true
      },
      {
        artist: audio[1].artist,
        image: audio[1].image,
        correct: false
      },
      {
        artist: audio[2].artist,
        image: audio[2].image,
        correct: false
      }
    ]
  },
  {
    type: `artist`,
    audio: audio[0].src,
    answers: [
      {
        artist: audio[0].artist,
        image: audio[0].image,
        correct: true
      },
      {
        artist: audio[1].artist,
        image: audio[1].image,
        correct: false
      },
      {
        artist: audio[2].artist,
        image: audio[2].image,
        correct: false
      }
    ]
  },
  {
    type: `artist`,
    audio: audio[0].src,
    answers: [
      {
        artist: audio[0].artist,
        image: audio[0].image,
        correct: true
      },
      {
        artist: audio[1].artist,
        image: audio[1].image,
        correct: false
      },
      {
        artist: audio[2].artist,
        image: audio[2].image,
        correct: false
      }
    ]
  },
  {
    type: `artist`,
    audio: audio[0].src,
    answers: [
      {
        artist: audio[0].artist,
        image: audio[0].image,
        correct: true
      },
      {
        artist: audio[1].artist,
        image: audio[1].image,
        correct: false
      },
      {
        artist: audio[2].artist,
        image: audio[2].image,
        correct: false
      }
    ]
  }
];

export {initialData, InitialState, resultsScreenData, testLevels as levels, statistics, points, declinationForms};
