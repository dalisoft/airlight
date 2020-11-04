import sucrase from 'rollup-plugin-sucrase';
// import { terser } from "rollup-plugin-terser";
import del from 'rollup-plugin-delete';

export default [
  {
    input: './src/_class.ts',
    output: {
      format: 'es',
      file: './gsheet-ql.es.js',
      esModule: true
    },
    plugins: [
      del({
        targets: './gsheet-ql.es.js'
      }),
      sucrase({
        exclude: ['node_modules/**'],
        transforms: ['typescript']
      })
    ],
    external: ['fs-extra', 'readline', 'googleapis']
  },
  {
    input: './src/_class.ts',
    output: [
      /* {
        format: "umd",
        name: "GSheetQL",
        file: "./dist/gsheet-ql.js",
        exports: "named",
        esModule: true
      },*/
      {
        format: 'cjs',
        file: './lib/gsheet-ql.js',
        esModule: false,
        exports: 'named'
      }
    ],
    plugins: [
      del({
        targets: ['lib', 'dist']
      }),
      sucrase({
        exclude: ['node_modules/**'],
        transforms: ['typescript']
      })
    ],
    external: ['fs-extra', 'readline', 'googleapis']
  }
  /* {
    input: "./src/_class.ts",
    output: {
      format: "umd",
      name: "GSheetQL",
      file: "./dist/gsheet-ql.min.js",
      exports: "named",
      esModule: true
    },
    plugins: [
      sucrase({
        exclude: ["node_modules/**"],
        transforms: ["typescript"]
      }),
      terser({
        compress: true,
        mangle: true
      })
    ]
  }*/
];
