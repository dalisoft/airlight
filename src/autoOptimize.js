import { applyFuncToShapes } from './helpers'

const reducerPath = (prev, {x, y, curve, moveTo}) => {
  let red
  if (curve && curve.type) {
    const {type, x1, y1, x2, y2} = curve
    if (type === 'cubic') {
      red = ['C', x1, y1, x2, y2, x, y]
    } else if (type === 'quadratic') {
      red = ['Q', x1, y1, x, y]
    }
  } else if (x !== undefined && y !== undefined) {
    red = [moveTo ? 'M' : 'L', x, y]
  }
  return red ? prev.concat(red) : prev
}

const autoOptimizePoint = shape => shape.reduce(reducerPath, [])

const autoOptimizePoints = (fromShape, toShape) => {
  return [autoOptimizePoint(fromShape), autoOptimizePoint(toShape)]
}

const autoOptimize = (fromShape, toShape) => applyFuncToShapes(autoOptimizePoints, fromShape, toShape)

export default autoOptimize
