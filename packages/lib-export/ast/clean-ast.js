const {
  moduleImportRegExp,
  requireRegExp,
  moduleExportRegExp,
  cjsExportRegExp,
  lineBreakRegExp
} = require('./regexp');

module.exports = (fileData) => {
  const lines = fileData
    .replace(/["']use strict["'][;]/g, '')
    .split(lineBreakRegExp);
  return lines
    .filter((line) => {
      let importModule = moduleImportRegExp.exec(line);
      const requireMatch = requireRegExp.exec(line);
      const exportModule = moduleExportRegExp.exec(line);
      const cjsExport = cjsExportRegExp.exec(line);

      if (!importModule) {
        importModule = moduleImportRegExp.exec(line);
      }

      return !(importModule || requireMatch || exportModule || cjsExport);
    })
    .join('\n');
};
