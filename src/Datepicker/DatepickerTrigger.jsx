var React = require('react/addons');

var OverlayMixin = require('../../vendor/react-bootstrap/src/OverlayMixin');
var Popover = require('../../vendor/react-bootstrap/src/Popover');
var domUtils = require('../../vendor/react-bootstrap/src/utils/domUtils');
var Datepicker = require('./Datepicker');

var styles = require('./Datepicker.less');
var stylesOss = require('../../vendor/react-widgets/src/less/react-widgets.less');

module.exports = React.createClass({
  mixins: [OverlayMixin], 

  propTypes: {
    callbackOnApply: React.PropTypes.func.isRequired,
    callbackKey: React.PropTypes.string,
    selectedDate: React.PropTypes.string.isRequired,
    maxDisplayedDate: React.PropTypes.string.isRequired,
    minDisplayedDate: React.PropTypes.string.isRequired,
    placement: React.PropTypes.string,
    positionLeft: React.PropTypes.number,
    positionTop: React.PropTypes.number,
    arrowOffsetLeft: React.PropTypes.number,
    arrowOffsetTop: React.PropTypes.number 
  },

  getDefaultProps: function() {
      return {
          placement: 'bottom',
          positionTop: 35,
          positionLeft: 0,
          arrowOffsetLeft: 100,
          arrowOffsetTop: 0
      };
  },

  getInitialState: function() {
    return {
      isModalOpen: false,
      selectedDate: this.props.selectedDate
    };
  },

  handleToggle: function() {
    if (this.isMounted()) {
      this.setState({
        isModalOpen: !this.state.isModalOpen
      });
    }
  },

  hide: function() {
    if (this.isMounted()) {
      this.setState({
        isModalOpen: false
      });
    }
  },

  reportChange: function(e, newSelectedDate) {
    /* manual text box input is the event; calendar selection does not provide an event...just the date */
    var theDate = { selectedDate: (e) ? e.target.value : newSelectedDate };
    this.hide();
    if (this.isMounted()) {
      this.setState(theDate);
    }
    this.props.callbackOnApply(this.props.callbackKey, theDate);
  },

  renderOverlay: function() {

    if (!this.state.isModalOpen) {
      return <span/>;
    } else {

      var offset = domUtils.getOffset(this.getDOMNode());

      return <Popover placement={this.props.placement} positionLeft={offset.left + this.props.positionLeft} positionTop={offset.top + this.props.positionTop} arrowOffsetLeft={this.props.arrowOffsetLeft} className="someBemName">
                  <Datepicker
                    max={this.props.maxDisplayedDate}
                    min={this.props.minDisplayedDate}
                    date={this.state.selectedDate}
                    onUserInput={this.reportChange}
                    onRequestHide={this.hide} />
                </Popover>;
    }
  },

  render: function() {
    return React.addons.cloneWithProps(<div id="dateRange" className="input-group">
          <span id="wrapperHack" className="input-group-addon" onClick={this.handleToggle}>
              <i id="calendarIconHack" className="flaticon stroke calendar-3"></i>
          </span>
          <input className="form-control" name="dateRangeInner" id="dateRangeInner" value={this.state.selectedDate} onChange={this.reportChange}></input>
      </div>, {});
  }
});
