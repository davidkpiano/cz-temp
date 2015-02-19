/**
 * @jsx React.DOM
 */

var React = require('react');
var FormFieldsMixin = require('../Mixins/FormFieldsMixin');

var Form = React.createClass({
    propTypes: {
        onSubmit: React.PropTypes.func.isRequired,
        name: React.PropTypes.string.isRequired
    },

    mixins: [FormFieldsMixin],
    
    componentDidMount: function() {
        this.processFormFields();
    },

    render: function() {
        return (
            <div />
        );
    },

    isFieldValid: function(field) {

    },

    isFormValid: function() {
        return true;
    },

    getFieldValue: function(field) {

    },

    setFieldValue: function(field, value) {

    },

    childContextTypes: {
        isFieldValid: React.PropTypes.bool.isRequired,
        getFieldValue: React.PropTypes.func.isRequired,
        setFieldValue: React.PropTypes.func.isRequired,
        isFormValid: React.PropTypes.bool
    },

    getChildContext: function() {
        return {
            isFormValid: this.isFormValid(),
            isFieldValid: this.isFieldValid,
            getFieldValue: this.getFieldValue,
            setFieldValue: this.setFieldValue
        };
    }
});

module.exports = Form;