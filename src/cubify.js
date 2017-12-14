/** global: px */
/** global: py */
/** global: cx */
/** global: cy */
import arcToBezier from './arcToBezier'
import { applyFuncToShapes } from './helpers'

const cubifyShape = shape => {
  let i = 0
  while (i < shape.length) {
    const point = shape[ i ]

    if (point.curve && point.curve.type !== 'cubic') {
      const { x: px, y: py } = shape[ i - 1 ]
      const { x: cx, y: cy } = point

      if (point.curve.type === 'arc') {
        const curves = arcToBezier({
          px,
          py,
          cx,
          cy,
          rx: point.curve.rx,
          ry: point.curve.ry,
          xAxisRotation: point.curve.xAxisRotation,
          largeArcFlag: point.curve.largeArcFlag,
          sweepFlag: point.curve.sweepFlag
        })

        shape.splice(i, 1)

        curves.forEach(({ x1, y1, x2, y2, x, y }, offset) => {
          shape.splice(i + offset, 0, { x, y, curve: { type: 'cubic', x1, y1, x2, y2 } })
        })
      } else if (point.curve.type === 'quadratic') {
        const x1 = px + (2 / 3 * (point.curve.x1 - px))
        const y1 = py + (2 / 3 * (point.curve.y1 - py))
        const x2 = cx + (2 / 3 * (point.curve.x1 - cx))
        const y2 = cy + (2 / 3 * (point.curve.y1 - cy))

        shape[i] = { x: cx, y: cy, curve: { type: 'cubic', x1, y1, x2, y2 } }
        i++
      }
    } else {
      i++
    }
  }

  return shape
}

const cubify = s => applyFuncToShapes(cubifyShape, s)

export default cubify
