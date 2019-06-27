# batchCollect

[![Greenkeeper badge](https://badges.greenkeeper.io/dalisoft/batch-collect.svg)](https://greenkeeper.io/)

Collect calls and make them batching

> _Mostly use this for solving 1+N (N+1) problem_

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
import batchCollect from "@dalisoft/batch-collect";

// or

// CommonJS
const batchCollect = require("@dalisoft/batch-collect");

// or

const batchCollect = window.batchCollect;
```

## Example

### Basic example

```js
const batchQuery = batchCollect(async collects => {
  await timeout(500);

  return collects.map(requestToSomeWhere);
});

batchQuery(() => `getUser { id, name }`, user => doSomething(user));

await batchQuery(async () => {
  await timeout(100);
  return `getAsync { result }`;
});

batchQuery(`getProfile {id, avatar}`);
```

### N+1 problem solve example

```js
const batchSQL = batchCollect(async ids => {
  return orm.getByIds(ids);
});

batchSQL(() => id, row => doSomething(row));

// This code is executes from different place than above query
// and both code exetudes once, on DB requests will be called once
batchSQL(id, row => doSomething(row));
```

For more info see tests.

## License

MIT
