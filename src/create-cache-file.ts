import * as FS from 'fs';
type FsType = typeof FS;

const isFSUnavailabe: boolean =
  typeof window !== 'undefined' ||
  typeof require === 'undefined' ||
  typeof process === 'undefined';

type typeValue = string | number | object | string[] | number[] | object[];
class FSCache {
  public addedCacheKeys?: string[];
  private rnd: string | boolean | null;
  private dir: string;
  private fs!: FsType;

  constructor(randomDir?: boolean | string | null) {
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
  public get(key: string): string | null {
    if (isFSUnavailabe || !this.has(key)) {
      return null;
    }
    const value: any = JSON.parse(this.fs.readFileSync(this.dir + key, 'utf8'));

    return value;
  }
  public set(key: string, value: typeValue): void {
    if (isFSUnavailabe) {
      console.error(
        'The FileCache is available only for server-side File System!',
      );
      return;
    }
    if (this.addedCacheKeys) {
      if (this.addedCacheKeys.indexOf(key) !== -1) {
        return;
      }
      this.addedCacheKeys.push(key);
    }
    this.fs.writeFileSync(this.dir + key, JSON.stringify(value));
  }
  public has(key: string): boolean {
    if (isFSUnavailabe) {
      return false;
    }
    return this.fs.existsSync(this.dir + key);
  }
  public delete(key: string): void {
    if (isFSUnavailabe) {
      return;
    }
    if (this.addedCacheKeys) {
      this.addedCacheKeys = this.addedCacheKeys.filter(
        cacheKey => cacheKey !== key,
      );
    }
    this.fs.unlinkSync(this.dir + key);
  }
  public keys(): string[] {
    if (isFSUnavailabe || !this.addedCacheKeys) {
      return [];
    }
    return this.addedCacheKeys.slice(0);
  }
  public values(): typeValue[] {
    if (isFSUnavailabe || !this.addedCacheKeys) {
      return [];
    }
    return this.addedCacheKeys
      .map((key: string): string => this.get(key) as string)
      .map((val: string): typeValue => JSON.parse(val));
  }
  public forEach(fn: Function): void {
    if (isFSUnavailabe || !this.addedCacheKeys) {
      return;
    }
    return this.addedCacheKeys.forEach(
      (key: string): string => this.get(key) && fn(key, this.get(key)),
    );
  }
  public clear(): this {
    if (isFSUnavailabe) {
      return this;
    }
    if (this.addedCacheKeys) {
      this.addedCacheKeys.forEach((key: string): void => this.delete(key));
      this.addedCacheKeys.length = 0;
    }
    return this;
  }
  public destroy(): this {
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
