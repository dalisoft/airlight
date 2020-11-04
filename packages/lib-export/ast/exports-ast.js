const {
  moduleExportRegExp,
  cjsExportRegExp,
  lineBreakRegExp
} = require('./regexp');

module.exports = (fileData) => {
  const lines = fileData.split(lineBreakRegExp);
  return lines
    .map((line) => {
      let moduleExportsMatch = moduleExportRegExp.exec(line);
      const cjsExportMatch = cjsExportRegExp.exec(line);

      if (!moduleExportsMatch) {
        moduleExportsMatch = moduleExportRegExp.exec(line);
      }
      if (!moduleExportsMatch && !cjsExportMatch) {
        return null;
      }

      if (moduleExportsMatch) {
        if (moduleExportsMatch[4]) {
          if (moduleExportsMatch[4].includes('default')) {
            return {
              constant: moduleExportsMatch[4].substr(8),
              module: true,
              default: true
            };
          }
          if (
            moduleExportsMatch[4] &&
            moduleExportsMatch[4].indexOf('{') === 0
          ) {
            let exportsList = moduleExportsMatch[4].substr(2);
            exportsList = exportsList.substr(0, exportsList.length - 2);
            exportsList = exportsList.split(',');
            exportsList = exportsList.map((v) =>
              v.includes('as') ? v.split('as')[1] : v
            );
            exportsList = exportsList.map((v) => v.trim());

            return {
              namedExports: exportsList,
              default: false,
              module: true
            };
          }
          return {
            constant: moduleExportsMatch[2],
            path: moduleExportsMatch[3],
            module: true,
            default: false
          };
        } else {
          console.warn(
            'CLI [lib-export::ExportParser]: Export from module not supported by this module. This plug-in is made for creating single-file simple modules, for complex modules, please use Rollup, Webpack, Gulp or other tools'
          );

          return null; /* {
            constant: moduleExportsMatch[2],
            module: true,
            default: false,
            export: true,
          }; */
        }
      } else if (cjsExportMatch) {
        if (cjsExportMatch[3]) {
          return {
            constant: cjsExportMatch[3],
            module: false,
            default: false,
            namedExport: true
          };
        } else {
          return {
            constant: cjsExportMatch[2],
            module: false,
            default: true,
            namedExport: false
          };
        }
      }
    })
    .filter((imports) => imports);
};
