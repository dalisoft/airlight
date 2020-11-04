const whitespace = (space = 2) => new Array(space).fill(' ').join('');

module.exports = ({ imports, exports }, pureFunction, options) => {
  let template = '';

  template += '(function(libraryName, factory) {\n';
  template += 'const _interopDefault = (m) => m.default ? m.default : m;\n';

  // AMD Exports
  if (!options['no-amd']) {
    template +=
      whitespace(2) +
      'if (typeof define === "function" && define.amd) {' +
      '\n';
    template +=
      whitespace(4) +
      'define([' +
      imports.map(({ path }) => '"' + path + '"') +
      '], factory)\n';
    template += whitespace(2) + '} ';
  }

  // CommonJS / Node exports
  if (!options['no-commonjs']) {
    template += template.indexOf('if ') !== -1 ? ' else ' : '\n';
    template += 'if (typeof module !== "undefined" && module.exports) {' + '\n';
    template +=
      whitespace(4) +
      'module.exports = _interopDefault(factory(' +
      imports
        .map(({ path, default: isDefault }) =>
          isDefault
            ? '_interopDefault(require("' + path + '"))'
            : 'require("' + path + '")'
        )
        .join(', ') +
      '));\n';
    template += whitespace(2) + '}';
  }

  // ES6 Exports
  if (!options['no-exports']) {
    template += template.indexOf('if ') !== -1 ? ' else ' : '\n';
    template += 'if (typeof exports !== "undefined") {' + '\n';
    template +=
      whitespace(4) +
      'Object.assign(exports, factory(' +
      imports
        .map(({ path, default: isDefault }) =>
          isDefault
            ? '_interopDefault(require("' + path + '"))'
            : 'require("' + path + '")'
        )
        .join(', ') +
      '));\n';
    template += whitespace(4) + 'exports.__esModule = true;' + '\n';
    template += whitespace(2) + '}';
  }

  // Worker support
  if (!options['no-worker']) {
    template += template.indexOf('if ') !== -1 ? ' else ' : '\n';
    template += 'if (typeof self !== "undefined") {' + '\n';
    template +=
      whitespace(4) +
      'self[libraryName] = _interopDefault(factory(' +
      imports
        .map(({ path, constant, default: isDefault }) =>
          isDefault
            ? '_interopDefault(self["' +
              path +
              (constant && path !== constant ? '"] || self["' + constant : '') +
              '"])'
            : 'self["' +
              path +
              (constant && path !== constant ? '"] || self["' + constant : '') +
              '"]'
        )
        .join(', ') +
      '));\n';
    template += whitespace(4) + 'self.__esModule = true;' + '\n';
    template += whitespace(2) + '}';
  }

  // Browser support
  if (!options['no-window']) {
    template += template.indexOf('if ') !== -1 ? ' else ' : '\n';
    template +=
      'if (typeof window !== "undefined" && window.document) {' + '\n';
    template +=
      whitespace(4) +
      'window[libraryName] = _interopDefault(factory(' +
      imports
        .map(({ path, constant, default: isDefault }) =>
          isDefault
            ? '_interopDefault(window["' +
              path +
              (constant && path !== constant
                ? '"] || window["' + constant
                : '') +
              '"])'
            : 'window["' +
              path +
              (constant && path !== constant
                ? '"] || window["' + constant
                : '') +
              '"]'
        )
        .join(', ') +
      '));\n';
    template += whitespace(4) + 'window.__esModule = true;' + '\n';
    template += whitespace(2) + '}';
  }

  // Other env supports
  if (!options['no-this']) {
    template += template.indexOf('if ') !== -1 ? ' else {' + '\n' : '\n';
    template +=
      whitespace(4) +
      'this[libraryName] = _interopDefault(factory(' +
      imports
        .map(({ path, constant, default: isDefault }) =>
          isDefault
            ? '_interopDefault(this["' +
              path +
              (constant && path !== constant ? '"] || this["' + constant : '') +
              '"])'
            : 'this["' +
              path +
              (constant && path !== constant ? '"] || this["' + constant : '') +
              '"]'
        )
        .join(', ') +
      '));\n';
    template += whitespace(4) + 'this.__esModule = true;' + '\n';
    template += whitespace(2) + '}';
  }

  if (template.indexOf('if ') !== -1) {
    template += '\n';
  }

  template += "})('" + options.name + "', function(";
  template += imports
    .map(({ constant, namedExports }) =>
      namedExports ? '{ ' + namedExports.join(', ') + ' }' : constant
    )
    .join(', ');
  template += ') {\n';

  template += pureFunction
    .split('\n')
    .map((line) => line.replace(/\t/g, whitespace(2)))
    .filter((line) => line)
    .map((line) => whitespace(2) + line)
    .join('\n');

  template += '\n\n';

  template += whitespace(2) + 'const globalModule = {};' + '\n';
  exports.forEach(({ default: isDefault, constant, namedExports }) => {
    if (isDefault) {
      template += whitespace(2) + 'globalModule.default = ' + constant + ';\n';
    } else if (namedExports) {
      namedExports.forEach((name) => {
        template +=
          whitespace(2) + 'globalModule.' + name + ' = ' + name + ';\n';
      });
    }
  });

  template += whitespace(2) + '\n';

  template += whitespace(2) + 'return globalModule';

  template += '\n\n';

  template += '});';

  return template;
};
