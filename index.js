import autoIndex from './src/autoIndex'
import autoReverse from './src/autoReverse'
import autoFix from './src/autoFix'
import autoCurve from './src/autoCurve'
import autoOptimize from './src/autoOptimize'
import add from './src/add'
import boundingBox from './src/boundingBox'
import cubify from './src/cubify'
import length from './src/length'
import moveIndex from './src/moveIndex'
import offset from './src/offset'
import position from './src/position'
import remove from './src/remove'
import reverse from './src/reverse'
import rotate from './src/rotate'
import scale from './src/scale'

const autoThing = (fromShape, toShape) => {
  fromShape = autoReverse(fromShape, toShape)
  fromShape = autoIndex(fromShape, toShape)
  let [fromShape1, toShape1] = autoCurve(fromShape, toShape)
  let [fromShape2, toShape2] = autoFix(fromShape1, toShape1)
  return [fromShape2, toShape2]
}

export {
  add,
  boundingBox,
  cubify,
  length,
  moveIndex,
  offset,
  position,
  remove,
  reverse,
  rotate,
  scale,
  autoIndex,
  autoReverse,
  autoFix,
  autoCurve,
  autoOptimize,
  autoThing
  }
