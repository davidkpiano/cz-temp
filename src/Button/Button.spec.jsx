require('../../vendor/phantomjs-shims');

var React = require('react/addons');
var Button = require('./Button');

var TestUtils = React.addons.TestUtils;
var Utils = require('../Utils/test-utils');

var stylePrefix = 'vp-button--';

var generateButtonWithClass = (name) => {
    var options = {};
    options[name] = true;

    var rendered = Utils.generateComponent(Button, options);
    return Utils.classExists(rendered.classList, stylePrefix + name);
};

describe('Button', function() {
    it('should display children', () => {
        var rendered = TestUtils.renderIntoDocument(<Button>Hi</Button>);
        var value = TestUtils
            .findRenderedComponentWithType(rendered, Button)
            .getDOMNode().textContent;

        expect(value).toBe('Hi');
    });

    // TODO: If refactoring, please fix tests.
    xit('should disable when working', () => {
        var rendered = Utils.generateComponent(Button, {
            working: true
        });

        expect(Utils.classExists(rendered.classList, stylePrefix + 'disabled')).toBe(true);
    });

    xit('should respect disabled', () => {
        expect(generateButtonWithClass('disabled')).toBe(true);
    });

    xit('should respect primary', () => {
        var rendered = Utils.generateComponent(Button, {
            buttonType: 'primary'
        });
        expect(Utils.classExists(rendered.classList, stylePrefix + 'primary')).toBe(true);
    });
});
