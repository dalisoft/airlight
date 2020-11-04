interface Config {
  cache: Map<string, any>;
  callsCache: Map<string, any>;
  transform: Function;
  maxAgeOfCache?: number;
  key: string;
  onRegisterTimeout: Function | Promise<any>;
  onCallsTimeout: Function | Promise<any>;
  onRegisterTimeoutDelay: number;
  onCallsTimeoutDelay: number;
}

class AsBatch {
  cache: Map<string, any>;
  callsCache: Map<string, any>;
  transform: Function;
  maxAgeOfCache?: number;
  key: string;
  onRegisterTimeout: Function | Promise<any>;
  onCallsTimeout: Function | Promise<any>;
  onRegisterTimeoutDelay: number;
  onCallsTimeoutDelay: number;
  private onRegisterTimeoutId: any;
  private onCallsTimeoutId: any;
  private timeoutResponse?: any | void;
  private timeoutResponseOfCall?: any | void;
  private allowWithoutWait?: boolean;
  constructor(options: Config) {
    this.cache = options.cache || new Map();
    this.callsCache = options.callsCache || new Map();
    this.key = options.key || Math.round(Math.random() * 1e15).toString(36);

    this.transform = options.transform || ((arr: any[]) => arr.join('\n'));
    this.maxAgeOfCache = options.maxAgeOfCache || 2000;

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
    resolveFn?: Function
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
        }, 100);
        !this.allowWithoutWait &&
          (this.onRegisterTimeoutId = setTimeout(() => {
            if (typeof onRegisterTimeout === 'function') {
              onRegisterTimeout = onRegisterTimeout(transform);
            }
            if (onRegisterTimeout && (onRegisterTimeout as Promise<any>).then) {
              return (onRegisterTimeout as Promise<any>)
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
          }, this.onRegisterTimeoutDelay));
      })
        .then(resolveFn as any)
        .then((res: any): any => {
          const tm = setTimeout((): void => {
            this.timeoutResponse = undefined;
            delete this.timeoutResponse;
            const tm2 = setTimeout(() => {
              this.cache.delete(key);
              clearTimeout(tm2);
            }, this.maxAgeOfCache);
            clearTimeout(tm);
          }, 100);
          return res;
        });
    }
    this.onRegisterTimeoutId =
      !this.allowWithoutWait &&
      setTimeout(
        (onRegisterTimeout as Function).bind(this, transform),
        this.onRegisterTimeoutDelay
      );

    return this.allowWithoutWait
      ? (onRegisterTimeout as Function)(transform)
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
    if (!this.callsCache.has(key) && value !== undefined) {
      cache = [typeof value === 'function' ? value() : value];
      this.callsCache.set(key, cache);
    } else if (value !== undefined) {
      cache = this.callsCache.get(key);
      cache.push(typeof value === 'function' ? value(cache) : value);
      this.callsCache.set(key, cache);
    } else {
      cache = this.callsCache.get(key);
    }

    if (resolveFn) {
      return new Promise((resolve, reject) => {
        const timerId = setInterval(() => {
          if (this.timeoutResponseOfCall) {
            clearInterval(timerId);
            resolve(this.timeoutResponseOfCall);
          }
        }, 100);
        this.onCallsTimeoutId = setTimeout(() => {
          if (typeof onCallsTimeout === 'function') {
            onCallsTimeout = onCallsTimeout(cache);
          }
          if (onCallsTimeout && (onCallsTimeout as Promise<any>).then) {
            return (onCallsTimeout as Promise<any>)
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
        }, this.onCallsTimeoutDelay);
      })
        .then(resolveFn as any)
        .then((res: any) => {
          const tm = setTimeout(() => {
            this.timeoutResponseOfCall = undefined;
            delete this.timeoutResponseOfCall;
            const tm2 = setTimeout(() => {
              this.cache.delete(key);
              clearTimeout(tm2);
            }, this.maxAgeOfCache);
            clearTimeout(tm);
          }, 100);
          return res;
        });
    }

    this.onCallsTimeoutId = setTimeout(
      (onCallsTimeout as Function).bind(this, cache),
      this.onCallsTimeoutDelay
    );
  }
  delete(key: string) {
    this.cache.delete(key);
    this.callsCache.delete(key);
  }
  clear() {
    this.cache.clear();
    this.callsCache.clear();
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

export default AsBatch;
