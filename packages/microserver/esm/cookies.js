import cookie from 'cookie';

export default () => {
  return (res, req) => {
    const _cookie =
      (req.headers && req.headers.cookie) || req.getHeader('cookie');

    req.cookies = cookie.parse(_cookie);
  };
};
