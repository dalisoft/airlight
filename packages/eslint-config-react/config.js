const baseConfig = require('eslint-config-airlight-base');

// Deep clone
const config = JSON.parse(JSON.stringify(baseConfig));

// Extends
config.extends.splice(1, 1, 'airbnb-typescript', 'airbnb/hooks');
config.extends.splice(
  config.extends.length - 2,
  1,
  'plugin:jest/recommended',
  'prettier',
  'prettier/react'
);

// Plugins
config.plugins.splice(3, 0, 'jest');

// Add env
config.env = {
  es6: true,
  node: true,
  browser: true,
  jest: true
};

// Add support for TSX files
config.overrides[0].files.push('tsx');
config.overrides.push({
  files: ['*.jsx', '*.tsx'],
  rules: {
    'import/extensions': [
      'error',
      'never',
      {
        json: 'always',
        wasm: 'always'
      }
    ]
  }
});

// Rules
config.rules = {
  ...config.rules,
  'react/jsx-pascal-case': ['error'],
  'react/jsx-no-useless-fragment': ['error'],
  'react/no-deprecated': ['error'],
  'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }]
};

// There rules can't be pushed
config.rules['@typescript-eslint/naming-convention'].splice(
  1,
  1,
  {
    selector: ['function'],
    format: null
  },
  {
    selector: ['method'],
    format: ['strictCamelCase'],
    leadingUnderscore: 'forbid'
  }
);

// Resolve JSX and TSX files too
config.settings.node.tryExtensions.push('.jsx', '.tsx');
config.settings['import/resolver'].node.extensions.push('.jsx', '.tsx');
config.settings['import/extensions'].push('.jsx', '.tsx');

module.exports = config;
