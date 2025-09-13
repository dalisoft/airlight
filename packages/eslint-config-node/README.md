# eslint-config-airlight-node

ESLint configure for Node.js focused on code quality, security and performance on top of [eslint-config-airlight-base](../eslint-config-base)

Now compatible with `oxlint` and `biome` configuration

## Installation

```bash
npm install eslint-config-airlight-node --save-dev
# or
yarn add eslint-config-airlight-node -D
```

## Peer dependencies

- <https://github.com/microsoft/TypeScript>

## Dependencies

- [eslint-config-airlight-base](../eslint-config-base)
- <https://github.com/mysticatea/eslint-plugin-node>
- <https://github.com/gkouziik/eslint-plugin-security-node>

## Dependencies reason

- eslint-plugin-node - Node.js rules plug-in for ESLint
- eslint-plugin-security-node - Node.js security roles plug-in for ESLint

## Usage

### Legacy config

```json
// .eslintrc
{
  "extends": "airlight-node/legacy"
}
```

### Flat config

```js
// eslint.config.js
import airlightNode from 'eslint-config-airlight-node';

export default [
  ...airlightNode
  // your rules
];
```

### oxlint

> If you are using **eslint + oxlint** combo, see [here and follow guide](https://github.com/oxc-project/eslint-plugin-oxlint)

```json
// .oxlintrc.json
{
  "extends": ["./node_modules/eslint-config-airlight-node/oxlintrc.json"],
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
  "extends": ["eslint-config-airlight-node/biome.json"]
}
```

```bash
biome check . --write
```

## Rules

We customized following rules.

Change these [flat config](../eslint-config-node/flat.cjs) or [legacy config](../eslint-config-node/legacy.cjs) by your needs

## License

MIT
