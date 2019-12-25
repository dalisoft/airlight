export default (json, fastJson = JSON.stringify) => {
  if (typeof json === "function") {
    return (res, req) => {
      return res.end(fastJson(json(req)));
    };
  } else {
    const jsonEnd = fastJson(json);
    return (res) => {
      return res.end(jsonEnd);
    };
  }
};
