# airlight-config-eslint-node

ESLint configure for Node.js focused on code quality, security and performance on top of [eslint-config-airbnb-typescript/base](https://github.com/iamturns/eslint-config-airbnb-typescript)

## Installation

```bash
npm install airlight-config-eslint-node --save-dev
# or
yarn add airlight-config-eslint-node -D
```

## Dependencies

- [eslint-config-airbnb-typescript](https://github.com/iamturns/eslint-config-airbnb-typescript) - Main config
- [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint) - Config for TypeScript Node.js codebase
- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) - Prettier config
- [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import) - ESLint plugin with rules that help validate proper imports
- [eslint-plugin-no-secrets](https://github.com/nickdeis/eslint-plugin-no-secrets) - secrets/credentials finder/matched plug-in for ESLint
- [eslint-plugin-node](https://github.com/mysticatea/eslint-plugin-node) - Node.js rules plug-in for ESLint
- [eslint-plugin-security-node](https://github.com/gkouziik/eslint-plugin-security-node) - Node.js security roles plug-in for ESLint

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
    "@typescript-eslint/indent": ["off"],
    "operator-linebreak": ["off", "after"],
    "no-underscore-dangle": ["off"],
    "import/prefer-default-export": ["warn"],
    "comma-dangle": ["error", "never"],
    "no-console": ["warn"],
    "import/extensions": [
      "error",
      "never",
      {
        "js": "always"
      }
    ]
  }
}
```

## License

MIT
