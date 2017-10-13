// Модуль с данными игры

import audio from './audio.js';

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
const statistics = [10, 12, 8, 5, 9];

const testPlayerResult = {
  score: 10,
  timeLeft: 125,
  notesLeft: 3,
  get minutes() {
    return Math.floor(this.timeLeft / 60);
  },
  get seconds() {
    const secondsLeft = this.timeLeft % 60;
    return (secondsLeft > 10) ? secondsLeft : `0${secondsLeft}`;
  }
};

const initialState = {
  timeLeft: 300,
  notesLeft: 3,
  get minutes() {
    return Math.floor(this.timeLeft / 60);
  },
  get seconds() {
    const secondsLeft = this.timeLeft % 60;
    return (secondsLeft > 10) ? secondsLeft : `0${secondsLeft}`;
  }
};

const initialGenreLevel = {
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
};

const initialArtistLevel = {
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

export {initialState, initialGenreLevel, initialArtistLevel, testPlayerResult as playerResult, resultsScreenData, testLevels as levels, statistics};
