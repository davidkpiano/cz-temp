####Get a date rangepicker for an element
- callbackOnApply: React.PropTypes.func.isRequired - function that will be called when an apply or canned date button in clicked.  will pass back an object with the startDate and endDate as properties
- cannedRangeOptions: React.PropTypes.array.isRequired - defined by providing an array of options of the format {label: 'somthing', daysInPast: aNumber}.
- selectedStartDate: React.PropTypes.string.isRequired - initial starting start date
- selectedEndDate: React.PropTypes.string.isRequired - initial starting end date
- maxDisplayedDate: React.PropTypes.string.isRequired - the latest allowed end date
- maxDayRange: React.PropTypes.number - the maximum number of days allowed to be chosen (so, end date minus this number)
- placement: React.PropTypes.string - top | bottom | left | right; defaults to bottom
- positionLeft: React.PropTypes.number - orients the datepicker box by pushing it x pixels more left
- positionTop: React.PropTypes.number - orients the datepicker box by pushing it x pixels more top
- arrowOffsetLeft: React.PropTypes.number - orients the datepicker arrow by pushing it x pixels more left
- arrowOffsetTop: React.PropTypes.number - orients the datepicker arrow by pushing it x pixels more top
- showCustomRange: React.PropTypes.bool - boolean for whether or not to show the custom button; defaults to true

<example name="Typical Usage">
    <file name="demo.jsx">
        React.render(DatepickerTrigger(
            {
                callbackOnApply: function(dateRangeObj) { 
                  console.log('dateRangeObj: ' + dateRangeObj.selectedDate)
                },
                selectedDate: (new Date()).toLocaleDateString(),
                maxDisplayedDate: (new Date('1/1/2021')).toLocaleDateString(),
                minDisplayedDate: (new Date('1/1/2001')).toLocaleDateString()
            }), 
        document.getElementById('demo'));
    </file>
</example>

