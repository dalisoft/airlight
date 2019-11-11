import Events from "@dalisoft/events";

export class WebSocketInstance extends Events {
  close(code?: number, message?: string);
}
export class Server extends WebSocketInstance {
  constructor(ws: WebSocketInstance, enableQueue?: boolean);
  ping(): this;
  pong(): this;
  close(code?: number, message?: string): this;
  on(name: "message", message: string): this;
  on(name: "close", code?: number, message?: string): this;
  on(name: string, ...args: any[]): this;
}
export class Client extends Server {}
