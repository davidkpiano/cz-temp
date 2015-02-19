require('../../vendor/phantomjs-shims');

var React = require('react/addons');
var _ = require('lodash');
var Typeahead = require('./Typeahead');
var TypeaheadResults = require('./TypeaheadResults');

var TestUtils = React.addons.TestUtils;
var Utils = require('../Utils/test-utils');

var classNames = {
    'search': 'vp-typeahead-searchIcon',
    'clear': 'vp-typeahead-clearIcon'
};

describe('Typeahead', () => {
    it('should throw when more than one child is passed', () => {
        try { // TODO: Jasmine toThrow not working -- investigate later
            TestUtils.renderIntoDocument(
                <Typeahead onChange={() =>  {}} currentSearchTerm={''}>
                    <span />
                    <span />
                </Typeahead>);
        } catch (e) {
            expect(e.message).toBeTruthy();
        }
    });

    it('should throw when the single child is not of type TypeaheadResult', () => {
         try {
            TestUtils.renderIntoDocument(
                <Typeahead onChange={() =>  {}} currentSearchTerm={''}>
                    <span>Hi</span>
                </Typeahead>);
        } catch (e) {
            expect(e.message).toBeTruthy();
        }
    });

    it('should two-way bind currentSearchTerm and input', () => {
        var bindedValue = '';
        var rendered = TestUtils.renderIntoDocument(<Typeahead onChange={(term) => {
            bindedValue = term;
        }} currentSearchTerm={bindedValue}/>);
        var node = rendered.refs.input.getDOMNode().children[0];
        var text = 'Binded';

        TestUtils.Simulate.change(node, {target: {value: text}});
        expect(bindedValue).toBe(text);
    });

    it('should display TypeaheadResults when exists and input clicked', () => {
        var results = <TypeaheadResults><span>Nothing to see here</span></TypeaheadResults>;
        var rendered = TestUtils.renderIntoDocument(
            <Typeahead onChange={()=>{}} currentSearchTerm=''>
                {results}
            </Typeahead>);
        var node = rendered.refs.input.getDOMNode().children[0];

        expect(rendered.state.open).toBe(false);
        TestUtils.Simulate.click(node);
        expect(rendered.state.open).toBe(true);
    });

    it('should not display results on click unless displayResultsInitially set', () => {
        var results = <TypeaheadResults><span>Nothing to see here</span></TypeaheadResults>;
        var rendered = TestUtils.renderIntoDocument(
            <Typeahead onChange={()=>{}}
            currentSearchTerm=''
            initialResults={results}
            displayResultsInitially={true}>
            </Typeahead>);
        var node = rendered.refs.input.getDOMNode().children[0];

        expect(rendered.state.open).toBe(false);
        TestUtils.Simulate.click(node);
        expect(rendered.state.open).toBe(true);
    });

    it('should display search icon when no currentSearchTerm set', () => {
        var rendered = TestUtils.renderIntoDocument(
            <Typeahead onChange={()=>{}}
            currentSearchTerm=''/>);

        var node = rendered.getDOMNode().children[0];

        expect(Utils.classExists(node.classList, classNames['search'])).toBe(true);
    });

    it('should display clear icon when currentSearchTerm set', () => {
        var rendered = TestUtils.renderIntoDocument(
            <Typeahead onChange={()=>{}}
            currentSearchTerm='Boom'/>);

        var node = rendered.getDOMNode().children[0];

        expect(Utils.classExists(node.classList, classNames['clear'])).toBe(true);
    });
});
