require('../../vendor/phantomjs-shims');

var React = require('react/addons');
var Input = require('./Input');

var TestUtils = React.addons.TestUtils;
var Utils = require('../Utils/test-utils');

var stylePrefix = 'vp-input--';

describe('Input', () => {
    it('should generate an input with a label when specified', () => {
        var options = {
            label: 'Label Test'
        };
        var rendered = Utils.generateComponent(Input, options);

        expect(rendered.querySelector('label').textContent).toBe(options.label);
    });

    it('should respect additional input types', () => {
        var types = ['select', 'textarea'];
        types.map((value) => {
            var options = {
                type: value
            };
            var rendered = TestUtils.renderIntoDocument(<Input {...options} />).getDOMNode();
            expect(rendered.querySelector(value)).toBeTruthy();
        });
    });

    it('should respect HTML spec input types', () => {
        var types = ['text', 'password', 'checkbox', 'radio', 'email', 'search'];
        types.map((value) => {
            var options = {
                type: value
            };
            var rendered = TestUtils.renderIntoDocument(<Input {...options} />).getDOMNode();
            expect(rendered.querySelector('input').getAttribute('type')).toBe(value);
        });
    });
});
