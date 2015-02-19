require('../../vendor/phantomjs-shims');

var React = require('react/addons');
var Badge = require('./Badge');

var TestUtils = React.addons.TestUtils;
var Utils = require('../Utils/test-utils');

var stylePrefix = 'badgelabel-';

describe('Badge', function() {

    it('should display children', () => {
        var rendered = TestUtils.renderIntoDocument(<Badge>Hi</Badge>);
        var value = TestUtils
            .findRenderedComponentWithType(rendered, Badge)
            .getDOMNode().textContent;

        expect(value).toBe('Hi');
    });

    // TODO: This needs to be fixed.
    xit('should respect all the states', () => {
        ['default', 'primary', 'success', 'info', 'warning', 'danger'].forEach(function (badgeType) {
                var rendered = Utils.generateComponent(Badge, {
                    badgeType: badgeType
                });
                expect(Utils.classExists(rendered.classList, stylePrefix + badgeType)).toBe(true);
            });
    })
});
