const test = require('ava');
const DeepCopy = require('.');

test('Object clone', (t) => {
  const obj = { a: 'b', 2: 3 };
  const copy = DeepCopy(obj);

  t.deepEqual(obj, copy, 'Data is malformed when copy');
  if (obj !== copy) {
    t.pass('Object was cloned, not referenced');
  }
});

test('Deep Object clone', (t) => {
  const obj = { foo: { bar: 'baz' } };
  const copy = DeepCopy(obj);

  t.deepEqual(obj, copy, 'Data is malformed when copy');
  if (obj !== copy && obj.foo !== copy.foo) {
    t.pass('Object was deep cloned, not referenced');
  }
});

test('Map clone', (t) => {
  const map = new Map();
  map.set('foo', 'bar');

  const copy = DeepCopy(map);

  t.deepEqual(map, copy, 'Data is malformed when copy');
  if (map !== copy) {
    t.pass('Map was cloned, not referenced');
  }
});

test('Deep Map clone', (t) => {
  const map = new Map();
  const foo = new Map();
  foo.set('bar', 'baz');

  map.set('foo', foo);

  const copy = DeepCopy(map);

  t.deepEqual(map, copy, 'Data is malformed when copy');
  if (map !== copy && map.get('foo') !== copy.get('foo')) {
    t.pass('Map was deep cloned, not referenced');
  }
});

test('Array clone', (t) => {
  const arr = ['a', 2];
  const copy = DeepCopy(arr);

  t.deepEqual(arr, copy, 'Data is malformed when copy');
  if (arr !== copy) {
    t.pass('Array was cloned, not referenced');
  }
});

test('Deep Array clone', (t) => {
  const arr = [['foo', ['bar', ['baz']]]];
  const copy = DeepCopy(arr);

  t.deepEqual(arr, copy, 'Data is malformed when copy');
  if (
    arr !== copy &&
    arr[0] !== copy[0] &&
    arr[1] !== copy[1] &&
    arr[1][1] !== copy[1][1]
  ) {
    t.pass('Deep Array was cloned, not referenced');
  }
});

test('Date clone', (t) => {
  const date = new Date();
  const copy = DeepCopy(date);

  t.deepEqual(date, copy, 'Data is malformed when copy');
  if (date !== copy) {
    t.pass('Date was cloned, not referenced');
  }
});

test('Primitive clone', (t) => {
  const num = 1;
  const numCopy = DeepCopy(num);

  t.is(num, numCopy, 'Data is malformed when copy');
  if (num === numCopy) {
    t.pass('Primite value was cloned, not referenced');
  }

  const str = 'String';
  const strCopy = DeepCopy(str);

  t.is(str, strCopy, 'Data is malformed when copy');
  if (str === strCopy) {
    t.pass('Primite value was cloned, not referenced');
  }
});
