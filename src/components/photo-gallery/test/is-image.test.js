import test from 'ava';
import isImage from '../libs/is-image';

test('isImage', (t) => {
  t.plan(3);
  const dataA = {
    thumbnail : 'test.png',
    preview   : 'testpreview'
  };

  t.true(isImage(dataA), 'should return true');


  const dataB = {
    thumbnail : 'test.gif',
    preview   : null
  };

  t.false(isImage(dataB), 'should return false');

  const dataC = {
    thumbnail : 'test.pdf',
    preview   : 'testpreview'
  };

  t.false(isImage(dataC), 'should return false');
});
