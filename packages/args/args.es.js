function args(fn, args, modifyArgs) {
  const argsLen = args.length;
  let i = 0;

  if (argsLen === 0) {
    return fn();
  } else if (argsLen === 1) {
    if (typeof modifyArgs === 'function') {
      args = modifyArgs(args);
    }

    return fn(args[0]);
  } else if (argsLen <= 11) {
    if (typeof modifyArgs === 'function') {
      args = modifyArgs(args);
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
    }
  } else {
    if (typeof modifyArgs === 'function') {
      args = modifyArgs(args);
    } else {
      args = [].slice.call(args);
    }

    return fn.apply(null, args);
  }
}

export default args;
