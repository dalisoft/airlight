import { applyFuncToShapes } from './helpers'
import autoReverse from './autoReverse'
import autoIndex from './autoIndex'
import autoNormalise from './autoNormalise'

const autoFixPoints = (fromShape, toShape) => {
  fromShape = autoReverse(fromShape, toShape)
  fromShape = autoIndex(fromShape, toShape)

  return autoNormalise(fromShape, toShape, (fromSubPath, toSubPath, diff, noSubPath) => {
    if (noSubPath) {
      fromSubPath = autoIndex(fromSubPath, toSubPath) // Do again for single-path shape for better result
    }
    return [fromSubPath, toSubPath]
  })
}

const autoFix = (fromShape, toShape) => applyFuncToShapes(autoFixPoints, fromShape, toShape)

export default autoFix
