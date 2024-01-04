import { ResolverFactory } from 'oxc-resolver';

const factory = new ResolverFactory({
  preferAbsolute: true,
  fullySpecified: false,
  mainFields: ['main', 'module', 'browser'],
  extensions: ['.ts', '.js', '.d.ts', '.html', '.md', '.json']
});
export default function customResolve(...args) {
  return factory.sync(args[0], args.length < 2 ? args[0] : args.join('/')).path;
}
