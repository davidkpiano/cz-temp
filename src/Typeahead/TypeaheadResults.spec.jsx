require('../../vendor/phantomjs-shims');

var React = require('react/addons');
var _ = require('lodash');
var TypeaheadResults = require('./TypeaheadResults');
var TypeaheadItem = require('./TypeaheadItem');
var TestUtils = React.addons.TestUtils;
var Utils = require('../Utils/test-utils');

describe('TypeaheadResults', () => {

    var currentSelectionIndex = null;
    var lastClickedId = null;

    var data = [{
        id: '22'
    }, {
        id: '11'
    }];
    var uniqueIdFactory = (data) => {
        return data.id;
    };
    var onSelect = (data) => {
        lastClicked = data.id;
    };

    var dispatchDocumentEvent = (keyCode) => {
        var event = document.createEvent('Events');
        event.keyCode = keyCode;
        event.initEvent('keyup', true, true);
        document.dispatchEvent(event);
    };

    var getTestCase = () => {
        return (
            <TypeaheadResults
                results={data}
                currentSelectionIndex={currentSelectionIndex}
                onSelectionChange={(id) => {
                    currentSelectionIndex = id;
                    }
                }
                uniqueIdFactory={uniqueIdFactory}
                style={{overflowY: 'scroll', height: 100}}>
                    <span>A header</span>
                    <TypeaheadItem key={'22'} data={{id: '22'}} onClick={onSelect} style={{height: 50}}><span>A thing</span></TypeaheadItem>
                    <span>B header</span>
                    <TypeaheadItem key={'11'} data={{id: '11'}} onClick={onSelect} style={{height: 50}}><span>A thing</span></TypeaheadItem>
            </TypeaheadResults>);
    };

    afterEach(() => {
        currentSelectionIndex = null;
        lastClickedId = null;
    });


    it('should create refs for every TypeaheadItem', () => {
        var rendered = TestUtils.renderIntoDocument(getTestCase());

        _.forEach(data, (item) =>  {
            expect(rendered.refs[uniqueIdFactory(item)]).toBeDefined();
        })
    });

    it('should navigate down on arrowdown', () => {
        currentSelectionIndex = 0;
        var rendered = TestUtils.renderIntoDocument(getTestCase());
        var node = rendered.getDOMNode();

        dispatchDocumentEvent(40);
        expect(currentSelectionIndex).toBe(1);
    });

    it('should navigate up on arrowup', () => {
        currentSelectionIndex = 1;

        var rendered = TestUtils.renderIntoDocument(getTestCase());
        var node = rendered.getDOMNode();

        dispatchDocumentEvent(38);
        expect(currentSelectionIndex).toBe(0);
    });

    it('should execute default onClick on enter', () => {
        currentSelectionIndex = 0;

        var rendered = TestUtils.renderIntoDocument(getTestCase());
        var node = rendered.getDOMNode();
        var item = data[0];
        var itemNode = rendered.refs[uniqueIdFactory(item)].getDOMNode();

        // PhantomJs has no click property on DOMNodes.
        if (itemNode.click) {
            spyOn(itemNode, 'click');
            dispatchDocumentEvent(13);
            expect(itemNode.click).toHaveBeenCalled();
        }
    });

    it('should loop to bottom when at first index on arrowup', () => {
        currentSelectionIndex = 0;

        var rendered = TestUtils.renderIntoDocument(getTestCase());
        var node = rendered.getDOMNode();

        dispatchDocumentEvent(38);
        expect(currentSelectionIndex).toBe(1);
    });

    it('should loop to top when at last index on arrowdown', () => {
        currentSelectionIndex = 1;

        var rendered = TestUtils.renderIntoDocument(getTestCase());
        var node = rendered.getDOMNode();

        dispatchDocumentEvent(40);
        expect(currentSelectionIndex).toBe(0);
    });

    // Overflow + height not being applied in test runners, making testing this case very difficult
    xit('moves scroll position for container when there is overflow on navigation', () => {
        var rendered = TestUtils.renderIntoDocument(getTestCase());
        var node = rendered.getDOMNode();
        expect(node.scrollTop).toBe(0);
        dispatchDocumentEvent(40);
        expect(node.scrollTop).toBeGreaterThan(0);
    });
});
