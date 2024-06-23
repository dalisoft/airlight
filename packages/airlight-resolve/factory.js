import { ResolverFactory as ResolverFactoryBase } from 'oxc-resolver';

/** @type {Partial<import('./interface.js').ResolveOptions>} */
const defaultOptions = {
  preferAbsolute: true,
  fullySpecified: false,
  mainFields: ['main', 'module', 'browser'],
  extensions: ['.ts', '.js', '.d.ts', '.html', '.md', '.json']
};

export default class ResolverFactory extends ResolverFactoryBase {
  static createResolver(
    /** @type {import('oxc-resolver').NapiResolveOptions} */ opts = {}
  ) {
    return new ResolverFactory(opts);
  }

  constructor(
    /** @type {import('oxc-resolver').NapiResolveOptions} */ props = {}
  ) {
    super({
      roots: [process.cwd()],
      ...defaultOptions,
      ...props
    });

    return this;
  }

  resolveSync(
    /** @type {unknown} */ _,
    /** @type {string} */ path,
    /** @type {string} */ request
  ) {
    return this.sync(path, request).path ?? null;
  }
}
