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
  plugins: ['import', 'optimize-regex', 'security-node', 'no-secrets'],
  rules: {
    '@typescript-eslint/indent': ['off'],
    'operator-linebreak': ['off', 'after'],
    'no-underscore-dangle': ['off'],
    'import/prefer-default-export': ['warn'],
    'comma-dangle': ['error', 'never'],
    'no-console': ['warn'],
    'import/extensions': [
      'error',
      'never',
      {
        js: 'always'
      }
    ]
  }
};
