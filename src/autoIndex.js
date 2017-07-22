import moveIndex from './moveIndex'
import { applyFuncToShapes } from './helpers'
import findNearestIndex from './findNearestIndex'

const autoIndexPoints = (fromShape, toShape, i) => {
  i = i !== undefined ? i : toShape.length - fromShape.length
  let bestIndex = findNearestIndex(fromShape, toShape[0])
  let isOptimize = Math.abs(i) > 1 && Math.abs(i) > 130

  if (bestIndex && isOptimize) {
    let tolerance = Math.abs(i / bestIndex)
    bestIndex = -(bestIndex / tolerance) | 0
  }

  if (bestIndex) {
    fromShape = moveIndex(fromShape, bestIndex)
  }

  return fromShape
}

const autoIndex = (fromShape, toShape, i) => applyFuncToShapes(autoIndexPoints, fromShape, toShape, i)

export { findNearestIndex }

export default autoIndex
