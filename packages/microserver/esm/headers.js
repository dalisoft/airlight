const writeHeaders = function (headers) {
  for (const header in headers) {
    this.writeHeader(header, headers[header]);
  }
};

export default (headers) => {
  return (res, req) => {
    if (!req.headers) {
      req.headers = {};
    }

    if (headers) {
      for (const header of headers) {
        if (req.headers[header] === undefined) {
          req.headers[header] = req.getHeader(header);
        }
      }
    } else {
      req.forEach((key, value) => {
        req.headers[key] = value;
      });
    }

    res.writeHeaders = writeHeaders;
    res.setHeader = res.writeHeader;
  };
};
