class AsBatch {
  cache: Map<string, any>;
  callsCache: any[];
  transform: Function;
  key: string;
  onRegisterTimeout: Function | Promise<any> | any;
  onCallsTimeout: Function | Promise<any> | any;
  onRegisterTimeoutDelay: number;
  onCallsTimeoutDelay: number;
  private onRegisterTimeoutId: any;
  private onCallsTimeoutId: any;
  private timeoutResponse?: any;
  private timeoutResponseOfCall?: any;
  private allowWithoutWait?: boolean;
  constructor(options: any) {
    this.cache = options.cache || new Map();
    this.callsCache = options.callsCache || new Map();
    this.key = options.key || Math.round(Math.random() * 1e15).toString(36);

    this.transform = options.transform || ((arr: any[]) => arr.join('\n'));

    this.onRegisterTimeout = options.onRegisterTimeout;
    this.onRegisterTimeoutDelay = options.onRegisterTimeoutDelay || 100;
    this.onRegisterTimeoutId = null;

    this.onCallsTimeout = options.onCallsTimeout;
    this.onCallsTimeoutDelay = options.onCallsTimeoutDelay || 100;
    this.onCallsTimeoutId = null;
  }
  register(
    key?: string | Function | any,
    value?: Function,
    resolveFn?: Function,
  ) {
    if (typeof key === 'function') {
      if (value !== undefined) {
        resolveFn = value;
        value = key;
        key = this.key;
      } else {
        value = key;
        key = this.key;
      }
    } else if (key === undefined && value === undefined) {
      key = this.key;
    }
    let { onRegisterTimeout } = this;
    clearTimeout(this.onRegisterTimeoutId);

    let cache: Map<string, any>[];
    let transform: string;
    if (!this.cache.has(key) && value !== undefined) {
      cache = [typeof value === 'function' ? value() : value];
      this.cache.set(key, cache);
    } else if (value !== undefined) {
      cache = this.cache.get(key);
      cache.push(typeof value === 'function' ? value(cache) : value);
      this.cache.set(key, cache);
    } else {
      cache = this.cache.get(key);
    }
    transform = this.transform(cache) as string;

    if (resolveFn) {
      return new Promise((resolve, reject) => {
        const timerId = setInterval(() => {
          if (this.timeoutResponse) {
            clearInterval(timerId);
            resolve(this.timeoutResponse);
          }
        },                          100);
        !this.allowWithoutWait &&
          (this.onRegisterTimeoutId = setTimeout(() => {
            if (typeof onRegisterTimeout === 'function') {
              onRegisterTimeout = onRegisterTimeout(transform);
            }
            if (onRegisterTimeout && onRegisterTimeout.then) {
              return onRegisterTimeout
                .then((res: any) => {
                  this.timeoutResponse = res;
                  return res;
                })
                .then(resolve)
                .catch(reject);
            } else {
              this.timeoutResponse = onRegisterTimeout;
            }

            resolve(onRegisterTimeout);
          },                                     this.onRegisterTimeoutDelay));
      })
        .then(resolveFn as any)
        .then(
          (res: any): any => {
            const tm = setTimeout(() => {
              clearTimeout(tm);
              this.timeoutResponse = null;
            },                    100);
            return res;
          },
        );
    }
    this.onRegisterTimeoutId =
      !this.allowWithoutWait &&
      setTimeout(
        onRegisterTimeout.bind(this, transform),
        this.onRegisterTimeoutDelay,
      );

    return this.allowWithoutWait
      ? onRegisterTimeout(transform)
      : this.transform(cache);
  }
  call(key?: string | Function | any, value?: Function, resolveFn?: Function) {
    if (typeof key === 'function') {
      if (value !== undefined) {
        resolveFn = value;
        value = key;
        key = this.key;
      } else {
        value = key;
        key = this.key;
      }
    } else if (key === undefined && value === undefined) {
      key = this.key;
    }
    let { onCallsTimeout } = this;
    clearTimeout(this.onCallsTimeoutId);

    let cache: Map<string, any>[];
    if (!this.cache.has(key) && value !== undefined) {
      cache = [typeof value === 'function' ? value() : value];
      this.cache.set(key, cache);
    } else if (value !== undefined) {
      cache = this.cache.get(key);
      cache.push(typeof value === 'function' ? value(cache) : value);
      this.cache.set(key, cache);
    } else {
      cache = this.cache.get(key);
    }

    if (resolveFn) {
      return new Promise((resolve, reject) => {
        const timerId = setInterval(() => {
          if (this.timeoutResponseOfCall) {
            clearInterval(timerId);
            resolve(this.timeoutResponseOfCall);
          }
        },                          100);
        this.onCallsTimeoutId = setTimeout(() => {
          if (typeof onCallsTimeout === 'function') {
            onCallsTimeout = onCallsTimeout(cache);
          }
          if (onCallsTimeout && onCallsTimeout.then) {
            return onCallsTimeout
              .then((res: any) => {
                this.timeoutResponseOfCall = res;
                return res;
              })
              .then(resolve)
              .catch(reject);
          } else {
            this.timeoutResponseOfCall = onCallsTimeout;
          }

          resolve(onCallsTimeout);
        },                                 this.onCallsTimeoutDelay);
      })
        .then(resolveFn as any)
        .then((res: any) => {
          const tm = setTimeout(() => {
            clearTimeout(tm);
            this.timeoutResponseOfCall = null;
          },                    100);
          return res;
        });
    }

    this.onCallsTimeoutId = setTimeout(
      onCallsTimeout.bind(this, cache),
      this.onCallsTimeoutDelay,
    );
  }
  delete(key: string) {
    this.cache.delete(key);
  }
  clear() {
    this.cache.clear();
  }
  fetchRegistered() {
    clearTimeout(this.onRegisterTimeoutId);
    this.allowWithoutWait = true;
    return this.register().then((res: any) => {
      this.allowWithoutWait = false;
      return res;
    });
  }
}

export { AsBatch as default, AsBatch as asBatch };
