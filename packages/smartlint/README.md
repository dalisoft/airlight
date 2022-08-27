# smartlint

Tool for lint entire codebase with single CLI command

## Installation

```bash
npm install smartlint --save-dev
# or
yarn add smartlint -D
```

## Dependencies

These dependencies are comes built-in and you have no requirement to install these

For more information about each dependencies,
click to dependecy link to learn about configs,
features and how they work

- [eslint](http://eslint.org)
- [ls-lint](https://github.com/loeffel-io/ls-lint)
- [markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2)
- [prettier](https://prettier.io)

## Peer dependencies

For working properly, you may need one or all of these dependencies.

For more information about each dependencies,
click to dependecy link to learn about configs,
features and how they work

- [DockerfileLint](https://github.com/replicatedhq/dockerfilelint)\*
- [@stoplight/spectral](https://github.com/stoplightio/spectral)\*
- [stylelint](https://stylelint.io)\*

`* - These packages may contain security issues`

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
'lslint' | 'eslint' | 'stylelint' | 'markdownlint' |
'jsonymllint' | 'prettier' | 'dockerfile'
```

Default:

```js
['lslint', 'eslint', 'markdownlint', 'jsonymllint', 'prettier'];
```

Example: `yarn smartlint --linters=eslint,stylelint .`

> You can change order of linting if you need

## License

MIT
