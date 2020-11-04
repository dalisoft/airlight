import buble from 'rollup-plugin-buble';
import { terser } from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';

const { BUILD } = process.env;

let dest = 'points';

let uglifyPlugin;

if (BUILD === 'prod') {
  uglifyPlugin = terser();
  dest = dest + '.min';
}

dest = dest + '.js';

export default {
  input: 'index.js',
  output: {
    format: 'umd',
    name: 'PointsJS',
    globals: {
      points: 'Points',
      'approximate-curve': 'ApproximateCurve'
    },
    file: dest // equivalent to --output
  },
  plugins: [
    buble({
      objectAssign: 'Object.assign',
      transforms: {
        dangerousForOf: true
      }
    }),
    resolve({
      module: true,
      main: true,
      only: ['approximate-curve']
    }),
    uglifyPlugin
  ]
};
