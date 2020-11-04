/** global: req */
import compressStream from './compress-stream.js';

export default function resPipe(stream, size, compressed = false) {
  const { _req: req } = this;

  let isAborted = false;

  this.stream = true;

  if (compressed) {
    const compressedStream = compressStream.call(
      this,
      stream,
      typeof req !== 'undefined' &&
        ((req.headers && req.headers['accept-encoding']) ||
          req.getHeader('accept-encoding'))
    );

    if (compressedStream) {
      stream = compressedStream;
    }
  }

  this.onAborted(() => {
    if (stream) {
      stream.destroy();
    }
    if (stream) {
      stream.destroy();
    }
    isAborted = true;
  });

  if (compressed || !size) {
    stream.on('data', (buffer) => {
      if (isAborted) {
        stream.destroy();
        return;
      }
      this.write(
        buffer.buffer.slice(
          buffer.byteOffset,
          buffer.byteOffset + buffer.byteLength
        )
      );
    });
  } else {
    stream.on('data', (buffer) => {
      if (isAborted) {
        stream.destroy();
        return;
      }
      buffer = buffer.buffer.slice(
        buffer.byteOffset,
        buffer.byteOffset + buffer.byteLength
      );
      const lastOffset = this.getWriteOffset();

      // First try
      const [ok, done] = this.tryEnd(buffer, size);

      if (done) {
        stream.destroy();
      } else if (!ok) {
        // pause because backpressure
        stream.pause();

        // Register async handlers for drainage
        this.onWritable((offset) => {
          const [ok, done] = this.tryEnd(
            buffer.slice(offset - lastOffset),
            size
          );
          if (done) {
            stream.end();
          } else if (ok) {
            stream.resume();
          }
          return ok;
        });
      }
    });
  }
  stream
    .on('error', () => {
      this.stream = -1;
      if (!isAborted) {
        this.writeStatus('500 Internal server error');
        this.end();
      } else {
        this.close();
      }
      stream.destroy();
    })
    .on('end', () => {
      this.stream = 1;
      if (!isAborted) {
        this.end();
      }
    });

  return this;
}
