# eslint-config-airlight-node

ESLint configure for Node.js focused on code quality, security and performance on top of [eslint-config-airlight-base](../eslint-config-base)

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

### `.eslintrc`

```json
{
  "extends": "airlight-node/legacy"
}
```

### `eslint.config.js`

```js
import airlightNode from 'eslint-config-airlight-node';

export default [
  ...airlightNode,
  // your rules
]
```

## Rules

We customized following rules.

Change these [flat config](../eslint-config-base/flat.cjs) or [legacy config](../eslint-config-base/legacy.cjs) by your needs

## License

MIT
