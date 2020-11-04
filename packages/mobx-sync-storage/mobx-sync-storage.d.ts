import { IReactionDisposer, IReactionPublic } from 'mobx';

interface SessionItem {
  [key: string]: string | number;
}

class SyncStorage<T> {
  protected name: string;
  private store: T;
  private autorun?: IReactionDisposer;
  private storage!: Storage;
  private date!: Date;
  protected initialized: boolean;
  public constructor(name: string, store: T, storage: string) {}
  public onDetach(): void {}
  protected attachAutoRun(): void {}
  protected onRun(argument: StorageEvent | IReactionPublic): void {}
}

class Store {
  public constructor(name: string, type?: string) {}
}

export = Store;
