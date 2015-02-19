var React = require('react/addons');

var moment = require('moment');

var ButtonGroup = require('../ButtonGroup/ButtonGroup');
var Button = require('../Button/Button');
var EscapeSupportMixin = require('../Utils/EscapeSupportMixin');
//var DocumentClickSupportMixin = require('../Utils/DocumentClickSupportMixin');
var DatepickerTrigger = require('../Datepicker/DatepickerTrigger');

module.exports = React.createClass({
    mixins: [EscapeSupportMixin/* , DocumentClickSupportMixin */],

    propTypes: {
        onRequestHide: React.PropTypes.func,
        reportChange: React.PropTypes.func,
        cannedRangeOptions: React.PropTypes.arrayOf(React.PropTypes.shape({
            label: React.PropTypes.string.isRequired, 
            daysInPast: React.PropTypes.number.isRequired
        })).isRequired,
        selectedStartDate: React.PropTypes.string.isRequired,
        selectedEndDate: React.PropTypes.string.isRequired,
        maxDisplayedDate: React.PropTypes.string.isRequired,
        maxDayRange: React.PropTypes.number,
        showCustomRange: React.PropTypes.bool,
        showAllDates: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            selectedStartDate: moment().subtract('days', 365).format('L'),
            selectedEndDate: moment().format('L')
        };
    },

    getInitialState: function() {
        return {
            showCustomRangeSection: false,
            selectedStartDate: this.props.selectedStartDate,
            selectedEndDate: this.props.selectedEndDate
        };
    },

    handleCannedDate: function(e) {
        var cannedDate = e.target.getAttribute('data-value') || e.target.parentNode.getAttribute('data-value');
        var numberOfDays = cannedDate;
        var newStartDate = (numberOfDays === '-1') 
            ? this.getDefaultStartDate() 
            : moment().subtract('days', numberOfDays).format('L');
        var newEndDate = moment().format('L');

        var propsToUpdate = {
            selectedStartDate: newStartDate,
            selectedEndDate: newEndDate
        };

        if (this.isMounted()) {
          this.setState(propsToUpdate);
        }
    },

    handleAllDate: function() {
        var propsToUpdate = {
            selectedStartDate: undefined,
            selectedEndDate: undefined
        };

        if (this.isMounted()) {
            this.setState(propsToUpdate);
        }
    },

    handleUserInput: function(keyToUpdate, valueToUpdateItTo) {
        var updateState = {};
        updateState[keyToUpdate] = valueToUpdateItTo.selectedDate;

        if (this.isMounted()) {
            this.setState(updateState);
        }
    },

    applyDateRange: function() {
        this.props.reportChange(this.state.selectedStartDate, this.state.selectedEndDate);
        this.props.onRequestHide();
    },

    getDefaultStartDate: function() {
        return moment().subtract('days', 3600).format('L');
    },

    renderButton: function(item) {

        /* don't show any canned options that exceed the maximum allowed date range */
        if ((item.daysInPast + 1) > this.props.maxDayRange) return;
        
        return <Button 
            onClick={this.handleCannedDate}
            data-value={item.daysInPast}>
          {item.label}
        </Button>;
    },

    renderAllDatesButton: function() {
        return <Button onClick={this.handleAllDate}>
                All Dates
            </Button>;
    },

    renderCustomRange: function() {

        var minAllowedStartDate = (this.props.maxDayRange) 
            ? (moment(this.state.selectedEndDate).subtract('days', (this.props.maxDayRange - 1))).format('L') 
            : this.getDefaultStartDate();


        //var adjustedStartDate = (moment(this.state.selectedStartDate).isAfter(this.state.selectedEndDate)) ? this.state.selectedEndDate :this.state.selectedStartDate;

        return (<div className="row" id="datePickerRow">
                    <div className="col-xs-12">
                        <div className="col-xs-6">
                            <div className="row">
                                <div className="col-xs-12 text-center">
                                    <strong>From</strong>
                                </div>
                            </div>                            
                            <div className="row">
                                <div className="col-xs-12">
                                    <DatepickerTrigger
                                        selectedDate={this.state.selectedStartDate}
                                        minDisplayedDate={minAllowedStartDate}
                                        maxDisplayedDate={this.state.selectedEndDate}
                                        callbackKey="selectedStartDate"
                                        callbackOnApply={this.handleUserInput} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12 text-center">
                                    <strong>To</strong>
                                </div>
                            </div>                        
                            <div className="row">
                                <div className="col-xs-12">
                                    <DatepickerTrigger
                                        selectedDate={this.state.selectedEndDate}
                                        minDisplayedDate={minAllowedStartDate}
                                        maxDisplayedDate={this.state.maxDisplayedDate}
                                        callbackKey="selectedEndDate"
                                        callbackOnApply={this.handleUserInput} />
                                </div>
                            </div>
                        </div>
                    </div>
                      <div className="row">
                        <div className="col-xs-12 text-center">
                            <ButtonGroup>
                                <Button primary={true} onClick={this.applyDateRange}>
                                    Apply Range
                                </Button>
                            </ButtonGroup>
                        </div>
                    </div>
                </div>);
    },

    render: function() {
        return <div className="col-xs-12">
                <div className="row">
                    <div className="col-xs-12 text-center">
                        <ButtonGroup>
                            {this.props.cannedRangeOptions.map(this.renderButton)}
                            {(this.props.showAllDates) ? this.renderAllDatesButton() : ''}
                        </ButtonGroup>
                    </div>
                </div>
                {this.renderCustomRange()}
            </div>;
    }
});
