const baseConfig = require('eslint-config-airlight-base');

module.exports = {
  ...baseConfig,
  extends: baseConfig.extends.concat(['plugin:n/recommended']),
  env: {
    es6: true,
    node: true,
    browser: false,
    jest: true
  },
  rules: {
    ...baseConfig.rules,
    'n/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }]
  },
  overrides: baseConfig.overrides.concat([
    {
      files: ['*.js'],
      rules: {
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
    },
    {
      files: ['*.cjs'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ]),
  settings: {
    ...baseConfig.settings,
    node: {
      tryExtensions: baseConfig.settings.node.tryExtensions.concat([
        '.cjs',
        '.mjs'
      ])
    },
    'import/resolver': {
      node: {
        extensions: baseConfig.settings[
          'import/resolver'
        ].node.extensions.concat(['.cjs', '.mjs'])
      }
    },
    'import/extensions': baseConfig.settings['import/extensions'].concat([
      '.cjs',
      '.mjs'
    ])
  }
};
