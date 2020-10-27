#!/bin/sh

pwd_cache=$(pwd);

for pkg in $(ls packages); do
  echo "\nUpdating 'packages/$pkg'...\n\n"
  cd "$pwd_cache/packages/$pkg"
  # npm audit
  npm i
  npm outdated
  npm update
  npm audit fix
  done

cd "$pwd_cache";
