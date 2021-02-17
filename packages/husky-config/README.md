# husky-config-airlight

Husky config for use of combining all linters and formatters

## Installation

```bash
npm install husky-config-airlight --save-dev
# or
yarn add husky-config-airlight -D
```

## Peer dependencies

For working properly, you may need one or all of these dependencies.

For more information about each dependencies, click to dependecy link
to learn about configs, features and how they work

- [husky](https://github.com/typicode/husky)
- [@commitlint/cli](https://github.com/conventional-changelog/commitlint)

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
