# deepcopy

[![Greenkeeper badge](https://badges.greenkeeper.io/dalisoft/deepcopy.svg)](https://greenkeeper.io/)

Simple, yet smart Javascript instance cloner

## Features

- Good browsers compatiblity
- Performant
- Easy
- UMD compatible

## Installation

We recommend install via `npm` because of it's cache and flat node modules tree

```bash
npm i deepcopy
```

then you able to import to Node.js/Browser easily

```js
// Node.js
const DeepCopy = require("deepcopy");

// Browser
// window.DeepCopy OR DeepCopy

// ES6
import DeepCopy from "deepcopy";
```

## Usage

```js
const foo = { foo: "bar" };
const copyFoo = DeepCopy(foo);
```

## License

MIT
