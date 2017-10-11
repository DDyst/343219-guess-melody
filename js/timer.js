// Модуль создания таймера

const Timer = function (time) {
  this.time = time;
};

Timer.prototype.tick = function () {
  if (this.time > 0) {
    this.time--;
  }
  if (this.time === 0) {
    return false;
  }
  return true;
};

export default Timer;
