import test from "ava";
import batchCollect from ".";

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

test("Basic test", async t => {
  t.plan(5);
  t.timeout(5000);

  let queryIndex = 0;
  const batchQuery = batchCollect(async collects => {
    await timeout(500);

    queryIndex++;
    t.pass("The collection collect is passed");

    return collects.map(collect => ({
      responseOf: collect
    }));
  });

  batchQuery(() => `getUser { id, name }`);

  await batchQuery(async () => {
    await timeout(100);
    return `getAsync { result }`;
  });

  batchQuery(`getProfile {id, avatar}`);

  await timeout(500);

  batchQuery(
    () => `getMessages { id, text }`,
    response => t.deepEqual(response, {responseOf: `getMessages { id, text }`})
  );

  await timeout(1000);

  t.is(queryIndex, 3, "Query called properly");
});
