var React = require('react/addons');
var OverlayPositionMixin = require('../Utils/OverlayPositionMixin');
var OverlayTrigger = require('../OverlayTrigger/OverlayTrigger');

var Tooltip = React.createClass({
    displayName: 'Tooltip',

    propTypes: {
        content: React.PropTypes.node.isRequired,
        icon: React.PropTypes.string
    },

    mixins: [OverlayPositionMixin],

    getDefaultProps() {
        return {
            trigger: 'hover',
            placement: 'top'
        };
    },

    render() {
        var tooltip = (<div>{this.props.content}</div>);
        return (<OverlayTrigger
                    {...this.props}
                    overlay={tooltip}
                    showArrow={true}
                    className="vp-tooltip">
                        <span>
                            {this.props.children}
                        </span>
                    </OverlayTrigger>);
    }
});

module.exports = Tooltip;
