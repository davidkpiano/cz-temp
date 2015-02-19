var React = require('react/addons');
var classSet = React.addons.classSet;
var joinClasses = require('react/lib/joinClasses');

var MenuItem = React.createClass({
    propTypes: {
        header: React.PropTypes.bool,
        divider: React.PropTypes.bool,
        href: React.PropTypes.string,
        title: React.PropTypes.string,
        onSelect: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            href: '#'
        };
    },

    render() {
        var content;
        var { href, divider, header, ...others } = this.props;
        var classes = classSet({
            'vp-item': true,
            't-divider': divider,
            't-header': header
        });

        if (header) {
            content = this.props.children;
        } else if (!this.props.divider) {
            content = this.renderLink();
        }

        return (
                <li role="presentation" {...others}
                    title={undefined}
                    className={joinClasses(this.props.className, classes)}>
                    {content}
                </li>
               );
    },

    renderLink() {
        return (<a onClick={this.handleClick}
                    href={this.props.href}
                    title={this.props.title}
                    tabIndex="-1"
                    className="vp-menuItem-link">
                    {this.props.children}
                </a>);
    },

    handleClick(e) {
        if (this.props.onSelect) {
            e.preventDefault();
            this.props.onSelect(this.props.key);
        }
    },

});

module.exports = MenuItem;
