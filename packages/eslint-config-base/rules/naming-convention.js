const namingConventionRule = {
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
      selector: 'objectLiteralProperty',
      format: ['snake_case', 'strictCamelCase'],
      leadingUnderscore: 'forbid',
      custom: {
        regex: '@?([a-z-]+)?[-/]?([a-z-]+)',
        match: false
      }
    },
    {
      selector: 'objectLiteralProperty',
      leadingUnderscore: 'forbid',
      format: null,
      custom: {
        regex: '@?([a-z-]+)?[-/]?([a-z-]+)',
        match: true
      }
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
      format: ['UPPER_CASE'],
      leadingUnderscore: 'forbid'
    },
    {
      selector: 'typeLike',
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
  ]
};

module.exports = namingConventionRule;
