#!/bin/bash
set -e

EXEC_DIR=$(dirname $0)

function getKey() {
  node $EXEC_DIR/get-json.cjs $1
}
PKG_NAME=$(echo "./package.json" | getKey "name")
PKG_GIT_COMMITS=$(git log -n1 --grep "$PKG_NAME" --pretty=format:%s)
PKG_LAST_TAG_COMMIT=$(git describe --tags --abbrev=0)
CURRENT_DATE=$(date +F%)

git log $PKG_LAST_TAG_COMMIT..HEAD --grep $PKG_NAME --pretty=format:%s | while read PKG_GIT_COMMIT; do
  echo "${PKG_GIT_COMMIT}"
done
