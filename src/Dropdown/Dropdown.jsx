/** @jsx React.DOM */

var React = require('react/addons');
var classSet = React.addons.classSet;
var cloneWithProps = React.addons.cloneWithProps;
var joinClasses = require('react/lib/joinClasses');
var createChainedFunction = require('../../vendor/react-bootstrap/src/utils/createChainedFunction'); // Not sure if needed. Creates a wrapper function (x, y) => {x(); y();} used for chaining events so the parent event is executed and then the child if one is defined.
var DropdownStateMixin = require('../Utils/DropdownStateMixin');

var Dropdown = React.createClass({
    mixins: [DropdownStateMixin],

    propTypes: {
        title:     React.PropTypes.node.isRequired,
        onClick:   React.PropTypes.func,
        onSelect:  React.PropTypes.func,
        caret:     React.PropTypes.bool
    },

    getDefaultProps() {
        return {
            caret: true
        };
    },

    render: function() {
        var content = (<div className="viewstrap" >
                            {this.renderToggle()}
                            <div className="vp-dropdown" data-state={this.state.open ? 'active' : 'inactive'}>
                                {this.renderDropdownMenu()}
                            </div>
                        </div>);
        return content;
    },

    renderToggle: function() {
        var caret = this.props.caret ? (<span className="vp-icon t-caret" />) : null;

        return (<a onClick={this.handleDropdownClick}
                    href="#"
                    {...this.props}
                    className={this.props.className}>
                        {this.props.title}{' '}
                        {caret}
                </a>)
    },

    renderDropdownMenu: function() {
        var content = React.Children.map(this.props.children, this.renderMenuItem, this);
        return (<ul className="vp-list" role="menu">
                    {content}
                </ul>);
    },

    renderMenuItem: function(item) {
        return cloneWithProps(item, {
            onSelect: createChainedFunction(item.props.onSelect, this.props.onSelect)
        });
    },

    handleDropdownClick: function (e) {
        e.preventDefault();
        this.setDropdownState(!this.state.open) ;
    },

    handleOptionSelect: function (key) {
        if (this.props.onSelect) {
            this.props.onSelect(key);
        }
        this.setDropdownState(false);
    }
});

module.exports = Dropdown;
