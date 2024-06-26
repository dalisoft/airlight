# eslint-config-airlight-base

ESLint configure for base focused on code quality, security and performance on top of
[eslint-config-airbnb-typescript/base](https://github.com/iamturns/eslint-config-airbnb-typescript)

## Installation

```bash
npm install eslint-config-airlight-base --save-dev
# or
yarn add eslint-config-airlight-base -D
```

## Peer dependencies

- <https://github.com/microsoft/TypeScript> (v4.7.4 recommended)

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

### `.eslintrc`

```json
{
  "extends": "airlight-base/legacy"
}
```

### `eslint.config.js`

```js
import airlightBase from 'eslint-config-airlight-base';

export default [
  ...airlightBase,
  // your rules
]
```

## Rules

We customized following rules.

Change these [flat config](./flat.cjs) or [legacy config](./legacy.cjs) by your needs

## License

MIT
