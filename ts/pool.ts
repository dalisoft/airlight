interface PoolObject {
  [key: string]: any;
}

const pool: PoolObject[] = [];

// We use pool to reuse existing object
// for performance and avoid high memory usage
const create = (): PoolObject => {
  if (pool.length > 0) {
    return pool.shift() as PoolObject;
  }

  return {};
};
const release = (obj: PoolObject): void => {
  Object.keys(obj).forEach((key: keyof PoolObject) => {
    const val: PoolObject = obj[key];
    if (typeof val === "object" && !Array.isArray(val) && !!val) {
      release(val);
    }
    delete obj[key];
  });
  pool.push(obj);
};

export { create, release };
