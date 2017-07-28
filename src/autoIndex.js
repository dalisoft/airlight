import moveIndex from './moveIndex'
import { applyFuncToShapes } from './helpers'
import findNearestIndex from './findNearestIndex'

const autoIndexPoints = (fromShape, toShape, i) => {
  let bestIndex = findNearestIndex(toShape, fromShape[0], true)

  if (bestIndex < 0 && i) {
    bestIndex = -bestIndex
  } else if (i < 0 && bestIndex > 0) {
    bestIndex = findNearestIndex(toShape, fromShape[0], false)
  }

  if (bestIndex) {
    fromShape = moveIndex(fromShape, -bestIndex)
  }

  return fromShape
}

const autoIndex = (fromShape, toShape, i) => applyFuncToShapes(autoIndexPoints, fromShape, toShape, i)

export { findNearestIndex }

export default autoIndex
