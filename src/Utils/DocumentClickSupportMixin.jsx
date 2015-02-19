var React = require('react/addons');

var EventListener = require('../../vendor/react-bootstrap/src/utils/EventListener');

function wasSomethingElseClicked(node, root) {

    /* check conditions
        1 - if we traverse all the way up to the top of the mounted component, the click is good/true
        2 - if we traverse all the way to the document, we are outside of the component
            note: this check also keeps us from returning document.parentNode === null wrong
        3 - if we find a null parent node (not document since that's checked as a loop condition), we will assume we are dealing with a detached third party control or something of that nature (it can happen with some kendo controls)
    */
  while (node && node !== document) {

    if (node === root) {
      return true;
    }

    node = node.parentNode;

    if (node === null) {
      return true;
    }
  }

  return false;
}

var DocumentClickSupportMixin = module.exports = {

    propTypes: {
        onRequestHide: React.PropTypes.func.isRequired
    },

    componentDidMount: function () {
        this._onDocumentClickListener = EventListener.listen(document, 'click', this.handleDocumentClick);
    },

    componentWillUnmount: function () {
        this._onDocumentClickListener.remove();
    },

    handleDocumentClick: function (e) {

        if (wasSomethingElseClicked(e.target, this.getDOMNode())) {
          return;
        }

        this.props.onRequestHide(); 
    }
};
