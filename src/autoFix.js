import { applyFuncToShapes, splitPoints } from './helpers'
import boundingBox from './boundingBox'
import add from './add'
import remove from './remove'
import { autoCurvePoint } from './autoCurve'
import autoReverse from './autoReverse'
import autoIndex from './autoIndex'

const reduceJoin = (prev, s) => prev.concat(s)

const autoFixPoints = (fromShape, toShape) => {
  let fromShapeSubPaths = splitPoints(fromShape)
  let toShapeSubPaths = splitPoints(toShape)
  let largestShapeSubPathsMap = fromShapeSubPaths.length > toShapeSubPaths.length ? fromShapeSubPaths
    : toShapeSubPaths

  largestShapeSubPathsMap.map((item, i) => {
    let fromSubPath = fromShapeSubPaths[i]
    let toSubPath = toShapeSubPaths[i]
    let bbox

    if (fromSubPath && !toSubPath) {
      fromSubPath = remove(fromSubPath)
      bbox = boundingBox(fromSubPath).center
      toSubPath = [{...bbox, moveTo: true}, bbox]
      fromSubPath.map((p, ii) => {
        if (toSubPath[ii] === undefined) {
          toSubPath[ii] = {...bbox}
        }
      })
    } else if (toSubPath && !fromSubPath) {
      toSubPath = remove(toSubPath)
      bbox = boundingBox(toSubPath).center
      fromSubPath = [{...bbox, moveTo: true}, bbox]
      toSubPath.map((p, ii) => {
        if (fromSubPath[ii] === undefined) {
          fromSubPath[ii] = {...bbox}
        }
      })
    } else if (fromSubPath && toSubPath) {
      fromSubPath = remove(fromSubPath)
      toSubPath = remove(toSubPath)
      let i = toSubPath.length - fromSubPath.length
      if (i > 0) {
        fromSubPath = add(fromSubPath, toSubPath.length)
      } else if (i < 0) {
        toSubPath = add(toSubPath, fromSubPath.length)
      }
    }

    fromSubPath = autoReverse(fromSubPath, toSubPath)
    fromSubPath = autoIndex(fromSubPath, toSubPath)
    fromSubPath = autoCurvePoint(fromSubPath, toSubPath)
    toSubPath = autoCurvePoint(toSubPath, fromSubPath)

    fromShapeSubPaths[i] = fromSubPath
    toShapeSubPaths[i] = toSubPath
  })

  return [fromShapeSubPaths.reduce(reduceJoin, []), toShapeSubPaths.reduce(reduceJoin, [])]
}

const autoFix = (fromShape, toShape) => applyFuncToShapes(autoFixPoints, fromShape, toShape)

export default autoFix
