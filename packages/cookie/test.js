import test from 'ava';
import { parse, stringify, getFromHeaders, set, remove } from './cookie';

test('Cookie core features', (t) => {
  t.deepEqual(
    parse('foo=bar'),
    { foo: 'bar' },
    'Parse feature does not work properly'
  );
  t.is(
    stringify({ bar: 'baz' }),
    'bar=baz',
    'Stringify feature does not work properly'
  );
  t.deepEqual(
    getFromHeaders({ cookie: 'user=john_doe' }),
    { user: 'john_doe' },
    'Get from header feature does not work properly'
  );
});

test('Cookie basic features', (t) => {
  // Fake Framework.Core.prototype.Response
  const cookie = {};
  const res = {
    setCookie(key, value, options = {}) {
      if (options.expiresIn !== undefined && options.expiresIn < Date.now()) {
        delete cookie[key];
      } else {
        cookie[key] = value;
      }
    }
  };

  set(res, 'foo', 'bar');

  t.is(cookie.foo, 'bar', 'Set does not work properly');

  remove(res, 'foo');

  t.not(cookie.foo, 'bar', 'Remove does not work properly');
});
