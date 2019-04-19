import typescript from 'rollup-plugin-typescript2';
import {
  terser
} from "rollup-plugin-terser";
import del from 'rollup-plugin-delete'

export default [{
  input: './src/cache.ts',
  output: {
    format: 'es',
    file: './dist/es/cache-ttl.js',
    esModule: true,
  },
  plugins: [del({
    targets: 'dist/*'
  }), typescript({
    tsconfigOverride: {
      compilerOptions: {
        declaration: true
      }
    }
  })],
  external: ['fs', 'terser', 'typescript'],
}, {
  input: './src/cache.ts',
  output: [{
      format: 'umd',
      name: 'CacheTTL',
      file: './dist/umd/cache-ttl.js',
      exports: 'named',
      esModule: true,
    },
    {
      format: 'cjs',
      file: './dist/cjs/cache-ttl.js',
      esModule: false,
      exports: 'named',
    },
  ],
  plugins: [typescript({
    tsconfigOverride: {
      compilerOptions: {
        declaration: false
      }
    }
  })],
  external: ['fs', 'terser', 'typescript'],
}, {
  input: './src/cache.ts',
  output: {
    format: 'umd',
    name: 'CacheTTL',
    file: './dist/umd/cache-ttl.min.js',
    exports: 'named',
    esModule: true,
  },
  plugins: [typescript({
    tsconfigOverride: {
      compilerOptions: {
        declaration: false
      }
    }
  }), terser({
    compress: true,
    mangle: true
  })],
  external: ['fs', 'terser', 'typescript'],
}];
