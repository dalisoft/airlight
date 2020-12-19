# lint-staged-config-airlight

Almost zero-config [lint-staged](https://github.com/okonet/lint-staged) configuration

## Installation

```bash
npm install lintstaged-config-airlight --save-dev
# or
yarn add lintstaged-config-airlight -D
```

## Peer dependencies

For working properly, you may need one or all of these dependencies.

For more information about each dependencies, click to dependecy link
to learn about configs, features and how they work

- [eslint](http://eslint.org)
- [prettier](https://prettier.io)
- [lint-staged](https://github.com/okonet/lint-staged)

## Dependencies

- [stylelint](https://stylelint.io)
- [markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2)
- [@stoplight/spectral](https://github.com/stoplightio/spectral)
- [DockerfileLint](https://github.com/replicatedhq/dockerfilelint)
- [HTMLHint](https://github.com/htmlhint/HTMLHint)

## Usage

`.lintstagedrc.js`

```js
module.exports = require('lintstaged-config-airlight')(languages?);
```

### Arguments

#### **languages** [Optional]

Allowed languages to lint

Type: `String[]`

Default:

```js
[
  'ts',
  'js',
  'tsx',
  'jsx',
  'json',
  'yml',
  'css',
  'scss',
  'sass',
  'less',
  'md',
  'dockerfile'
];
```

## Rules

See [config.js](./config.js)

## License

MIT
