import del from "rollup-plugin-delete";

export default [
  {
    input: "./src/jwe.js",
    output: {
      format: "es",
      file: "./dist/es/jwe.js",
      esModule: true
    },
    plugins: [
      del({
        targets: "dist/*"
      })
    ],
    external: ["node-webtokens", "crypto"]
  },
  {
    input: "./src/jwe.js",
    output: [
      {
        format: "cjs",
        file: "./dist/cjs/jwe.js",
        esModule: false,
        exports: "named"
      }
    ],
    external: ["node-webtokens", "crypto"]
  }
];
