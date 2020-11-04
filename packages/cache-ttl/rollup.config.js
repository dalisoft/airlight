import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import del from 'rollup-plugin-delete';

const external = ['fs', 'terser', 'typescript'];
const globals = {
  fs: 'FS'
};

const watch = process.env.ROLLUP_WATCH;

export default [
  {
    input: './src/cache.ts',
    output: {
      format: 'esm',
      file: './dist/es/cache-ttl.js',
      esModule: true,
      globals
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
    external
  },
  {
    input: './src/cache.ts',
    output: [
      {
        format: 'umd',
        name: 'CacheTTL',
        file: './dist/umd/cache-ttl.js',
        esModule: true,
        globals
      },
      {
        format: 'cjs',
        file: './dist/cjs/cache-ttl.js',
        esModule: false,
        globals
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
    external
  },
  {
    input: './src/cache.ts',
    output: {
      format: 'umd',
      name: 'CacheTTL',
      file: './dist/umd/cache-ttl.min.js',
      esModule: true,
      globals
    },
    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false
          }
        }
      }),
      !watch &&
        terser({
          compress: true,
          mangle: true
        })
    ],
    external
  }
];
