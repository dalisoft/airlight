const fs = require('node:fs/promises');
const { env, globals = {}, rules, settings = {} } = require('../legacy.cjs');

async function build() {
  await fs.writeFile(
    'oxlintrc.json',
    JSON.stringify({ env, globals, rules, settings }, null, 2)
  );
}

build();
