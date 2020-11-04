import area from './area';
import reverse from './reverse';
import { applyFuncToShapes } from './helpers';

const autoReversePoints = (fromShape, toShape) => {
  const fromShapeArea = area(fromShape);
  const toShapeArea = area(toShape);
  if (
    (fromShapeArea > 0 && toShapeArea < 0) ||
    (toShapeArea > 0 && fromShapeArea < 0)
  ) {
    fromShape = reverse(fromShape);
  }
  return fromShape;
};

const autoReverse = (fromShape, toShape) =>
  applyFuncToShapes(autoReversePoints, fromShape, toShape);

export default autoReverse;
