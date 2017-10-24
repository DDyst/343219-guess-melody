// Модуль создания таймера

class Timer {
  constructor(time) {
    this.time = time;
  }

  tick() {
    if (this.time > 0) {
      this.time--;
    }
    if (this.time === 0) {
      return false;
    }
    return true;
  }
}

export default Timer;
