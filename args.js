(function(libraryName, factory) {
const _interopDefault = (m) => m.default ? m.default : m;
  if (typeof define === "function" && define.amd) {
    define([], factory)
  }  else if (typeof module !== "undefined" && module.exports) {
    module.exports = _interopDefault(factory());
  } else if (typeof exports !== "undefined") {
    Object.assign(exports, factory());
    exports.__esModule = true;
  } else if (typeof self !== "undefined") {
    self[libraryName] = _interopDefault(factory());
    self.__esModule = true;
  } else if (typeof window !== "undefined" && window.document) {
    window[libraryName] = _interopDefault(factory());
    window.__esModule = true;
  } else {
    this[libraryName] = _interopDefault(factory());
    this.__esModule = true;
  }
})('args', function() {
  function normalizeArg(type) {
    if (typeof type !== "string") {
      return type;
    }
    if (
      type.charAt(0) === "{" ||
      (type.charAt(0) === "[" && typeof JSON !== "undefined")
    ) {
      return JSON.parse(type);
    }
    if (isNaN(+type)) {
      return type;
    }
    return +type;
  }
  function args(fn, args) {
    const argsLen = args.length;
    let i = 0;
    while (i < argsLen) {
      args[i] = normalizeArg(args[i]);
      i++;
    }
    if (argsLen === 0) {
      return fn();
    } else if (argsLen === 1) {
      return fn(args[0]);
    }
    const [
      arg1,
      arg2,
      arg3,
      arg4,
      arg5,
      arg6,
      arg7,
      arg8,
      arg9,
      arg10,
      arg11
    ] = args;
    if (argsLen === 2) {
      return fn(arg1, arg2);
    } else if (argsLen === 3) {
      return fn(arg1, arg2, arg3);
    } else if (argsLen === 4) {
      return fn(arg1, arg2, arg3, arg4);
    } else if (argsLen === 5) {
      return fn(arg1, arg2, arg3, arg4, arg5);
    } else if (argsLen === 6) {
      return fn(arg1, arg2, arg3, arg4, arg5, arg6);
    } else if (argsLen === 7) {
      return fn(arg1, arg2, arg3, arg4, arg5, arg6, arg7);
    } else if (argsLen === 8) {
      return fn(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
    } else if (argsLen === 9) {
      return fn(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
    } else if (argsLen === 10) {
      return fn(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10);
    } else if (argsLen === 11) {
      return fn(
        arg1,
        arg2,
        arg3,
        arg4,
        arg5,
        arg6,
        arg7,
        arg8,
        arg9,
        arg10,
        arg11
      );
    } else {
      return fn.apply(null, [].slice.call(args));
    }
  }

  const globalModule = {};
  globalModule.default = args;
  
  return globalModule

});