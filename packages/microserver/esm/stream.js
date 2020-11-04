/** global: Buffer */
import { Readable } from 'stream';

export default () => {
  return (res, req) => {
    const stream = new Readable({
      read() {}
    });

    req.stream = stream;

    res.onData((chunk, isLast) => {
      stream.push(Buffer.concat([Buffer.from(chunk)]));
      if (isLast) {
        stream.push(null);
      }
    });
  };
};
