class Event {
  on(name: string, callback: (...args: any[]) => any): this;
  once(name: string, callback: (...args: any[]) => any): this;
  off(name: string, callback?: (...args: any[]) => any): this;
  emit(name: string, ...args: any[]): this;
}

export = Event;
