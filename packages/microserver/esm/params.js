export default (paramValues) => {
  return (res, req) => {
    if (!req.params) {
      req.params = {};
    }

    for (let i = 0, len = paramValues.length; i < len; i++) {
      req.params[paramValues[i]] = req.getParameter(i);
    }
  };
};
