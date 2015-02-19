var domUtils = require('../../vendor/react-bootstrap/src/utils/domUtils');
var assign = require('react/lib/Object.assign');

var getPosition = (component, container) => {
    var node = component.getDOMNode();

    var offset = container.tagName == 'BODY' ?
        domUtils.getOffset(node) : domUtils.getPosition(node, container);

    return assign(offset, {
        height: node.offsetHeight,
           width: node.offsetWidth
    });
};

module.exports = {
    calculatePosition(placement, overlayNode, containerNode, component) {
        var childOffset = getPosition(component, containerNode);
        var overlayHeight = overlayNode.offsetHeight;
        var overlayWidth = overlayNode.offsetWidth;

        switch (placement) {
            case 'right':
                return {
                    top: childOffset.top + childOffset.height / 2 - overlayHeight / 2,
                    left: childOffset.left + childOffset.width
                };
            case 'left':
                return {
                    top: childOffset.top + childOffset.height / 2 - overlayHeight / 2,
                    left: childOffset.left - overlayWidth
                };
            case 'top':
                return {
                    top: childOffset.top - overlayHeight,
                    left: childOffset.left + childOffset.width / 2 - overlayWidth / 2
                };
            case 'top-left': 
                return {
                    top: childOffset.top - overlayHeight,
                    left: childOffset.left - overlayWidth
                };
            case 'top-right': {
                return {
                    top: childOffset.top - overlayHeight,
                    left: childOffset.left + childOffset.width
                }
            }
            case 'bottom':
                return {
                    top: childOffset.top + childOffset.height,
                    left: childOffset.left + childOffset.width / 2 - overlayWidth / 2
                };
            case 'bottom-left':
                return {
                    top: childOffset.top + childOffset.height,
                    left: childOffset.left - overlayWidth
                }
            case 'bottom-right':
                return {
                    top: childOffset.top + childOffset.height,
                    left: childOffset.left + childOffset.width
                }
            default:
                throw new Error('calcOverlayPosition(): No such placement of "' + placement + '" found.');
        }
    }
}
