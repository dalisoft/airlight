import { reqBodyPipe, reqPipe, resPipe } from "./utils/index.js";

export default ({ req: request = true, res: response = true } = {}) => {
  return (res, req) => {
    if (typeof request === "boolean" && request === true && req.body) {
      req.pipe = reqBodyPipe;
    } else if (request && req.stream) {
      req.pipe = reqPipe;
    }
    if (typeof response === "boolean" && response === true) {
      res._req = req;
      res.pipe = resPipe;
    }
  };
};
