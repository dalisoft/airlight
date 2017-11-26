import moveIndex from './moveIndex'
import { applyFuncToShapes, distance } from './helpers'

function autoIndexPoints (ring, vs) {
  let len = ring.length
  let min = Infinity
  let bestOffset
  let sumOfSquares
  let d

  for (let offset = 0; offset < len; offset++) {
    sumOfSquares = 0

    for (let i = 0, len = vs.length; i < len; i++) {
      d = distance(ring[(offset + i) % len], vs[i])
      sumOfSquares += d * d
    }

    if (sumOfSquares < min) {
      min = sumOfSquares
      bestOffset = offset
    }
  }

  if (bestOffset) {
    ring = moveIndex(ring, bestOffset)
  }
  return ring
}

const autoIndex = (fromShape, toShape, i) => applyFuncToShapes(autoIndexPoints, fromShape, toShape, i)

export default autoIndex
