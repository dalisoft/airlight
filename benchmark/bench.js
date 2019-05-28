const strify = require("../json-strify.es");

const obj = {
  a: 1,
  b: "string",
  foo: { bar: "baz", nullValue: null },
  qux: [1, "two", { three: true, undef: undefined }]
};

const bench = (name, fn, iteration = 1e5) => {
  console.time(name);
  for (let i = 0; i < iteration; i++) {
    fn(obj);
  }
  console.timeEnd(name);
};

bench("JSON.stringify", JSON.stringify);
bench("json-strify", strify);
