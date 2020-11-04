const test = require('ava');
const batchCollect = require('.');

const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

test('Basic test', async (t) => {
  t.plan(5);
  t.timeout(5000);

  let queryIndex = 0;
  const batchQuery = batchCollect(async (collects) => {
    await timeout(500);

    queryIndex++;
    t.pass('The collection collect is passed');

    return collects.map((collect) => ({
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
    (response) =>
      t.deepEqual(response, { responseOf: `getMessages { id, text }` })
  );

  await timeout(1000);

  t.is(queryIndex, 3, 'Query called properly');
});

test('Duplicate handling', async (t) => {
  t.timeout(1500);

  let queryIndex = 0;
  const batchQuery = batchCollect(async (collects) => {
    await timeout(500);

    t.is(collects.length, 1, 'Collect deduplication not works properly');

    return collects.map((collect) => ({
      responseOf: collect
    }));
  });

  let graphqlQuery = `getUserAtDifferentPlace { id, name }`;

  const resolver = ({ responseOf }) => {
    if (graphqlQuery === responseOf) {
      queryIndex++;
    }
  };

  batchQuery(() => graphqlQuery, resolver);
  batchQuery(graphqlQuery, resolver);

  await timeout(0);

  batchQuery(() => graphqlQuery, resolver);

  await timeout(50);

  batchQuery(() => graphqlQuery, resolver);

  await timeout(500);

  batchQuery(() => graphqlQuery, resolver);

  await timeout(500);

  t.is(queryIndex, 5, 'Duplication handling not works as expected');
});

test('N+1 solving', async (t) => {
  t.timeout(1500);

  let handleIds = (ids) => ids.map((id) => ({ result: id }));

  const batchN1 = batchCollect(async (ids) => {
    await timeout(10);

    return handleIds(ids);
  });

  const handleResult = (id) => ({ result }) =>
    t.is(result, id, 'Id returned incorrectly');

  batchN1(() => 1, handleResult(1));
  batchN1(2, handleResult(2));

  await timeout(0);

  batchN1(() => 3, handleResult(3));

  await timeout(20);

  batchN1(() => 4, handleResult(4));

  await timeout(50);

  batchN1(5, handleResult(5));

  await timeout(100);
});
