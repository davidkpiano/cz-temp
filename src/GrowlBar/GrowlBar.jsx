var React = require('react/addons');
var _ = require('lodash');

var style = require('./GrowlBar.less');

var GrowlBar = React.createClass({
    propTypes: {
        content: React.PropTypes.string.isRequired,
        title: React.PropTypes.string,
        type: React.PropTypes.oneOf(['info', 'warn', 'success', 'error']),
        link: React.PropTypes.shape({
            label: React.PropTypes.string,
            url: React.PropTypes.string
        }),
        handleMouseEnter: React.PropTypes.func,
        handleMouseLeave: React.PropTypes.func,
        handleRemove: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            type: 'info'
        }
    },

    renderOptionalLink() {
        if (this.props.link) {
            return (<a href={this.props.link.url}>{this.props.link.label}</a>);
        }

        return null;
    },

    render() {
        var growlClassSet = React.addons.classSet({
            'vp-growlBar': true,
            'vp-growlBar--info': (this.props.type === 'info'),
            'vp-growlBar--warn': (this.props.type === 'warn'),
            'vp-growlBar--success': (this.props.type === 'success'),
            'vp-growlBar--error': (this.props.type === 'error'),
        });

        var optionalLink = this.renderOptionalLink();

        return (
            <div className={growlClassSet} 
                onMouseEnter={this.props.handleMouseEnter} 
                onMouseLeave={this.props.handleMouseLeave}
                role="alert"
                >
                <div className="vp-growlBar-content">
                    <span className="vp-growlBar-closeButton" onClick={this.props.handleRemove} role="button"></span>
                    <div className="vp-growlBar-body" aria-live="assertive">
                        <span className="vp-growlBar-iconContainer"><i className="vp-growlBar-icon"></i></span>
                        {this.props.content}
                        {optionalLink}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = GrowlBar;
