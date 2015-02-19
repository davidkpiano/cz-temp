 var React = require('react/addons');
 var moment = require('moment');

var ReactWidgets = require('react-widgets');
var Calendar = ReactWidgets.Calendar; 

var styles = require('../../vendor/react-widgets/src/less/react-widgets.less');

module.exports = React.createClass({

  propTypes: {
    max: React.PropTypes.string,
    min: React.PropTypes.string,
    dataKey: React.PropTypes.string,
    date: React.PropTypes.string,
    onUserInput: React.PropTypes.func.isRequired
  },

  getDefaultProps: function() {
    return {
      max: moment().format('L'),
      min: moment().subtract('days', 3600).format('L'),
      date: moment().format('L'),
      dataKey: undefined
    };
  }, 

  updateParent: function(selectedValue) {
    this.props.onUserInput(this.props.dataKey, moment(selectedValue).format('L'));
  },

  render: function() {
    return <Calendar value={new Date(this.props.date)}
      onChange={this.updateParent}
      min={new Date(this.props.min)}
      max={new Date(this.props.max)}></Calendar>;
  }
});