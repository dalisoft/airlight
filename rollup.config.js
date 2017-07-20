import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-js-harmony'

const { BUILD } = process.env
const pkg = require('./package.json')
const external = Object.keys(pkg.dependencies)

const plugins = [ buble() ]

let moduleName = 'PointsJS'
let dest = 'points'

if (BUILD === 'prod') {
  plugins.push(uglify({}, minify))
  dest += '.min'
}

dest = dest + '.js'

export default {
  entry: 'index.js',
  format: 'umd',
  dest, // equivalent to --output
  moduleName: 'PointsJS',
  globals: {
    'points': 'Points'
  },
  plugins,
  external
}
