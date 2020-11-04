export default (json, fastJson = JSON.stringify) => {
  if (typeof json === 'function') {
    return (res, req) => res.end(fastJson(json(req)));
  }
  const jsonEnd = fastJson(json);
  return (res) => res.end(jsonEnd);
};
