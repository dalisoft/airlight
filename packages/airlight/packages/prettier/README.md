# airlight-config-prettier

Prettier configuration to use with combine of [airlight-config-prettier](../eslint-node)

## Installation

```bash
npm install airlight-config-airlight --save-dev
# or
yarn add airlight-config-airlight -D
```

## Usage

`.prettierrc.js`

```js
module.exports = require('airlight-config-prettier');
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
