import { parse } from 'querystring';

export default () => {
  return (res, req) => {
    req.query = parse(req.getQuery());
  };
};
