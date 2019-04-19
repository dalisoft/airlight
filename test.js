import test from "ava";
const { CacheTTL } = require("./dist/cjs/cache-ttl");
const fs = require("fs");

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

test("Cache TTL - In-memory/Temporarily mode", async t => {
  t.timeout(10000);

  const cache = new CacheTTL(5000);

  cache.set("key-a", () => "value-1");
  cache.set("key-b", "value-b", 2000);
  cache.set("key-c", "value-live-long", -1);
  await cache.set("async-key-1", async () => {
    await timeout(250);
    return "async-value-1";
  });
  await cache.set("async-promise-key-1", async () => {
    await timeout(250);
    return new Promise(resolve => resolve("async-promise-value-1"));
  });
  await cache.set("promise-async-key-1", () => {
    return new Promise(async resolve => {
      await timeout(250);
      resolve("promise-async-value-1");
    });
  });
  await cache.set("promise-promise-key-1", () => {
    return new Promise(async resolve => {
      return timeout(250)
        .then(() => "promise-promise-value-1")
        .then(resolve);
    });
  });

  t.is(
    cache.get("key-a"),
    "value-1",
    "Function value passed .set method not works properly"
  );
  t.is(
    cache.get("key-b"),
    "value-b",
    "Primitive value passed .set method not works properly"
  );
  t.is(
    cache.get("key-c"),
    "value-live-long",
    "Value without expiration not works properly"
  );
  t.is(
    cache.get("async-key-1"),
    "async-value-1",
    "Async value not works properly"
  );
  t.is(
    cache.get("async-promise-key-1"),
    "async-promise-value-1",
    "Async -> Promise value not works properly"
  );
  t.is(
    cache.get("promise-async-key-1"),
    "promise-async-value-1",
    "Promise -> Async value not works properly"
  );
  t.is(
    cache.get("promise-promise-key-1"),
    "promise-promise-value-1",
    "Promise -> Promise value not works properly"
  );
  t.log("Cache saved successfully and storing correctly");

  await timeout(1000);

  t.is(
    cache.has("key-a"),
    true,
    "Function value passed .set method not works properly after 2s"
  );

  t.is(
    cache.has("key-b"),
    false,
    "Primitive value passed .set method not works properly after 2s"
  );
  t.is(
    cache.has("key-c"),
    true,
    "Value without expiration not works properly after 2s"
  );
  t.log("Cache saving after 2s works properly");

  await timeout(2000);

  t.is(
    cache.has("key-a"),
    true,
    "Function value passed .set method not works properly after 4s"
  );
  t.is(
    cache.has("key-b"),
    false,
    "Primitive value passed .set method not works properly after 4s"
  );
  t.is(
    cache.has("key-c"),
    true,
    "Value without expiration not works properly after 4s"
  );
  t.log("Cache saving after 4s works properly");

  await timeout(1000);

  t.is(
    cache.has("key-a"),
    false,
    "Function value passed .set method not works properly after 5s"
  );
  t.is(
    cache.has("key-b"),
    false,
    "Primitive value passed .set method not works properly after 5s"
  );
  t.is(
    cache.has("key-c"),
    true,
    "Value without expiration not works properly after 5s"
  );
  t.log("Cache saving after 5s works properly");

  await timeout(1000);

  t.is(
    cache.has("key-a"),
    false,
    "Function value passed .set method not works properly after 6s"
  );
  t.is(
    cache.has("key-b"),
    false,
    "Primitive value passed .set method not works properly after 6s"
  );
  t.is(
    cache.has("key-c"),
    true,
    "Value without expiration not works properly after 6s"
  );
  t.log("Cache saving after 6s works properly");

  cache.delete("key-c");

  t.is(cache.has("key-c"), false, "Deleting cache item not works properly");

  t.log("Cache deleting works properly");

  cache.destroy();

  t.pass("Cache destroy was done without errors");
});

test("Cache TTL - Persistent File-caching mode", async t => {
  t.timeout(10000);

  const cache = new CacheTTL(5000, true);

  cache.set("key-a", () => "value-1");
  cache.set("key-b", "value-b", 2000);
  cache.set("key-c", "value-live-long", -1);
  await cache.set("async-key-1", async () => {
    await timeout(250);
    return "async-value-1";
  });
  await cache.set("async-promise-key-1", async () => {
    await timeout(250);
    return new Promise(resolve => resolve("async-promise-value-1"));
  });
  await cache.set("promise-async-key-1", () => {
    return new Promise(async resolve => {
      await timeout(250);
      resolve("promise-async-value-1");
    });
  });
  await cache.set("promise-promise-key-1", () => {
    return new Promise(async resolve => {
      return timeout(250)
        .then(() => "promise-promise-value-1")
        .then(resolve);
    });
  });

  t.is(
    cache.get("key-a"),
    "value-1",
    "Function value passed .set method not works properly"
  );
  t.is(
    cache.get("key-b"),
    "value-b",
    "Primitive value passed .set method not works properly"
  );
  t.is(
    cache.get("key-c"),
    "value-live-long",
    "Value without expiration not works properly"
  );
  t.is(
    cache.get("async-key-1"),
    "async-value-1",
    "Async value not works properly"
  );
  t.is(
    cache.get("async-promise-key-1"),
    "async-promise-value-1",
    "Async -> Promise value not works properly"
  );
  t.is(
    cache.get("promise-async-key-1"),
    "promise-async-value-1",
    "Promise -> Async value not works properly"
  );
  t.is(
    cache.get("promise-promise-key-1"),
    "promise-promise-value-1",
    "Promise -> Promise value not works properly"
  );
  t.log("Cache saved successfully and storing correctly");

  await timeout(1000);

  t.is(
    cache.has("key-a"),
    true,
    "Function value passed .set method not works properly after 2s"
  );
  t.is(
    cache.has("key-b"),
    false,
    "Primitive value passed .set method not works properly after 2s"
  );
  t.is(
    cache.has("key-c"),
    true,
    "Value without expiration not works properly after 2s"
  );
  t.log("Cache saving after 2s works properly");

  await timeout(2000);

  t.is(
    cache.has("key-a"),
    true,
    "Function value passed .set method not works properly after 4s"
  );
  t.is(
    cache.has("key-b"),
    false,
    "Primitive value passed .set method not works properly after 4s"
  );
  t.is(
    cache.has("key-c"),
    true,
    "Value without expiration not works properly after 4s"
  );
  t.log("Cache saving after 4s works properly");

  await timeout(1000);

  t.is(
    cache.has("key-a"),
    false,
    "Function value passed .set method not works properly after 5s"
  );
  t.is(
    cache.has("key-b"),
    false,
    "Primitive value passed .set method not works properly after 5s"
  );
  t.is(
    cache.has("key-c"),
    true,
    "Value without expiration not works properly after 5s"
  );
  t.log("Cache saving after 5s works properly");

  await timeout(1000);

  t.is(
    cache.has("key-a"),
    false,
    "Function value passed .set method not works properly after 6s"
  );
  t.is(
    cache.has("key-b"),
    false,
    "Primitive value passed .set method not works properly after 6s"
  );
  t.is(
    cache.has("key-c"),
    true,
    "Value without expiration not works properly after 6s"
  );
  t.log("Cache saving after 6s works properly");

  cache.delete("key-c");

  t.is(cache.has("key-c"), false, "Deleting cache item not works properly");
  t.log("Cache deleting works properly");

  cache.destroy();

  t.pass("Cache destroy was done without errors");
});
