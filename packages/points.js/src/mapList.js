import boundingBox from './boundingBox';
import length from './length';
import area from './area';
import { sqrt } from './helpers';

const mapList = {
  default() {
    return 0;
  },
  byPoint(a, b) {
    return b.length - a.length;
  },
  bySqrt(a, b) {
    return sqrt(boundingBox(a).center) - sqrt(boundingBox(b).center);
  },
  byX(b, a) {
    return b[0].x - a[0].x;
  },
  byY(b, a) {
    return b[0].y - a[0].y;
  },
  byBBox(a, b) {
    const bb = boundingBox(b).center;

    const aa = boundingBox(a).center;

    return bb.x + bb.y - (aa.x + aa.y);
  },
  byDirection(a, b) {
    return area(b) - area(a);
  },
  auto(a, b) {
    return (
      b.length - a.length ||
      sqrt(boundingBox(a).center) - sqrt(boundingBox(b).center) ||
      length(b) - length(a) ||
      area(b) - area(a)
    );
  },
  byLength(a, b) {
    return length(b) - length(a);
  },
  get(type) {
    return typeof type === 'function'
      ? type
      : typeof type === 'string' && type in mapList
      ? mapList[type]
      : null;
  }
};
export default mapList;
