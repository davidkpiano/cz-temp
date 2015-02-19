var _ = require('lodash');

module.exports = function generatePageNavProcessor() {
    return {
        deployments: [],
        $validate: {
            deployments: {presence: true}
        },
        $runAfter: ['creating-nav-links'],
        $runBefore: ['extra-docs-added'],
        $process: function(docs) {
            var navList = _(docs).filter(function(doc) {
                return doc.docType === 'component' && doc.name !== 'README.md';
            }).map(function(doc) {
                return {
                    name: doc.name
                }
            }).value();

            docs.forEach(function(doc) {
                if (doc.docType === 'component') {
                    _.defaults(doc, this.deployments[0]);
                    doc.docPaths = navList;
                }
            }, this);
        }
    };
};
