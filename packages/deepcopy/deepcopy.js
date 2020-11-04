(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else if (typeof exports !== 'undefined') {
    exports.default = factory();
    exports.__esModule = true;
  } else if (typeof self !== 'undefined') {
    self.deepCopy = factory();
    self.deepCopy.__esModule = true;
  }
  if (typeof window !== 'undefined' && window.document) {
    window.deepCopy = factory();
    window.deepCopy.__esModule = true;
  } else {
    this.deepCopy = factory();
    this.deepCopy.__esModule = true;
  }
})(function () {
  return function deepCopy(source) {
    if (source === null || typeof source !== 'object') {
      return source;
    }
    if (typeof Date !== 'undefined' && source instanceof Date) {
      copy = new Date();
      copy.setTime(source.getTime());
      return copy;
    }
    if (Array.isArray(source)) {
      return source.map(deepCopy);
    }
    if (typeof Map !== 'undefined' && source instanceof Map) {
      return new Map(Array.from(source).map(deepCopy));
    }
    if (typeof source === 'object') {
      var copy = {};
      for (var key in source) {
        if (typeof source[key] === 'object' && source[key] !== null) {
          copy[key] = deepCopy(source[key]);
        } else {
          copy[key] = source[key];
        }
      }
      return copy;
    }
  };
});
