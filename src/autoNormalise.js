import { applyFuncToShapes, countSubPath, splitSubPath, joinSubPath } from './helpers'
import { autoCurvePoint } from './autoCurve'
import boundingBox from './boundingBox'
import add from './add'
import remove from './remove'

const autoNormalisePoints = (fromShape, toShape, map) => {
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
      [fromShape, toShape] = map(fromShape, toShape, diff, true)
    }
    fromShape = autoCurvePoint(fromShape, toShape)
    toShape = autoCurvePoint(toShape, fromShape)
    return [fromShape, toShape]
  } else {
    let fromShapeSubPaths = splitSubPath(fromShape)
    let toShapeSubPaths = splitSubPath(toShape)
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
        diff = toSubPath.length - fromSubPath.length
        if (diff > 0) {
          fromSubPath = add(fromSubPath, toSubPath.length)
        } else if (diff < 0) {
          toSubPath = add(toSubPath, fromSubPath.length)
        }
      }

      if (map) {
        [fromSubPath, toSubPath] = map(fromSubPath, toSubPath, diff, false)
      }

      fromSubPath = autoCurvePoint(fromSubPath, toSubPath)
      toSubPath = autoCurvePoint(toSubPath, fromSubPath)

      fromShapeSubPaths[i] = fromSubPath
      toShapeSubPaths[i] = toSubPath
    })

    return [joinSubPath(fromShapeSubPaths), joinSubPath(toShapeSubPaths)]
  }
}

const autoNormalise = (fromShape, toShape, map) => applyFuncToShapes(autoNormalisePoints, fromShape, toShape, map)

export default autoNormalise
