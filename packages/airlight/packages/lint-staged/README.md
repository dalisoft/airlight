# airlight-config-lint-staged

Almost zero-config [lint-staged](https://github.com/okonet/lint-staged) configuration

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
- [DockerfileLint](https://github.com/replicatedhq/dockerfilelint)
- [HTMLHint](https://github.com/htmlhint/HTMLHint)

## Usage

`.lintstagedrc.js`

```js
module.exports = require('airlight-config-lint-staged')(languages?);
```

### Arguments

#### **languages** [Optional]

Allowed languages to lint

Type: `String[]`

Default: `['ts', 'js', 'tsx', 'jsx', 'json', 'yml', 'css', 'scss', 'sass', 'less', 'md', 'dockerfile']`

## Rules

See [config.js](./config.js)

## License

MIT
