import { applyFuncToShapes, splitPoints } from './helpers'
import boundingBox from './boundingBox'
import add from './add'
import remove from './remove'
import { autoCurvePoint } from './autoCurve'
import autoReverse from './autoReverse'
import autoIndex from './autoIndex'

const reduceJoin = (prev, s) => prev.concat(s)

const autoFixPoints = (fromShape, toShape, noAuto) => {
  fromShape = noAuto ? fromShape : autoReverse(fromShape, toShape)
  let fromShapeSubPaths = splitPoints(fromShape)
  let toShapeSubPaths = splitPoints(toShape)
  let largestShapeSubPathsMap = fromShapeSubPaths.length > toShapeSubPaths.length ? fromShapeSubPaths
    : toShapeSubPaths

  largestShapeSubPathsMap.map((item, i) => {
    let fromSubPath = fromShapeSubPaths[i]
    let toSubPath = toShapeSubPaths[i]
    let bbox
    let diff

    if (fromSubPath && !toSubPath) {
      fromSubPath = remove(fromSubPath)
      bbox = boundingBox(fromSubPath).center
      toSubPath = [{...bbox, moveTo: true}, bbox]
      diff = toSubPath.length - fromSubPath.length
      fromSubPath.map((p, ii) => {
        if (toSubPath[ii] === undefined) {
          toSubPath[ii] = {...bbox}
        }
      })
    } else if (toSubPath && !fromSubPath) {
      toSubPath = remove(toSubPath)
      bbox = boundingBox(toSubPath).center
      fromSubPath = [{...bbox, moveTo: true}, bbox]
      diff = toSubPath.length - fromSubPath.length
      toSubPath.map((p, ii) => {
        if (fromSubPath[ii] === undefined) {
          fromSubPath[ii] = {...bbox}
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

    fromSubPath = noAuto ? fromSubPath : autoIndex(fromSubPath, toSubPath, diff)
    fromSubPath = autoCurvePoint(fromSubPath, toSubPath)
    toSubPath = autoCurvePoint(toSubPath, fromSubPath)

    fromShapeSubPaths[i] = fromSubPath
    toShapeSubPaths[i] = toSubPath
  })

  let fromTotalShape = fromShapeSubPaths.reduce(reduceJoin, [])
  let toTotalShape = toShapeSubPaths.reduce(reduceJoin, [])

  let i = toTotalShape.length - fromTotalShape.length
  if (i > 0) {
    fromTotalShape = add(fromTotalShape, toTotalShape.length)
  } else if (i < 0) {
    toTotalShape = add(toTotalShape, fromTotalShape.length)
  }

  fromTotalShape = autoCurvePoint(fromTotalShape, toTotalShape)

  return [fromTotalShape, toTotalShape]
}

const autoFix = (fromShape, toShape, noAuto) => applyFuncToShapes(autoFixPoints, fromShape, toShape, noAuto)

export default autoFix
