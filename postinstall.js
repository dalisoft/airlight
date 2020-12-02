/* eslint-disable @typescript-eslint/no-var-requires, node/no-unpublished-require */

/**
 * This script required to work these configurations, as in configuration `husky` will be installed same as other modules, shared config does not
 * load, but this script triggers post-install of `husky`
 */
const husky = require('./node_modules/husky/lib/installer/index');

husky.install({
  absoluteGitCommonDir: `${process.cwd()}/.git`,
  userPkgDir: process.cwd()
});
