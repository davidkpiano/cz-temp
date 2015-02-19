module.exports = function defaultDeployment() {
    return {
        name: 'default',
        examples: {
            commonFiles: {
                scripts: ['/assets/js/components.js'],
                stylesheets: ['/assets/css/viewstrap.css']
            },
            dependencyPath: ''
        },
        scripts: [
            '/assets/js/components.js',
            '/assets/js/marked.js',
            '/assets/js/highlight.js',
            '/assets/js/jsx-transform.js'
        ],
        stylesheets: [
            '/assets/css/guide.css',
            '/assets/css/viewstrap.css'
        ]
    };
};
