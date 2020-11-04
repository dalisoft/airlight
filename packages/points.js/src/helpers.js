/** global: bx */
/** global: by */
const angleFromSides = (a, b, c) => {
  const r = Math.acos(
    (Math.pow(a, 2) + Math.pow(b, 2) - Math.pow(c, 2)) / (2 * a * b)
  );

  return r * (180 / Math.PI);
};

const applyFuncToShapes = (f, s, ...args) => {
  if (isShapeArray(s)) {
    return s.map((shape) => f(shape, ...args));
  }

  return f(s, ...args);
};

const getShapeArray = (s) => (isShapeArray(s) ? s : [s]);

const isShapeArray = (s) => s && Array.isArray(s[0]);

const numberAtInterval = (a, b, interval) => {
  const c = a === b ? 0 : Math.abs(b - a);
  return c === 0 ? a : a < b ? a + c * interval : a - c * interval;
};

const distance = ({ x, y }, { x: bx, y: by }) => {
  return Math.sqrt((x - bx) * (x - bx) + (y - by) * (y - by));
};

const sqrt = ({ x, y }) => Math.sqrt(x * x + y * y);

const splitSubPath = (points) => {
  return points.reduce((lines, point) => {
    if (point.moveTo) {
      lines.push([]);
    }

    lines[lines.length - 1].push(point);

    return lines;
  }, []);
};

const countSubPath = (points) =>
  points.reduce((count, point) => (point.moveTo ? count + 1 : count), 0);

const joinSubPath = (shapes) =>
  shapes.reduce((prev, shape) => prev.concat(shape), []);

export {
  angleFromSides,
  applyFuncToShapes,
  getShapeArray,
  isShapeArray,
  numberAtInterval,
  distance,
  sqrt,
  splitSubPath,
  joinSubPath,
  countSubPath
};
