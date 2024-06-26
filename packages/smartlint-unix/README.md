# smartlint-unix

Tool for lint entire codebase with single CLI script

## Installation

```bash
npm install smartlint-unix --save-dev
# or
yarn add smartlint-unix -D
```

## Environment variables

| Name            | Value        |
| --------------- | ------------ |
| `USE_QUICKLINT` | Set or unset |

## Prepare

### Markdown

- Install `dprint` locally as dev-dependencies
- Run `dprint init` or follow this [guide](https://dprint.dev/setup)
- Follow this [guide](https://dprint.dev/plugins/markdown)

## Peer dependencies

For working properly, you may need one or all of these dependencies.

For more information about each dependencies, click to dependecy link to learn about configs, features and how they work

- [eslint](http://eslint.org)
- [ls-lint](https://github.com/loeffel-io/ls-lint)
- [dprint](https://dprint.dev)
- [biome](https://biomejs.dev)
- [DockerfileLint](https://github.com/replicatedhq/dockerfilelint)\*
- [@stoplight/spectral](https://github.com/stoplightio/spectral)\*
- [stylelint](https://stylelint.io)\*
- [prettier](https://prettier.io)

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
'ls-lint' | 'eslint' | 'stylelint' | 'markdown' | 'jsonymllint' | 'biome' | 'prettier' | 'dockerfile' | 'htmlhint'
```

Default:

```js
['ls-lint', 'eslint', 'markdown', 'biome'];
```

Example: `smartlint --linters=eslint,stylelint .`

> You can change order of linting if you need

## License

MIT
