import { create, release } from "./pool";

type Fn = Promise<any> | Function | any;

interface CacheItem {
  expiresIn: number;
  value: any;
}
interface CacheStore {
  [key: string]: CacheItem;
}

export default class CacheTTL {
  [x: string]: any;
  private ttl: number;
  private cache: CacheStore;
  private timerId: any;
  constructor(ttl: number = 1000) {
    this.ttl = ttl;
    this.cache = create();

    this.timerId = this.initTimer();
  }
  set(key: string, value: Fn, ttl: number = 150): any {
    if (
      typeof value === "function" &&
      value.constructor.name === "AsyncFunction"
    ) {
      value = value();
    }
    if (typeof value.then !== "undefined") {
      return value.then(
        (val: any): Fn => {
          const time: number = Date.now();
          const expiresIn: number | void =
            ttl > -1 ? Number(time + this.ttl) + ttl : undefined;

          const cache = create();
          cache.expiresIn = expiresIn;
          cache.value = value;

          this.cache[key] = cache as CacheItem;
          return val;
        }
      );
    }
    if (typeof value === "function") {
      value = value();
    }

    const time: number = Date.now();
    const expiresIn: number = Number(time + this.ttl + ttl);

    const cache = create();
    cache.expiresIn = expiresIn;
    cache.value = value;

    this.cache[key] = cache as CacheItem;

    return value;
  }
  has(key: string): boolean {
    return !!this.cache[key];
  }
  get(key: string): any {
    return this.cache[key] && this.cache[key].value;
  }
  getOrSet(key: string, callback: Fn, ttl?: number): any {
    return this.get(key) || this.set(key, callback, ttl);
  }
  delete(key: string): void {
    release(this.cache[key]);
    delete this.cache[key];
  }

  onTimerUpdate() {
    const { cache } = this;
    const currentTime = Date.now();
    let value;

    // eslint-disable-next-line
    for (const item in cache) {
      value = cache[item] as CacheItem;
      if (value.expiresIn && value.expiresIn <= currentTime) {
        release(value);
        delete cache[item];
      }
    }
  }
  initTimer(): any {
    return setInterval(this.onTimerUpdate.bind(this), this.ttl);
  }
  destroy(): void {
    this.clearInterval(this.timerId);

    Object.keys(this.cache).forEach(key => this.delete(key));
    release(this.cache);
  }
}
