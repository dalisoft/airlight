const {
  moduleImportRegExp,
  requireRegExp,
  lineBreakRegExp
} = require('./regexp');

module.exports = (fileData) => {
  const lines = fileData.split(lineBreakRegExp);
  return lines
    .filter((line) => line)
    .map((line) => {
      let moduleMatch = moduleImportRegExp.exec(line);
      const requireMatch = requireRegExp.exec(line);

      if (!moduleMatch) {
        // I don't know why? But it sometimes catchs
        // At second try
        // but first try not catched
        moduleMatch = moduleImportRegExp.exec(line);
      }

      if (moduleMatch) {
        if (moduleMatch[2].indexOf('{') === 0) {
          let exportsList = moduleMatch[2].substr(2);
          exportsList = exportsList.substr(0, exportsList.length - 2);
          exportsList = exportsList.split(',').map((v) => v.trim());

          return {
            path: moduleMatch[3],
            namedExports: exportsList,
            default: false,
            module: true
          };
        }
        return {
          constant: moduleMatch[2],
          path: moduleMatch[3],
          default: true,
          module: true
        };
      } else if (requireMatch) {
        return {
          constant: requireMatch[2],
          path: requireMatch[3],
          module: false
        };
      }
    })
    .filter((imports) => imports);
};
