import { terser } from 'rollup-plugin-terser';
import del from 'rollup-plugin-delete';

const external = ['@dalisoft/args', 'terser'];
const globals = {
  '@dalisoft/args': 'args'
};

export default [
  {
    input: './src/batch-collect.js',
    output: [
      {
        format: 'umd',
        name: 'batchCollect',
        file: './dist/umd/batch-collect.js',
        esModule: true,
        globals
      },
      {
        format: 'cjs',
        file: './dist/cjs/batch-collect.js',
        esModule: false,
        globals
      }
    ],
    plugins: [
      del({
        targets: 'dist/*'
      })
    ],
    external
  },
  {
    input: './src/batch-collect.js',
    output: {
      format: 'umd',
      name: 'batchCollect',
      file: './dist/umd/batch-collect.min.js',
      esModule: true,
      globals
    },
    plugins: [
      terser({
        compress: true,
        mangle: true
      })
    ],
    external
  }
];
