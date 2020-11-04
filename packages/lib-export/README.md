# lib-export

CLI for making pure types exportable

**Note**: This plug-in is made for creating single-file simple modules, for complex modules, please use Rollup, Webpack, Gulp or other tools

## Features

- Blazing fast
- Lightweight
- No dependecies
- Available CLI-mode
- Available library-mode
- Custom options for targets

## Installation

```bash
npm i -g lib-export
```

## Options

See example, there all of options shown

## Usage

### CLI mode

```bash
lib-export -name LibraryName -file YOUR_FILE.js -output YOUR_FILE.browser.js --no-amd --no-worker --no-this --no-commonjs
```

### Library mode

```js
const libexport = require('lib-export');

libexport({
  name: 'LibraryName',
  output: 'YOUR_FILE.browser.js', // Optional, by default suffix will be .processed.js
  file: 'YOUR_FILE.js',
  'no-amd': true,
  'no-worker': true,
  'no-this': true,
  'no-commonjs': true
})
  .then(() => console.log('Done'))
  .catch((err) => console.error('What??', err));
```

## License

MIT
