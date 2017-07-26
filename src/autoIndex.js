import moveIndex from './moveIndex'
import { applyFuncToShapes } from './helpers'
import findNearestIndex from './findNearestIndex'

const autoIndexPoints = (fromShape, toShape, i) => {
  i = i !== undefined ? i : toShape.length - fromShape.length
  let bestIndex = findNearestIndex(fromShape, toShape[0])
  let isOptimize = i > 0

  if (bestIndex && isOptimize) {
    bestIndex = -bestIndex
  }

  if (bestIndex) {
    fromShape = moveIndex(fromShape, bestIndex)
  }

  return fromShape
}

const autoIndex = (fromShape, toShape, i) => applyFuncToShapes(autoIndexPoints, fromShape, toShape, i)

export { findNearestIndex }

export default autoIndex
