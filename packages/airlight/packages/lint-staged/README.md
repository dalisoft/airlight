# airlight-config-lint-staged

[lint-staged](https://github.com/okonet/lint-staged) configuration

## Installation

```bash
npm install airlight-config-lint-staged --save-dev
# or
yarn add airlight-config-lint-staged -D
```

## Peer dependencies

For working properly, you may need any of these dependencies.

For more information about each dependencies, click to dependecy link to learn about configs, features and how they work

- [eslint](http://eslint.org)
- [stylelint](https://stylelint.io)
- [markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2)
- [@stoplight/spectral](https://github.com/stoplightio/spectral)
- [prettier](https://prettier.io)

## Usage

`.lintstagedrc.js`

```js
module.exports = require('airlight-config-lint-staged')(linters, languages);
```

### Arguments

#### **linters**

Allowed linters

Type: `Object`

Default: `{ eslint: true, prettier: true }`

Values:

```typescript
{
  eslint: boolean;
  stylelint: boolean;
  markdown: boolean;
  spectral: boolean;
  prettier: boolean;
}
```

#### **languages**

Allowed languages to lint

Type: `String[]`

Default: `['ts', 'js', 'tsx', 'jsx', 'json', 'yml', 'css', 'scss', 'sass', 'less', 'md']`

## Rules

See [config.js](./config.js)

## License

MIT
