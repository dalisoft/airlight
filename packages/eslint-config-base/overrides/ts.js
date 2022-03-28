const tsOverrides = {
  files: ['*.ts'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': ['error'],
    '@typescript-eslint/explicit-module-boundary-types': ['error'],
    '@typescript-eslint/await-thenable': ['error'],
    '@typescript-eslint/indent': [
      'error',
      2,
      {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        SwitchCase: 1,
        flatTernaryExpressions: false,
        offsetTernaryExpressions: true
      }
    ],
    '@typescript-eslint/quotes': [
      'error',
      'single',
      {
        avoidEscape: true
      }
    ],
    '@typescript-eslint/no-shadow': ['error', { hoist: 'functions' }],
    '@typescript-eslint/no-empty-function': ['error'],
    '@typescript-eslint/consistent-indexed-object-style': ['error'],
    indent: 'off',
    quotes: 'off',
    'no-shadow': 'off',
    'no-empty-function': 'off'
  }
};

module.exports = tsOverrides;
