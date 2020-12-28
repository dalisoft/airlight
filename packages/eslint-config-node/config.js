module.exports = {
  parserOptions: {
    ecmaVersion: 2019
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:promise/recommended',
    'plugin:node/recommended',
    'plugin:security-node/recommended',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  plugins: [
    '@typescript-eslint',
    'eslint-comments',
    'promise',
    'import',
    'optimize-regex',
    'security-node',
    'no-secrets'
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    '@typescript-eslint/indent': ['off'],
    '@typescript-eslint/comma-dangle': ['error', 'never'],
    '@typescript-eslint/no-unused-vars': 'error',
    'operator-linebreak': ['off', 'after'],
    'no-underscore-dangle': ['off'],
    'import/prefer-default-export': ['warn'],
    'no-console': ['warn'],
    'import/extensions': [
      'error',
      'never',
      {
        js: 'always',
        json: 'always',
        wasm: 'always'
      }
    ]
  },
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': ['error'],
        '@typescript-eslint/explicit-module-boundary-types': ['error']
      }
    }
  ],
  settings: {
    node: {
      tryExtensions: [
        '.ts',
        '.js',
        '.cjs',
        '.mjs',
        '.tsx',
        '.jsx',
        '.d.ts',
        '.html',
        '.md',
        '.json'
      ]
    }
  }
};
