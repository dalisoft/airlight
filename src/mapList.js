import boundingBox from './boundingBox'
import length from './length'
import area from './area'

const mapList = {
  default (a, b) {
    return 0
  },
  complexity (a, b) {
    return b.length - a.length
  },
  xPos (b, a) {
    return b[0].x - a[0].x
  },
  yPos (b, a) {
    return b[0].y - a[0].y
  },
  position (a, b) {
    const bb = boundingBox(b)
      .center

    const aa = boundingBox(a)
    .center

    return (bb.x + bb.y) - (aa.x + aa.y)
  },
  angle (a, b) {
    return area(b) - area(a)
  },
  auto (a, b) {
    return b.length > 5 ? mapList.complexity(a, b) : mapList.length(a, b)
  },
  length (a, b) {
    return length(b) - length(a)
  },
  get (type) {
    return typeof (type) === 'function' ? type : typeof (type) === 'string' && (type in mapList)
      ? mapList[type] : null
  }
}
export default mapList
