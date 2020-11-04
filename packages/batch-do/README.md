# batch-do

Do batched tasks easily

## Features

- Relatively fast
- Single micro-task batching
- ESM & CJS compatible

## How it works

## Installation

We recommend install via `npm` because of it's cache and flat node modules tree

```bash
npm i batch-do
```

then you able to import to Node.js/Browser easily

```js
// Node.js
const batch = require('batch-do');
const { createContext } = batch;

// ES6
import batch, { createContext } from 'batch-do';
```

## Usage

```ts
const [state: number, setState: (value: number) => void] = React.useState(0);
batch(() => {
  setState(state + 1);
});
```

## Documentation

### `batch`

```js
batch(() => {
  console.log("log 1");
}, ctx?);
batch(() => {
  console.log("log 2");
}, ctx?);
// log 1
// log 2
```

Arguments list

- `ctx` - Context list

### `createContext`

```js
const ctx = createContext(
  resolveBatchs,
  pendingResolve,
  awaitBatch,
  maxCallsPerBatch
);
```

Arguments list

- `resolveBatchs` - Function to apply batched functions and frees up current batch pending list
- `pendingResolve` - Function to resolve **apply batchs** function
- `awaitBatch` - Merge all **async** batches into single call or ordered
- `maxCallsPerBatch` - Argument to enable max limit for batches

## License

MIT
