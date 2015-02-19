var _ = require('lodash');

module.exports = function generateIndexPageProcessor() {
    return {
        deployments: [],
        $validate: {
            deployments: {presence: true}
        },
        $runAfter: ['marking-index-page'],
        $runBefore: ['extra-docs-added'],
        $process: function(docs) {
            docs.forEach(function(doc) {
                if (doc.fileInfo && doc.fileInfo.baseName === 'README') {
                    doc.docType = 'indexPage';
                    doc.template = 'component.template.html';
                    doc.name = 'Home';
                    doc.isIndex = true;
                }
            });
        }
    };
};
