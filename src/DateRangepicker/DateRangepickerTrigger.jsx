var React = require('react/addons');

var OverlayMixin = require('../../vendor/react-bootstrap/src/OverlayMixin');
var Popover = require('../../vendor/react-bootstrap/src/Popover');
var domUtils = require('../../vendor/react-bootstrap/src/utils/domUtils');
var DateRangepicker = require('./DateRangepicker');

var styles = require('./DateRangepicker.less');
var stylesOss = require('../../vendor/react-widgets/src/less/react-widgets.less');

module.exports = React.createClass({
  mixins: [OverlayMixin], 

  propTypes: {
    callbackOnApply: React.PropTypes.func.isRequired,
    cannedRangeOptions: React.PropTypes.array.isRequired,
    selectedStartDate: React.PropTypes.string.isRequired,
    selectedEndDate: React.PropTypes.string.isRequired,
    maxDisplayedDate: React.PropTypes.string.isRequired,
    maxDayRange: React.PropTypes.number,
    placement: React.PropTypes.string,
    positionLeft: React.PropTypes.number,
    positionTop: React.PropTypes.number,
    arrowOffsetLeft: React.PropTypes.number,
    arrowOffsetTop: React.PropTypes.number,
    showCustomRange: React.PropTypes.bool,
    showAllDates: React.PropTypes.bool
  },

  getDefaultProps: function() {
      return {
          placement: 'bottom',
          positionTop: 35,
          positionLeft: 0,
          arrowOffsetLeft: 100,
          arrowOffsetTop: 0,
          showCustomRange: true,
          showAllDates: true
      };
  },

  getInitialState: function() {
    return {
      isModalOpen: false,
      selectedStartDate: this.props.selectedStartDate,
      selectedEndDate: this.props.selectedEndDate
    };
  },

  handleToggle: function() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  },

  hide: function() {
    this.setState({
      isModalOpen: false
    });
  },
  
  reportChange: function(selectedStartDate, selectedEndDate) {
    this.setState({ selectedStartDate: selectedStartDate, selectedEndDate: selectedEndDate });
    this.props.callbackOnApply({ startDate: selectedStartDate, endDate: selectedEndDate });
  },

  renderOverlay: function() {

    if (!this.state.isModalOpen) {
      return <span/>;
    } else {

      var offset = domUtils.getOffset(this.getDOMNode());

      return <Popover placement={this.props.placement} positionLeft={offset.left + this.props.positionLeft} positionTop={offset.top + this.props.positionTop} arrowOffsetLeft={this.props.arrowOffsetLeft} className="someBemName">
                  <DateRangepicker
                      onRequestHide={this.hide}
                      reportChange={this.reportChange}
                      cannedRangeOptions={this.props.cannedRangeOptions}
                      selectedStartDate={this.state.selectedStartDate}
                      selectedEndDate={this.state.selectedEndDate}
                      maxDisplayedDate={this.props.maxDisplayedDate}
                      maxDayRange={this.props.maxDayRange}
                      showCustomRange={this.props.showCustomRange}
                      showAllDates={this.props.showAllDates} />
              </Popover>;
    }
  },

  render: function() {

    var dateRangeVal = (this.state.selectedStartDate && this.state.selectedEndDate) 
      ? this.state.selectedStartDate + ' - ' + this.state.selectedEndDate 
      : 'All Dates';

    return React.addons.cloneWithProps(<div id="dateRange" className="input-group" onClick={this.handleToggle}>
          <span id="wrapperHack" className="input-group-addon">
              <i id="calendarIconHack" className="flaticon stroke calendar-3"></i>
          </span>
          <div className="form-control" name="dateRangeInner" id="dateRangeInner">{dateRangeVal}</div>
      </div>, {});
  }
});
