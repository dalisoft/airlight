/** global: x1 */
/** global: x2 */
/** global: y1 */
/** global: y2 */

const length = (s) => {
  return s.reduce((currentLength, { x: x2, y: y2, moveTo }, i) => {
    if (!moveTo) {
      const { x: x1, y: y1 } = s[i - 1];
      currentLength += linearLength(x1, y1, x2, y2);
    }

    return currentLength;
  }, 0);
};

const linearLength = (x1, y1, x2, y2) =>
  Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

export { linearLength };
export default length;
