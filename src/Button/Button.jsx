var React = require('react/addons');
var joinClasses = require('react/lib/joinClasses');

var VARIANT_TYPES = ['primary', 'secondary', 'warning', 'failure'];

var Button = React.createClass({
    propTypes: {
        variant:  React.PropTypes.oneOf(VARIANT_TYPES).isRequired,
        disabled: React.PropTypes.bool,
        working: React.PropTypes.bool,
        workingLabel: React.PropTypes.node,
        onClick: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            working: false,
            variant: 'primary',
            workingLabel: <span>A Spinner Icon</span>
        };
    },

    render() {
        var {disabled, variant, working, ...others } = this.props;

        var classes = {
            'vp-button': true
        };

        classes[this.props.variant] = true;

        var content = this.props.working ? this.props.workingLabel :
            <span key="initial">{this.props.children}</span>

        disabled = disabled || this.props.working;

        return (
            <button
                disabled={disabled}
                className={joinClasses(React.addons.classSet(classes), this.props.className)}
                onClick={this.handleClick}
                {...others}>
                {content}
            </button>
        );
    }
});

module.exports = Button;
