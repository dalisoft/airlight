import autoIndex from './src/autoIndex'
import autoReverse from './src/autoReverse'
import autoFix from './src/autoFix'
import autoCurve from './src/autoCurve'
import autoOptimize from './src/autoOptimize'

const autoThing = (fromShape, toShape) => {
  fromShape = autoReverse(fromShape, toShape)
  fromShape = autoIndex(fromShape, toShape)
  let [fromShape1, toShape1] = autoCurve(fromShape, toShape)
  let [fromShape2, toShape2] = autoFix(fromShape1, toShape1)
  return [fromShape2, toShape2]
}

export { autoIndex, autoReverse, autoFix, autoCurve, autoOptimize, autoThing }
