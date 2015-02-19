var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var _ = require('lodash');

module.exports = {
    generateComponent: function(Component, options, children) {
        var rendered = TestUtils.renderIntoDocument(<Component {...options}> {children} </Component>);
        var value = TestUtils
                .findRenderedComponentWithType(rendered, Component)
                .getDOMNode();

        return value;
    },
    classExists: function(classList, className) {
        return _(classList).toArray().indexOf(className) >= 0;
    }
};
