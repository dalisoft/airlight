import { applyFuncToShapes, countSubPath, splitSubPath, joinSubPath } from './helpers'
import { autoCurvePoint } from './autoCurve'
import add from './add'
import remove from './remove'
import mapList from './mapList'
import boundingBox from './boundingBox'
import autoReverse from './autoReverse'

const autoNormalisePoints = (fromShape, toShape, {map, order, bboxCenter} = {}) => {
  let fromShapeSubPathsCount = countSubPath(fromShape)
  let toShapeSubPathsCount = countSubPath(toShape)
  if (fromShapeSubPathsCount === 1 && toShapeSubPathsCount === 1) {
    let diff = toShape.length - fromShape.length
    if (diff > 0) {
      fromShape = add(fromShape, toShape.length)
    } else if (diff < 0) {
      toShape = add(toShape, fromShape.length)
    }
    if (map) {
      [fromShape, toShape] = map(fromShape, toShape, 0, diff, true)
    }
    fromShape = autoCurvePoint(fromShape, toShape)
    toShape = autoCurvePoint(toShape, fromShape)
    return [fromShape, toShape]
  } else {
    let fromShapeSubPaths = splitSubPath(fromShape)
    let toShapeSubPaths = splitSubPath(toShape)

    if (order) {
      if (order.startOrder) {
        fromShapeSubPaths.sort(mapList.get(order.startOrder))
      } else if (order.endOrder) {
        toShapeSubPaths.sort(mapList.get(order.endOrder))
      } else {
        fromShapeSubPaths.sort(mapList.get(order))
        toShapeSubPaths.sort(mapList.get(order))
      }
    }
    let largestShapeSubPathsMap = fromShapeSubPaths.length > toShapeSubPaths.length ? fromShapeSubPaths
    : toShapeSubPaths

    largestShapeSubPathsMap.map((d, i) => {
      let fromSubPath = fromShapeSubPaths[i]
      let toSubPath = toShapeSubPaths[i]
      let prev
      let near
      let diff

      if (fromSubPath && !toSubPath) {
        fromSubPath = remove(fromSubPath)
        prev = toShapeSubPaths[i - 1]
        prev = prev[prev.length - 1]
        near = bboxCenter ? boundingBox(fromSubPath).center : { x: prev.x, y: prev.y }
        toSubPath = [{...near, moveTo: true}, near]
        fromSubPath.map((p, ii) => {
          if (toSubPath[ii] === undefined) {
            toSubPath[ii] = {...near}
          }
        })
      } else if (toSubPath && !fromSubPath) {
        toSubPath = remove(toSubPath)
        prev = fromShapeSubPaths[i - 1]
        prev = prev[prev.length - 1]
        near = bboxCenter ? boundingBox(toSubPath).center : { x: prev.x, y: prev.y }
        fromSubPath = [{...near, moveTo: true}, near]
        toSubPath.map((p, ii) => {
          if (fromSubPath[ii] === undefined) {
            fromSubPath[ii] = {...near}
          }
        })
      } else if (fromSubPath && toSubPath) {
        fromSubPath = remove(fromSubPath)
        toSubPath = remove(toSubPath)
        diff = toSubPath.length - fromSubPath.length
        if (diff > 0) {
          fromSubPath = add(fromSubPath, toSubPath.length)
        } else if (diff < 0) {
          toSubPath = add(toSubPath, fromSubPath.length)
        }
      }

      if (map) {
        [fromSubPath, toSubPath] = map(fromSubPath, toSubPath, i, diff, false)
      }

      fromSubPath = autoCurvePoint(fromSubPath, toSubPath)
      toSubPath = autoCurvePoint(toSubPath, fromSubPath)

      fromShapeSubPaths[i] = fromSubPath
      toShapeSubPaths[i] = toSubPath
    })

    return [joinSubPath(fromShapeSubPaths), joinSubPath(toShapeSubPaths)]
  }
}

const autoNormalise = (fromShape, toShape, param) => applyFuncToShapes(autoNormalisePoints, fromShape, toShape, param)

export default autoNormalise
