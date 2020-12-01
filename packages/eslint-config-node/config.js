module.exports = {
  parserOptions: {
    ecmaVersion: 2019
  },
  extends: [
    'eslint:recommended',
    'airbnb-typescript/base',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:node/recommended',
    'plugin:security-node/recommended'
  ],
  plugins: [
    '@typescript-eslint',
    'import',
    'optimize-regex',
    'security-node',
    'no-secrets'
  ],
  rules: {
    '@typescript-eslint/indent': ['off'],
    '@typescript-eslint/comma-dangle': ['error', 'never'],
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
  }
};
