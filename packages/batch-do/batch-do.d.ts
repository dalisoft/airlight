interface IBatchContext {
    batchesCallback: (fn: Function) => void;
    pendingCallback: (fn: Function) => void;
    batches: (() => void)[];
    awaitBatch?: boolean;
    maxCallsPerBatch?: boolean;
}

export function createContext (
  batchesCallback: (fn: Function) => void,
  pendingCallback: (fn: Function) => void,
  awaitBatch?: boolean,
  maxCallsPerBatch?: boolean
): IBatchContext;

export function before (fn: Function, context?: IBatchContext): void;
export function after (fn: Function, context?: IBatchContext): void;
