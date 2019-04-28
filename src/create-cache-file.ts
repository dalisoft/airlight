declare const process: any;
declare const require: any;

const isFSUnavailabe =
  typeof window !== 'undefined' ||
  typeof require === 'undefined' ||
  typeof process === 'undefined';

class FSCache {
  public addedCacheKeys?: string[];
  private rnd: string | null;
  private dir: string;
  private fs?: any;

  constructor(randomDir?: boolean) {
    this.rnd =
      randomDir === true
        ? Math.floor(Math.random() * 10000000).toString(36)
        : typeof randomDir === 'string'
        ? randomDir
        : null;

    this.dir = randomDir
      ? `/tmp/dalisoft-cache-ttl--${this.rnd}/`
      : '/tmp/dalisoft-cache-ttl/';

    if (isFSUnavailabe) {
      console.error(
        'The FileCache is available only for server-side File System!',
      );
      return this;
    }
    this.fs = require('fs');

    if (!this.fs.existsSync(this.dir)) {
      this.fs.mkdirSync(this.dir);
    }

    this.addedCacheKeys = this.fs.readdirSync(this.dir, 'utf8') || [];

    return this;
  }
  public get = (key: string): any => {
    if (isFSUnavailabe || !this.has(key)) {
      return null;
    }
    const value: any = JSON.parse(this.fs.readFileSync(this.dir + key, 'utf8'));

    return value;
  }
  public set = (key: string, value: any): any => {
    if (isFSUnavailabe) {
      console.error(
        'The FileCache is available only for server-side File System!',
      );
      return this;
    }
    if (this.addedCacheKeys) {
      if (this.addedCacheKeys.includes(key)) {
        return value;
      }
      this.addedCacheKeys.push(key);
    }
    return this.fs.writeFileSync(this.dir + key, JSON.stringify(value));
  }
  public has = (key: string): boolean => {
    if (isFSUnavailabe) {
      return false;
    }
    return this.fs.existsSync(this.dir + key);
  }
  public delete = (key: string): any => {
    if (isFSUnavailabe) {
      return this;
    }
    if (this.addedCacheKeys) {
      this.addedCacheKeys = this.addedCacheKeys.filter(
        cacheKey => cacheKey !== key,
      );
    }
    return this.fs.unlinkSync(this.dir + key);
  }
  public keys = (): string[] => {
    if (isFSUnavailabe || !this.addedCacheKeys) {
      return [];
    }
    return this.addedCacheKeys.slice(0);
  }
  public values = (): any[] => {
    if (isFSUnavailabe || !this.addedCacheKeys) {
      return [];
    }
    return this.addedCacheKeys
      .map((key: string): string => this.get(key))
      .map((val: any): any => JSON.parse(val));
  }
  public forEach = (fn: Function): any => {
    if (isFSUnavailabe || !this.addedCacheKeys) {
      return this;
    }
    return this.addedCacheKeys.forEach(
      (key: string): string => this.get(key) && fn(key, this.get(key)),
    );
  }
  public clear = (): any => {
    if (isFSUnavailabe) {
      return this;
    }
    if (this.addedCacheKeys) {
      this.addedCacheKeys.forEach(key => this.delete(key));
      this.addedCacheKeys.length = 0;
    }
    return this;
  }
  public destroy = (): any => {
    if (isFSUnavailabe) {
      return this;
    }
    this.clear();
    if (this.fs.existsSync(this.dir)) {
      this.fs.rmdirSync(this.dir);
    }
    return this;
  }
}

export { FSCache as Cache };
