import moveIndex from './moveIndex'
import { applyFuncToShapes } from './helpers'
import findNearestIndex from './findNearestIndex'

const autoIndexPoints = (fromShape, toShape) => {
  let bestIndex = findNearestIndex(fromShape, toShape[0])

  if (bestIndex) {
    fromShape = moveIndex(fromShape, bestIndex)
  }

  return fromShape
}

const autoIndex = (fromShape, toShape) => applyFuncToShapes(autoIndexPoints, fromShape, toShape)

export default autoIndex
