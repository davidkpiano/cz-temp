var React = require('react/addons');

var EscapeSupportMixin = require('../Utils/EscapeSupportMixin');
var DocumentClickSupportMixin = require('../Utils/DocumentClickSupportMixin');
var Calendar = require('../Calendar/Calendar');

module.exports = React.createClass({

    /* mixing in these components is about the only interesting thing that datepicker does */
    mixins: [EscapeSupportMixin, DocumentClickSupportMixin],

    propTypes: {
        max: React.PropTypes.string,
        min: React.PropTypes.string,
        date: React.PropTypes.string,
        onUserInput: React.PropTypes.func.isRequired
    },

    render: function() {
        return <Calendar
                    max={this.props.max}
                    min={this.props.min}
                    date={this.props.date}
                    onUserInput={this.props.onUserInput} />;
    }
});