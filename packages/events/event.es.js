import args from '@dalisoft/args';

function Events() {
  Object.defineProperty(this, '___events', {
    enumerable: false,
    writable: true,
    value: {}
  });
  Object.defineProperty(this, '___modifyArgs', {
    enumerable: false,
    writable: true,
    value: null
  });
}
Events.prototype = {
  modifyArgs(callback) {
    this.___modifyArgs = callback;

    return this;
  },
  on(name, callback) {
    const { ___events } = this;

    if (___events[name] === undefined) {
      ___events[name] = [];
    }

    ___events[name].push(callback);

    return this;
  },
  once(name, callback) {
    const { ___events } = this;

    if (___events[name] === undefined) {
      ___events[name] = [];
    }

    const __event = ___events[name];
    __event.push(function onceFn() {
      args(callback, arguments);

      const i = __event.indexOf(onceFn);
      if (i !== -1) {
        __event.splice(i, 1);
      }
    });

    return this;
  },
  off(name, callback) {
    if (name !== undefined) {
      const { ___events } = this;

      if (___events[name] === undefined) {
        return this;
      }

      const __event = ___events[name];
      if (typeof callback === 'function') {
        const i = __event.indexOf(callback);
        if (i !== -1) {
          __event.splice(i, 1);
        }
      } else {
        __event.length = 0;
      }
    }
    return this;
  },
  emit() {
    const { ___events, ___modifyArgs } = this;
    const argsOfFn = [].slice.call(arguments);
    const name = argsOfFn.shift();

    if (___events[name] === undefined) {
      return this;
    }

    const __event = ___events[name];

    if (__event.length === 0) {
      return this;
    } else if (__event.length === 1) {
      args(__event[0], argsOfFn, ___modifyArgs);
      return this;
    } else if (__event.length === 2) {
      args(__event[0], argsOfFn, ___modifyArgs);
      args(__event[1], argsOfFn, ___modifyArgs);
      return this;
    } else if (__event.length === 3) {
      args(__event[0], argsOfFn, ___modifyArgs);
      args(__event[1], argsOfFn, ___modifyArgs);
      args(__event[2], argsOfFn, ___modifyArgs);
      return this;
    }

    for (let i = 0, len = __event.length; i < len; i++) {
      args(__event[i], argsOfFn, ___modifyArgs);
    }

    return this;
  }
};

export default Events;
