var path = require('canonical-path');

var Package = require('dgeni').Package;

var viewstrap = module.exports = new Package('viewstrap-docs', [
    require('dgeni-packages/jsdoc'),
    require('dgeni-packages/examples'),
    require('dgeni-packages/nunjucks')
])

.factory(require('./services/deployments/default'))
.factory(require('./readers/md'))

.processor({ name: 'marking-index-page', $runAfter: ['creating-nav-links'], $runBefore: ['extra-docs-added'] })
.processor({ name: 'creating-nav-links', $runAfter: ['adding-extra-docs'], $runBefore: ['extra-docs-added'] })

.processor(require('./processors/nav'))
.processor(require('./processors/index-page'))
.processor(require('./processors/jsx-file'))

.config(function(log, readFilesProcessor, mdFileReader, templateFinder, templateEngine, writeFilesProcessor) {
    log.level = 'info';
    readFilesProcessor.fileReaders = [mdFileReader];
    readFilesProcessor.basePath = path.resolve(__dirname, '..');
    readFilesProcessor.sourceFiles = [{
        include: ['src/**/*.md'],
        exclude: 'src/**/*.spec.jsx',
        basePath: 'src'
    }];

    templateFinder.templateFolders.unshift(path.resolve(__dirname, 'templates'));
    templateFinder.templatePatterns = ['${doc.template}', '${doc.docType}.template.html', '${doc.docType}.template.json'];

    writeFilesProcessor.outputFolder  = 'build';
})

.config(function(computePathsProcessor, computeIdsProcessor) {
    computePathsProcessor.pathTemplates.push({
        docTypes: ['indexPage'],
        pathTemplate: '.',
        outputPathTemplate: 'index.html'
    });

    computePathsProcessor.pathTemplates.push({
        docTypes: ['component'],
        pathTemplate: '${name}',
        outputPathTemplate: 'components/${name}.html'
    });
})

.config(function(generateIndexPageProcessor, generatePageNavProcessor, generateExamplesProcessor, generateProtractorTestsProcessor, defaultDeployment) {

    generateProtractorTestsProcessor.deployments = [
        defaultDeployment
    ];

    generateIndexPageProcessor.deployments = [
        defaultDeployment
    ];

    generateExamplesProcessor.deployments = [
        defaultDeployment
    ];

    generatePageNavProcessor.deployments = [
        defaultDeployment
    ];
})
;