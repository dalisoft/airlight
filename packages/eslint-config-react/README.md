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

### Legacy config

```json
// .eslintrc
{
  "extends": "airlight-react/legacy"
}
```

### Flat config

```js
// eslint.config.js
import airlightReact from 'eslint-config-airlight-react';

export default [
  ...airlightReact
  // your rules
];
```

### oxlint

> If you are using **eslint + oxlint** combo, see [here and follow guide](https://github.com/oxc-project/eslint-plugin-oxlint)

```json
// .oxlintrc.json
{
  "extends": ["./node_modules/eslint-config-airlight-react/oxlintrc.json"],
  "rules": {
    "@typescript-eslint/no-var-requires": "off",
    "complexity": ["error", { "max": 7 }],
    "max-lines-per-function": [
      "error",
      { "max": 48, "skipBlankLines": true, "skipComments": true, "IIFEs": true }
    ]
  },
  "ignorePatterns": [".history", ".release-me", "scripts"]
}
```

```bash
oxlint
```

### biome

> If you are using **eslint + biome** combo, see [here and follow guide](https://github.com/SrBrahma/eslint-config-biome)

```json
// biome.json
{
  "$schema": "https://biomejs.dev/schemas/2.2.4/schema.json",
  "extends": ["eslint-config-airlight-react/biome.json"]
}
```

```bash
biome check . --write
```

## Rules

We customized following rules.

Change these [flat config](../eslint-config-react/flat.cjs) or [legacy config](../eslint-config-react/legacy.cjs) by your needs

## License

MIT
