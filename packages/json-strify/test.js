const test = require('ava');
const strify = require('./json-strify');

test('stringify number', (t) => {
  const instance = strify();
  const obj = { a: 1 };
  const str = instance(obj);

  t.is(str, JSON.stringify(obj), 'Stringify Number not works as excepted');
});

test('stringify string', (t) => {
  const instance = strify();
  const obj = { b: 'string in object' };
  const str = instance(obj);

  t.is(str, JSON.stringify(obj), 'Stringify String not works as excepted');

  const str2 = 'This is "string"';
  const str2conv = instance(str2);

  t.is(
    str2conv,
    JSON.stringify('This is "string"'),
    'Stringify not works as excepted'
  );
});

test('stringify boolean', (t) => {
  const instance = strify();
  const obj = { c: false };
  const str = instance(obj);

  t.is(str, JSON.stringify(obj), 'Stringify Boolean not works as excepted');
});

test('stringify array', (t) => {
  const instance = strify();
  const obj = { baz: [1, 'two'] };
  const str = instance(obj);

  t.is(str, JSON.stringify(obj), 'Stringify Array not works as excepted');
});

test('stringify object', (t) => {
  const instance = strify();
  const obj = { foo: { bar: 'baz' } };

  const str = instance(obj);

  t.is(str, JSON.stringify(obj), 'Stringify Object not works as excepted');
});

test('stringify circular', (t) => {
  const instance = strify();
  const obj = { foo: { bar: 'baz' } };
  obj.foo.xyz = obj.foo;
  obj.bar = [1, 2, [obj, { baz: obj.foo }]];

  const str = instance(obj);

  t.is(
    str,
    '{"foo":{"bar":"baz","xyz":"[Circular]"},"bar":[1,2,["[Circular]",{"baz":{"bar":"baz","xyz":"[Circular]"}}]]}',
    'Stringify Object not works as excepted'
  );
});
