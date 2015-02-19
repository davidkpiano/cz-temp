// Proof of concept wrapper around Typeahead
var React = require('react/addons');
var Typeahead = require('./Typeahead');
var TypeaheadItem = require('./TypeaheadItem');
var TypeaheadResults = require('./TypeaheadResults');
var MarkHighlightedTypeaheadTextMixin = require('../Utils/MarkHighlightedTypeaheadTextMixin');
var _ = require('lodash');

var style = require('./SearchTypeahead.less');
var mockData = JSON.parse('{"response":{"hints":[{"name":"Invoice #","results":[{"id":"4F2914FC-D0A3-4C56-BCF4-A2F100EEEB95","name":"1111","matchSegments":[{"start":0,"length":4}]},{"id":"D2C6D74F-8C21-455D-9D89-A2AF014C66A1","name":"1565","matchSegments":[{"start":0,"length":1}]},{"id":"10666A56-C5CA-418B-B422-A2B201196470","name":"1001-1","matchSegments":[{"start":0,"length":1},{"start":3,"length":1},{"start":5,"length":1}]},{"id":"39E147E3-D341-4347-A1F6-A2B201163240","name":"1004-1","matchSegments":[{"start":0,"length":1},{"start":5,"length":1}]},{"id":"C168D701-1FE4-44AB-8881-A2B201196470","name":"1008-1","matchSegments":[{"start":0,"length":1},{"start":5,"length":1}]}]},{"name":"Company","results":[{"id":"0DECE909-F985-4ABD-82C1-A2AC015872ED","name":"1 Vendor QA Test","matchSegments":[{"start":0,"length":1}]},{"id":"1414D4C2-FC4B-4B70-9B6B-A2AC015872ED","name":"100% Power","matchSegments":[{"start":0,"length":1}]},{"id":"6D43AA59-6020-47DA-85CE-A2AC015872ED","name":"Budweiser Trac 10","matchSegments":[{"start":15,"length":1}]},{"id":"9427047A-2F19-441F-859C-A2AC015872ED","name":"BOA - 941","matchSegments":[{"start":8,"length":1}]},{"id":"1EB38344-5CA5-4E10-B020-A3A9010912D1","name":"Bug 2182","matchSegments":[{"start":5,"length":1}]}]}]}}');

module.exports = React.createClass({
    displayName: 'SearchTypeahead',

    mixins: [MarkHighlightedTypeaheadTextMixin],

    propTypes: {
        linkTemplate: React.PropTypes.string.isRequired
    },

    getDefaultProps() {
        return {
            linkTemplate: 'receivables/ng#/invoice/view/<%= id %>/mine'
        }
    },

    getInitialState() {
        return {
            results: null,
            currentSearchTerm: '',
            currentSelectionIndex: 0
        };
    },

    render() {
        var results;

        if (this.state.currentSearchTerm.match('1')) {
            results = this.createResults();
        }

        return (<Typeahead onChange={this.handleSearch} currentSearchTerm={this.state.currentSearchTerm}>
                    {results}
                </Typeahead>);
    },

    handleSearch(term) {
        if (term !== null) {
            this.setState({currentSearchTerm: term});
        } else {
            this.setState({results: null, currentSearchTerm: ''});
        }
    },

    handleResultSelect(key) {
        console.log(key);
    },

    handleSelectionChange(newSelectionIndex) {
        this.setState({currentSelectionIndex: newSelectionIndex});
    },

    createCompanyResults(result, text) {
        return (<TypeaheadItem key={result.id} data={result} onClick={this.handleResultSelect}>{text}</TypeaheadItem>);
    },

    createLinkResults(result, text) {
        return (<TypeaheadItem key={result.id} data={result} url={_.template(this.props.linkTemplate, result)}>{text}</TypeaheadItem>);
    },

    createCategory(name) {
        return (<div className="vp-searchTypeahead-category" key={'category-' + name}>{name}</div>);
    },

    createResults() {
        var resultGroups = mockData.response.hints;
        var results = [];
        var resultItems = [];
        var createUniqueId = function(data) {
            return `${data.name}:${data.id}`;
        };
        resultGroups.forEach(resultGroup => {
            results.push(this.createCategory(resultGroup.name));
            if (resultGroup.name === 'Company') {
                resultGroup.results.forEach(result => {
                    var highlightedText = this.markHighlightedText(result.name, result.matchSegments);
                    results.push(this.createCompanyResults(result, highlightedText));
                    resultItems.push(result);
                });
            } else {
                 resultGroup.results.forEach(result => {
                    var highlightedText = this.markHighlightedText(result.name, result.matchSegments);
                    results.push(this.createLinkResults(result, highlightedText));
                    resultItems.push(result);
                });
            }
        });

        return (
                <TypeaheadResults
                uniqueIdFactory={createUniqueId}
                onSelectionChange={this.handleSelectionChange}
                results={resultItems}
                currentSelectionIndex={this.state.currentSelectionIndex}>
                    {results}
                </TypeaheadResults>);
    }
});
