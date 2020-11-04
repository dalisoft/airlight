import boundingBox from './boundingBox';
import { applyFuncToShapes, distance } from './helpers';

const findNearestIndexPoints = (points, p, box = false) => {
  let min = Infinity;
  const isBBoxUse = box !== false;
  const bbox = isBBoxUse ? boundingBox(points).center : p;

  if (isBBoxUse) {
    bbox.x += p.x;
    bbox.y += p.y;
  }

  let bestIndex = 0;

  for (let i = 0, len = points.length; i < len; i++) {
    let sumOfSquares = 0;
    const dist = distance(points[i], bbox);

    sumOfSquares += dist * dist;

    if (sumOfSquares < min) {
      bestIndex = i;
      min = sumOfSquares;
    }
  }

  return points[bestIndex];
};

const findNearestIndex = (points, p, box) =>
  applyFuncToShapes(findNearestIndexPoints, points, p, box);

export default findNearestIndex;
