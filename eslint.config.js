import airlightNode from 'eslint-config-airlight-node';

export default [
  ...airlightNode,
  {
    name: 'eslint-config-airlight-root',
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json'
      }
    },
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      complexity: ['error', { max: 4 }],
      'max-lines-per-function': [
        'error',
         
        { max: 24, skipBlankLines: true, skipComments: true, IIFEs: true }
      ]
    },
    ignores: ['.history', 'scripts']
  }
];
