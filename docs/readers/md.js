module.exports = function mdFileReader() {

    var reader = {
        name: 'mdFileReader',
        defaultPattern: /\.md$/,
        getDocs: function(fileInfo) {
            return [{
                docType: 'component',
                content: fileInfo.content,
                startingLine: 1,
                name: fileInfo.relativePath.split('/')[0]
            }];
        }
    };

    return reader;
};
