import test from "ava";
import strify from "./json-strify";

test("stringify number", t => {
  const obj = { a: 1 };
  const str = strify(obj);

  t.is(str, '{"a":1}', "Stringify Number not works as excepted");
});

test("stringify string", t => {
  const obj = { b: "string" };
  const str = strify(obj);

  t.is(str, '{"b":"string"}', "Stringify String not works as excepted");
});

test("stringify boolean", t => {
  const obj = { c: false };
  const str = strify(obj);

  t.is(str, '{"c":false}', "Stringify Boolean not works as excepted");
});

test("stringify array", t => {
  const obj = { baz: [1, "two"] };
  const str = strify(obj);

  t.is(str, '{"baz":"[1,"two"]"}', "Stringify Array not works as excepted");
});

test("stringify object", t => {
  const obj = { foo: { bar: "baz" } };
  const str = strify(obj);

  t.is(str, '{"foo":{"bar":"baz"}}', "Stringify Object not works as excepted");
});
