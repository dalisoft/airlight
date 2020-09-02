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
const batch = require("batch-do");

// ES6
import batch from "batch-do";
```

## Usage

```ts
const [state: number, setState: (value: number) => void] = React.useState(0);
batch(() => {
  setState(state + 1);
});
```

## License

MIT
