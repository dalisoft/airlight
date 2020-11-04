/** global: px */
/** global: py */
/** global: cx */
/** global: cy */
import arcToBezier from './arcToBezier';
import { applyFuncToShapes } from './helpers';

const cubifyShape = (shape) => {
  let i = 0;
  while (i < shape.length) {
    const point = shape[i];

    if (point.curve && point.curve.type !== 'cubic') {
      const { x: px, y: py } = shape[i - 1];
      const { x: cx, y: cy } = point;

      if (point.curve.type === 'arc') {
        const curves = arcToBezier({
          px,
          py,
          cx,
          cy,
          rx: point.curve.rx,
          ry: point.curve.ry,
          xAxisRotation: point.curve.xAxisRotation,
          largeArcFlag: point.curve.largeArcFlag,
          sweepFlag: point.curve.sweepFlag
        });

        curves.forEach((point, offset) => {
          shape.splice(i + offset, offset === 0 ? 1 : 0, point);
        });
      } else if (point.curve.type === 'quadratic') {
        const x1 = px + (2 / 3) * (point.curve.x1 - px);
        const y1 = py + (2 / 3) * (point.curve.y1 - py);
        const x2 = cx + (2 / 3) * (point.curve.x1 - cx);
        const y2 = cy + (2 / 3) * (point.curve.y1 - cy);

        const curve = point.curve;

        curve.type = 'cubic';
        curve.x1 = x1;
        curve.y1 = y1;
        curve.x2 = x2;
        curve.y2 = y2;

        i++;
      }
    } else if (i > 0 && point.moveTo) {
      if (shape[i - 1].moveTo) {
        delete point.moveTo;
      }
      i++;
    } else {
      i++;
    }
  }

  return shape;
};

const cubify = (s) => applyFuncToShapes(cubifyShape, s);

export default cubify;
