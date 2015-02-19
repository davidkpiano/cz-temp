
require('../../vendor/phantomjs-shims');

var React = require('react/addons');
var _ = require('lodash');
var DateRangepickerTrigger = require('./DateRangepickerTrigger');
var TestUtils = React.addons.TestUtils;
var Utils = require('../Utils/test-utils');

describe('DateRangepickerTrigger', function() {

    it('should render a trigger whose id is dateRange', () => {

        var renderedTrigger = Utils.generateComponent(DateRangepickerTrigger, {
           cannedRangeOptions: [
               { label: 'Today', daysInPast: 0 },
               { label: 'Last 7 Days', daysInPast: 6 },
               { label: 'Last 30 Days', daysInPast: 29 },
               { label: 'Last 60 Days', daysInPast: 59},
               { label: 'All', daysInPast: 3599}
           ],
           selectedStartDate: (new Date('2/1/2005')).toLocaleDateString(),
           selectedEndDate: (new Date()).toLocaleDateString(),
           maxDisplayedDate: (new Date('1/1/2101')).toLocaleDateString(),
           maxDayRange: 3599
       });

        expect(renderedTrigger.getAttribute('id')).toBe('dateRange');
    });

    it('should open a popover when clicked', () => {

        var options = {
           cannedRangeOptions: [
               { label: 'Today', daysInPast: 0 },
               { label: 'Last 7 Days', daysInPast: 6 },
               { label: 'Last 30 Days', daysInPast: 29 },
               { label: 'Last 60 Days', daysInPast: 59},
               { label: 'All', daysInPast: 3599}
           ],
           selectedStartDate: (new Date('2/1/2005')).toLocaleDateString(),
           selectedEndDate: (new Date()).toLocaleDateString(),
           maxDisplayedDate: (new Date('1/1/2101')).toLocaleDateString(),
           maxDayRange: 3599
       };
        
        var renderedTrigger = TestUtils.renderIntoDocument(<DateRangepickerTrigger {...options} />);

        TestUtils.Simulate.click(renderedTrigger);
        expect(document.getElementsByClassName('popover')).toBeDefined();
    });
});
