import boundingBox from './boundingBox'
import { applyFuncToShapes, distance } from './helpers'

const findNearestIndexPoints = (points, p, box) => {
  let min = Infinity
  let isBBoxUse = box !== false
  let bbox = !isBBoxUse ? p : box ? box.x !== undefined ? box : box.center : boundingBox(points).center

  if (isBBoxUse) {
    bbox.x += p.x
    bbox.y += p.y
  }

  let bestIndex = 0

  points.map((point, i) => {
    let sumOfSquares = 0
    let dist = distance(point, bbox)

    sumOfSquares += dist * dist

    if (sumOfSquares < min) {
      bestIndex = i
      min = sumOfSquares
    }
  })
  return bestIndex
}

const findNearestIndex = (points, p) => applyFuncToShapes(findNearestIndexPoints, points, p)

export default findNearestIndex
