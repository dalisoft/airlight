import { applyFuncToShapes } from './helpers'
import autoReverse from './autoReverse'
import autoIndex from './autoIndex'
import autoNormalise from './autoNormalise'

const autoFixPoints = (fromShape, toShape, order) => {
  fromShape = autoReverse(fromShape, toShape)
  fromShape = autoIndex(fromShape, toShape)

  return autoNormalise(fromShape, toShape, (fromSubPath, toSubPath, diff, noSubPath) => {
    if (noSubPath) {
      fromSubPath = autoIndex(fromSubPath, toSubPath) // Do again for single-path shape for better result
    }
    return [fromSubPath, toSubPath]
  }, order)
}

const autoFix = (fromShape, toShape, order) => applyFuncToShapes(autoFixPoints, fromShape, toShape, order)

export default autoFix
