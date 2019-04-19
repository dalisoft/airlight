export interface PoolObjectRAW {
  expiresIn: number;
  value: any;
  forEach: Function;
  delete: Function;
  [key: string]: any;
}
export type PoolObject = Map<string, any> | PoolObjectRAW;

const pool: PoolObject[] = [];

// We use pool to reuse existing object
// for performance and avoid high memory usage
const create = (): PoolObject => {
  if (pool.length > 0) {
    return pool.shift() as PoolObject;
  }

  return new Map();
};

const releaseRAWObject = (obj: PoolObjectRAW): void => {
  Object.keys(obj).forEach((key: any) => {
    const val: any = obj[key];

    if (typeof val === 'object' && !Array.isArray(val) && !!val) {
      release(val);
    }

    delete obj[key];
  });
};

const release = (obj: PoolObject): void => {
  if (obj.forEach) {
    obj.forEach((val: any, key: string) => {
      if (typeof val === 'object' && !Array.isArray(val) && !!val) {
        release(val);
      }
      obj.delete(key);
    });
  } else if (typeof obj === 'object') {
    releaseRAWObject(obj as PoolObjectRAW);
  }
  pool.push(obj);
};

export { create, release };
