import assert from 'assert';
import displayResult from './display-result.js';

describe(`Results output`, () => {
  it(`should respond to timeout correctly`, () => {
    const playerResult = {
      score: -1,
      notesLeft: 3,
      timeLeft: 0
    };
    assert.equal(displayResult([1, 2, 1], playerResult), `Время вышло! Вы не успели отгадать все мелодии`);
  });

  it(`should respond to the failure of all attempts correctly`, () => {
    const playerResult = {
      score: -1,
      notesLeft: 0,
      timeLeft: 40
    };
    assert.equal(displayResult([7, 20, 13, 9], playerResult), `У вас закончились все попытки. Ничего, повезёт в следующий раз!`);
  });

  it(`should respond to the success correctly`, () => {
    const playerResult = {
      score: 14,
      notesLeft: 0,
      timeLeft: 10
    };
    assert.equal(displayResult([5, 13, 11, 4, 8], playerResult), `Вы заняли 1-ое место из 6 игроков. Это лучше, чем у 83% игроков`);

    playerResult.score = 10;
    assert.equal(displayResult([7, 2, 15, 20], playerResult), `Вы заняли 3-ое место из 5 игроков. Это лучше, чем у 40% игроков`);

    playerResult.score = 12;
    assert.equal(displayResult([13, 15, 16, 20, 19, 18, 15, 14], playerResult), `Вы заняли 9-ое место из 9 игроков. Это лучше, чем у 0% игроков`);
  });

  it(`should respond to the success correctly if player's score is equal to the one of other players' score`, () => {
    const playerResult = {
      score: 12,
      notesLeft: 1,
      timeLeft: 50
    };
    assert.equal(displayResult([3, 12, 10, 20, 12, 5, 10, 19, 19, 12], playerResult), `Вы заняли 4-ое место из 11 игроков. Это лучше, чем у 36% игроков`);
  });
});
