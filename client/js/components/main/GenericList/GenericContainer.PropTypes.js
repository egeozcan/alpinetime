var React = require('react');

export default {
  titles: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      name: React.PropTypes.string,
      getter: React.PropTypes.func,
      title: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.element,
      ])
    }).isRequired
  ),
  data: React.PropTypes.array,
  preCalculateForPage: React.PropTypes.func
}