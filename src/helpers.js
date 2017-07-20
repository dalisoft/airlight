const applyFuncToShapes = (f, s, ...args) => {
  if (isShapeArray(s)) {
    return s.map(shape => f(shape, ...args))
  }

  return f(s, ...args)
}

const getShapeArray = s => isShapeArray(s) ? s : [ s ]

const isShapeArray = s => Array.isArray(s[ 0 ])

export {
  applyFuncToShapes,
  getShapeArray,
  isShapeArray
}
