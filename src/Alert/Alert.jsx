var React = require('react/addons');

var styles = require('./Alert.less');

module.exports = React.createClass({

  propTypes: {
    alertType: React.PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
    dismissCallback: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      alertType: 'success'
    };
  }, 

  renderDismissButton: function () {
    return (
      <button
        type="button"
        className="alert-close"
        onClick={this.props.dismissCallback}
        aria-hidden="true">
        &times;
      </button>
    );
  },

  render: function () {

    var isDismissible = !!this.props.dismissCallback;
    var cx = React.addons.classSet;
    var classes = {
      'alert': true
    };

    classes['alert-' + this.props.alertType] = true;
    classes['alert-dismissible'] = isDismissible;

    return this.transferPropsTo(
      <div className={cx(classes)}>
        {isDismissible ? this.renderDismissButton() : null}
        {this.props.children}
      </div>
    );
  }
});