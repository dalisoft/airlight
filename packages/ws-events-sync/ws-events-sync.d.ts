import Events from '@dalisoft/events';

export class Server extends Events {
  constructor(ws: Events, enableQueue?: boolean);
  ping(): this;
  pong(): this;
  close(code?: number, message?: string): this;
  on(name: 'message', message: string): this;
  on(name: 'close', code?: number, message?: string): this;
  on(name: string, ...args: any[]): this;
  close(code?: number, message?: string);
}
export class Client extends Server {
  constructor(ws, enableQueue?: boolean);
}
