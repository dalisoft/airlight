import { Cache as FileCache } from './create-cache-file';
import { Cache as CustomCache } from './create-cache-custom';
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
  private saveAsFile: string | boolean | undefined;
  private timerId: any;
  constructor(ttl: number = 1000, saveAsFile?: string | boolean, config?: any) {
    this.ttl = ttl;
    this.cache = create();
    this.saveAsFile = isServer && saveAsFile;

    if (this.saveAsFile) {
      if (saveAsFile === true) {
        this.fileCache = new FileCache(config);
      } else if (saveAsFile === 'custom') {
        this.fileCache = new CustomCache(config);
      }
    }

    this.timerId = this.initTimer();
  }
  public set = (
    key: string,
    value: Fn,
    ttl?: number,
    saveAsFile = this.saveAsFile,
  ): any => {
    if (ttl && ttl < -1) {
      return value;
    }

    if (
      typeof value === 'function' &&
      value.constructor.name === 'AsyncFunction'
    ) {
      value = value(key, value);
    }
    if (value === undefined || value === null) {
      if (isServer) {
        if (process.env.NODE_ENV === 'development') {
          console.log('Invalid value passed', { key, value });
        }
      }
      return value;
    }

    if (typeof value.then !== 'undefined') {
      return value.then(
        (val: any): Fn => {
          if (val === undefined || val === null) {
            if (isServer) {
              if (process.env.NODE_ENV === 'development') {
                console.log('Invalid value passed', { key, val });
              }
            }
            return val;
          }

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
            ttl && ttl === -1 ? undefined : time + ttlTime;

          if (saveAsFile) {
            const set = this.fileCache.set(key, { expiresIn, value: val });

            if (set && set.then) {
              return set.then(() => val);
            }
          } else {
            const cache = create() as PoolObject;
            if (expiresIn && expiresIn !== -1) {
              cache.set('expiresIn', expiresIn);
            }
            cache.set('value', val);
            this.cache.set(key, cache);
          }
          return val;
        },
      );
    }
    if (typeof value === 'function') {
      value = value(key, value);
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
      ttl && ttl === -1 ? undefined : time + ttlTime;

    if (saveAsFile) {
      const set = this.fileCache.set(key, { value, expiresIn });

      if (set && set.then) {
        return set.then(() => value);
      }
    } else {
      const cache = create() as PoolObject;
      if (expiresIn && expiresIn !== -1) {
        cache.set('expiresIn', expiresIn);
      }
      cache.set('value', value);
      this.cache.set(key, cache);
    }

    return value;
  }
  public has = (key: string): boolean => {
    if (this.cache.has(key)) {
      return this.cache.has(key);
    } else if (this.fileCache) {
      const has = this.fileCache.has(key);

      if (has && has.then) {
        return has.then((val: any): boolean => val);
      }
      return has;
    }
    return false;
  }
  public get = (key: string): any => {
    if (this.cache.get(key)) {
      return this.cache.get(key).get('value');
    } else if (this.fileCache) {
      let get = this.fileCache.get(key);

      if (typeof get === 'function') {
        get = get(key);
      }

      if (get && get.then) {
        return get.then((val: any) =>
          val !== undefined ? val.value : undefined,
        );
      }
      return get ? get.value : undefined;
    }
  }
  public getOrSet = (key: string, callback: Fn, ttl?: number): any => {
    const get = this.get(key);

    if (get) {
      if (typeof get.then === 'function') {
        return get.then(
          (val: any): any =>
            val === undefined ? this.set(key, callback, ttl) : val,
        );
      }
      return get;
    }

    return this.set(key, callback, ttl);
  }
  public delete = (key: string): void => {
    if (this.cache.has(key)) {
      release(this.cache.get(key));
      this.cache.delete(key);
    } else if (this.fileCache && this.fileCache.has(key)) {
      return this.fileCache.delete(key);
    }
  }

  public onTimerUpdate = async (): Promise<any> => {
    const currentTime: number = Date.now();

    this.cache.forEach((value: any, key: string) => {
      if (value.has('expiresIn')) {
        const delta: number = value.get('expiresIn') - currentTime;
        if (delta <= 500) {
          release(value);
          this.cache.delete(key);
        }
      }
    });
    this.fileCache &&
      (await this.fileCache.forEach((key: string, value: FilePoolObject) => {
        if (value.expiresIn !== undefined) {
          const delta: number = value.expiresIn - currentTime;
          if (delta <= 500) {
            this.fileCache.delete(key);
          }
        }
      }));
  }
  public initTimer = (): any => {
    return setInterval(this.onTimerUpdate, 500);
  }
  public destroy = (): void => {
    clearInterval(this.timerId);

    Object.keys(this.cache).forEach(key => this.delete(key));
    release(this.cache);

    this.fileCache && this.fileCache.destroy();
  }
}

export { CacheTTL, CacheTTL as default };
