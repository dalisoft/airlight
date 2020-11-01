# commitlint-config-airlight

Commitlint config to make product commits beatiful

## Installation

```bash
npm install commitlint-config-airlight --save-dev
# or
yarn add commitlint-config-airlight -D
```

## Usage

`commitlint.config.js`

```js
module.exports = { extends: ['@commitlint/config-conventional'] };
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
