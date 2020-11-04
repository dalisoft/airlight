#!/usr/bin/env node
const { exec } = require('child_process');

// @ts-ignore-next-line
const [node, cliFile, ...args] = process.argv;

// Constants
const CHECK_ANTIALIASING =
  'defaults read -g CGFontRenderingFontSmoothingDisabled';
const CHECK_ANTIALIASING_LEVEL =
  'defaults -currentHost read -globalDomain AppleFontSmoothing';
const CHECK_ANTIALIASING_THRESHOLD =
  'defaults -currentHost read -globalDomain AppleAntiAliasingThreshold';

const APP_NAME = 'MacOS Font Smoothing Configuration Utility';

// Initialize
console.log(`> ${APP_NAME}`, '\n');

// Preparing step
let execArg;

for (let i = 0, len = args.length; i < len; i++) {
  let key = args[i].substr(2);

  if (key === 'check') {
    execArg = CHECK_ANTIALIASING;
  } else if (key === 'check-level') {
    execArg = CHECK_ANTIALIASING_LEVEL;
  } else if (key === 'check-threshold') {
    execArg = CHECK_ANTIALIASING_THRESHOLD;
  } else if (key === 'help') {
    console.log('?  Commands list', '\n');
    console.log('`--check`', 'Checks status of font smoothing');
    console.log('`--check-level`', 'Checks level of font smoothing');
    console.log('`--check-threshold`', 'Checks threshold of font smoothing');
  } else if (key === 'about') {
    console.log('Copyright (c) 2019 @dalisoft. No rights reserved');
    console.log('\nLicensed under MIT-License');
  } else {
    console.log('!  Invalid command...', '\n');
    console.log('Please see --help for more information');
  }
}

if (execArg) {
  exec(execArg, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    }

    if (execArg === CHECK_ANTIALIASING) {
      console.log(
        'Apple Font Smoothing is',
        '[',
        +stdout ? 'Disabled' : 'Enabled',
        ']'
      );
    } else if (execArg === CHECK_ANTIALIASING_LEVEL) {
      const level =
        +stdout === 0
          ? 'Disabled'
          : +stdout === 1
          ? 'Light'
          : +stdout === 2
          ? 'Medium'
          : 'Strong';
      console.log('Apple Font Smoothing level is', '[', level, ']');
    } else if (execArg === CHECK_ANTIALIASING_THRESHOLD) {
      console.log('Apple Font Smoothing Threshold is', '[', +stdout, ']');
    }
  });
}
