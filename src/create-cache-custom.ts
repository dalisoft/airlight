declare const process: any;
declare const require: any;

interface Config {
  onlyServer?: boolean;
  logMessage: Function;
  initialKeys: Function | string[];
  jsonEnforce?: boolean;
  getTransform: Function;
  hasTransform: Function;
  setTransform: Function;
  deleteTransform: Function;
  destroy?: Function;
}

const isNonServerEnv =
  typeof window !== 'undefined' ||
  typeof require === 'undefined' ||
  typeof process === 'undefined';

class CustomCache {
  public addedCacheKeys?: string[];
  private config: any;

  constructor(config: Config) {
    if (isNonServerEnv && config.onlyServer) {
      console.error(
        'The CustomCache is available only for server-side Node.js!',
      );
      return this;
    }

    this.config = config;
    this.addedCacheKeys = Array.isArray(config.initialKeys)
      ? config.initialKeys
      : typeof config.initialKeys === 'function'
      ? config.initialKeys() || []
      : [];

    return this;
  }
  public get(key: string): any {
    if ((isNonServerEnv && this.config.onlyServer) || !this.has(key)) {
      return null;
    }

    if (!this.config.getTransform) {
      console.error(
        'The CustomCache is requires `getTransform` property' +
          ' on configuration parameter to be working properly',
      );
      return this;
    }
    const value: any = this.config.jsonEnforce
      ? JSON.parse(this.config.getTransform(key))
      : this.config.getTransform(key);

    return value;
  }
  public set(key: string, value: any): any {
    if (isNonServerEnv && this.config.onlyServer) {
      console.error(
        'The CustomCache is available only for server-side Node.js!',
      );
      return this;
    }
    if (!this.config.setTransform) {
      console.error(
        'The CustomCache is requires `setTransform` property' +
          ' on configuration parameter to be working properly',
      );
      return this;
    }
    if (this.addedCacheKeys) {
      if (this.addedCacheKeys.includes(key)) {
        return value;
      }
      this.addedCacheKeys.push(key);
    }
    return this.config.setTransform(
      key,
      this.config.jsonEnforce ? JSON.stringify(value) : value,
    );
  }
  public has(key: string): boolean {
    if (isNonServerEnv && this.config.onlyServer) {
      return false;
    }
    if (!this.config.hasTransform) {
      console.error(
        'The CustomCache is requires `hasTransform` property' +
          ' on configuration parameter to be working properly',
      );
      return false;
    }
    return this.config.hasTransform(key);
  }
  public delete(key: string): any {
    if (isNonServerEnv && this.config.onlyServer) {
      return this;
    }
    if (!this.config.deleteTransform) {
      console.error(
        'The CustomCache is requires `deleteTransform` property' +
          ' on configuration parameter to be working properly',
      );
      return this;
    }
    if (this.addedCacheKeys) {
      this.addedCacheKeys = this.addedCacheKeys.filter(
        cacheKey => cacheKey !== key,
      );
    }
    return this.config.deleteTransform(key);
  }
  public keys(): string[] {
    if ((isNonServerEnv && this.config.onlyServer) || !this.addedCacheKeys) {
      return [];
    }
    return this.addedCacheKeys.slice(0);
  }
  public values(): any[] {
    if ((isNonServerEnv && this.config.onlyServer) || !this.addedCacheKeys) {
      return [];
    }
    return this.addedCacheKeys
      .map((key: string): string => this.get(key))
      .map((val: any): any => JSON.parse(val));
  }
  public forEach(fn: Function): any {
    if ((isNonServerEnv && this.config.onlyServer) || !this.addedCacheKeys) {
      return this;
    }

    const isAsyncItem = this.addedCacheKeys.some((key: string) => {
      const item = this.get(key);
      if (item.then) {
        return true;
      }
      return false;
    });

    if (isAsyncItem) {
      return this.addedCacheKeys.forEach(
        (key: string): any => {
          const get = this.get(key);

          if (get.then) {
            return get.then((getValue: any) => fn(key, getValue));
          }
          return fn(get);
        },
      );
    }
    return this.addedCacheKeys.forEach(
      (key: string): any => fn(key, this.get(key)),
    );
  }
  public clear(): any {
    if (isNonServerEnv && this.config.onlyServer) {
      return this;
    }
    if (this.addedCacheKeys) {
      this.addedCacheKeys.forEach(key => this.delete(key));
    }
    return this;
  }
  public destroy(): any {
    if (isNonServerEnv && this.config.onlyServer) {
      return this;
    }
    this.clear();
    if (this.config.destroy) {
      return this.config.destroy();
    }
    return this;
  }
}

export { CustomCache as Cache };
