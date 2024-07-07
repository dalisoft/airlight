# eslint-config-airlight-react

ESLint configure for React.js focused on code quality, security and performance on top of [eslint-config-airlight-base](../eslint-config-base)

Now compatible with `oxlint` and `biome` configuration

## Installation

```bash
npm install eslint-config-airlight-react --save-dev
# or
yarn add eslint-config-airlight-react -D
```

## Peer dependencies

- <https://github.com/microsoft/TypeScript>

## Dependencies

- [eslint-config-airlight-base](../eslint-config-base)
- <https://github.com/yannickcr/eslint-plugin-react>
- <https://www.npmjs.com/package/eslint-plugin-react-hooks>
- <https://github.com/jsx-eslint/eslint-plugin-jsx-a11y>
- <https://github.com/jest-community/eslint-plugin-jest>

## Dependencies reason

- eslint-plugin-react - React specific linting rules for ESLint
- eslint-plugin-react-hooks - React rules for React Hooks
- eslint-plugin-jsx-a11y - Static AST checker for accessibility rules on JSX elements
- eslint-plugin-jest - Jest testing rules for ESLint

## Usage

### `.eslintrc`

```json
{
  "extends": "airlight-react/legacy"
}
```

### `eslint.config.js`

```js
import airlightReact from 'eslint-config-airlight-react';

export default [
  ...airlightReact,
  // your rules
]
```

### oxlint

> If you are using **eslint + oxlint** combo, see [here and follow guide](https://github.com/oxc-project/eslint-plugin-oxlint)

```bash
oxlint -c ./node_modules/eslint-config-airlight-react/oxlintrc.json
```

### biome

> If you are using **eslint + biome** combo, see [here and follow guide](https://github.com/SrBrahma/eslint-config-biome)

```json title="biome.json"
{
  "$schema": "https://biomejs.dev/schemas/1.8.3/schema.json",
  "extends": ["eslint-config-airlight-react/biome.json"]
}
```

```bash
biome check . --write
```

## Rules

We customized following rules.

Change these [flat config](../eslint-config-base/flat.cjs) or [legacy config](../eslint-config-base/legacy.cjs) by your needs

## License

MIT
