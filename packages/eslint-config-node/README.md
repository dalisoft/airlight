# eslint-config-airlight-node

ESLint configure for Node.js focused on code quality,
security and performance on top of
[eslint-config-airbnb-typescript/base](https://github.com/iamturns/eslint-config-airbnb-typescript)

## Installation

```bash
npm install eslint-config-airlight-node --save-dev
# or
yarn add eslint-config-airlight-node -D
```

## Dependencies

- <https://github.com/iamturns/eslint-config-airbnb-typescript>
- <https://github.com/typescript-eslint/typescript-eslint>
- <https://github.com/prettier/eslint-config-prettier>
- <https://github.com/benmosher/eslint-plugin-import>
- <https://github.com/nickdeis/eslint-plugin-no-secrets>
- <https://github.com/mysticatea/eslint-plugin-node>
- <https://github.com/gkouziik/eslint-plugin-security-node>

## Dependencies reason

- eslint-config-airbnb-typescript - Main config
- @typescript-eslint/eslint-plugin - Config for TypeScript Node.js codebase
- eslint-config-prettier - Prettier config
- eslint-plugin-import - ESLint plugin with rules that help validate proper imports
- eslint-plugin-no-secrets - secrets/credentials finder/matched plug-in for ESLint
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
        "@typescript-eslint/explicit-function-return-type": ["error"]
      }
    }
  ]
}
```

## License

MIT
