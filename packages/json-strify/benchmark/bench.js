const strify = require('../json-strify');

const obj = {
  a: 1,
  b: 'string',
  foo: { bar: 'baz', nullValue: null },
  qux: [1, 'two', { three: true, undef: undefined }]
};
obj.c = obj.foo;

const bench = (name, fn, iteration = 1e5) => {
  console.time(name);
  for (let i = 0; i < iteration; i++) {
    fn(obj);
  }
  console.timeEnd(name);
};

bench('JSON.stringify', JSON.stringify, 1e5);
bench('json-strify', strify(), 1e5);
