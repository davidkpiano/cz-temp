var _ = require('lodash');
var reactTools = require('react-tools');
var path = require('path');

module.exports = function generateJsxFileProcessor(exampleMap) {
    return {
        $runAfter: ['paths-computed'],
        $runBefore: ['rendering-docs'],
        $process: function(docs) {
            docs.forEach(function(doc) {
               if (doc.docType === 'example') {
                   var jsxPaths = _.map(doc.example.files, function(file) {
                        if (file.language === 'jsx') {
                            return {
                                path: file.name
                            };
                        }
                   });

                   doc.scripts = doc.scripts.concat(jsxPaths);
               }

               if (doc.template === 'template.jsx') {
                    doc.fileContents = reactTools.transform(doc.fileContents.trim(), { harmony: true });
               }

               if (doc.docType === 'example-file' || doc.docType === 'example') {
                   var componentName = doc.example.doc.name;
                   doc.outputPath = path.dirname(doc.outputPath) + '-' + componentName + '/' + path.basename(doc.outputPath);
               }

               if (doc.docType === 'runnableExample') {
                   _.forEach(doc.example.files, function(file) {
                      if (file.language === 'jsx') {
                          file.fileContents = _.escape(file.fileContents);
                      }
                   });
               }
            });
        }
    };
};
