var React = require('react/addons');
var cloneWithProps = React.addons.cloneWithProps;
var cx = React.addons.classSet;
var joinClasses = require('react/lib/joinClasses');
var createChainedFunction = require('../../vendor/react-bootstrap/src/utils/createChainedFunction');
var PositionMixin = require('../Utils/PositionMixin');
var OverlayPositionMixin = require('../Utils/OverlayPositionMixin');

/**
 * Check if value one is inside or equal to the of value
 *
 * @param {string} one
 * @param {string|array} of
 * @returns {boolean}
 */
var isOneOf = (one, of) => {
    if (Array.isArray(of)) {
        return of.indexOf(one) >= 0;
    }
    return one === of;
};

var OverlayTrigger = React.createClass({
    displayName: 'Overlay Trigger',

    propTypes: {
        overlay: React.PropTypes.node.isRequired,
        defaultOverlayShown: React.PropTypes.bool,
        displayArrow: React.PropTypes.bool,
        container: React.PropTypes.shape({
            getDOMNode: React.PropTypes.func
        })
    },

    mixins: [PositionMixin, OverlayPositionMixin],

    getDefaultProps() {
        return {
            container: {
                // Provide `getDOMNode` fn mocking a React component API. The `document.body`
                // reference needs to be contained within this function so that it is not accessed
                // in environments where it would not be defined, e.g. nodejs. Equally this is needed
                // before the body is defined where `document.body === null`, this ensures
                // `document.body` is only accessed after componentDidMount.
                getDOMNode() {
                    return document.body;
                }
            },
            placement: 'right',
            displayArrow: false,
            trigger: ['hover', 'focus']
        };
    },

    componentWillUnmount() {
        this._unrenderOverlay();
        if (this._overlayTarget) {
            this.getContainerDOMNode().removeChild(this._overlayTarget);
            this._overlayTarget = null;
        }
    },

    componentDidUpdate() {
        this._renderOverlay();
    },

    componentDidMount() {
        this._renderOverlay();
    },

    getOverlayDOMNode() {
        if (!this.isMounted()) {
            throw new Error('getOverlayDOMNode(): A component must be mounted to have a DOM node.');
        }

        return this._overlayInstance.getDOMNode();
    },

    getContainerDOMNode() {
        return this.props.container.getDOMNode ?
            this.props.container.getDOMNode() : this.props.container;
    },

    getInitialState() {
        return {
            isOverlayShown: this.props.defaultOverlayShown == null ?
                false : this.props.defaultOverlayShown,
            overlayLeft: null,
            overlayTop: null
        };
    },

    show() {
        this.setState({
            isOverlayShown: true
        }, () => {
            this.updateOverlayPosition();
        });
    },

    hide() {
        this.setState({
            isOverlayShown: false
        });
    },

    toggle() {
        this.state.isOverlayShown ?
            this.hide() : this.show();
    },

    renderArrow() {
        if (this.props.showArrow) {
            var classes = {'vp-overlay-arrow': true}
            classes['vp-overlay-arrow--' + this.props.placement] = true;

            return (<span className={cx(classes)} />);
        }

        return null;
    },

    renderOverlay() {
        if (!this.state.isOverlayShown) {
            return <span />;
        }

        var positionalStyles = {
            position: 'absolute',
            top: this.state.overlayTop,
            left: this.state.overlayLeft
        };

        return (<div style={positionalStyles}
                    className={joinClasses('vp-overlay', this.props.className)}>
                        {this.renderArrow()}
                        {cloneWithProps(
                            this.props.overlay,
                            {
                                onRequestHide: this.hide,
                                placement: this.props.placement,
                                positionLeft: this.state.overlayLeft,
                                positionTop: this.state.overlayTop
                            })
                        }
                </div>);
    },

    render() {
        if (this.props.trigger === 'manual') {
            return React.Children.only(this.props.children);
        }

        var props = {};

        if (isOneOf('click', this.props.trigger)) {
            props.onClick = createChainedFunction(this.toggle, this.props.onClick);
        }

        if (isOneOf('hover', this.props.trigger)) {
            props.onMouseOver = createChainedFunction(this.show, this.props.onMouseOver);
            props.onMouseOut = createChainedFunction(this.hide, this.props.onMouseOut);
        }

        if (isOneOf('focus', this.props.trigger)) {
            props.onFocus = createChainedFunction(this.show, this.props.onFocus);
            props.onBlur = createChainedFunction(this.hide, this.props.onBlur);
        }

        return cloneWithProps(
                    React.Children.only(this.props.children),
                    props
                );
    },

    updateOverlayPosition() {
        if (!this.isMounted()) {
            return;
        }

        var pos = this.calculatePosition(this.props.placement, this.getOverlayDOMNode(), this.getContainerDOMNode(), this);

        this.setState({
            overlayLeft: pos.left,
            overlayTop: pos.top
        });
    },

    _mountOverlayTarget() {
        this._overlayTarget = document.createElement('div');
        this.getContainerDOMNode()
            .appendChild(this._overlayTarget);
    },

    _renderOverlay() {
        if (!this._overlayTarget) {
            this._mountOverlayTarget();
        }

        // Save reference to help testing
        this._overlayInstance = React.renderComponent(this.renderOverlay(), this._overlayTarget);
    },

    _unrenderOverlay() {
        React.unmountComponentAtNode(this._overlayTarget);
        this._overlayInstance = null;
    }
});

module.exports = OverlayTrigger;
