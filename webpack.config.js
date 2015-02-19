var path = require('path');
var webpack = require('webpack');

var paths = {
    entry: {
        docs: {
            'components': './docs/export.js'
        },
        lib: {
            'lib': './src/index.js'
        }
    },
    output: {
        docs: path.join(__dirname, 'build/assets/js'),
        lib: path.join(__dirname, 'release')
    },
    publicPath: 'assets'
};

var commonLoaders = [
{ test: /\.jsx$/, loader: 'jsx-loader?harmony=true' },
{ test: /\.js$/, loader: 'jsx-loader?harmony=true' },
{ test: /\.png$/, loader: 'url-loader' },
{ test: /\.jpg$/, loader: 'file-loader' },
{ test: /\.json$/, loader: 'json-loader' },
{ test: /\.less$/, loader: 'style-loader!css-loader!autoprefixer-loader!less-loader' },
{ test: /\.scss/, loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader' },
{ test: /\.css$/, loader: "style-loader!css-loader!autoprefixer-loader" },
{ test: require.resolve('react'), loader: 'expose?React' }
];

module.exports = {
    docs: [
        {
            name: 'docs',
            cache: true,
            context: path.join(__dirname),
            entry: paths.entry.docs,
            output: {
                path: paths.output.docs,
                publicPath: paths.publicPath,
                chunkFileName: '[chunkhash].js',
                filename: '[name].js'
            },
            module: {
                loaders: commonLoaders
            },
            resolve: {
                extensions: ['', '.json', '.jsx', '.js']
            },
            devtool: 'inline-source-map',
                debug: true,
                }
        ],
        test: {
            watch: true,
            devtool: 'inline-source-map',
            module: {
                loaders: commonLoaders
            },
            resolve: {
                extensions: ['', '.json', '.jsx', '.js']
            }
        },
        release: [
        {
            name: 'release',
            cache: false,
            debug: false,
            context: path.join(__dirname),
            entry: paths.entry.lib,
            output: {
                path: paths.output.lib,
                publicPath: paths.publicPath,
                chunkFileName: '[chunkhash].js',
                filename: 'release.js'
            },
            module: {
                loaders: commonLoaders
            },
            resolve: {
                extensions: ['', '.json', '.jsx', '.js']
            },
            plugins: [
                new webpack.optimize.DedupePlugin(), new webpack.optimize.UglifyJsPlugin()]
        }
    ],
};
