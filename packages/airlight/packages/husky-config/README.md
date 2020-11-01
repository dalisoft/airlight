# husky-config-airlight

Husky config for use of combining all linters and formatters

## Installation

```bash
npm install husky-config-airlight --save-dev
# or
yarn add husky-config-airlight -D
```

## Usage

`.huskyrc.js`

```js
module.exports = require('husky-config-airlight');
```

## Rules

We used following rules.

Change these configs by your needs

```json
{
  "hooks": {
    "pre-commit": "lint-staged",
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
}
```

## License

MIT
