// Модуль состояния игры

import {initialData, Points, SECONDS_PER_MINUTE, SMALLEST_TWO_DIGIT_NUMBER, QUICK_ANSWER_TIME} from './data.js';
import {areArrayElementsIncludedInAnotherArray} from './util.js';

class GameState {
  constructor(levels, time, notes, playerAnswers = []) {
    this.timeLeft = time;
    this.notes = notes;
    this.levels = levels.slice();
    this.level = this.levels.shift();
    this.playerAnswers = playerAnswers;
  }

  get minutes() {
    return Math.floor(this.timeLeft / SECONDS_PER_MINUTE);
  }

  get minutesSpent() {
    return Math.floor((initialData.time - this.timeLeft) / SECONDS_PER_MINUTE);
  }

  get seconds() {
    const secondsLeft = this.timeLeft % SECONDS_PER_MINUTE;
    return (secondsLeft >= SMALLEST_TWO_DIGIT_NUMBER) ? secondsLeft : `0${secondsLeft}`;
  }

  get secondsSpent() {
    return (initialData.time - this.timeLeft) % SECONDS_PER_MINUTE;
  }

  tick() {
    if (this.timeLeft > 0) {
      this.timeLeft--;
      return true;
    }
    return false;
  }

  setNextLevel() {
    if (this.levels.length) {
      this.level = this.levels.shift();
    }
  }

  handleIncorrectAnswer() {
    this.playerAnswers.push(Points.INCORRECT);
    this.notes--;
  }

  handleCorrectAnswer(startTime) {
    const pointsGain = (startTime - this.timeLeft < QUICK_ANSWER_TIME) ? Points.CORRECT_QUICK : Points.CORRECT_SLOW;
    this.playerAnswers.push(pointsGain);
  }

  checkGenreAnswer(chosenTracksSources, answers, startTime) {
    const correctAnswersSources = answers.filter((item) => item.genre === this.level.genre).map((item) => item.src);

    if (chosenTracksSources.length !== correctAnswersSources.length || !areArrayElementsIncludedInAnotherArray(chosenTracksSources, correctAnswersSources)) {
      this.handleIncorrectAnswer();
    } else {
      this.handleCorrectAnswer(startTime);
    }
  }

  checkArtistAnswer(chosenArtist, answers, startTime) {
    const correctAnswer = answers.find((item) => item.isCorrect).title;

    if (chosenArtist !== correctAnswer) {
      this.handleIncorrectAnswer();
    } else {
      this.handleCorrectAnswer(startTime);
    }
  }
}

export default GameState;
