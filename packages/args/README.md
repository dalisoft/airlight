# args

A performant argument pass library

## Features

- Ability handle up to 10 arguments
- Performant
- Easy
- Fallback to `fn.apply(this, args)`
- UMD compatible

## Installation

We recommend install via `npm` because of it's cache and flat node modules tree

```bash
npm i @dalisoft/args
```

then you able to import to Node.js/Browser easily

```js
// Node.js
const args = require('@dalisoft/args');

// Browser
// window.args OR args

// ES6
import args from '@dalisoft/args';
```

## Usage

```ts
args(fn: Function, arguments: any[])
```

## License

MIT
