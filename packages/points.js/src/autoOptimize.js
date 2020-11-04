import { applyFuncToShapes } from './helpers';

const vergJoin = ',';
const reducerPath = (prev, { x, y, curve, moveTo }) => {
  let red;
  if (curve && curve.type) {
    const { type, x1, y1, x2, y2 } = curve;
    if (type === 'cubic') {
      red = [
        'C',
        x1,
        vergJoin,
        y1,
        vergJoin,
        x2,
        vergJoin,
        y2,
        vergJoin,
        x,
        vergJoin,
        y
      ];
    } else if (type === 'quadratic') {
      red = ['Q', x1, vergJoin, y1, vergJoin, x, vergJoin, y];
    }
  } else if (x !== undefined && y !== undefined) {
    red = [moveTo ? 'M' : 'L', x, vergJoin, y];
  }
  return red ? prev.concat(red) : prev;
};

const autoOptimizePoint = (shape) => shape.reduce(reducerPath, []);

const autoOptimize = (shape) => applyFuncToShapes(autoOptimizePoint, shape);

export default autoOptimize;
