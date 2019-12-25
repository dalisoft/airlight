import pkg from "./package.json";

const external = (pkg.dependencies ? Object.keys(pkg.dependencies) : [])
  .concat(["querystring"]);

export default [
  {
    experimentalCodeSplitting: true,
    input: {
      index: "./esm/index.js",
      middleware: "./esm/middleware.js",
      json: "./esm/json.js",
      headers: "./esm/headers.js",
      params: "./esm/params.js",
      query: "./esm/query.js",
      cookies: "./esm/cookies.js"
    },
    output: {
      format: "cjs",
      dir: "./cjs",
      esModule: false,
      sourcemap: true
    },
    external
  }
];
