var _ = require('lodash');
var React = require('react/addons');
var classSet = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var joinClasses = require('react/lib/joinClasses');

var Input = require('../Input/Input');
var DropdownStateMixin = require('../Utils/DropdownStateMixin');

var styles = require('./typeahead.less');

module.exports = React.createClass({
    displayName: 'Typeahead',

    mixins: [DropdownStateMixin],

    propTypes: {
        onChange: React.PropTypes.func.isRequired,
        currentSearchTerm: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func,
        displayResultsInitially: React.PropTypes.bool,
        initialResults: React.PropTypes.node,
        placeholder: React.PropTypes.string,
        children(props, propName, componentName) {
            if (props[propName]) {
                var typeaheadResultName = 'TypeaheadResults';
                var typeaheadResults = React.Children.only(props[propName]); // Throws if more than 1 child
                if (typeaheadResults.type.displayName !== typeaheadResultName) throw new Error(`${componentName} accepts only one child and the child must be of type ${typeaheadResultName}.`);
            }
        }
    },

    getDefaultProps() {
        return {
            initialResults: (<span />),
            displayResultsInitially: false,
            placeholder: 'Search',
            currentSearchTerm: null
        };
    },

    handleOnChange(e) {
        this.props.onChange(e.target.value);
        e.preventDefault();
    },

    handleOnClick(e) {
        if (!this.state.open) {
            this.setDropdownState(!this.state.open);
        }

        if (this.props.onClick) {
            this.props.onClick(e);
        }
        e.preventDefault();
    },

    handleClearSearchTerm(e) {
        this.props.onChange(null);
    },

    // Stop movement of input cursor when selecting items in results -- handled higher up at the document level via TypeaheadResult
    handleKeyDown(e) {
        var key = e.key;
        switch (key) {
            case 'Escape':
                var inputDOMNode = this.refs['input'].getDOMNode();
                inputDOMNode.querySelector('input').blur();
                this.setState({open: false});
                break;
            case 'ArrowUp':
            case 'ArrowDown':
            case 'Enter':
                if (e.stopPropagation) e.stopPropagation();
                e.preventDefault ? e.preventDefault() : e.returnValue = false;
                break;
        }
    },

    render() {
        return this.renderWrapper([this.renderInput(), this.renderResults()]);
    },

    renderWrapper(children) {
        var {className, onClick, onChange, ...others} = this.props;
        return (<div
                    className={joinClasses('vp-typeahead', className)}
                    {...others}
                    onKeyDown={this.handleKeyDown}
                    key="typeahead-wrapper">
                        {this.renderSearchIcon()}
                        {children}
                </div>);
    },

    renderInput() {
        return (<Input type="text"
                    placeholder={this.props.placeholder}
                    onClick={this.handleOnClick}
                    onFocus={this.handleOnClick}
                    onChange={this.handleOnChange}
                    ref="input" key="input"
                    value={this.props.currentSearchTerm}
                    maxLength="300" />);
    },

    renderSearchIcon() {
        if (this.props.currentSearchTerm) {
            return (<i className="vp-typeahead-clearIcon" onClick={this.handleClearSearchTerm}></i>);
        }

        return (<i className="vp-typeahead-searchIcon"></i>);
    },

    renderResults() {
        var resultClasses = classSet({
            'vp-typeahead-results': true,
            'vp-typeahead-results--open': this.state.open
        });

        if (this.state.open && (this.props.children || this.props.displayResultsInitially)) {
            var resultList;
            if (this.props.children) {
                var results = React.Children.only(this.props.children);
                resultList = results;
            }
            else {
                resultList = this.props.initialResults;
            }
            return (<div className={resultClasses} key="results">
                        {resultList}
                    </div>);
        }

        return null;
    }
});
