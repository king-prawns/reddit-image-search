import test from 'ava';
import isScrollExpected from '../libs/is-scroll-expected';

test('isScrollExpected', (t) => {
  t.plan(3);
  const scrollTargetA = {
    oH : 800,
    sY : 1700,
    iH : 20
  };

  t.true(isScrollExpected(scrollTargetA, 50), 'should return true');

  const scrollTargetB = {
    oH : 1200,
    sY : 1100,
    iH : 50
  };

  t.true(isScrollExpected(scrollTargetB, 50), 'should return true');

  const scrollTargetC = {
    oH : 1800,
    sY : 1100,
    iH : 50
  };

  t.false(isScrollExpected(scrollTargetC, 50), 'should return false');
});
