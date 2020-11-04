import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import del from 'rollup-plugin-delete';

export default [
  {
    input: './src/as-batch.ts',
    output: {
      format: 'es',
      file: './dist/es/as-batch.js',
      esModule: true
    },
    plugins: [
      del({
        targets: 'dist/*'
      }),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: true
          }
        }
      })
    ],
    external: ['terser', 'typescript']
  },
  {
    input: './src/as-batch.ts',
    output: [
      {
        format: 'umd',
        name: 'asBatch',
        file: './dist/umd/as-batch.js',
        esModule: true
      },
      {
        format: 'cjs',
        file: './dist/cjs/as-batch.js',
        esModule: false
      }
    ],
    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false
          }
        }
      })
    ],
    external: ['terser', 'typescript']
  },
  {
    input: './src/as-batch.ts',
    output: {
      format: 'umd',
      name: 'asBatch',
      file: './dist/umd/as-batch.min.js',
      esModule: true
    },
    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false
          }
        }
      }),
      terser({
        compress: true,
        mangle: true
      })
    ],
    external: ['terser', 'typescript']
  }
];
