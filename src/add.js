import cubify from './cubify'
import { numberAtInterval } from './helpers'

const linearPoints = (from, to, t = 0.5) => [
  {
    x: numberAtInterval(from.x, to.x, t),
    y: numberAtInterval(from.y, to.y, t)
  },
  to
]

const curvedPoints = (from, to, t = 0.5) => {
  const { x1, y1, x2, y2 } = to.curve

  const A = { x: from.x, y: from.y }
  const B = { x: x1, y: y1 }
  const C = { x: x2, y: y2 }
  const D = { x: to.x, y: to.y }
  const E = { x: numberAtInterval(A.x, B.x, t), y: numberAtInterval(A.y, B.y, t) }
  const F = { x: numberAtInterval(B.x, C.x, t), y: numberAtInterval(B.y, C.y, t) }
  const G = { x: numberAtInterval(C.x, D.x, t), y: numberAtInterval(C.y, D.y, t) }
  const H = { x: numberAtInterval(E.x, F.x, t), y: numberAtInterval(E.y, F.y, t) }
  const J = { x: numberAtInterval(F.x, G.x, t), y: numberAtInterval(F.y, G.y, t) }
  const K = { x: numberAtInterval(H.x, J.x, t), y: numberAtInterval(H.y, J.y, t) }

  return [
    { x: K.x, y: K.y, curve: { type: 'cubic', x1: E.x, y1: E.y, x2: H.x, y2: H.y } },
    { x: D.x, y: D.y, curve: { type: 'cubic', x1: J.x, y1: J.y, x2: G.x, y2: G.y } }
  ]
}

const points = (from, to, t = 0.5) => to.curve
  ? curvedPoints(from, to, t)
  : linearPoints(from, to, t)

const addPoints = (shape, pointsRequired, maxStack) => {
  if (isNaN(pointsRequired)) {
    throw Error('`add` function must be passed a number as the second argument')
  }

  if (shape.length >= pointsRequired || maxStack <= 0) {
    return shape
  }

  const nextShape = [ ...shape ]

  for (let i = 1; i < nextShape.length;) {
    if (nextShape.length >= pointsRequired) {
      return nextShape
    }

    const to = nextShape[ i ]

    if (to.moveTo) {
      i++
    } else {
      const from = nextShape[ i - 1 ]
      const [ midPoint, replacementPoint ] = points(from, to)

      nextShape.splice(i, 1, midPoint, replacementPoint)

      i += 2
    }
  }

  return addPoints(nextShape, pointsRequired, --maxStack)
}

const add = (shape, pointsRequired) => addPoints(cubify(shape), pointsRequired, 500)

export { curvedPoints, points as calculatePoints }
export default add
