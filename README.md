# CacheTTL

[![Greenkeeper badge](https://badges.greenkeeper.io/dalisoft/cache-ttl.svg)](https://greenkeeper.io/)

In-memory and File-based cache with TTL for Node.js and browser

## Features

- Fast
- No duplication
- Almost zero-config
- Flexible
- Memory-effecient
- Promise support
- Async/Await support
- On browsers works too
- Types declaration for IDE/Editor
- File-based mode (only for Node.js)

## Import

```js
// ES6
import CacheTTL from "@dalisoft/cache-ttl";

// or

// CommonJS
const { CacheTTL } = require("@dalisoft/cache-ttl");

// or

const CacheTTL = window.CacheTTL;
```

## Example

```js
const cache = new CacheTTL(1000 /* in ms */, saveAsFile?: boolean);

cache.set('my-cache', () => 'i am live here around 1 sec'); // Returns String

cache.set('my-response', async () => await axios({...})); // it's too lives here around 1 sec, returns Promise
```

## Methods

### `.get(key: string): CacheItem`

Returns value of cache if still valid or null if value is expired

### `.has(key: string): Boolean`

Returns the value still valid or removed/expired?!

### `.set(key: string, value: Function | Promise, ttl?: number)`

Creates new value for specified key and returns value

### `.getOrSet(key: string, value: Function | AsyncFunction | Promise): value`

Get if there a valid value or creates a new one

### `.delete(key: string)`

Removes the cache

### `.destroy`

Destroys cache instance

## License

MIT
