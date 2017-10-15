// Модуль с данными игры

import audio from './audio.js';

// Объект с данными о количестве баллов, присуждаемых за ответ игрока
const points = {
  CORRECT_QUICK: 2,
  CORRECT_SLOW: 1,
  INCORRECT: -2
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
  this.timeLeft = 300;
  this.notesLeft = 3;
};

InitialState.prototype = {
  getMinutes() {
    return Math.floor(this.timeLeft / 60);
  },

  getSeconds() {
    const secondsLeft = this.timeLeft % 60;
    return (secondsLeft > 10) ? secondsLeft : `0${secondsLeft}`;
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

export {InitialState, resultsScreenData, testLevels as levels, statistics, points};
