require('../../vendor/phantomjs-shims');

var React = require('react/addons');
var _ = require('lodash');
var TypeaheadItem = require('./TypeaheadItem');

var TestUtils = React.addons.TestUtils;
var Utils = require('../Utils/test-utils');

describe('TypeaheadItem', () => {
    it('should render a link if url present', () => {
        var url = 'butts.com';
        var rendered = TestUtils.renderIntoDocument(
            <TypeaheadItem url={url}>I will be in a link</TypeaheadItem>);
        var node = rendered.getDOMNode();
        expect(node.nodeName).toBe('A');
        expect(node.attributes['href'].value).toBe(url);
    });

    it('should pass data onClick', () => {
        var data = {
            name: 'Butts'
        };
        var expectedData;
        var rendered = TestUtils.renderIntoDocument(
            <TypeaheadItem data={data}
            onClick={(itemData) => {
                expectedData = itemData;
            }}>X</TypeaheadItem>);
        var node = rendered.getDOMNode();

        TestUtils.Simulate.click(node);

        expect(expectedData).toBe(data);
    });
});
