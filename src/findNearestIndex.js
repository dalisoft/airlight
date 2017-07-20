import distance from './distance'
import { boundingBox } from 'points'
import { applyFuncToShapes } from './helpers'

const findNearestIndexPoints = (points, p, box) => {
  let min = Number.MAX_SAFE_INTEGER
  let bbox = box ? box.x !== undefined ? box : box.center : boundingBox(points).center

  bbox.x += p.x
  bbox.y += p.y

  let bestIndex = 0

  points.map((point, i) => {
    let dist = distance(bbox, point)
    if (dist < min) {
      bestIndex = i
      min = dist
    }
  })
  return bestIndex
}

const findNearestIndex = (points, p) => applyFuncToShapes(findNearestIndexPoints, points, p)

export default findNearestIndex
