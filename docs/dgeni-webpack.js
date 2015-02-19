var config = require('generate');
var Dgeni = require('dgeni');
var fs = require('fs-extra');

function DgeniWebpack(options) {
    this.options = options;
}

DgeniWebpack.prototype.apply = function(compiler) {
    var self = this;
    compiler.plugin('after-compile', function(compilation, callback) {
        self.parse(self.options);
        callback();
    });
};

DgeniWebpack.prototype.parse = function(options) {
    console.info('**Regenerating Dgeni Documentation**');
    var dgeni = new Dgeni(config);
    dgeni.generate();
};

module.exports = DgeniWebpack;
