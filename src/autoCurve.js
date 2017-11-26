import { applyFuncToShapes } from './helpers'

const autoCurveSinglePoint = (fromShape, toShape) => {
  for (let index = 0, len = fromShape.length; index < len; index++) {
    let point = fromShape[index]
    let point2 = toShape[index]
    if (point2 && !point.curve && point2.curve && !point.moveTo) {
      let prevPoint = index === 0 ? null : fromShape[index - 1]
      point.curve = {
        type: 'cubic',
        x1: prevPoint.x,
        y1: prevPoint.y,
        x2: point.x,
        y2: point.y
      }
    }
  }
}

export const autoCurvePoint = (fromShape, toShape) => applyFuncToShapes(autoCurveSinglePoint, fromShape, toShape)

const autoCurvePoints = (fromShape, toShape) => {
  autoCurveSinglePoint(fromShape, toShape)
  return fromShape
}

const autoCurve = (fromShape, toShape) => applyFuncToShapes(autoCurvePoints, fromShape, toShape)

export default autoCurve
