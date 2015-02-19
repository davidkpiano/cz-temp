module.exports = {
    propTypes: {
        placement: React.PropTypes.oneOf(['top','right', 'bottom', 'left', 'bottom-right',
            'bottom-left', 'top-right', 'top-left']).isRequired,
         trigger: React.PropTypes.oneOfType([
                     React.PropTypes.oneOf(['manual', 'click', 'hover', 'focus']),
                     React.PropTypes.arrayOf(React.PropTypes.oneOf(['click', 'hover', 'focus']))
            ])
    }
};
