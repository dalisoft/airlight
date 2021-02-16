# smartlint

Tool for lint entire codebase with single CLI command

## Installation

```bash
npm install smartlint --save-dev
# or
yarn add smartlint -D
```

## Peer dependencies

For working properly, you may need one or all of these dependencies.

For more information about each dependencies,
click to dependecy link to learn about configs,
features and how they work

- [eslint](http://eslint.org)
- [prettier](https://prettier.io)
- [stylelint](https://stylelint.io)
- [markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2)
- [@stoplight/spectral](https://github.com/stoplightio/spectral)
- [DockerfileLint](https://github.com/replicatedhq/dockerfilelint)
- [HTMLHint](https://github.com/htmlhint/HTMLHint)
- [ls-lint](https://github.com/loeffel-io/ls-lint)

## Usage

```bash
yarn smartlint --linters=eslint,prettier .
```

### Arguments

#### `--linters`

Linters to run

Type: `String`

Allowed values:

```md
'lslint' | 'eslint' | 'stylelint' | 'markdownlint' | 'htmllint' |
'jsonymllint' | 'prettier' | 'dockerfile'
```

Default:

```js
['lslint', 'eslint', 'markdownlint', 'htmllint', 'jsonymllint', 'prettier'];
```

Example: `yarn smartlint --linters=eslint,stylelint .`

> You can change order of linting if you need

## License

MIT
