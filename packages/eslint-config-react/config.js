const baseConfig = require('eslint-config-airlight-base');

// Deep clone
const config = JSON.parse(JSON.stringify(baseConfig));

// Extends
config.extends.splice(1, 1, 'airbnb-typescript', 'airbnb/hooks');
config.extends.splice(config.extends.length - 1, 0, 'prettier/react');

// Add support for TSX files
config.overrides[0].files.push('tsx');

// Rules
config.rules['react/jsx-filename-extension'] = [
  'error',
  { extensions: ['.jsx', '.tsx'] }
];

// Resolve JSX and TSX files too
config.settings.node.tryExtensions.push(...['jsx', 'tsx']);
config.settings['import/resolver'].node.extensions.push(...['jsx', 'tsx']);
config.settings['import/extensions'].push(...['jsx', 'tsx']);

module.exports = config;
