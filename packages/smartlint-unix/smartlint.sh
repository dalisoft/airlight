#!/usr/bin/env bash
set -e

EXEC_DIR=$(pwd)
LINTERS=("ls-lint" "eslint" "markdown" "biome")
PARALLEL_ARGS=""

handle_args() {
  local IFS=","

  LINTER_ARG=$(printf '%s' "$1" | tr -d ' ' | cut -d '=' -f 2)
  read -r -a LINTERS <<<"$LINTER_ARG"
}
build_linter_commands() {
  for linter in "${LINTERS[@]}"; do
    linter_arg=$(echo "$linter" | tr -d '\n')

    if [[ "${linter_arg}" == "ls-lint" ]]; then
      PARALLEL_ARGS+="ls-lint $EXEC_DIR;"
    elif [[ "${linter_arg}" == "eslint" ]]; then
      PARALLEL_ARGS+="eslint --color $EXEC_DIR;"
    elif [[ "${linter_arg}" == "stylelint" ]]; then
      PARALLEL_ARGS+="stylelint --color $EXEC_DIR;"
    elif [[ "${linter_arg}" == "htmlhint" ]]; then
      PARALLEL_ARGS+="htmlhint $EXEC_DIR;"
    elif [[ "${linter_arg}" == "prettier" ]]; then
      PARALLEL_ARGS+="prettier -c $EXEC_DIR;"
    elif [[ "${linter_arg}" == "markdown" ]]; then
      PARALLEL_ARGS+="dprint check --log-level=warn;"
    elif [[ "${linter_arg}" == "biome" ]]; then
      PARALLEL_ARGS+="biome check --diagnostic-level=warn $EXEC_DIR;"
    elif [[ "${linter_arg}" == "jsonymllint" ]]; then
      PARALLEL_ARGS+="spectral lint --ignore-unknown-format $EXEC_DIR;"
    elif [[ "${linter_arg}" == "dockerfile" ]]; then
      PARALLEL_ARGS+="dockerfilelint Dockerfile"
    fi
  done
}
init() {
  # Allow node_modules binaries to access outside folder
  export PATH="$EXEC_DIR/node_modules/.bin:$PATH"

  if [[ "$1" == "--"* ]]; then
    handle_args "$1"
  elif [[ "$1" != "" ]]; then
    EXEC_DIR="$1"
  fi
  if [[ "$2" == "--"* ]]; then
    handle_args "$2"
  elif [[ "$2" != "" ]]; then
    EXEC_DIR="$2"
  fi
}

init "$1" "$2"
build_linter_commands

parallel -j8 --keep-order ::: "$PARALLEL_ARGS"
