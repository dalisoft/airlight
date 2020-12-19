#!/usr/bin/env bash

yarn run eslint --color .
# yarn run stylelint --color .
yarn run markdownlint-cli2 {*.md,**/*.md} "#node_modules"
yarn run htmlhint .
yarn run spectral lint --ignore-unknown-format .
# yarn run dockerfilelint Dockerfile
yarn run prettier -c .
