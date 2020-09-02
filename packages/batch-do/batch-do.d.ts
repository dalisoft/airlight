interface IBatchContext {
    resolveBatchs: (fn: Function) => Promise<void>;
    pendingResolve: (fn: Function) => void;
    batches: (() => void)[];
    awaitBatch?: boolean;
    maxCallsPerBatch?: boolean;
    preBatch?: (fn: Function) => Promise<void>
}

export function createContext (
  resolveBatchs: (fn: Function) => void,
  pendingResolve: (fn: Function) => void,
  awaitBatch?: boolean,
  maxCallsPerBatch?: boolean
): IBatchContext;

export function before (fn: Function, context?: IBatchContext): void;
export function after (fn: Function, context?: IBatchContext): void;
