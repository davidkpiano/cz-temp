var _ = require('lodash');

module.exports = function generateExampleFiles() {
    return {
        deployments: [],
        $validate: {
            deployments: {presence: true}
        },
        $runAfter: ['adding-extra-docs'],
        $runBefore: ['extra-docs-added'],
        $process: function(docs) {
            var docPaths = _.map(docs, function(doc) {
                return {
                    name: doc.name
                }
            });
            this.deployments.forEach(function(deployment) {
                var indexDoc = _.defaults({
                    docType: 'indexPage',
                    docPaths: docPaths,
                    template: 'indexPage.template.html'
                }, deployment);

                indexDoc.id = 'index' + deployment.name;

                docs.push(indexDoc);
            });
        }
    };
};
