import { applyFuncToShapes } from './helpers'
import autoReverse from './autoReverse'
import autoIndex from './autoIndex'
import autoNormalise from './autoNormalise'

const autoFixPoints = (fromShape, toShape, param = {}) => {
  fromShape = autoReverse(fromShape, toShape)

  param.map = (fromSubPath, toSubPath, index, diff) => {
    fromSubPath = autoReverse(fromSubPath, toSubPath)
    fromSubPath = autoIndex(fromSubPath, toSubPath, diff)
    return fromSubPath
  }
  if (param.bboxCenter === undefined) {
    param.bboxCenter = true
  }

  return autoNormalise(fromShape, toShape, param)
}

const autoFix = (fromShape, toShape, param) => applyFuncToShapes(autoFixPoints, fromShape, toShape, param)

export default autoFix
