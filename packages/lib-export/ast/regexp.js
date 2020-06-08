const moduleImportRegExp = /(import (.*) from ["'](.*)["'][;]|import (.*)[;])/gi;
const moduleExportRegExp = /(export (.*) from ["'](.*)["'][;]|export (.*)[;])/gi;
const requireRegExp = /(var|const|let) (.*) = require\(["'](.*)["';]\)/gi;
const cjsExportRegExp = /(module\.exports = (.*)["';]|exports\.(.*) = (.*)[;])/gi;
const lineBreakRegExp = /\n/gi;

module.exports = {
  moduleImportRegExp,
  moduleExportRegExp,
  requireRegExp,
  cjsExportRegExp,
  lineBreakRegExp
};
