import area from './area'
import { reverse } from 'points'
import { applyFuncToShapes } from './helpers'

const autoReversePoints = (fromShape, toShape) => {
  let fromShapeArea = area(fromShape)
  let toShapeArea = area(toShape)
  if ((fromShapeArea > 0 && toShapeArea < 0) || (toShapeArea > 0 && fromShapeArea < 0)) {
    fromShape = reverse(fromShape)
  }
  return fromShape
}

const autoReverse = (fromShape, toShape) => applyFuncToShapes(autoReversePoints, fromShape, toShape)

export default autoReverse
