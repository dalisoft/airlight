const test = require('ava');
const Events = require('.');

test('Get prototype', (t) => {
  t.plan(4);

  t.is(
    typeof Events.prototype.on,
    'function',
    'Prototype methods not assigned properly'
  );
  t.is(
    typeof Events.prototype.once,
    'function',
    'Prototype methods not assigned properly'
  );
  t.is(
    typeof Events.prototype.off,
    'function',
    'Prototype methods not assigned properly'
  );
  t.is(
    typeof Events.prototype.emit,
    'function',
    'Prototype methods not assigned properly'
  );
});
test('Basic test', (t) =>
  new Promise((resolve) => {
    t.timeout(1000);
    t.plan(5);

    const ev = new Events();

    ev.on('e1', () => t.pass());
    ev.on('e2', () => t.pass());
    ev.once('e3', () => t.pass());
    ev.on('e4', () => t.pass());

    ev.emit('e1');
    ev.emit('e2');
    ev.emit('e3');
    ev.emit('e3');
    ev.emit('e4');

    ev.off('e4');
    ev.emit('e4');

    setTimeout(() => {
      ev.emit('e1');
      resolve();
    }, 500);
  }));

test('Type and Value parsing test', (t) => {
  t.plan(1000);
  t.plan(8);

  const ev = new Events();

  ev.modifyArgs((args) => {
    return args.map((type) => {
      if (typeof type !== 'string') {
        return type;
      }
      if (
        type.charAt(0) === '{' ||
        (type.charAt(0) === '[' && typeof JSON !== 'undefined')
      ) {
        return JSON.parse(type);
      }
      if (isNaN(+type)) {
        return type;
      }
      return +type;
    });
  });

  ev.on('num', (n, excepted) => {
    t.is(n, excepted, 'Number parsing does not work as excepted');
    t.is(typeof n, 'number', 'Number type parsing does not work as excepted');
  });
  ev.on('arr', (someArr, excepted) => {
    t.deepEqual(someArr, excepted, 'Array parsing does not work as excepted');
    t.true(
      Array.isArray(someArr),
      'Array type parsing does not work as excepted'
    );
  });
  ev.on('obj', (someObj, excepted) => {
    t.deepEqual(someObj, excepted, 'Object parsing does not work as excepted');
    t.is(
      typeof someObj,
      'object',
      'Object type parsing does not work as excepted'
    );
  });
  ev.once('str', (s, excepted) => {
    t.is(s, excepted, 'String parsing does not work as excepted');
    t.is(typeof s, 'string', 'String type parsing does not work as excepted');
  });

  ev.emit('num', '500', 500);
  ev.emit('arr', '[1,2,3]', [1, 2, 3]);
  ev.emit('obj', '{"foo":"bar"}', { foo: 'bar' });
  ev.emit('str', '1 is not 2', '1 is not 2');
  ev.emit('str', '2 is not 3', '1 is not 2');
});
