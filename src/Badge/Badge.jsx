var React = require('react/addons');

module.exports = React.createClass({

  propTypes: {
    variant: React.PropTypes.string
  },

  render: function () {

    var cx = React.addons.classSet;
    var classes = {
        'vp-badge': true
    };

    classes[this.props.variant] = true;

    return this.transferPropsTo(
      <span className={cx(classes)}>
        {this.props.children}
      </span>
    );
  }
});
