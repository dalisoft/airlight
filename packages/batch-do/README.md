# batch-do
Do batched tasks easily

## Features

- Relatively fast
- Splitted into two mode
- Single micro-task batching
- UMD compatible

## Installation

We recommend install via `npm` because of it's cache and flat node modules tree

```bash
npm i batch-do
```

then you able to import to Node.js/Browser easily

```js
// Node.js
const { after } = require("batch-do");

// ES6
import { after } from "batch-do";
```

## Imports

- `before` - Tasks will be called before any calls
- `after` - Tasks will be called after any calls
- `createContext` - Create context different than default context

## Usage

```ts
const [state, setState] = React.useState(0);
after(() => {
  setState(state + 1);
});
```

## License

MIT
