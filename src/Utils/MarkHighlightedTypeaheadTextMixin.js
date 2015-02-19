var React = require('react');

module.exports = {
    markHighlightedText(name, highlightInfo) {
        var results = [];

        // Highlight isn't the initial character, add the non-highlighted part until it begins
        if (highlightInfo[0].start !== 0) {
            results.push(<span>{name.slice(0, highlightInfo[0].start)}</span>);
        };

        highlightInfo.forEach((info, index) => {
            var highlightString = name.slice(info.start, info.start + info.length);
            results.push(<span className="vp-searchTypeahead-highlight">{highlightString}</span>);

            // Didn't highlight whole string, only part
            if (info.start + info.length !== name.length) {
                // More highlight chunks to go
                if (highlightInfo[index + 1]) {
                    var nextHighlightedBlock = highlightInfo[index + 1];
                    var normalText = name.slice(info.start + info.length, nextHighlightedBlock.start);
                    results.push(<span>{normalText}</span>);
                } else {
                    results.push(<span>{name.slice(info.start + info.length, info.start + info.length + name.length)}</span>);
                }
            }
        });

        return results;
    },
};
