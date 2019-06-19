const collector = fn => {
  const collect = [];

  let timerId = null;

  const timeoutHandler = async (collectCopy, collect, reactFn, result) => {
    collect.length = 0;
    timerId = null;

    const index = result.indexOf(collectCopy);

    let resultOfAll =
      fn.constructor.name === "AsyncFunction" ? await fn(collectCopy) : fn(collectCopy);

    if (resultOfAll.then) {
      resultOfAll = await resultOfAll;
    }

    if (reactFn && resultOfAll[index]) {
      reactFn(resultOfAll[index]);
    }
  };

  const nextTickHandler = ({result, reactFn}) => {
    const collectCopy = (timerId ? timerId.collect.concat(collect) : collect.slice()).filter(
      (item, i, self) => self.indexOf(item) === i
    );

    timerId && clearTimeout(timerId);

    timerId = setTimeout(timeoutHandler, 0, collectCopy, collect, reactFn, result);
    timerId.collect = collectCopy;

    return result;
  };

  return (batchFn, reactFn) => {
    const result = typeof batchFn === "function" ? batchFn(collect) : batchFn;

    if (result && result.then) {
      return result
        .then(promiseResult => {
          collect.push(promiseResult);
          return {result: promiseResult, reactFn};
        })
        .then(nextTickHandler);
    }

    collect.push(result);
    return nextTickHandler({result, reactFn});
  };
};

export default collector;
