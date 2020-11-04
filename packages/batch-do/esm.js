let nextTick = null;

const defaultContext = {
  resolveBatchs(cb) {
    cb();
  },
  pendingResolve(cb) {
    return Promise.resolve().then(cb);
  },
  batches: [],
  awaitBatch: false,
  calls: 0
};

const runBatches = async (context) => {
  const { batches, tasks } = context;
  context.batches = [];
  nextTick = null;

  if (context.preBatch) {
    await context.preBatch(context);
  }

  return context.resolveBatchs(
    context.awaitBatch
      ? () => {
          return Promise.all(batches);
        }
      : async () => {
          for (let callback of batches) {
            await callback();
          }
        }
  );
};

const callNextTick = (context) => {
  if (context.maxCallsPerBatch) {
    if (context.calls >= context.maxCallsPerBatch) {
      const promise = runBatches(context);
      context.calls = 0;
      return promise;
    }
  } else if (nextTick === null) {
    nextTick = context.pendingResolve(() => runBatches(context));
    return nextTick;
  }
};

const createContext = (
  resolveBatchs = defaultContext.resolveBatchs,
  pendingResolve = defaultContext.pendingResolve,
  awaitBatch = false,
  maxCallsPerBatch
) => {
  return {
    resolveBatchs,
    pendingResolve,
    batches: [],
    awaitBatch,
    maxCallsPerBatch,
    calls: 0
  };
};

const batch = (fn, context = defaultContext) => {
  context.batches.push(fn);
  context.calls++;

  return callNextTick(context);
};

export { batch as default, createContext };
