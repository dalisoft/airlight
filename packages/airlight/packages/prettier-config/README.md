# prettier-config-airlight

Prettier configuration to use with combine of [prettier-config-airlight](../eslint-config-node)

## Installation

```bash
npm install prettier-config-airlight --save-dev
# or
yarn add prettier-config-airlight -D
```

## Usage

`.prettierrc.js`

```js
module.exports = require('prettier-config-airlight');
```

## Rules

We used following rules.

Change these configs by your needs

```json
{
  "singleQuote": true,
  "printWidth": 80,
  "trailingComma": "none",
  "arrowParens": "always",
  "bracketSpacing": true,
  "useTabs": false
}
```

## License

MIT
