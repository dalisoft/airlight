declare const process: any;
declare const require: any;

export interface Config {
  onlyServer?: boolean;
  initialKeys: Function | string[];
  jsonEnforce?: boolean;
  getTransform: Function;
  hasTransform: Function;
  setTransform: Function;
  deleteTransform: Function;
  destroy?: Function;
}

type typeValueRef = string | number | object | Symbol | Function;
type typeValueRefOrRefArr = typeValueRef | typeValueRef[];
type typeValue =
  | typeValueRefOrRefArr
  | Map<string, typeValueRefOrRefArr>
  | Promise<typeValueRefOrRefArr>;

const isNonServerEnv =
  typeof window !== 'undefined' ||
  typeof require === 'undefined' ||
  typeof process === 'undefined';

class CustomCache {
  public addedCacheKeys?: string[];
  private config!: Config;

  constructor(config: Config) {
    if (isNonServerEnv && config.onlyServer) {
      console.error(
        'The CustomCache is available only for server-side Node.js!'
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
  public async get(key: string): Promise<any> {
    if ((isNonServerEnv && this.config.onlyServer) || !(await this.has(key))) {
      return null;
    }

    if (!this.config.getTransform) {
      console.error(
        'The CustomCache is requires `getTransform` property' +
          ' on configuration parameter to be working properly'
      );
      return;
    }

    let transformValue: Promise<any> | any = this.config.getTransform(key);

    if (typeof transformValue === 'function') {
      transformValue = await transformValue(key);
    } else if (transformValue.then) {
      transformValue = await transformValue;
    }

    const value: any =
      this.config.jsonEnforce && typeof transformValue === 'string'
        ? JSON.parse(transformValue)
        : transformValue;

    return value;
  }
  public set<T>(key: string, value: T): Promise<any> | any {
    if (isNonServerEnv && this.config.onlyServer) {
      console.error(
        'The CustomCache is available only for server-side Node.js!'
      );
      return;
    }
    if (!this.config.setTransform) {
      console.error(
        'The CustomCache is requires `setTransform` property' +
          ' on configuration parameter to be working properly'
      );
      return;
    }
    if (this.addedCacheKeys) {
      if (this.addedCacheKeys.indexOf(key) === -1) {
        this.addedCacheKeys.push(key);
      }
    }
    return this.config.setTransform(
      key,
      this.config.jsonEnforce ? (JSON.stringify(value) as string) : (value as T)
    );
  }
  public has(key: string): Promise<boolean> | boolean {
    if (isNonServerEnv && this.config.onlyServer) {
      return false;
    }
    if (!this.config.hasTransform) {
      console.error(
        'The CustomCache is requires `hasTransform` property' +
          ' on configuration parameter to be working properly'
      );
      return false;
    }
    return this.config.hasTransform(key);
  }
  public delete(key: string): Promise<void> | void {
    if (isNonServerEnv && this.config.onlyServer) {
      return;
    }
    if (!this.config.deleteTransform) {
      console.error(
        'The CustomCache is requires `deleteTransform` property' +
          ' on configuration parameter to be working properly'
      );
      return;
    }
    if (this.addedCacheKeys) {
      this.addedCacheKeys = this.addedCacheKeys.filter(
        (cacheKey: string): boolean => cacheKey !== key
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
  public values(): typeValue[] {
    if ((isNonServerEnv && this.config.onlyServer) || !this.addedCacheKeys) {
      return [];
    }
    return this.addedCacheKeys.map(
      (key: string): typeValue => this.get(key) as typeValue
    );
  }
  public forEach(fn: Function): void {
    if ((isNonServerEnv && this.config.onlyServer) || !this.addedCacheKeys) {
      return;
    }

    const isAsyncItem: boolean = this.addedCacheKeys.some(
      (key: string): boolean => {
        const item = this.get(key) as Promise<typeValue>;
        // @ts-ignore
        if (item.then) {
          return true;
        }
        return false;
      }
    );

    if (isAsyncItem) {
      return this.addedCacheKeys.forEach((key: string): Promise<
        void
      > | void => {
        const get = this.get(key);

        // @ts-ignore-line
        if ((get as Promise<typeValue>).then) {
          return (get as Promise<typeValue>).then((getValue: any): void =>
            fn(key, getValue)
          );
        }
        fn(get);
      });
    }
    return this.addedCacheKeys.forEach((key: string): void =>
      fn(key, this.get(key))
    );
  }
  public clear(): void {
    if (isNonServerEnv && this.config.onlyServer) {
      return;
    }
    if (this.addedCacheKeys) {
      this.addedCacheKeys.forEach((key: string): Promise<void> | void =>
        this.delete(key)
      );
    }
    return;
  }
  public destroy(): Promise<any> | void {
    if (isNonServerEnv && this.config.onlyServer) {
      return;
    }
    this.clear();
    if (this.config.destroy) {
      return this.config.destroy();
    }
    return;
  }
}

export { CustomCache as Cache };
