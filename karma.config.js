var webpackConfig = require('./webpack.config').test;

module.exports = {
    frameworks: ['jasmine'],
    preprocessors: {
        'src/tests.js': ['webpack']
    },
    reporters: ['progress'],
    files: [
        './vendor/phantomjs-shims.js',
        'src/tests.js'
    ],
    plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-webpack')
    ],
    browsers: ['Chrome'],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    },
    colors: true,
    port: 9876,
    colors: true,
    autoWatch: true,
    singleRun: false
};
