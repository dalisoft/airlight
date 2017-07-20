import { applyFuncToShapes } from './helpers'

const autoCurvePoint = (fromShape, toShape) => {
  return fromShape.map((point, index) => {
    let point2 = toShape[index]
    if (point2 && !point.curve && point2.curve && !point.moveTo) {
      let prevPoint = index === 0 ? null : fromShape[index - 1]
      return {
        ...point,
        curve: {
          type: 'cubic',
          x1: prevPoint.x,
          y1: prevPoint.y,
          x2: point.x,
          y2: point.y
        }
      }
    }
    return point
  })
}

const autoCurvePoints = (fromShape, toShape) => {
  fromShape = autoCurvePoint(fromShape, toShape)
  toShape = autoCurvePoint(toShape, fromShape)
  return [fromShape, toShape]
}

const autoCurve = (fromShape, toShape) => applyFuncToShapes(autoCurvePoints, fromShape, toShape)

export default autoCurve
