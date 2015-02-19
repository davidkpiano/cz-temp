var React = require('react')
  , cx = require('../util/cx')
  , compose = require('../util/compose')
  , setter = require('../util/stateSetter')
  , globalize = require('globalize');


module.exports = React.createClass({

  displayName: 'NumberPickerInput', 

  propTypes: {
    value:        React.PropTypes.number,
    format:       React.PropTypes.string,
    min:          React.PropTypes.number,
    
    onChange:     React.PropTypes.func.isRequired,
    onKeyDown:    React.PropTypes.func,
  },

  getDefaultProps: function(){
    return {
      value: null,
      format: 'd',
      editing: false,
    }
  },

  getInitialState: function() {
    var value = this.props.editing 
          ? this.props.value
          : globalize.format(this.props.value, this.props.format)

    return { 
      stringValue: value
    }
  },
  
  componentWillReceiveProps: function(nextProps) {
    var value = nextProps.editing 
          ? nextProps.value
          : globalize.format(nextProps.value, nextProps.format)

    if ( isNaN(nextProps.value) ) 
      value = ''

    this.current(value)
  },

  render: function(){
    var value = this.state.stringValue;

    return this.transferPropsTo(
      <input 
        type='text' 
        className='rw-input'
        onKeyDown={this.props.onKeyDown}
        onChange={this._change}
        onBlur={this._finish}
        aria-disabled={this.props.disabled}
        aria-readonly={this.props.readOnly}
        disabled={this.props.disabled}
        readOnly={this.props.readOnly}
        value={value}/>
    )
  },

  _change: function(e){
    var val = e.target.value
      , number = +e.target.value
      , isNull = val !== 0 && !val
      , hasMin = _.isFinite(this.props.min)

    //console.log(hasMin, this.props.min)
    //a null value is only possible when there is no min
    if(!hasMin && isNull)
      return this.props.onChange(null)

    if(this.isValid(number) && number !== this.props.value)
      return this.props.onChange(number)

    //console.log(val !== 0 && !val)
    this.current(e.target.value)
  },

  _finish: function(e){
    var number = +this.state.stringValue

    // if number is below the min
    // we need to flush low values eventually, onBlur is definativly no typing
    if(!isNaN(number) && number < this.props.min) {
      this.props.onChange(number)
    }
  },

  isValid: function(value) {
    var num = +value
      , noMin = this.props.min == null || !_.isFinite(this.props.min);

    if(isNaN(num)) return false
    return num >= this.props.min
  },

  //this intermediate state is for when one runs into the decimal or are typing the number
  current: setter('stringValue'),

});
