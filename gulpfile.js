var gulp = require('gulp');

var _ = require('lodash');

var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var static = require('node-static');
var prompt = require('gulp-prompt');

var webpackConfig = require('./webpack.config.js').docs;
var webpackConfigRelease = require('./webpack.config.js').release;
var karmaConfig = require('./karma.config.js');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var karma = require('karma').server;

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var pixrem = require('gulp-pixrem');
var args = require('yargs').argv;
var paths = {
    kssSources: ['./src/**/*.less', './src/**/*.scss'],
    scss: './scss/*.scss',
    css: './build/css/*.css'
};

// Styleguide Assets
var express = require('express');
var concat = require('gulp-concat');

// webpack buries exceptions that happen in the loaders, so you have to go dig them out
var hasWebpackLoaderErrors = function(stats) {
    return _.some(stats.stats, function (result) {
        return result.compilation.errors.length > 0;
    });
};

var runWebpack = function(webpackConfig, done) {
    webpack(webpackConfig, function(err, stats) {
        gutil.log('[webpack]', stats.toString({colors: args.environment !== "ci"}));
        if(hasWebpackLoaderErrors(stats)) throw new gutil.PluginError("[webpack]", "One or more webpack loaders failed.");
        done();
    });
};

var runStyleguide = function() {
    var styleguide = express();
 
    styleguide.use(express.static(__dirname));

    styleguide.listen(5678);

    console.log('Styleguide running on port 5678');
};

var buildStyleguide = function() {
    var styleguideIndex = require('./styleguide/index.json');
    var styleguideOrder = styleguideIndex.contents.map(function(section) {
        return './styleguide/sections/' + section + '.html';
    });

    styleguideOrder.unshift('./styleguide/parts/header.html');
    styleguideOrder.push('./styleguide/parts/footer.html');

    gulp.src('./assets/**/*')
        .pipe(gulp.dest('./styleguide/assets'));

    gulp.src(styleguideOrder)
        .pipe(concat('index.html'))
        .pipe(gulp.dest('./styleguide'));
};

var compileSass = function(outputPath) {
    outputPath = outputPath || './styleguide/css';
    // gulp.src(paths.scss)
    //     .pipe(sass())
    //     .pipe(autoprefixer({
    //         browsers: ['last 4 versions', 'IE 8']
    //     }))
    //     .pipe(gulp.dest('./build/css'));

    gulp.src(['./src/**/*.scss', './scss/**/*.scss'])
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 4 versions', 'IE 8']
        }))
        .pipe(pixrem())
        .pipe(gulp.dest('./src'));

    gulp.src(['./scss/*.scss'])
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 4 versions', 'IE 8']
        }))
        .pipe(pixrem())
        .pipe(gulp.dest(outputPath));
};

gulp.task('sass', function() {
    compileSass();
    gulp.watch(['./scss/**/*.scss', './src/**/*.scss'], _.partial(compileSass, false));
});

gulp.task('build', function(done) {
    return runWebpack(webpackConfig, done);
});

// Temp. task to build a release version for Strawman usage pending NPM include
gulp.task('build-release', function(done) {
    compileSass('./release');
    gulp.src('./assets/**/*.*').pipe(gulp.dest('./release/assets'));
    gulp.src('./src/**/*.*').pipe(gulp.dest('./release/src'));
});

gulp.task('test', function(done) {
    karma.start(karmaConfig);
});

gulp.task('test-ci', function() {
    var ciConfig = _.extend({}, karmaConfig, {
        singleRun: true,
        reporters: ['teamcity'],
        browsers: ['PhantomJS'],
        browserDisconnectTimeout : 10000,
        browserDisconnectTolerance : 1,
        browserNoActivityTimeout : 4*60*1000
    });
    
    ciConfig.plugins.push(require('karma-phantomjs-launcher'));
    ciConfig.plugins.push(require('karma-teamcity-reporter'));
    karma.start(ciConfig);
});

gulp.task('build-styleguide', function() {
    buildStyleguide();
});

gulp.task('styleguide', ['sass', 'build-styleguide'], function() {
    runStyleguide();

    gulp.watch('./scss/**/*.scss', ['sass']);

    gulp.watch('./styleguide/!(assets|css)/*', ['build-styleguide']);
});

gulp.task('dgeni', function() {
    try {
        var Dgeni = require('dgeni');
        var dgeni = new Dgeni([require('./docs/generate')]);
        dgeni.generate();

        gulp.src('./docs/app/**/*.*').pipe(gulp.dest('./build/assets'));
        compileSass('./build/assets/css');

    } catch (e) {
        console.log(e.stack);
        throw e;
    }
});

gulp.task('watch', ['dgeni'], function() {
    webpackConfig.watch = true;
    var docsDir = new static.Server('./build');
    require('http').createServer(function(req, res) {
        req.addListener('end', function() {
            docsDir.serve(req, res);
        }).resume();
    }).listen(5555);
    runWebpack(webpackConfig, function() {});
});
