# eslint-config-airlight-base

ESLint configure for base focused on code quality, security and performance on top of
[eslint-config-airbnb-typescript/base](https://github.com/iamturns/eslint-config-airbnb-typescript).

Now compatible with `oxlint` and `biome` configuration

## Installation

```bash
npm install eslint-config-airlight-base --save-dev
# or
yarn add eslint-config-airlight-base -D
```

## Peer dependencies

- <https://github.com/microsoft/TypeScript>

## Dependencies

- <https://github.com/iamturns/eslint-config-airbnb-typescript>
- <https://github.com/typescript-eslint/typescript-eslint>
- <https://github.com/prettier/eslint-config-prettier>
- <https://github.com/benmosher/eslint-plugin-import>
- <https://github.com/nickdeis/eslint-plugin-no-secrets>
- <https://github.com/dolsem/eslint-plugin-filename-rules> \[`REMOVED`\]

## Dependencies reason

- eslint-config-airbnb-typescript - Main config
- @typescript-eslint/eslint-plugin - Config for TypeScript codebase
- eslint-config-prettier - Prettier config
- eslint-plugin-import - ESLint plugin with rules that help validate proper imports
- eslint-plugin-no-secrets - secrets/credentials finder/matched plug-in for ESLint

## Usage

### Legacy config

```json
// .eslintrc
{
  "extends": "airlight-base/legacy"
}
```

### Flat config

```js
// eslint.config.js
import airlightBase from 'eslint-config-airlight-base';

export default [
  ...airlightBase
  // your rules
];
```

### oxlint

> If you are using **eslint + oxlint** combo, see [here and follow guide](https://github.com/oxc-project/eslint-plugin-oxlint)

```json
// .oxlintrc.json
{
  "extends": ["./node_modules/eslint-config-airlight-base/oxlintrc.json"],
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
  "extends": ["eslint-config-airlight-base/biome.json"]
}
```

```bash
biome check . --write
```

## Rules

We customized following rules.

Change these [flat config](./flat.cjs) or [legacy config](./legacy.cjs) by your needs

## License

MIT
