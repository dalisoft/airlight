import { Cache as FileCache } from './create-cache-file';
import {
  Cache as CustomCache,
  Config as CustomCacheConfig
} from './create-cache-custom';
import { create, PoolObject, release } from './pool';

type typeGet = string | number | boolean;
type Fn = Function | string | number | boolean | Promise<typeGet>;
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

export default class CacheTTL {
  private ttl: number;
  private cache: PoolObject;
  private fileCache!: FileCache | CustomCache;
  private saveAsFile: string | boolean | undefined;
  private timerId: any;
  private checkInterval: number = 500;
  constructor(
    ttl: number = 1000,
    saveAsFile?: string | boolean,
    config?: boolean | string | object | null,
    isPermanent?: boolean
  ) {
    this.ttl = ttl;
    this.cache = create();
    this.saveAsFile = isServer && saveAsFile;

    if (this.saveAsFile) {
      if (saveAsFile === true) {
        this.fileCache = new FileCache(config as boolean | string | null);
      } else if (saveAsFile === 'custom') {
        this.fileCache = new CustomCache(config as CustomCacheConfig);
      }
    }

    this.timerId = !isPermanent && this.initTimer();
  }
  public set<T>(
    key: string,
    value: Promise<T> | T,
    ttl?: number,
    saveAsFile = this.saveAsFile
  ): T {
    if (ttl && ttl < -1) {
      return value as T;
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

    if (typeof (value as Promise<T>).then !== 'undefined') {
      return (value as any).then(
        (val: Promise<T> | T): T => {
          if (val === undefined || val === null) {
            if (isServer) {
              if (process.env.NODE_ENV === 'development') {
                console.log('Invalid value passed', { key, val });
              }
            }
            return val;
          }

          if (typeof val === 'function' || (val as Promise<T>).then) {
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
          return val as T;
        }
      );
    }
    if (typeof value === 'function') {
      value = value(key, value);
    }
    if (typeof value === 'function' || (value as Promise<T>).then) {
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

    return value as T;
  }
  public has(key: string): Promise<boolean> | boolean {
    if (this.cache.has(key)) {
      return this.cache.has(key);
    } else if (this.fileCache) {
      const has: Promise<boolean> | boolean = this.fileCache.has(key);

      return has;
    }
    return false;
  }
  public get(key: string): typeGet | Promise<typeGet> | void {
    if (this.cache.get(key)) {
      return this.cache.get(key).get('value');
    } else if (this.fileCache) {
      let get = this.fileCache.get(key) as
        | Function
        | Promise<FilePoolObject>
        | FilePoolObject;

      if (typeof get === 'function') {
        get = get(key);
      }

      if (get && (get as Promise<FilePoolObject>).then) {
        return (get as Promise<FilePoolObject>).then((val: FilePoolObject) =>
          val ? val.value : undefined
        );
      }
      return get ? (get as FilePoolObject).value : undefined;
    }
  }
  public expire(key: string, ttl: number): any {
    const time: number = Date.now();
    const expiresIn: number = time + ttl;

    if (this.cache.has(key) && expiresIn) {
      return this.cache.get(key).set('expiresIn', expiresIn);
    } else if (this.fileCache && this.fileCache.has(key)) {
      const get = this.fileCache.get(key) as
        | Promise<FilePoolObject>
        | FilePoolObject;

      if (get && (get as Promise<FilePoolObject>).then) {
        return (get as Promise<FilePoolObject>).then((val: FilePoolObject) => {
          val.expiresIn = expiresIn;
          return this.fileCache.set(key, val);
        });
      }

      (get as FilePoolObject).expiresIn = expiresIn;
      if (this.saveAsFile === true) {
        this.fileCache.delete(key);
      }
      return this.fileCache.set(key, get);
    }
    return null;
  }
  public getOrSet(key: string, callback: Function, ttl?: number): Fn {
    const get = this.get(key);

    if (get) {
      if (typeof (get as Promise<typeGet>).then === 'function') {
        return (get as any).then(
          (val: typeGet | void): Fn =>
            val === undefined || val === null
              ? this.set(key, callback, ttl)
              : val
        );
      }
      return get as typeGet;
    }

    return this.set(key, callback, ttl);
  }
  public delete(key: string): PromiseLike<any> | void {
    if (this.cache.has(key)) {
      release(this.cache.get(key));
      this.cache.delete(key);
    } else if (this.fileCache && this.fileCache.has(key)) {
      return this.fileCache.delete(key);
    }
  }
  public clear(): this {
    this.cache.clear();
    this.fileCache && this.fileCache.clear();
    return this;
  }

  public async onTimerUpdate(): Promise<any> {
    const currentTime: number = Date.now();

    this.cache.forEach((value: any, key: string) => {
      if (value.has('expiresIn')) {
        const delta: number = value.get('expiresIn') - currentTime;
        if (delta <= this.checkInterval) {
          release(value);
          this.cache.delete(key);
        }
      }
    });
    this.fileCache &&
      (await this.fileCache.forEach(
        async (key: string, value: FilePoolObject) => {
          if (value.expiresIn !== undefined) {
            const delta: number = value.expiresIn - currentTime;
            if (delta <= this.checkInterval) {
              await this.fileCache.delete(key);
            }
          }
        }
      ));
  }
  public initTimer(): any {
    return setInterval(this.onTimerUpdate.bind(this), this.checkInterval);
  }
  public setCheckInterval(interval: number): this {
    clearInterval(this.timerId);
    this.checkInterval = interval;
    this.timerId = this.initTimer();
    return this;
  }
  public destroy(): Promise<any> | void {
    clearInterval(this.timerId);

    Object.keys(this.cache).forEach((key) => this.delete(key));
    release(this.cache);

    return this.fileCache && (this.fileCache.destroy() as Promise<any>);
  }
}
