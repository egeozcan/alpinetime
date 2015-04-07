const Field = React.createClass({
  propTypes: {
    afterEdit: React.PropTypes.func.isRequired,
    isEditable: React.PropTypes.bool,
    type: React.PropTypes.oneOf([
        'text', 'number', 'date',
        'file', 'image', 'time',
        'color', 'tel'
      ]).isRequired,
    isRange: React.PropTypes.bool,
    onValid: React.PropTypes.func,
    onInvalid: React.PropTypes.func,
    validateAfter: React.PropTypes.oneOf(['keyup', 'blur']),
    validator: React.PropTypes.func,
    valueOptions: React.PropTypes.array
  },
  getDefaultProps() {
    return {
      
    }
  }
});

export default Field;