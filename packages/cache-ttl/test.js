const test = require('ava');
const CacheTTL = require('./dist/cjs/cache-ttl');

const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

test('Cache TTL - In-memory/Temporarily mode', async (t) => {
  t.timeout(10000);

  const cache = new CacheTTL(5000);

  cache.set('key-a', () => 'value-1');
  cache.set('key-b', 'value-b', 2000);
  cache.set('key-c', 'value-live-long', -1);
  cache.set('key-d', 'some-old-value', -3000);
  cache.set('key-e', 'value-e', 25000);
  cache.set('key-f', 'value-f', -1);
  const asyncKey1 = await cache.set('async-key-1', async () => {
    await timeout(200);
    return 'async-value-1';
  });
  const asyncPromiseKey1 = await cache.set('async-promise-key-1', async () => {
    await timeout(200);
    return new Promise((resolve) => resolve('async-promise-value-1'));
  });
  const promiseAsyncKey1 = await cache.set('promise-async-key-1', () => {
    return new Promise(async (resolve) => {
      await timeout(200);
      resolve('promise-async-value-1');
    });
  });
  const promisePromiseKey1 = await cache.set('promise-promise-key-1', () => {
    return new Promise(async (resolve) => {
      return timeout(200)
        .then(() => 'promise-promise-value-1')
        .then(resolve);
    });
  });

  const getOrSetFn1 = async () => {
    await timeout(200);
    return 'async-get-or-set-value-1';
  };
  const getOrSetAsync = await cache.getOrSet(
    'async-get-or-set-key-1',
    getOrSetFn1,
    1000
  );

  t.is(
    cache.get('key-a'),
    'value-1',
    'Function value passed .set method not works properly'
  );
  t.is(
    cache.get('key-b'),
    'value-b',
    'Primitive value passed .set method not works properly'
  );
  t.is(
    cache.get('key-c'),
    'value-live-long',
    'Value without expiration not works properly'
  );
  t.not(
    cache.get('key-d'),
    'some-old-value',
    'Primitive value with long expire delta passed .set method not works properly'
  );
  t.is(
    cache.get('key-e'),
    'value-e',
    'Primitive value with long expire delta passed .set method not works properly'
  );
  t.is(
    cache.get('key-f'),
    'value-f',
    'Primitive value with long expire delta passed .set method not works properly'
  );
  t.is(asyncKey1, 'async-value-1', 'Async value not works properly');
  t.is(
    asyncPromiseKey1,
    'async-promise-value-1',
    'Async -> Promise value not works properly'
  );
  t.is(
    promiseAsyncKey1,
    'promise-async-value-1',
    'Promise -> Async value not works properly'
  );
  t.is(
    promisePromiseKey1,
    'promise-promise-value-1',
    'Promise -> Promise value not works properly'
  );
  t.is(
    getOrSetAsync,
    'async-get-or-set-value-1',
    'Async -> GetOrSet works properly'
  );
  t.log('Cache saved successfully and storing correctly');

  await timeout(1000);

  t.is(
    cache.has('key-a'),
    true,
    'Function value passed .set method not works properly after 2s'
  );

  t.is(
    cache.has('key-b'),
    false,
    'Primitive value passed .set method not works properly after 2s'
  );
  t.is(
    cache.has('key-c'),
    true,
    'Value without expiration not works properly after 2s'
  );
  t.is(
    cache.get('key-e'),
    'value-e',
    'Value with 25sec expiration not works properly after 2s'
  );
  t.is(
    cache.get('key-f'),
    'value-f',
    'Value without expiration not works properly after 2s'
  );
  t.is(
    cache.get('async-key-1'),
    'async-value-1',
    'Async value not works properly after 2s'
  );
  t.is(
    cache.get('async-promise-key-1'),
    'async-promise-value-1',
    'Async -> Promise value not works properly after 2s'
  );
  t.is(
    cache.get('promise-async-key-1'),
    'promise-async-value-1',
    'Promise -> Async value not works properly after 2s'
  );
  t.is(
    cache.get('promise-promise-key-1'),
    'promise-promise-value-1',
    'Promise -> Promise value not works properly after 2s'
  );
  t.is(
    await cache.getOrSet('async-get-or-set-key-1', getOrSetFn1, 500),
    'async-get-or-set-value-1',
    'Async -> GetOrSet works properly'
  );

  await timeout(500);

  await cache.expire('key-e', 2000);
  await cache
    .getOrSet('async-get-or-set-key-1', getOrSetFn1, 1000)
    .then(() => t.pass('Duplicate call of getOrSet should not throw'));
  t.log('Cache saving after 2s works properly');

  await timeout(1500);

  t.is(
    cache.has('key-a'),
    true,
    'Function value passed .set method not works properly after 4s'
  );
  t.is(
    cache.has('key-b'),
    false,
    'Primitive value passed .set method not works properly after 4s'
  );
  t.is(
    cache.has('key-c'),
    true,
    'Value without expiration not works properly after 4s'
  );
  t.is(
    cache.get('key-e'),
    'value-e',
    'Value with 25sec expiration not works properly after 4s'
  );
  t.is(
    cache.get('key-f'),
    'value-f',
    'Value without expiration not works properly after 4s'
  );
  t.log('Cache saving after 4s works properly');

  await timeout(1000);

  t.is(
    cache.has('key-a'),
    false,
    'Function value passed .set method not works properly after 5s'
  );
  t.is(
    cache.has('key-b'),
    false,
    'Primitive value passed .set method not works properly after 5s'
  );
  t.is(
    cache.has('key-c'),
    true,
    'Value without expiration not works properly after 5s'
  );
  t.not(
    cache.get('key-e'),
    'value-e',
    'Value with 25sec expiration not works properly after 5s'
  );
  t.is(
    cache.get('key-f'),
    'value-f',
    'Value without expiration not works properly after 5s'
  );
  t.log('Cache saving after 5s works properly');

  await timeout(1000);

  t.is(
    cache.has('key-a'),
    false,
    'Function value passed .set method not works properly after 6s'
  );
  t.is(
    cache.has('key-b'),
    false,
    'Primitive value passed .set method not works properly after 6s'
  );
  t.is(
    cache.has('key-c'),
    true,
    'Value without expiration not works properly after 6s'
  );
  t.not(
    cache.get('key-e'),
    'value-e',
    'Value with 25sec expiration not works properly after 6s'
  );
  t.is(
    cache.get('key-f'),
    'value-f',
    'Value without expiration not works properly after 6s'
  );
  t.log('Cache saving after 6s works properly');

  cache.delete('key-c');

  t.is(cache.has('key-c'), false, 'Deleting cache item not works properly');
  t.is(
    cache.has('key-e'),
    false,
    'Value with 25sec expiration not works properly after 6s'
  );
  t.is(cache.has('key-f'), true, 'Cache item alive not works properly');
  t.log('Cache deleting works properly');

  cache.clear();

  t.is(
    cache.has('key-e'),
    false,
    'Value with 25sec expiration not works properly after 6s'
  );
  t.is(cache.has('key-f'), false, 'Cache items clear not works properly');

  cache.destroy();

  t.pass('Cache destroy was done without errors');
});

test('Cache TTL - Persistent File-caching mode', async (t) => {
  t.timeout(10000);

  const cache = new CacheTTL(5000, true);

  await cache.set('key-a', () => 'value-1');
  await cache.set('key-b', 'value-b', 2000);
  await cache.set('key-c', 'value-live-long', -1);
  await cache.set('key-d', 'some-old-value', -3000);
  await cache.set('key-e', 'value-e', 25000);
  await cache.set('key-f', 'value-f', -1);
  const asyncKey1 = await cache.set('async-key-1', async () => {
    await timeout(200);
    return 'async-value-1';
  });
  const asyncPromiseKey1 = await cache.set('async-promise-key-1', async () => {
    await timeout(200);
    return new Promise((resolve) => resolve('async-promise-value-1'));
  });
  const promiseAsyncKey1 = await cache.set('promise-async-key-1', () => {
    return new Promise(async (resolve) => {
      await timeout(200);
      resolve('promise-async-value-1');
    });
  });
  const promisePromiseKey1 = await cache.set('promise-promise-key-1', () => {
    return new Promise(async (resolve) => {
      return timeout(200)
        .then(() => 'promise-promise-value-1')
        .then(resolve);
    });
  });

  const getOrSetFn1 = async () => {
    await timeout(200);
    return 'async-get-or-set-value-1';
  };
  const getOrSetAsync = await cache.getOrSet(
    'async-get-or-set-key-1',
    getOrSetFn1,
    1000
  );

  t.is(
    await cache.get('key-a'),
    'value-1',
    'Function value passed .set method not works properly'
  );
  t.is(
    await cache.get('key-b'),
    'value-b',
    'Primitive value passed .set method not works properly'
  );
  t.is(
    await cache.get('key-c'),
    'value-live-long',
    'Value without expiration not works properly'
  );
  t.not(
    await cache.get('key-d'),
    'some-old-value',
    'Primitive value with long expire delta passed .set method not works properly'
  );
  t.is(
    await cache.get('key-e'),
    'value-e',
    'Primitive value with long expire delta passed .set method not works properly'
  );
  t.is(
    await cache.get('key-f'),
    'value-f',
    'Primitive value with long expire delta passed .set method not works properly'
  );
  t.is(asyncKey1, 'async-value-1', 'Async value not works properly');
  t.is(
    asyncPromiseKey1,
    'async-promise-value-1',
    'Async -> Promise value not works properly'
  );
  t.is(
    promiseAsyncKey1,
    'promise-async-value-1',
    'Promise -> Async value not works properly'
  );
  t.is(
    promisePromiseKey1,
    'promise-promise-value-1',
    'Promise -> Promise value not works properly'
  );
  t.is(
    getOrSetAsync,
    'async-get-or-set-value-1',
    'Async -> GetOrSet works properly'
  );
  t.log('Cache saved successfully and storing correctly');

  await timeout(1000);

  t.is(
    await cache.has('key-a'),
    true,
    'Function value passed .set method not works properly after 2s'
  );

  t.is(
    await cache.has('key-b'),
    false,
    'Primitive value passed .set method not works properly after 2s'
  );
  t.is(
    await cache.has('key-c'),
    true,
    'Value without expiration not works properly after 2s'
  );
  t.is(
    await cache.get('key-e'),
    'value-e',
    'Value with 25sec expiration not works properly after 2s'
  );
  t.is(
    await cache.get('key-f'),
    'value-f',
    'Value without expiration not works properly after 2s'
  );
  t.is(
    await cache.get('async-key-1'),
    'async-value-1',
    'Async value not works properly after 2s'
  );
  t.is(
    await cache.get('async-promise-key-1'),
    'async-promise-value-1',
    'Async -> Promise value not works properly after 2s'
  );
  t.is(
    await cache.get('promise-async-key-1'),
    'promise-async-value-1',
    'Promise -> Async value not works properly after 2s'
  );
  t.is(
    await cache.get('promise-promise-key-1'),
    'promise-promise-value-1',
    'Promise -> Promise value not works properly after 2s'
  );
  t.is(
    await cache.getOrSet('async-get-or-set-key-1', getOrSetFn1, 500),
    'async-get-or-set-value-1',
    'Async -> GetOrSet works properly'
  );

  await timeout(500);

  await cache.expire('key-e', 2000);
  await cache
    .getOrSet('async-get-or-set-key-1', getOrSetFn1, 1000)
    .then(() => t.pass('Duplicate call of getOrSet should not throw'));
  t.log('Cache saving after 2s works properly');

  await timeout(1500);

  t.is(
    await cache.has('key-a'),
    true,
    'Function value passed .set method not works properly after 4s'
  );
  t.is(
    await cache.has('key-b'),
    false,
    'Primitive value passed .set method not works properly after 4s'
  );
  t.is(
    await cache.has('key-c'),
    true,
    'Value without expiration not works properly after 4s'
  );
  t.is(
    await cache.get('key-e'),
    'value-e',
    'Value with 25sec expiration not works properly after 4s'
  );
  t.is(
    await cache.get('key-f'),
    'value-f',
    'Value without expiration not works properly after 4s'
  );
  t.log('Cache saving after 4s works properly');

  await timeout(1000);

  t.is(
    await cache.has('key-a'),
    false,
    'Function value passed .set method not works properly after 5s'
  );
  t.is(
    await cache.has('key-b'),
    false,
    'Primitive value passed .set method not works properly after 5s'
  );
  t.is(
    await cache.has('key-c'),
    true,
    'Value without expiration not works properly after 5s'
  );

  t.not(
    await cache.get('key-e'),
    'value-e',
    'Value with 25sec expiration not works properly after 5s'
  );
  t.is(
    await cache.get('key-f'),
    'value-f',
    'Value without expiration not works properly after 5s'
  );
  t.log('Cache saving after 5s works properly');

  await timeout(1000);

  t.is(
    await cache.has('key-a'),
    false,
    'Function value passed .set method not works properly after 6s'
  );
  t.is(
    await cache.has('key-b'),
    false,
    'Primitive value passed .set method not works properly after 6s'
  );
  t.is(
    await cache.has('key-c'),
    true,
    'Value without expiration not works properly after 6s'
  );
  t.not(
    await cache.get('key-e'),
    'value-e',
    'Value with 25sec expiration not works properly after 6s'
  );
  t.is(
    await cache.get('key-f'),
    'value-f',
    'Value without expiration not works properly after 6s'
  );
  t.log('Cache saving after 6s works properly');

  await cache.delete('key-c');

  t.is(
    await cache.has('key-c'),
    false,
    'Deleting cache item not works properly'
  );
  t.is(
    await cache.has('key-e'),
    false,
    'Value with 25sec expiration not works properly after 6s'
  );
  t.is(await cache.has('key-f'), true, 'Cache item alive not works properly');
  t.log('Cache deleting works properly');

  cache.clear();

  t.is(
    await cache.has('key-e'),
    false,
    'Value with 25sec expiration not works properly after 6s'
  );
  t.is(await cache.has('key-f'), false, 'Cache items clear not works properly');

  cache.destroy();

  t.pass('Cache destroy was done without errors');
});

test('Cache TTL - Custom cache (with Promise) mode', async (t) => {
  t.timeout(10000);

  let _map = new Map();
  const cache = new CacheTTL(5000, 'custom', {
    async getTransform(key) {
      return _map.get(key);
    },
    async hasTransform(key) {
      return _map.has(key);
    },
    async setTransform(key, value) {
      _map.set(key, value);
    },
    async deleteTransform(key) {
      _map.delete(key);
    }
  });

  cache.set('key-a', () => 'value-1');
  cache.set('key-b', 'value-b', 2000);
  cache.set('key-c', 'value-live-long', -1);
  cache.set('key-d', 'some-old-value', -3000);
  cache.set('key-e', 'value-e', 25000);
  cache.set('key-f', 'value-f', -1);
  const asyncKey1 = await cache.set('async-key-1', async () => {
    await timeout(200);
    return 'async-value-1';
  });
  const asyncPromiseKey1 = await cache.set('async-promise-key-1', async () => {
    await timeout(200);
    return new Promise((resolve) => resolve('async-promise-value-1'));
  });
  const promiseAsyncKey1 = await cache.set('promise-async-key-1', () => {
    return new Promise(async (resolve) => {
      await timeout(200);
      resolve('promise-async-value-1');
    });
  });
  const promisePromiseKey1 = await cache.set('promise-promise-key-1', () => {
    return new Promise(async (resolve) => {
      return timeout(200)
        .then(() => 'promise-promise-value-1')
        .then(resolve);
    });
  });

  const getOrSetFn1 = async () => {
    await timeout(200);
    return 'async-get-or-set-value-1';
  };
  const getOrSetAsync = await cache.getOrSet(
    'async-get-or-set-key-1',
    getOrSetFn1,
    1000
  );

  t.is(
    await cache.get('key-a'),
    'value-1',
    'Function value passed .set method not works properly'
  );
  t.is(
    await cache.get('key-b'),
    'value-b',
    'Primitive value passed .set method not works properly'
  );
  t.is(
    await cache.get('key-c'),
    'value-live-long',
    'Value without expiration not works properly'
  );
  t.not(
    await cache.get('key-d'),
    'some-old-value',
    'Primitive value with long expire delta passed .set method not works properly'
  );
  t.is(
    await cache.get('key-e'),
    'value-e',
    'Primitive value with long expire delta passed .set method not works properly'
  );
  t.is(
    await cache.get('key-f'),
    'value-f',
    'Primitive value with long expire delta passed .set method not works properly'
  );
  t.is(asyncKey1, 'async-value-1', 'Async value not works properly');
  t.is(
    asyncPromiseKey1,
    'async-promise-value-1',
    'Async -> Promise value not works properly'
  );
  t.is(
    promiseAsyncKey1,
    'promise-async-value-1',
    'Promise -> Async value not works properly'
  );
  t.is(
    promisePromiseKey1,
    'promise-promise-value-1',
    'Promise -> Promise value not works properly'
  );
  t.is(
    getOrSetAsync,
    'async-get-or-set-value-1',
    'Async -> GetOrSet works properly'
  );
  t.log('Cache saved successfully and storing correctly');

  await timeout(1000);

  t.is(
    await cache.has('key-a'),
    true,
    'Function value passed .set method not works properly after 2s'
  );

  t.is(
    await cache.has('key-b'),
    false,
    'Primitive value passed .set method not works properly after 2s'
  );
  t.is(
    await cache.has('key-c'),
    true,
    'Value without expiration not works properly after 2s'
  );
  t.is(
    await cache.get('key-e'),
    'value-e',
    'Value with 25sec expiration not works properly after 2s'
  );
  t.is(
    await cache.get('key-f'),
    'value-f',
    'Value without expiration not works properly after 2s'
  );
  t.is(
    await cache.get('async-key-1'),
    'async-value-1',
    'Async value not works properly after 2s'
  );
  t.is(
    await cache.get('async-promise-key-1'),
    'async-promise-value-1',
    'Async -> Promise value not works properly after 2s'
  );
  t.is(
    await cache.get('promise-async-key-1'),
    'promise-async-value-1',
    'Promise -> Async value not works properly after 2s'
  );
  t.is(
    await cache.get('promise-promise-key-1'),
    'promise-promise-value-1',
    'Promise -> Promise value not works properly after 2s'
  );
  t.is(
    await cache.getOrSet('async-get-or-set-key-1', getOrSetFn1, 500),
    'async-get-or-set-value-1',
    'Async -> GetOrSet works properly'
  );

  await timeout(500);

  await cache.expire('key-e', 2000);
  await cache
    .getOrSet('async-get-or-set-key-1', getOrSetFn1, 1000)
    .then(() => t.pass('Duplicate call of getOrSet should not throw'));
  t.log('Cache saving after 2s works properly');

  await timeout(1500);

  t.is(
    await cache.has('key-a'),
    true,
    'Function value passed .set method not works properly after 4s'
  );
  t.is(
    await cache.has('key-b'),
    false,
    'Primitive value passed .set method not works properly after 4s'
  );
  t.is(
    await cache.has('key-c'),
    true,
    'Value without expiration not works properly after 4s'
  );
  t.is(
    await cache.get('key-e'),
    'value-e',
    'Value with 25sec expiration not works properly after 4s'
  );
  t.is(
    await cache.get('key-f'),
    'value-f',
    'Value without expiration not works properly after 4s'
  );
  t.log('Cache saving after 4s works properly');

  await timeout(1000);

  t.is(
    await cache.has('key-a'),
    false,
    'Function value passed .set method not works properly after 5s'
  );
  t.is(
    await cache.has('key-b'),
    false,
    'Primitive value passed .set method not works properly after 5s'
  );
  t.is(
    await cache.has('key-c'),
    true,
    'Value without expiration not works properly after 5s'
  );

  t.not(
    await cache.get('key-e'),
    'value-e',
    'Value with 25sec expiration not works properly after 5s'
  );
  t.is(
    await cache.get('key-f'),
    'value-f',
    'Value without expiration not works properly after 5s'
  );
  t.log('Cache saving after 5s works properly');

  await timeout(1000);

  t.is(
    await cache.has('key-a'),
    false,
    'Function value passed .set method not works properly after 6s'
  );
  t.is(
    await cache.has('key-b'),
    false,
    'Primitive value passed .set method not works properly after 6s'
  );
  t.is(
    await cache.has('key-c'),
    true,
    'Value without expiration not works properly after 6s'
  );
  t.not(
    await cache.get('key-e'),
    'value-e',
    'Value with 25sec expiration not works properly after 6s'
  );
  t.is(
    await cache.get('key-f'),
    'value-f',
    'Value without expiration not works properly after 6s'
  );
  t.log('Cache saving after 6s works properly');

  await cache.delete('key-c');

  t.is(
    await cache.has('key-c'),
    false,
    'Deleting cache item not works properly'
  );
  t.is(
    await cache.has('key-e'),
    false,
    'Value with 25sec expiration not works properly after 6s'
  );
  t.is(await cache.has('key-f'), true, 'Cache item alive not works properly');
  t.log('Cache deleting works properly');

  await cache.clear();

  t.is(
    await cache.has('key-e'),
    false,
    'Value with 25sec expiration not works properly after 6s'
  );
  t.is(await cache.has('key-f'), false, 'Cache items clear not works properly');

  await cache.destroy();

  t.pass('Cache destroy was done without errors');
});
