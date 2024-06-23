import { ResolverFactory } from 'oxc-resolver';

/** @type {Partial<import('./interface.js').ResolveOptions>} */
const defaultOptions = {
  preferAbsolute: true,
  fullySpecified: false,
  mainFields: ['main', 'module', 'browser'],
  extensions: ['.ts', '.js', '.d.ts', '.html', '.md', '.json']
};

export const create = (
  /** @type {Partial<import('./interface.js').ResolveOptions>} */ opts = {}
) => {
  const options = Object.assign(
    {
      syncRoot: process.cwd(),
      cache: false
    },
    defaultOptions,
    opts
  );
  const factory = new ResolverFactory(options);
  /** @type {Map<string, string | undefined>} */
  const cache = new Map();

  // eslint-disable-next-line complexity
  return (/** @type {string[]} */ ...args) => {
    const key = args.length < 2 ? args[0] : args.join('/');

    if (options.cache === false || !cache.has(key)) {
      cache.set(key, factory.sync(options.syncRoot || args[0], key).path);
    }

    return cache.get(key);
  };
};

export default create();
