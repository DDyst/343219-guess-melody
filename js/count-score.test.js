import assert from 'assert';
import countScore from './count-score.js';

describe(`Scoring`, () => {
  it(`should return -1 if there are less than 10 answers`, () => {
    assert.equal(countScore([1, 2, 1], 0), -1);
  });

  it(`should return 10 if there are 10 slow answers with zero mistakes`, () => {
    assert.equal(countScore([1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 3), 10);
  });

  it(`should return 14 if there are 10 quick answers with 3 mistakes`, () => {
    assert.equal(countScore([2, 2, 2, 2, 2, 2, 2, 2, 2, 2], 0), 14);
  });

  it(`should return right number with various valid input`, () => {
    assert.equal(countScore([2, 2, 2, 2, 2, 2, 2, 2, 2, 2], 1), 16);
    assert.equal(countScore([1, 1, 2, 1, 1, 2, 2, 2, 2, 2], 2), 14);
    assert.equal(countScore([2, 2, 2, 2, 2, 2, 2, 2, 2, 2], 3), 20);
    assert.equal(countScore([2, 2, 2, 2, 2, 2, 2, 2, 2, 2], 2), 18);
    assert.equal(countScore([1, 2, 1, 2, 2, 1, 2, 2, 2, 1], 0), 10);
    assert.equal(countScore([1, 1, 2, 2, 2, 2, 1, 1, 2, 2], 1), 12);
    assert.equal(countScore([1, 2, 1, 2, 1, 2, 1, 2, 1, 1], 3), 14);
  });
});
