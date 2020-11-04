type Collection = (
  collectRequest:
    | string
    | (<T>(collects: any[], react: (response: any) => T) => T)
    | Promise<T>
) => any;

declare function collector(
  fn: (collects: any[], delay?: number = 50 / 3) => PromiseLike<Collection>
): Collection;

export = collector;
