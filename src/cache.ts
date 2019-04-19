import { Cache, pools } from './create-cache-file';
import { create, PoolObject, release } from './pool';

type Fn = Promise<any> | Function | any;
interface FilePoolObject {
  expiresIn: number;
  value: any;
}
declare const process: {
  env: any;
};
const isServer =
  typeof process !== 'undefined' &&
  typeof window === 'undefined' &&
  process.env;

class CacheTTL {
  [x: string]: any;
  private ttl: number;
  private cache: PoolObject;
  private fileCache?: any;
  private saveAsFile: boolean;
  private timerId: any;
  constructor(ttl: number = 1000, saveAsFile = false, randomDir = false) {
    this.ttl = ttl;
    this.cache = create();
    this.saveAsFile = saveAsFile && isServer;

    if (isServer) {
      this.fileCache = new Cache(randomDir);
    }

    this.timerId = this.initTimer();
  }
  public set = (
    key: string,
    value: Fn,
    ttl?: number,
    saveAsFile = this.saveAsFile,
  ): any => {
    if (
      typeof value === 'function' &&
      value.constructor.name === 'AsyncFunction'
    ) {
      value = value();
    }
    if (typeof value.then !== 'undefined') {
      return value.then(
        (val: any): Fn => {
          if (typeof val === 'function' || val.then) {
            return this.set(key, val, ttl, saveAsFile);
          }

          const time: number = Date.now();
          const ttlTime =
            typeof ttl === 'string'
              ? this.ttl + parseFloat(ttl)
              : typeof ttl === 'number'
              ? ttl
              : this.ttl;
          const expiresIn: number | void =
            ttl && ttl < 0 ? undefined : time + ttlTime;

          if (saveAsFile) {
            this.fileCache.set(key, { value, expiresIn });
          } else {
            const cache = create() as PoolObject;
            expiresIn && cache.set('expiresIn', expiresIn);
            cache.set('value', value);
            this.cache.set(key, cache);
          }
          return val;
        },
      );
    }
    if (typeof value === 'function') {
      value = value();
    }
    if (typeof value === 'function' || value.then) {
      return this.set(key, value, ttl, saveAsFile);
    }

    const time: number = Date.now();
    const ttlTime =
      typeof ttl === 'string'
        ? this.ttl + parseFloat(ttl)
        : typeof ttl === 'number'
        ? ttl
        : this.ttl;
    const expiresIn: number | void =
      ttl && ttl < 0 ? undefined : time + ttlTime;

    if (saveAsFile) {
      this.fileCache.set(key, { value, expiresIn });
    } else {
      const cache = create() as PoolObject;
      expiresIn && cache.set('expiresIn', expiresIn);
      cache.set('value', value);
      this.cache.set(key, cache);
    }

    return value;
  }
  public has = (key: string): boolean => {
    return this.cache.has(key) || (this.fileCache && this.fileCache.has(key));
  }
  public get = (key: string): any => {
    return (
      (this.cache.get(key) && this.cache.get(key).get('value')) ||
      (this.fileCache &&
        this.fileCache.get(key) &&
        this.fileCache.get(key).value)
    );
  }
  public getOrSet = (key: string, callback: Fn, ttl?: number): any => {
    return this.get(key) || this.set(key, callback, ttl);
  }
  public delete = (key: string): void => {
    if (this.cache.has(key)) {
      release(this.cache.get(key));
      this.cache.delete(key);
    } else if (this.fileCache && this.fileCache.has(key)) {
      release(this.fileCache.get(key));
      this.fileCache.delete(key);
    }
  }

  public onTimerUpdate = (): void => {
    const currentTime: number = Date.now();

    this.cache.forEach((value: any, key: string) => {
      if (value.has('expiresIn')) {
        const delta = Math.abs(value.get('expiresIn') - currentTime);
        if (delta <= 100) {
          release(value);
          this.cache.delete(key);
        }
      }
    });
    this.fileCache &&
      this.fileCache.forEach((key: string, value: FilePoolObject) => {
        if (value.expiresIn !== undefined) {
          const delta = Math.abs(value.expiresIn - currentTime);
          if (delta <= 100) {
            release(value as any);
            this.fileCache.delete(key);
          }
        }
      });
  }
  public initTimer = (): any => {
    return setInterval(this.onTimerUpdate, 100);
  }
  public destroy = (): void => {
    clearInterval(this.timerId);

    pools && pools.forEach(release);
    Object.keys(this.cache).forEach(key => this.delete(key));
    release(this.cache);

    pools && (pools.length = 0);
    this.fileCache && this.fileCache.destroy();
  }
}

export { CacheTTL, CacheTTL as default };
