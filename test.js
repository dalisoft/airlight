import test from "ava";
import args from ".";

test("Basic test", t => {
  const fn1 = arg1 => arg1 && t.pass("Argument was passed", arg1);
  const fn2 = (arg1, arg2) =>
    t.not(arg1, arg2, "Function with 2 arguments was failed");
  const fn3 = (arg1, arg2, arg3) => {
    t.not(arg1, arg2, "Function with 3 arguments was failed");
    t.is(arg1, arg3, "Function with 3 arguments was failed");
  };

  args(fn1, ["argument first"]);
  args(fn2, ["First argument", "second argument"]);
  args(fn3, ["Argument", "second argument", "Argument"]);
});

test("Type and Value parsing test", t => {
  const num = (n, excepted) => {
    t.is(n, excepted, "Number parsing does not work as excepted");
    t.is(typeof n, "number", "Number type parsing does not work as excepted");
  };
  const arr = (someArr, excepted) => {
    t.deepEqual(someArr, excepted, "Array parsing does not work as excepted");
    t.true(
      Array.isArray(someArr),
      "Array type parsing does not work as excepted"
    );
  };
  const obj = (someObj, excepted) => {
    t.deepEqual(someObj, excepted, "Object parsing does not work as excepted");
    t.is(
      typeof someObj,
      "object",
      "Object type parsing does not work as excepted"
    );
  };
  const str = (s, excepted) => {
    t.is(s, excepted, "String parsing does not work as excepted");
    t.is(typeof s, "string", "String type parsing does not work as excepted");
  };

  args(num, ["500", 500]);
  args(arr, ["[1,2,3]", [1, 2, 3]]);
  args(obj, ['{"foo":"bar"}', { foo: "bar" }]);
  args(str, ["1 is not 2", "1 is not 2"]);
});
