(function(factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else if (typeof exports !== "undefined") {
    exports.default = factory();
    exports.args = exports.default;
  } else if (typeof window !== "undefined" && window.document) {
    window.args = factory();
  } else {
    this.args = factory();
  }
})(function() {
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

  return function(fn, args) {
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
  };
});
