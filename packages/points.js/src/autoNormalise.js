import {
  applyFuncToShapes,
  countSubPath,
  splitSubPath,
  joinSubPath,
  distance
} from './helpers';
import { autoCurvePoint } from './autoCurve';
import add from './add';
import cubify from './cubify';
import remove from './remove';
import moveIndexFunc from './moveIndex';
import reverseFunc from './reverse';
import mapList from './mapList';
import boundingBox from './boundingBox';
import findNearestIndex from './findNearestIndex';
import approximateCurve from 'approximate-curve';

const autoNormalisePoints = (
  fromShape,
  toShape,
  {
    map,
    order,
    bboxCenter,
    approximate,
    useAsArray,
    moveIndex,
    reverse,
    closerBound
  } = {}
) => {
  const fromShapeSubPathsCount = countSubPath(fromShape);
  const toShapeSubPathsCount = countSubPath(toShape);
  if (fromShapeSubPathsCount === 1 && toShapeSubPathsCount === 1) {
    const diff = toShape.length - fromShape.length;
    if (typeof moveIndex === 'number' && moveIndex) {
      fromShape = moveIndexFunc(fromShape, moveIndex);
    }
    if (reverse !== undefined) {
      fromShape = reverseFunc(fromShape);
    }
    if (diff > 0) {
      fromShape = add(fromShape, toShape.length);
    } else if (diff < 0) {
      toShape = add(toShape, fromShape.length);
    }
    if (map) {
      fromShape = map(fromShape, toShape, 0, diff, true);
    }
    fromShape = autoCurvePoint(fromShape, toShape);
    toShape = autoCurvePoint(toShape, fromShape);
    return [fromShape, toShape];
  } else {
    const fromShapeSubPaths = splitSubPath(fromShape);
    const toShapeSubPaths = splitSubPath(toShape);

    if (order) {
      if (order.startOrder) {
        fromShapeSubPaths.sort(mapList.get(order.startOrder));
      } else if (order.endOrder) {
        toShapeSubPaths.sort(mapList.get(order.endOrder));
      } else {
        fromShapeSubPaths.sort(mapList.get(order));
        toShapeSubPaths.sort(mapList.get(order));
      }
    }
    const largestShapeSubPathsMap =
      fromShapeSubPaths.length > toShapeSubPaths.length
        ? fromShapeSubPaths
        : toShapeSubPaths;

    // Permutes between multi-path shapes
    if (closerBound && fromShapeSubPaths.length > 1) {
      let i = 0;
      let minDistance = Infinity;
      let skipInfinity = false;
      while (i < fromShapeSubPaths.length) {
        if (fromShapeSubPaths[i]) {
          let i2 = 0;
          while (i2 < toShapeSubPaths.length) {
            const currentDistance = distance(
              boundingBox(fromShapeSubPaths[i]).center,
              boundingBox(toShapeSubPaths[i2]).center
            );
            if (currentDistance < minDistance) {
              if (!isFinite(minDistance)) {
                skipInfinity = true;
              }
              if (skipInfinity && i !== i2 && fromShapeSubPaths[i2]) {
                const spliced = fromShapeSubPaths.splice(i2, 1);
                fromShapeSubPaths.splice(i, 0, spliced[0]);
              }
              minDistance = currentDistance;
            }
            i2++;
          }
        }
        i++;
      }
    }

    largestShapeSubPathsMap.map((d, i) => {
      let fromSubPath = fromShapeSubPaths[i];
      let toSubPath = toShapeSubPaths[i];
      let prev;
      let diff;
      let x;
      let y;

      if (fromSubPath && !toSubPath) {
        if (typeof moveIndex === 'number' && moveIndex) {
          fromSubPath = moveIndexFunc(fromSubPath, moveIndex);
        }
        if (reverse !== undefined) {
          fromSubPath = reverseFunc(fromSubPath);
        }
        fromSubPath = cubify(remove(fromSubPath));
        if (bboxCenter) {
          const findCloser = findNearestIndex(
            toShape,
            boundingBox(fromSubPath).center
          );
          x = findCloser.x;
          y = findCloser.y;
        } else {
          prev = toShapeSubPaths[i - 1];
          prev = prev[prev.length - 1];
          x = prev.x;
          y = prev.y;
        }
        toSubPath = [
          {
            x,
            y,
            moveTo: true
          },
          {
            x,
            y
          }
        ];
        for (let ii = 0, len = fromSubPath.length; ii < len; ii++) {
          if (toSubPath[ii] === undefined) {
            toSubPath[ii] = {
              x,
              y
            };
          }
        }
      } else if (toSubPath && !fromSubPath) {
        toSubPath = cubify(remove(toSubPath));
        if (bboxCenter) {
          const findCloser = findNearestIndex(
            fromShape,
            boundingBox(toSubPath).center
          );
          x = findCloser.x;
          y = findCloser.y;
        } else {
          prev = fromShapeSubPaths[i - 1];
          prev = prev[prev.length - 1];
          x = prev.x;
          y = prev.y;
        }
        fromSubPath = [
          {
            x,
            y,
            moveTo: true
          },
          {
            x,
            y
          }
        ];
        for (let ii = 0, len = toSubPath.length; ii < len; ii++) {
          if (fromSubPath[ii] === undefined) {
            fromSubPath[ii] = {
              x,
              y
            };
          }
        }
      } else if (fromSubPath && toSubPath) {
        if (typeof moveIndex === 'number' && moveIndex) {
          fromSubPath = moveIndexFunc(fromSubPath, moveIndex);
        }
        if (reverse !== undefined) {
          fromSubPath = reverseFunc(fromSubPath);
        }
        fromSubPath = cubify(remove(fromSubPath));
        toSubPath = cubify(remove(toSubPath));
        diff = toSubPath.length - fromSubPath.length;
        if (diff > 0) {
          fromSubPath = add(fromSubPath, toSubPath.length);
        } else if (diff < 0) {
          toSubPath = add(toSubPath, fromSubPath.length);
        }
      }

      if (map) {
        fromSubPath = map(fromSubPath, toSubPath, i, diff, false);
      }

      fromSubPath = autoCurvePoint(fromSubPath, toSubPath);
      toSubPath = autoCurvePoint(toSubPath, fromSubPath);

      if (approximate) {
        fromSubPath = remove(approximateCurve(fromSubPath));
        toSubPath = remove(approximateCurve(toSubPath));
        if (useAsArray) {
          fromSubPath = fromSubPath.map((p) => [p.x, p.y]);
          toSubPath = toSubPath.map((p) => [p.x, p.y]);
        }
      }
      fromShapeSubPaths[i] = fromSubPath;
      toShapeSubPaths[i] = toSubPath;
    });

    return [
      useAsArray ? fromShapeSubPaths : joinSubPath(fromShapeSubPaths),
      useAsArray ? toShapeSubPaths : joinSubPath(toShapeSubPaths)
    ];
  }
};

const autoNormalise = (fromShape, toShape, param) =>
  applyFuncToShapes(autoNormalisePoints, fromShape, toShape, param);

export default autoNormalise;
