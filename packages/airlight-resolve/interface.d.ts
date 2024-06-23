import type { NapiResolveOptions, ResolverFactory } from 'oxc-resolver';

declare function resolve(...args: string[]): string | undefined;
declare function create(opts: Partial<NapiResolveOptions>): typeof resolve;

export {
  type NapiResolveOptions as ResolveOptions,
  type ResolverFactory,
  create,
  resolve as default
};
