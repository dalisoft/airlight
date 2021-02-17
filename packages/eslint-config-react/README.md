# eslint-config-airlight-react

ESLint configure for React.js focused on code quality,
security and performance on top of [eslint-config-airlight-base](../eslint-config-airlight-base)

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

`.eslintrc`

```json
{
  "extends": "airlight-react"
}
```

## Rules

We customized following rules.

Change these [configs](./config.js) by your needs

## License

MIT
