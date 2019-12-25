export default (headers) => {
  return Array.isArray(headers)
    ? (res, req) => {
      if (!req.headers) {
        req.headers = {};
      }

      for (const header of headers) {
        if (req.headers[header] === undefined) {
          req.headers[header] = req.getHeader(header);
        }
      }
    }
    : (res) => {
      for (const header in headers) {
        res.writeHeader(header, headers[header]);
      }
    };
};
