
require('../../vendor/phantomjs-shims');

var React = require('react/addons');
var _ = require('lodash');
var GrowlBar = require('./GrowlBar');
var TestUtils = React.addons.TestUtils;
var Utils = require('../Utils/test-utils');

var growlBarPrefix = 'vp-growlBar--';

describe('GrowlBar', function() {
    it('should display contents', function() {
        var value = Utils.generateComponent(GrowlBar,{
            content: 'Testing'
        });

        expect(value.textContent).toBe('Testing');
    });

    it('should add correct classes for type', () => {
        var types = ['error', 'success', 'info', 'warn'];

        _(types)
            .zipObject(_.map(types, function(type) {
                return Utils.generateComponent(GrowlBar, {
                    content: 'Testing',
                    type: type
                }).classList;
            }))
            .map(function(classList, className, collection) {
                var classCheck = Utils.classExists(classList, growlBarPrefix + className);
                expect(classCheck).toBe(true);
            });
    });

    it('should add a link when one is passed in', () => {
        var link = {
            content: 'Hi',
            link: {
                label: 'Link',
                url: 'http://www.viewpost.com'   
            }
        };

        var renderedNode = Utils.generateComponent(GrowlBar, link);

        expect(renderedNode.querySelector('a').text).toEqual(link.link.label);
        expect(renderedNode.querySelector('a').getAttribute('href')).toEqual(link.link.url);
    });

    it('should default to info type when no type present', () => {
        var renderedNode = Utils.generateComponent(GrowlBar, {
            content: 'Testing'
        });

        expect(Utils.classExists(renderedNode.classList, growlBarPrefix + 'info')).toBe(true);
    });
});