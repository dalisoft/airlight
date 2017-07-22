import length, { linearLength } from './length'
import remove from './remove'
import { applyFuncToShapes } from './helpers'

const splitAtPoint = (shape, t = 0.5) => {
  shape = remove(shape)
  let lengthSize = Math.floor(1 / t)
  let splitShapes = new Array(lengthSize).fill(0).map(n => [])
  let shapeSize = length(shape)
  let currentLength = 0

  shape.map((point, i) => {
    let p = currentLength / shapeSize
    let g = (lengthSize * p) | 0

    if (!point.moveTo) {
      let {x: x1, y: y1} = i === 0 ? null : shape[i - 1]

      currentLength += linearLength(x1, y1, point.x, point.y)
    }

    splitShapes[g].push(point)
  })

  splitShapes = splitShapes.map((shapes, i) => {
    let prevShapes = splitShapes[i - 1]
    let lastPrevShape = i === 0 ? null : prevShapes[prevShapes.length - 1]

    if (shapes && shapes[0] && !shapes[0].moveTo) {
      shapes.unshift({
        x: lastPrevShape.x,
        y: lastPrevShape.y,
        moveTo: true
      })
    }

    return remove(shapes)
  })

  return splitShapes
}

const splitAt = (shape, t) => applyFuncToShapes(splitAtPoint, shape, t)

export default splitAt
