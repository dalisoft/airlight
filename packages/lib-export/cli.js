#!/usr/bin/env node
const processFile = require('./lib');

// Constants
const params = {};
const [node, cliFile, ...args] = process.argv;

// Preparing step
for (let i = 0, len = args.length; i < len; ) {
  let key = args[i];

  if (key.substr(0, 2) !== '--') {
    const value = args[i + 1];
    params[key.substr(1)] = value;
    i += 2;
  } else {
    key = key.substr(2);
    params[key] = true;
    i++;
  }
}

// Processing step
processFile(params).catch((err) => err);
