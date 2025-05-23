const baseConfig = require('eslint-config-airlight-base/legacy');

module.exports = {
  ...baseConfig.rules,
  '@typescript-eslint/naming-convention': [
    'error',
    {
      selector: ['function', 'method'],
      format: ['strictCamelCase'],
      leadingUnderscore: 'forbid'
    },
    {
      selector: 'property',
      format: ['snake_case', 'strictCamelCase'],
      leadingUnderscore: 'forbid'
    },
    {
      // biome-ignore lint/nursery/noSecrets: It's no secret
      selector: 'objectLiteralProperty',
      // biome-ignore lint/nursery/noSecrets: It's no secret
      format: ['StrictPascalCase'],
      leadingUnderscore: 'forbid'
    },
    {
      selector: 'variable',
      format: ['strictCamelCase'],
      leadingUnderscore: 'forbid'
    },
    {
      selector: 'variable',
      types: ['boolean', 'number'],
      modifiers: ['const'],
      format: ['UPPER_CASE', 'strictCamelCase'],
      leadingUnderscore: 'forbid'
    },
    {
      selector: 'typeLike',
      // biome-ignore lint/nursery/noSecrets: It's no secret
      format: ['StrictPascalCase'],
      leadingUnderscore: 'forbid'
    },
    {
      selector: 'interface',
      format: ['PascalCase'],
      leadingUnderscore: 'forbid',
      custom: {
        regex: '^I[A-Z]',
        match: true
      }
    }
  ],
  'react/jsx-pascal-case': ['error'],
  'react/jsx-no-useless-fragment': ['error'],
  'react/no-deprecated': ['error'],
  'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
  'react-refresh/only-export-components': 'warn'
};
