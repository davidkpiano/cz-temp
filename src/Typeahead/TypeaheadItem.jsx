var React = require('react/addons');
var joinClasses = require('react/lib/joinClasses');

module.exports = React.createClass({
    displayName: 'TypeaheadItem',

    propTypes: {
        data: React.PropTypes.object.isRequired,
        url: React.PropTypes.string
    },

    handleClick(e) {
        if (this.props.onClick) {
            this.props.onClick(this.props.data);
        }
    },

    render() {
        var {onClick, className, data,  ...others} = this.props;
        var content =
                    (<div {...others}
                        className={joinClasses('vp-typeahead-item', className)}
                        onClick={this.handleClick} >
                        {this.props.children}
                    </div>);

        return this.props.url ? this.renderLink(content, others) : content;
    },

    renderLink(children) {
        return (<a className="vp-typeahead-link" href={this.props.url}>{children}</a>);
    }
});
