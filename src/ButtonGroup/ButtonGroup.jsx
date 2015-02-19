/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var classSet = React.addons.classSet;
var joinClasses = require('react/lib/joinClasses');

var ButtonGroup  = React.createClass({
    propTypes: {
        alignment: React.PropTypes.string.isRequired
    },

    getDefaultProps: function() {
        return {
            alignment: 'horizontal'
        };
    },

    render: function() {
        var classes = classSet({
            'vp-button-group': true,
            'vp-button-group--horizontal': (this.props.alignment === 'horizontal'),
            'vp-button-group--vertical': (this.props.alignment === 'vertical')
        });

        return (<div {...this.props} className={joinClasses(this.props.className, classes)} role="group">
                    {this.props.children}
                </div>);
    }
});

module.exports = ButtonGroup;
