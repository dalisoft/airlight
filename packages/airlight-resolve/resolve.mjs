import { ResolverFactory } from 'oxc-resolver';

const factory = new ResolverFactory({});
export default function customResolve(...args) {
  return factory.sync(args[0], args.length < 2 ? args[0] : args.join('/')).path;
}
