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

Change these configs by your needs

```json
{
  "rules": {
    "@typescript-eslint/explicit-function-return-type": ["off"],
    "@typescript-eslint/explicit-module-boundary-types": ["off"],
    "@typescript-eslint/indent": ["off"],
    "@typescript-eslint/comma-dangle": ["error", "never"],
    "@typescript-eslint/no-unused-vars": "error",
    "operator-linebreak": ["off", "after"],
    "no-underscore-dangle": ["off"],
    "import/prefer-default-export": ["warn"],
    "no-console": ["warn"],
    "import/extensions": [
      "error",
      "never",
      {
        "js": "always",
        "json": "always",
        "wasm": "always"
      }
    ]
  },
  "overrides": [
    {
      // enable the rule specifically for TypeScript files
      "files": ["*.ts", "*.tsx"],
      "rules": {
        "@typescript-eslint/explicit-function-return-type": ["error"],
        "@typescript-eslint/explicit-module-boundary-types": ["error"]
      }
    }
  ]
}
```

## License

MIT
