var React = require('react/addons');
var classSet = React.addons.classSet;
var joinClasses = require('react/lib/joinClasses');
var cloneWithProps = React.addons.cloneWithProps;

var Input = React.createClass({
    propTypes: {
        placeholder: React.PropTypes.string,
        label: React.PropTypes.string,
        type: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        onChange: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            disabled: false
        };
    },

    renderLabel(forInput) {
        return this.props.label ? (<label key="label" forHtml={forInput} className="vp-label">{this.props.label}</label>) : null;
    },

    renderWrapper(children, className) {
        return (<div className={className}>{children}</div>);
    },

    renderInput(children) {
        var {error, success, label, ...props} = this.props;
        var classes = classSet({
            'vp-input': true,
            'vp-textarea': (props.type === 'textarea'),
            'vp-select': (props.type === 'select')
        });
        var input;

        switch (props.type) {
            case 'select':
                input = (<select {...props} type={undefined}
                            className={classes}
                            ref="input"
                            key="input">
                            {this.props.children}
                        </select>);
                break;
            case 'textarea':
                input = (<textarea {...props} type={undefined}
                            className={classes}
                            ref="input"
                            key="input" />);
                break;
            default:
                input = (<input {...props} className={classes}
                            ref="input"
                            key="input" />);
                break;
        }

        return input;
    },

    render() {
        return this.renderWrapper(
                [this.renderLabel(this.props.id), this.renderInput()],
                 this.props.className);
    }
});

module.exports = Input;
