// Imports
const fs = require('fs');

const { importsAst, exportsAst, cleanAst } = require('./ast');
const template = require('./template');

module.exports = (params) =>
  new Promise((resolve, reject) => {
    fs.readFile(params.file, { encoding: 'utf-8' }, (err, fileData) => {
      if (err) {
        console.log('CLI [Lib-Export]: Error was occured', err);
        reject(err);
        return;
      }
      const matchImports = importsAst(fileData);
      const matchExports = exportsAst(fileData);
      const cleanExports = cleanAst(fileData);

      const processedFileString = template(
        { imports: matchImports, exports: matchExports },
        cleanExports,
        params
      );

      fs.writeFile(
        params.output || params.file.replace(/\.js/g, '') + '.processed.js',
        processedFileString,
        (errWrite) => {
          if (errWrite) {
            console.log(
              'CLI [Lib-Export]: Error was occured during save processed file',
              errWrite
            );
            reject(errWrite);
            return;
          }
          resolve();
        }
      );
    });
  });
