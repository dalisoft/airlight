# CacheTTL

Caching Library with TTL for Node.js and browser

**NOTE**: _From latest release, the `sync` variant is removed due of stability, performance and security reasons_

## Features

- Out-of-the-box Promise & Async/Await support
- Fast
- No duplication
- Almost zero-config
- Flexible
- Memory-effecient
- On browsers works too
- Types declaration for IDE/Editor
- File-based mode (only for Node.js)
- Custom user mode defining

## Import

```js
// ES6
import CacheTTL from '@dalisoft/cache-ttl';

// or

// CommonJS
const CacheTTL = require('@dalisoft/cache-ttl');

// or

const CacheTTL = window.CacheTTL;
```

## Example

```js
const cache = new CacheTTL(1000 /* in ms */, saveAsFile?: boolean);

await cache.set('my-cache', () => 'i am live here around 1 sec'); // Returns String

await cache.set('my-response', async () => await axios({...})); // it's too lives here around 1 sec, returns Promise
```

or you can see how to define your own caching method (you can use Redis, MongoDB or everywhere). Async/Promise also support out-of-box

```ts
let _map = new Map();
const cache = new CacheTTL(5000, 'custom', {
  getTransform(key: string): any {
    return _map.get(key);
  },
  hasTransform(key: string): boolean {
    return _map.has(key);
  },
  setTransform(key: string, value: any): void {
    _map.set(key, value);
  },
  deleteTransform(key: string): void {
    _map.delete(key);
  }
});
```

For more info see tests.
About invalidation, expire time and other things the core takes care of this, you shouldn't worry for these.

**Note**: For security reason, for custom and FS modes, functions and symbols are not supported. PR's are welcome to fix this.

## Methods

### `.get(key: string): Promise<CacheItem>`

Returns value of cache if still valid or null if value is expired

### `.has(key: string): Promise<Boolean>`

Returns the value still valid or removed/expired?!

### `.set(key: string, value: AsyncFunction | Promise, ttl?: number): AsyncFunction | Promise`

Creates new value for specified key and returns value

### `.expire(key: string, ttl?: number): AsyncFunction | Promise`

Sets new expire for specified key and returns value

### `.getOrSet(key: string, value: AsyncFunction | Promise): AsyncFunction<value> | Promise<value>`

Get if there a valid value or creates a new one

### `.delete(key: string): AsyncFunction | Promise`

Removes the cache

### `.clear()`

Clear cache instance to be empty

### `.destroy()`

Destroys cache instance

## License

MIT
