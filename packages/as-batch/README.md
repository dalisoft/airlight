# asBatch

Convert many calls into batches

> _Mostly use this for solving 1+N (N+1) problem_

## Warning

I recommend you using [DataLoader](https://github.com/graphql/dataloader) instead of this utility. In my own benchmark this utility has lower memory overhead and higher performance, it's not solution for your tasks, for my tasks this tool does the job, but [DataLoader](https://github.com/graphql/dataloader) has better community and maintained well by very opinionated developers

Collect calls and make them batching

## Features

- Fast
- Automatic handling
- No duplication
- Almost zero-config
- Flexible
- On browsers works too
- Types declaration for IDE/Editor

## Import

```js
// ES6
import asBatch from '@dalisoft/as-batch';

// or

// CommonJS
const asBatch = require('@dalisoft/as-batch');

// or

const asBatch = window.asBatch;
```

## Example

```js
const calling = new asBatch({
    onCallsTimeout: async calls => {
      await timeout(2000);

      return await Promise.all(calls);
    }
  });

// No await calling, because await blocks caching and this not works effectively
// Also available other ways, see tests and i'm happy your PR for examples
// Just i don't have time to create examples
  calling
    .call(
      async () => {
        return requestWithSomeLib('[endpoint]/posts);
      },
      responses => responses.find(response => response.src === '/posts').posts
    )
    .then(posts =>
      console.log('see posts', posts)
    );
```

For more info see tests.

## Options

- _cache_ - store of cache, should be like ES6 Map constructor
- _callsCache_ - store of calls cache, should be like ES6 Map constructor
- _key_ - default key for instance, if no one will not specify in methods
- _transform_ - this options only for `.register` method as useful for query and/or something similar
- _maxAgeOfCache_ - max age of cached results and keys which are removed after expiring
- _onRegisterTimeout_ - this option only for `.register` method and callback when within specified `delay` no calls happen, this callback will be fired
- _onRegisterTimeoutDelay_ - delay ms for _onRegisterTimeout_
- _onCallsTimeout_ - this option only for `.call` method and callback when within specified `delay` no calls happen, this callback will be fired
- _onCallsTimeoutDelay_ - delay ms for onCallsTimeout

## Methods

### `.register(key?: string | Function, value?: string | Function, resolve?: Function): Promise | CacheResult | Any`

Registers anything and then call _`onRegisterTimeout`_ if no again calling this method within specified delay

### `.call(key?: string | Function, value?: string | Function, resolve?: Function): Promise | CacheResult | Any`

Returns the cached call within specified delay

### `.fetchRegistered(): Promise | Any`

Fetchs registered caches from `.register` method

### `.delete(key: string)`

Removes the callback from cache

### `.clear()`

Clear cache instance to be empty

## License

MIT
