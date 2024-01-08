// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable indent */
// import path from 'node:path';
import { Git, CurlRequest } from './class.mjs';

const COMMIT_TYPES = [
  {
    matches: ['chore', 'ci', 'skip ci'],
    title: {
      chore: 'Chore',
      ci: 'CI',
      'skip ci': '[Skip CI]'
    },
    handler: (version) => {
      return version;
    }
  },
  {
    matches: ['docs', 'perf', 'fix'],
    title: {
      docs: 'Documentations',
      perf: 'Performance Optimizations',
      fix: 'Bug Fixes'
    },
    handler: ([major, minor], [, , patch]) => {
      return [major, minor, patch + 1];
    }
  },
  {
    matches: ['refactor', 'feat'],
    title: {
      refactor: 'Refactor',
      feat: 'Features'
    },
    handler: ([major, minor]) => {
      return [major, minor + 1, 0];
    }
  },
  {
    matches: ['BREAKING CHANGE', 'BREAKING CHANGES'],
    title: {
      'BREAKING CHANGE': 'BREAKING CHANGES',
      'BREAKING CHANGES': 'BREAKING CHANGES'
    },
    handler: ([major]) => {
      return [major + 1, 0, 0];
    }
  }
];

// const execDir = path.dirname(import.meta.url);
const pkgDir = process.cwd();
const git = new Git();

const { default: packageJSON } = await import(`${pkgDir}/package.json`, {
  assert: { type: 'json' }
});
const { name: packageName } = packageJSON;
const packageVersion =
  (await git
    .getLastTag(packageName)
    .then((version) => version?.slice(packageName.length + 2))) ??
  packageJSON.version;
const projectLastTag = await git.getLastAnyTag();
const [, gitRepoUrl] = /git\+(.*).git/gm.exec(packageJSON.repository.url);
const apiRepoUrl = gitRepoUrl.replace('github.com', 'api.github.com/repos');
const currentDate = new Date().toISOString().split('T')[0];
let version = packageVersion?.split('.').map(parseFloat);
const initialVersion = version?.slice(0);

const gitCommitsSinceLastTag = await git.getCommitsSinceLastTag(
  projectLastTag,
  packageName
);
const isInitialTagExists = await git.isTagExists(packageName, packageVersion);

const sortedCommits = {};
for (const commitType of COMMIT_TYPES) {
  for (const match of commitType.matches) {
    const matchTitle = commitType.title[match];
    if (!sortedCommits[matchTitle]) {
      sortedCommits[matchTitle] = [];
    }

    for (const commit of gitCommitsSinceLastTag) {
      // eslint-disable-next-line max-depth
      if (commit.includes(`${match}(${packageName})`)) {
        // eslint-disable-next-line max-depth
        if (isInitialTagExists) {
          version = commitType.handler(version, initialVersion);
        }

        const commitMessage = commit.slice(0, -43);
        const commitHash = commit.slice(-42).slice(0, -1).slice(1);

        const formattedCommitMessage = commitMessage.slice(
          commitMessage.indexOf('):') + 3
        );

        sortedCommits[matchTitle].push([
          `**${packageName}**: ${formattedCommitMessage}`,
          commitHash
        ]);
      }
    }
  }
}

// Back to format again
version = version.join('.');

const releaseTitle = `${packageName}-v${version}`;
const oldReleaseTitle = `${packageName}-v${packageVersion}`;
let changeLogs = `# [${releaseTitle}](${gitRepoUrl}/compare/${oldReleaseTitle}...${releaseTitle}) (${currentDate})`;

for (const [key, changes] of Object.entries(sortedCommits)) {
  if (changes.length > 0) {
    changeLogs += `


### ${key}

${changes
  .map(
    ([commitChange, commitHash]) =>
      `- ${commitChange} ([\`${commitHash.slice(
        0,
        7
      )}\`](${gitRepoUrl}/commit/${commitHash}))`
  )
  .join('\n')}`;
  }
}
changeLogs += '\n';

const isNewTagExists = await git.isTagExists(packageName, version);
const lastCommitHash = gitCommitsSinceLastTag[gitCommitsSinceLastTag.length - 1]
  .slice(-42)
  .slice(0, -1)
  .slice(1);

if (isInitialTagExists && !isNewTagExists) {
  await git.createTag(releaseTitle, lastCommitHash);
  await git.pushTag(releaseTitle);
} else if (!isInitialTagExists && !isNewTagExists) {
  await git.createTag(oldReleaseTitle, lastCommitHash);
  await git.pushTag(oldReleaseTitle);
}

console.log({
  packageName,
  isInitialTagExists,
  packageVersion,
  version,
  isNewTagExists,
  lastCommitHash,
  lastTag: await git.getLastTag(packageName)
});
/*
await new CurlRequest()
  .post(
    `${apiRepoUrl}/releases`,
    {
      Accept: 'application/vnd.github+json',
      Authorization: 'Bearer $GH_TOKEN',
      'X-GitHub-Api-Version': '2022-11-28'
    },
    {
      tag_name: releaseTitle,
      target_commitish: lastCommitHash,
      name: releaseTitle,
      body: changeLogs,
      draft: false,
      prerelease: false,
      generate_release_notes: false
    }
  )
  .catch(() => {});*/
