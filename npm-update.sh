#!/bin/sh

pwd_cache=$(pwd);

for pkg in $(ls packages); do
  echo "\nUpdating 'packages/$pkg'...\n\n"
  cd "$pwd_cache/packages/$pkg"
  # npm audit
  npm i
  npm outdated
  npm update
  done

cd "$pwd_cache";
