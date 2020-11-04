const collector = (fn, delay = 50 / 3) => {
  const collect = [];
  const reactFns = {};

  let timerId = null;

  const timeoutHandler = async (
    collectCopy,
    collect,
    reactFn,
    result,
    reactResult
  ) => {
    collect.length = 0;
    timerId = null;

    const index = collectCopy.indexOf(result);

    let resultOfAll =
      fn.constructor.name === 'AsyncFunction'
        ? await fn(collectCopy)
        : fn(collectCopy);

    if (resultOfAll.then) {
      resultOfAll = await resultOfAll;
    }

    if (reactResult && reactResult.length > 0) {
      reactResult.forEach((reactFn) => reactFn(resultOfAll[index]));
      reactResult.length = 0;
    }
  };

  const nextTickHandler = ({ result, reactFn }) => {
    const collectCopy = (timerId
      ? timerId.collect.concat(collect)
      : collect.slice()
    ).filter((item, i, self) => self.indexOf(item) === i);

    let reactResult;
    if (reactFn) {
      reactResult = reactFns[result];
      if (
        reactResult &&
        reactResult.length !== undefined &&
        reactResult.splice
      ) {
        reactResult.push(reactFn);
      } else {
        reactFns[result] = [reactFn];
        reactResult = reactFns[result];
      }
    }

    timerId && clearTimeout(timerId);

    timerId = setTimeout(
      timeoutHandler,
      delay,
      collectCopy,
      collect,
      reactFn,
      result,
      reactResult
    );
    timerId.collect = collectCopy;

    return result;
  };

  return (batchFn, reactFn) => {
    const result = typeof batchFn === 'function' ? batchFn(collect) : batchFn;

    if (result && result.then) {
      return result
        .then((promiseResult) => {
          collect.push(promiseResult);
          return { result: promiseResult, reactFn };
        })
        .then(nextTickHandler);
    }

    collect.push(result);
    return nextTickHandler({ result, reactFn });
  };
};

export default collector;
