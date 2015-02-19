var React = require('react/addons');
var EventListener = require('react/lib/EventListener');
var cloneWithProps = React.addons.cloneWithProps;
var joinClasses = require('react/lib/joinClasses');

module.exports = React.createClass({
    displayName: 'TypeaheadResults',

    propTypes: {
        onSelectionChange: React.PropTypes.func.isRequired,
        uniqueIdFactory: React.PropTypes.func.isRequired,
        results: React.PropTypes.arrayOf(React.PropTypes.object),
        currentSelectionIndex: React.PropTypes.number,
    },

    getDefaultProps() {
        return {
            results: null,
            currentSelectionIndex: null
        }
    },

    componentWillMount() {
        this.bindRootKeyUpHandler();
    },

    componentWillUnmount() {
        this.unbindRootKeyUpHandler();
    },

    componentDidUpdate(prevProps, prevState) {
        this.handleContainerScrollPosition();
    },

    bindRootKeyUpHandler() {
        this._onDocumentKeyupListener = EventListener.listen(document, 'keyup', this.handleKeyUp);
    },

    unbindRootKeyUpHandler() {
        if (this._onDocumentKeyupListener) {
            this._onDocumentKeyupListener.remove();
        }
    },

    handleKeyUp(e) {
        var keyCode = e.keyCode;

        switch (keyCode) {
            case 38: // Up
                if (this.props.currentSelectionIndex !== null &&
                        this.props.currentSelectionIndex > 0) {
                    this.props.onSelectionChange(this.props.currentSelectionIndex - 1);
                } else {
                    this.props.onSelectionChange(this.props.results.length - 1);
                }
                break;
            case 40: // Down
                if (this.props.currentSelectionIndex !== null &&
                        this.props.currentSelectionIndex < this.props.results.length - 1) {
                    this.props.onSelectionChange(this.props.currentSelectionIndex + 1);
                } else {
                    this.props.onSelectionChange(0);
                }
                break;
            case 13: // Enter
                if (this.props.currentSelectionIndex !== null &&
                        this.props.results !== null) {
                    var itemUniqueId = this.props.uniqueIdFactory(this.props.results[this.props.currentSelectionIndex]);

                    this.refs[itemUniqueId]
                        .getDOMNode()
                        .click();
                }
                break;
        }
        if (e.stopPropagation) e.stopPropagation();
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
    },

    handleContainerScrollPosition() {
        var currentSelectionUniqueId = this.props.uniqueIdFactory(this.props.results[this.props.currentSelectionIndex]);
        var containerNode = this.refs.resultsContainer.getDOMNode().parentNode;
        var currentSelectedNode = this.refs[currentSelectionUniqueId].getDOMNode();
        
        if (currentSelectedNode.offsetTop + currentSelectedNode.offsetHeight > containerNode.offsetHeight) {
            containerNode.scrollTop = currentSelectedNode.offsetTop;
        } else {
            containerNode.scrollTop = 0;
        }
    },

    cloneTypeaheadItem(item) {
        var isItemSelected = false;
        var itemUniqueId = this.props.uniqueIdFactory(item.props.data);

        if (this.props.currentSelectionIndex !== null) {
             var selectedItemUniqueId = this.props.uniqueIdFactory(this.props.results[this.props.currentSelectionIndex]);
             isItemSelected = selectedItemUniqueId === itemUniqueId;
        }

        return cloneWithProps(item, {
            key: itemUniqueId,
            ref: itemUniqueId,
            className: isItemSelected ?
                            joinClasses('vp-typeahead-selected', item.className) :
                            item.className
        });
    },

    render() {
        if (this.props.children) {
            var results = React.Children.map(this.props.children, result => {
                if (result !== null) {
                    if (typeof result.type === 'function'
                        && result.type.displayName === 'TypeaheadItem') {
                        return this.cloneTypeaheadItem(result);
                    }
                    return result;
                }
            });
            
            return (<div className={joinClasses('vp-typeahead-result-list', this.props.className)} style={this.props.style} ref="resultsContainer" >
                        {results}
                    </div>);
        }

        return null;
    },

})
