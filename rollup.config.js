import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-js-harmony'

const { BUILD } = process.env
const pkg = require('./package.json')
const external = Object.keys(pkg.dependencies)

const plugins = [ buble({
  objectAssign: 'Object.assign',
  transforms: {
    dangerousForOf: true
  }
}) ]

let dest = 'points'

if (BUILD === 'prod') {
  plugins.push(uglify({}, minify))
  dest = dest + '.min'
}

dest = dest + '.js'

export default {
  input: 'index.js',
  output: {
    format: 'umd',
    file: dest // equivalent to --output
  },
  name: 'PointsJS',
  globals: {
    'points': 'Points'
  },
  plugins,
  external
}
