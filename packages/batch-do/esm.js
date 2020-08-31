let nextTick = null;

const defaultContext = {
  batchesCallback: requestIdleCallback,
  pendingCallback(cb) {
    return Promise.resolve().then(cb);
  },
  batches: [],
  awaitBatch: false,
  calls: 0
};

const runBatches = (context) => {
  const { batches } = context;
  context.batches = [];
  nextTick = null;

  context.batchesCallback(context.awaitBatch ? () => {
    return Promise.all(context.batches);
  } : async () => {
    for (let callback of context.batches) {
      await callback();
    }
  });
};

const callNextTick = (context) => {
  if (context.maxCallsPerBatch) {
    if (context.calls >= context.maxCallsPerBatch) {
      runBatches(context);
      context.calls = 0;
    }
  } else if (nextTick === null) {
    nextTick = context.pendingCallback(() => runBatches(context));
  }
};

export const createContext = (
  batchesCallback = defaultContext.batchesCallback,
  pendingCallback = defaultContext.pendingCallback,
  awaitBatch = false,
  maxCallsPerBatch
) => {
  return {
    batchesCallback,
    pendingCallback,
    batches: [],
    awaitBatch,
    maxCallsPerBatch,
    calls: 0
  };
};

export const before = (fn, context = defaultContext) => {
  context.batches.unshift(fn);
  context.calls++;

  callNextTick(context);
};
export const after = (fn, context = defaultContext) => {
  context.batches.push(fn);
  context.calls++;

  callNextTick(context);
};
