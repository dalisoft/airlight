# sequelize-wrap

An Wrapper for Sequelize Model

Note: _Requires Sequelize Model to be work_

## Features

- Easy
- Powerful
- Flexible
- Performant

## Installation

We recommend install via `npm` because of it's cache and flat node modules tree

```bash
npm i @dalisoft/sequelize-wrap
```

then you able to import to Node.js easily

```js
// Node.js
const SequelizeWrap = require('@dalisoft/sequelize-wrap');

// ES6
import SequelizeWrap from '@dalisoft/sequelize-wrap';
```

## Methods

### See `sequelize-wrap.js` for methods, a lot of functions, but i don't have time to write all of these there, sorry

## Usage

```js
const model = sequelize.model(...);

const wrappedModel = new SequelizeWrap(model);

// here you go
```

## License

MIT
