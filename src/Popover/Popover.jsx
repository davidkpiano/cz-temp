var React = require('react/addons');
var joinClasses = require('react/lib/joinClasses');

var Popover = React.createClass({
    propTypes: {
        title: React.PropTypes.node
    },

    renderHeader: function() {
        if (this.props.title) {
            return (<div className="vp-popover-title">{this.props.title}</div>);
        }
        return null;
    },

    render: function() {
        var title = this.renderHeader();
        var classes = classSets({
            'vp-popover-content': true
        });

        return (
            <div className={joinClass(this.props.className, classes)}>
                {title}
                <div className="vp-popover-content">
                    {this.props.children}
                </div>
            </div>
        );
    }

});

module.exports = Popover;
