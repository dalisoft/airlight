import { ResolverFactory } from 'oxc-resolver';

const cwd = process.cwd();
const factory = new ResolverFactory({
  preferAbsolute: true,
  fullySpecified: false,
  mainFields: ['main', 'module', 'browser'],
  extensions: ['.ts', '.js', '.d.ts', '.html', '.md', '.json']
});
const cache = {};

export default function customResolve(...args) {
  const key = args.length < 2 ? args[0] : args.join('/');

  if (!cache[key]) {
    cache[key] = factory.sync(cwd, key).path;
  }

  return cache[key];
}
