import { parse } from "cookie";

export default () => {
  return (res, req) => {
    const cookie = req.headers && req.headers.cookie || req.getHeader("cookie");

    req.cookies = parse(cookie);
  };
};
