import { getMime } from './utils/index.js';
import { statSync, createReadStream } from 'fs';

export default function (path, lastModified = true, compressed = false) {
  const stat = statSync(path);
  // eslint-disable-next-line prefer-const
  let { size, mtime } = stat;
  const mimeType = getMime(path);
  return (res, req) => {
    const { headers } = req;

    // handling last modified
    if (lastModified) {
      mtime.setMilliseconds(0);
      const mtimeutc = mtime.toUTCString();

      // Return 304 if last-modified
      const modifiedSince =
        (headers && headers['if-modified-since']) ||
        req.getHeader('if-modified-since');
      if (modifiedSince) {
        if (new Date(modifiedSince) >= mtime) {
          res.writeStatus('304 Not Modified');
          return res.end();
        }
      }
      res.writeHeader('last-modified', mtimeutc);
    }
    res.writeHeader('content-type', mimeType);

    // write data
    let start = 0;
    let end = 0;

    const range = (headers && headers.range) || req.getHeader('range');
    if (range) {
      [start, end] = range
        .substr(6)
        .split('-')
        .map((byte) => (byte ? parseInt(byte, 10) : undefined));

      // Chrome patch for work
      if (end === undefined) {
        end = size - 1;
      }

      if (start !== undefined) {
        res.writeStatus('206 Partial Content');
        res.writeHeader('accept-ranges', 'bytes');
        res.writeHeader('content-range', `bytes ${start}-${end}/${size}`);
        size = end - start + 1;
      }
    }

    // for size = 0
    if (end < 0) {
      end = 0;
    }

    const createStreamInstance = end
      ? createReadStream(path, { start, end })
      : createReadStream(path);

    res.pipe(createStreamInstance, size, compressed);

    return res;
  };
}
