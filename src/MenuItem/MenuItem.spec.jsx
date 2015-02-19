
require('../../vendor/phantomjs-shims');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Utils = require('../Utils/test-utils');
var MenuItem = require('./MenuItem');

var menuItemClassPrefix = 't-';

describe('MenuItem', function() {
    it('should add header class when defined as header', () => {
        var menuItemContent = (<div>Testing Menu Item</div>);
        var menuItemNode = Utils.generateComponent(MenuItem, {
            header: true
        }, menuItemContent);

        expect(Utils.classExists(menuItemNode.classList, menuItemClassPrefix + 'header')).toBe(true);
        expect(menuItemNode.querySelector('div').innerText).toBe('Testing Menu Item');
    });

    it('should wrap content in a link when href defined', () => {
        var options = {
            href: 'http://www.google.com'
        };
        var menuItemContent = (<div>Testing Menu Item</div>);
        var menuItemNode = Utils.generateComponent(MenuItem, options, menuItemContent);

        expect(menuItemNode.querySelector('a').getAttribute('href')).toBe(options.href);
        expect(menuItemNode.querySelector('a > div').innerText).toBe('Testing Menu Item');
    });

    it('should add divider class when defined as divider', () => {
        var menuItemNode = Utils.generateComponent(MenuItem, { divider: true });

        expect(Utils.classExists(menuItemNode.classList, menuItemClassPrefix + 'divider'));
    });

    it('should transfer title to anchor when href and title defined', () => {
        var options = {
            href: 'http://www.google.com',
            title: 'Google is a great company'
        };
        var menuItemNode = Utils.generateComponent(MenuItem, options);

        expect(menuItemNode.querySelector('a').getAttribute('title')).toBe(options.title);
    });
});
