var React = require('react/addons');

var EventListener = require('../../vendor/react-bootstrap/src/utils/EventListener');

var EscapeSupportMixin = module.exports = {

    propTypes: {
        onRequestHide: React.PropTypes.func.isRequired
    },

    componentDidMount: function () {
        this._onDocumentKeyupListener = EventListener.listen(document, 'keyup', this.handleDocumentKeyUp);
    },

    componentWillUnmount: function () {
        this._onDocumentKeyupListener.remove();
    },

    handleDocumentKeyUp: function (e) {
        if (e.keyCode === 27 /* escape key*/) {
            this.props.onRequestHide();
        }
    }
};
