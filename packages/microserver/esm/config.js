export default (config) => {
  return (res, req) => {
    for (const conf of config) {
      if (req[conf] !== undefined) {
        continue;
      }
      if (conf === 'path' || conf === 'url') {
        req[conf] = req.getUrl();
      } else if (conf === 'method') {
        req[conf] = req.getMethod();
      }
    }
  };
};
