import pkg from './package.json';

const external = (pkg.dependencies
  ? Object.keys(pkg.dependencies)
  : []
).concat(['querystring', 'stream']);

export default {
  input: './esm/index.js',
  output: {
    format: 'cjs',
    file: './cjs/index.cjs',
    esModule: false,
    sourcemap: true
  },
  external
};
