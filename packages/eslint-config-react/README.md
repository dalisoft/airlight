# eslint-config-airlight-node

ESLint configure for Node.js focused on code quality,
security and performance on top of [eslint-config-airlight-base](../eslint-config-airlight-base)

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

`.eslintrc`

```json
{
  "extends": "airlight-node"
}
```

## Rules

We customized following rules.

Change these [configs](./config.js) by your needs

## License

MIT
