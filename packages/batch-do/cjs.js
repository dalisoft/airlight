let nextTick = null;

const defaultContext = {
  batchesCallback: process.nextTick,
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

const createContext = (
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

const before = (fn, context = defaultContext) => {
  context.batches.unshift(fn);
  context.calls++;

  callNextTick(context);
};
const after = (fn, context = defaultContext) => {
  context.batches.push(fn);
  context.calls++;

  callNextTick(context);
};

module.exports = { createContext, before, after }
