import type {
  NapiResolveOptions,
  ResolverFactory as ResolverFactoryBase
} from 'oxc-resolver';

export type ResolveOptions = NapiResolveOptions;
export type Resolver = ResolverFactory;

export class ResolverFactory extends ResolverFactoryBase {
  static createResolver(opts: NapiResolveOptions): Resolver;

  constructor(props: Partial<NapiResolveOptions>);

  resolveSync(_: unknown, path: string, request: string): string | null;
}

export default Resolver;
