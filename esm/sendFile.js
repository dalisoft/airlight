import { getMime } from "./utils/index.js";
import { statSync, createReadStream } from "fs";

export default function(path, lastModified = true, compressed = false) {
  const { _req: req } = this;
  const { headers } = req;

  const stat = statSync(path);
  let { size } = stat;

  // handling last modified
  if (lastModified) {
    const { mtime } = stat;

    mtime.setMilliseconds(0);
    const mtimeutc = mtime.toUTCString();

    // Return 304 if last-modified
    if (headers && headers["if-modified-since"]) {
      if (new Date(headers["if-modified-since"]) >= mtime) {
        this.writeStatus("304 Not Modified");
        return this.end();
      }
    }
    this.writeHeader("last-modified", mtimeutc);
  }
  this.writeHeader("content-type", getMime(path));

  // write data
  let start = 0;
  let end = 0;

  if (headers && headers.range) {
    [start, end] = headers.range
      .substr(6)
      .split("-")
      .map((byte) => (byte ? parseInt(byte, 10) : undefined));

    // Chrome patch for work
    if (end === undefined) {
      end = size - 1;
    }

    if (start !== undefined) {
      this.writeStatus("206 Partial Content");
      this.writeHeader("accept-ranges", "bytes");
      this.writeHeader("content-range", `bytes ${start}-${end}/${size}`);
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

  const pipe = this.pipe(createStreamInstance, size, compressed);

  return pipe;
}
