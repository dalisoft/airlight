# json-strify

Faster implementation of JSON.stringify

_Performance: This library ~50% faster than `JSON.stringify` on larger objects/arrays_

_Note: This library doesn't handle Ciruclar references, instead of just replaces Circular reference to `[Circular]` string, but doesn't throw error_

## Features

- Performant
- Easy
- Auto-schema generating

## Installation

We recommend install via `npm` because of it's cache and flat node modules tree

```bash
npm i json-strify
```

then you able to import to Node.js/Browser easily

```js
// Node.js
const JSONStringify = require('json-strify');

// ES6
import JSONStringify from 'json-strify';
```

## Usage

```ts
JSONStringify(object: any): string
```

## License

MIT
