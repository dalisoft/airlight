import { applyFuncToShapes } from './helpers'
import boundingBox from './boundingBox'

const reduceJoin = (prev, s) => prev.concat(s)

export const splitPoints = points => {
  return points.reduce((lines, point) => {
    if (point.moveTo) {
      lines.push([])
    }

    lines[ lines.length - 1 ].push(point)

    return lines
  }, [])
}

const autoFixPoints = (fromShape, toShape) => {
  let fromShapeSubPaths = splitPoints(fromShape)
  let toShapeSubPaths = splitPoints(toShape)
  let largestShapeSubPathsMap = fromShapeSubPaths.length > toShapeSubPaths.length ? fromShapeSubPaths : toShapeSubPaths

  largestShapeSubPathsMap.map((item, i) => {
    let fromSubPath = fromShapeSubPaths[i]
    let toSubPath = toShapeSubPaths[i]
    let bbox

    if (fromSubPath && !toSubPath) {
      bbox = boundingBox(fromSubPath).center
      toSubPath = [{...bbox, moveTo: true}, bbox]
      fromSubPath.map((p, ii) => {
        if (toSubPath[ii] === undefined) {
          toSubPath.push({...bbox})
        }
      })
    } else if (toSubPath && !fromSubPath) {
      bbox = boundingBox(toSubPath).center
      fromSubPath = [{...bbox, moveTo: true}, bbox]
      toSubPath.map((p, ii) => {
        if (fromSubPath[ii] === undefined) {
          fromSubPath.push({...bbox})
        }
      })
    }

    fromShapeSubPaths[i] = fromSubPath
    toShapeSubPaths[i] = toSubPath
  })

  return [fromShapeSubPaths.reduce(reduceJoin, []), toShapeSubPaths.reduce(reduceJoin, [])]
}

const autoFix = (fromShape, toShape) => applyFuncToShapes(autoFixPoints, fromShape, toShape)

export default autoFix
