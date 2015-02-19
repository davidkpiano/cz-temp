require('../../vendor/phantomjs-shims');

var React = require('react/addons');
var Alert = require('./Alert');

var TestUtils = React.addons.TestUtils;
var Utils = require('../Utils/test-utils');

var stylePrefix = 'alert-';

var generateButtonWithClass = (name) => {
    var options = {};
    options[name] = true;

    var rendered = Utils.generateComponent(Alert, options);
    return Utils.classExists(rendered.classList, stylePrefix + name);
};

describe('Alert', function() {

    it('should display children', () => {
        var rendered = TestUtils.renderIntoDocument(<Alert>Hi</Alert>);
        var value = TestUtils
            .findRenderedComponentWithType(rendered, Alert)
            .getDOMNode().textContent;

        expect(value).toBe('Hi');
    });

    /* get rid of this test, it's pointless */
    it('should respect all the states', () => {
        ['success', 'info', 'warning', 'danger'].forEach(function (alertType) {
                var rendered = Utils.generateComponent(Alert, {
                    alertType: alertType
                });
                expect(Utils.classExists(rendered.classList, stylePrefix + alertType)).toBe(true);
            });
    })
});