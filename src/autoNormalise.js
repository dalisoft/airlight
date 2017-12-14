import {
    applyFuncToShapes,
    countSubPath,
    splitSubPath,
    joinSubPath,
    distance
} from './helpers'
import {
    autoCurvePoint
} from './autoCurve'
import add from './add'
import cubify from './cubify'
import remove from './remove'
import mapList from './mapList'
import boundingBox from './boundingBox'
import findNearestIndex from './findNearestIndex'

const autoNormalisePoints = (fromShape, toShape, {
    map,
    order,
    bboxCenter
} = {}) => {
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
      fromShape = map(fromShape, toShape, 0, diff, true)
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

    // Permutes between multi-path shapes
    if (fromShapeSubPaths.length > 1) {
      let i = 0
      let minDistance = Infinity
      let skipInfinity = false
      while (i < fromShapeSubPaths.length) {
        let i2 = 0
        while (i2 < toShapeSubPaths.length) {
          let currentDistance = distance(boundingBox(fromShapeSubPaths[i])
                        .center, boundingBox(toShapeSubPaths[i2])
                        .center)
          if (currentDistance < minDistance) {
            if (!isFinite(minDistance)) {
              skipInfinity = true
            }
            if (skipInfinity && i !== i2) {
              let spliced = fromShapeSubPaths.splice(i2, 1)
              fromShapeSubPaths.splice(i, 0, spliced[0])
            }
            minDistance = currentDistance
          }
          i2++
        }
        i++
      }
    }

    largestShapeSubPathsMap.map((d, i) => {
      let fromSubPath = fromShapeSubPaths[i]
      let toSubPath = toShapeSubPaths[i]
      let prev
      let diff
      let x
      let y

      if (fromSubPath && !toSubPath) {
        fromSubPath = cubify(remove(fromSubPath))
        if (bboxCenter) {
          let findCloser = findNearestIndex(toShape, boundingBox(fromSubPath)
                        .center)
          x = findCloser.x
          y = findCloser.y
        } else {
          prev = toShapeSubPaths[i - 1]
          prev = prev[prev.length - 1]
          x = prev.x
          y = prev.y
        }
        toSubPath = [{
          x,
          y,
          moveTo: true
        }, {
          x,
          y
        }]
        for (let ii = 0, len = fromSubPath.length; ii < len; ii++) {
          if (toSubPath[ii] === undefined) {
            toSubPath[ii] = {
              x,
              y
            }
          }
        }
      } else if (toSubPath && !fromSubPath) {
        toSubPath = cubify(remove(toSubPath))
        if (bboxCenter) {
          let findCloser = findNearestIndex(fromShape, boundingBox(toSubPath)
                        .center)
          x = findCloser.x
          y = findCloser.y
        } else {
          prev = fromShapeSubPaths[i - 1]
          prev = prev[prev.length - 1]
          x = prev.x
          y = prev.y
        }
        fromSubPath = [{
          x,
          y,
          moveTo: true
        }, {
          x,
          y
        }]
        for (let ii = 0, len = toSubPath.length; ii < len; ii++) {
          if (fromSubPath[ii] === undefined) {
            fromSubPath[ii] = {
              x,
              y
            }
          }
        }
      } else if (fromSubPath && toSubPath) {
        fromSubPath = cubify(remove(fromSubPath))
        toSubPath = cubify(remove(toSubPath))
        diff = toSubPath.length - fromSubPath.length
        if (diff > 0) {
          fromSubPath = add(fromSubPath, toSubPath.length)
        } else if (diff < 0) {
          toSubPath = add(toSubPath, fromSubPath.length)
        }
      }

      if (map) {
        fromSubPath = map(fromSubPath, toSubPath, i, diff, false)
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
