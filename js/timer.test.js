import assert from 'assert';
import Timer from './timer.js';

describe(`Timer`, () => {
  it(`should reduce time by one after calling tick`, () => {
    const timer = new Timer(10);
    timer.tick();
    assert.equal(timer.time, 9);
  });

  it(`shouldn't reduce time after calling tick if it's already at zero`, () => {
    const timer = new Timer(0);
    timer.tick();
    assert.equal(timer.time, 0);
  });

  it(`should return false after calling tick if time is over`, () => {
    const timer1 = new Timer(0);
    assert(!timer1.tick());

    const timer2 = new Timer(1);
    assert(!timer2.tick());

    const timer3 = new Timer(20);
    assert(timer3.tick());
  });
});
