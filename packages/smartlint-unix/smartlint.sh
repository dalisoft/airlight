#!/bin/sh
set -eu

EXEC_DIR=$(pwd)
LINTERS="ls-lint,eslint,markdown,biome"
PARALLEL_ARGS=""

handle_args() {
  if [ -z "$1" ]; then
    return 1
  fi

  LINTERS=$(printf '%s' "$1" | tr -d ' ' | cut -d '=' -f 2)
}
build_linter_commands() {
  IFS=","
  for linter in ${LINTERS}; do
    if [ "${linter}" = "ls-lint" ]; then
      PARALLEL_ARGS="${PARALLEL_ARGS}ls-lint $EXEC_DIR;"
    elif [ -z "${USE_QUICKLINT-}" ] && [ "${linter}" = "eslint" ]; then
      PARALLEL_ARGS="${PARALLEL_ARGS}eslint --color $EXEC_DIR;"
    elif [ "${linter}" = "stylelint" ]; then
      PARALLEL_ARGS="${PARALLEL_ARGS}stylelint --color $EXEC_DIR;"
    elif [ "${linter}" = "htmlhint" ]; then
      PARALLEL_ARGS="${PARALLEL_ARGS}htmlhint $EXEC_DIR;"
    elif [ -z "${USE_QUICKLINT-}" ] && [ "${linter}" = "prettier" ]; then
      PARALLEL_ARGS="${PARALLEL_ARGS}prettier -c $EXEC_DIR;"
    elif [ "${linter}" = "markdown" ]; then
      PARALLEL_ARGS="${PARALLEL_ARGS}dprint check --log-level=warn;"
    elif [ "${linter}" = "biome" ]; then
      PARALLEL_ARGS="${PARALLEL_ARGS}biome check --diagnostic-level=warn $EXEC_DIR;"
    elif [ -z "${USE_QUICKLINT-}" ] && [ "${linter}" = "jsonymllint" ]; then
      PARALLEL_ARGS="${PARALLEL_ARGS}spectral lint --ignore-unknown-format $EXEC_DIR;"
    elif [ "${linter}" = "dockerfile" ]; then
      PARALLEL_ARGS="${PARALLEL_ARGS}dockerfilelint Dockerfile"
    fi
  done
}
init() {
  # Allow node_modules binaries to access outside folder
  export PATH="$EXEC_DIR/node_modules/.bin:$PATH"

  if echo "$1" | grep -q "--" -; then
    handle_args "$1"
  elif [ -n "$1" ]; then
    EXEC_DIR="$1"
  fi
  if echo "$2" | grep -q "--" -; then
    handle_args "$2"
  elif [ -n "$2" ]; then
    EXEC_DIR="$2"
  fi
}

init "${1-}" "${2-}"
build_linter_commands

parallel -j8 --keep-order ::: "$PARALLEL_ARGS"
