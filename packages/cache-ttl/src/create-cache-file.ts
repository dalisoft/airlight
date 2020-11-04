import * as FS from 'fs';
import { Cache, Config } from './create-cache-custom';

const isFSUnavailabe: boolean =
  typeof window !== 'undefined' ||
  typeof require === 'undefined' ||
  typeof process === 'undefined';

type typeValue =
  | string
  | Uint8Array
  | Uint8ClampedArray
  | Uint16Array
  | Uint32Array
  | Int8Array
  | Int16Array
  | Int32Array
  | Float32Array
  | Float64Array
  | DataView;
class FSCache extends Cache {
  constructor(randomDir?: boolean | string | null) {
    const rnd =
      randomDir === true
        ? Math.floor(Math.random() * 10000000).toString(36)
        : typeof randomDir === 'string'
        ? randomDir
        : null;

    if (isFSUnavailabe) {
      console.error(
        'The FileCache is available only for server-side File System!'
      );
      return;
    }

    const tmpDir = FS.realpathSync(require('os').tmpdir());

    const dir = randomDir
      ? tmpDir + `/dalisoft-cache-ttl--${rnd}/`
      : tmpDir + '/dalisoft-cache-ttl/';

    if (!FS.existsSync(dir)) {
      FS.mkdirSync(dir);
    }

    const initialKeys = FS.readdirSync(dir, 'utf8') || [];

    const config: Config = {
      initialKeys,
      jsonEnforce: true,
      getTransform(key: string): Promise<typeValue> {
        return new Promise((resolve, reject) => {
          FS.readFile(dir + key, { encoding: 'utf8' }, (err, result) => {
            if (err) {
              return reject(err);
            }
            resolve(result);
          });
        });
      },
      hasTransform(key: string) {
        return new Promise((resolve: any) => {
          FS.exists(dir + key, resolve);
        });
      },
      setTransform(key: string, value: typeValue) {
        return new Promise((resolve, reject) => {
          FS.writeFile(dir + key, value, 'utf8', (err: any) => {
            if (err) {
              return reject(err);
            }
            resolve(value);
          });
        });
      },
      deleteTransform(key: string) {
        return new Promise((resolve, reject) => {
          FS.unlink(dir + key, (err: any) => {
            if (err) {
              return reject(err);
            }
            resolve(true);
          });
        });
      }
    };

    super(config);

    return this;
  }
}

export { FSCache as Cache };
