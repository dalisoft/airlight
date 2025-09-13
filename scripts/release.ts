import { $ } from 'bun';
import { readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';


// run serially
for (const dir of await readdir('packages')) {
  console.log(`\n▶ Releasing ${dir}`);
  await $`
    bash ${join(process.cwd(), '.release-me/release.sh')}
      -w --use-version --plugins=npm,npm-post,git,github-release --preset=workspace
  `.cwd(resolve(process.cwd(), 'packages', dir));
}
