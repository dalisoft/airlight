export type PoolObject = Map<string, any>;

const pool: PoolObject[] = [];

const create = (): PoolObject => {
  if (pool.length > 0) {
    return pool.shift() as PoolObject;
  }

  return new Map();
};

const release = (obj: PoolObject): void => {
  obj.forEach((val: PoolObject, key: string) => {
    if (val instanceof Map) {
      release(val);
    }
    obj.delete(key);
  });
  pool.push(obj);
};

export { create, release };
