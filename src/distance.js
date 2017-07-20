/** global: ax */
/** global: bx */
/** global: ay */
/** global: by */
export default function distance ({x: ax, y: ay}, {x: bx, y: by}) {
  return Math.sqrt((ax - bx) * (ax - bx) + (ay - by) * (ay - by))
}
